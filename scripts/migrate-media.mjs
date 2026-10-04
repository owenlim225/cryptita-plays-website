import { writeFile, mkdir } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { inventory } from "./media-inventory.mjs";
import { accountId, cloudflareRequest } from "./cloudflare-client.mjs";

const environment = process.argv[2];
if (!["staging", "production"].includes(environment)) throw new Error("Specify staging or production");
const report = await inventory();
if (report.missing.length) throw new Error(`Missing source assets: ${report.missing.join(", ")}`);
const approved = report.records.filter(asset => asset.references.length);
if (approved.some(asset => asset.publicationPermission.startsWith("Unreviewed"))) {
  throw new Error("New or changed media requires owner approval recorded by SHA-256 in docs/cloudflare/media-approvals.json");
}
const map = Object.fromEntries(approved.map(asset => [asset.publicPath, {
  key: `sha256/${asset.sha256}${path.extname(asset.source).toLowerCase()}`,
  sha256: asset.sha256, bytes: asset.bytes, contentType: asset.contentType,
  source: asset.source, publicUrl: asset.publicPath,
}]));
await mkdir("tmp", { recursive: true });
const account = await accountId();
const entries = [...new Map(Object.values(map).map(asset => [asset.key, asset])).values()];
let completed = 0;
async function checksum(response) {
  const hash = createHash("sha256");
  for await (const chunk of response.body) hash.update(chunk);
  return hash.digest("hex");
}
async function upload(asset) {
  const endpoint = `/accounts/${account}/r2/buckets/cryptita-plays-media-${environment}/objects/${asset.key}`;
  const existing = await cloudflareRequest(endpoint);
  if (existing.ok) {
    if (await checksum(existing) !== asset.sha256) throw new Error(`Existing object checksum mismatch; refusing overwrite: ${asset.key}`);
  } else {
    if (existing.status !== 404) throw new Error(`Object inspection failed: ${existing.status}`);
    await existing.body?.cancel();
    const uploaded = await cloudflareRequest(endpoint, {
      method: "PUT", headers: {
        "Content-Length": String(asset.bytes), "Content-Type": asset.contentType,
        "Cache-Control": "public, max-age=3600", "cf-r2-data-catalog-check": "true",
      },
    }, () => createReadStream(asset.source));
    if (!uploaded.ok) throw new Error(`Upload failed: ${uploaded.status} ${asset.key}`);
    await uploaded.body?.cancel();
    const verification = await cloudflareRequest(endpoint);
    if (!verification.ok || await checksum(verification) !== asset.sha256) throw new Error(`Uploaded checksum mismatch: ${asset.key}`);
  }
  console.log(`${environment}: verified ${++completed}/${entries.length} ${asset.source}`);
}
let next = 0;
await Promise.all(Array.from({ length: 2 }, async () => {
  while (next < entries.length) await upload(entries[next++]);
}));
// Write the activation map only after every upload for this environment succeeded.
await writeFile(`tmp/media-assets-${environment}.json`, JSON.stringify(map, null, 2) + "\n");
console.log(`Uploaded ${approved.length} public URL mappings to ${environment}. Validate before activating or cleaning sources.`);
