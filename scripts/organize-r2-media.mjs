import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const environment = process.argv[2];
assert.ok(["staging", "production"].includes(environment), "Specify staging or production");
const planText = await readFile("docs/cloudflare/media-organization.json", "utf8");
const plan = JSON.parse(planText);
const map = JSON.parse(await readFile("shared/media-assets.json", "utf8"));
const seen = new Set();
for (const object of plan.objects) {
  assert.match(object.oldKey, /^sha256\/[a-f0-9]{64}\.[a-z0-9]+$/);
  assert.match(object.key, /^[a-z0-9][a-z0-9/.-]+$/);
  assert.ok(!object.key.includes("..") && !seen.has(object.key));
  assert.ok(object.key.includes(`--${object.sha256.slice(0, 12)}.`));
  seen.add(object.key);
  for (const url of object.publicPaths) {
    const asset = map[url];
    assert.ok(asset, `Unknown URL: ${url}`);
    assert.equal(asset.sha256, object.sha256);
    assert.equal(asset.bytes, object.bytes);
    assert.equal(asset.contentType, object.contentType);
    assert.ok([object.oldKey, object.key].includes(asset.key), `Unexpected active key: ${url}`);
  }
}
assert.equal(new Set(plan.objects.flatMap(o => o.publicPaths)).size, Object.keys(map).length);
if (!process.argv.includes("--apply")) {
  console.log(`Plan valid: ${plan.objects.length} objects, ${Object.keys(map).length} stable public URLs. Use --apply to copy and verify; no deletion.`);
  process.exit(0);
}
const { accountId, cloudflareRequest } = await import("./cloudflare-client.mjs");
const account = await accountId();
const bucket = `cryptita-plays-media-${environment}`;
const endpoint = key => `/accounts/${account}/r2/buckets/${bucket}/objects/${key}`;
const digest = bytes => createHash("sha256").update(bytes).digest("hex");
async function readObject(key, asset, allowMissing = false) {
  const response = await cloudflareRequest(endpoint(key));
  if (allowMissing && response.status === 404) { await response.body?.cancel(); return null; }
  assert.equal(response.status, 200, `R2 read failed: ${key}`);
  // Only known, size-bounded manifest objects are buffered, two at a time.
  assert.ok(asset.bytes <= 32 * 1024 * 1024, "Use a streaming migration for larger objects");
  const chunks = [];
  let size = 0;
  for await (const chunk of response.body) {
    size += chunk.byteLength;
    assert.ok(size <= asset.bytes, `Unexpected length: ${key}`);
    chunks.push(chunk);
  }
  const bytes = Buffer.concat(chunks);
  assert.equal(bytes.length, asset.bytes, key);
  assert.equal(digest(bytes), asset.sha256, `Checksum mismatch: ${key}`);
  return bytes;
}
let completed = 0;
async function copy(object) {
  for (let attempt = 1; ; attempt++) {
    try {
      const existing = await readObject(object.key, object, true);
      if (!existing) {
        const bytes = await readObject(object.oldKey, object);
        const response = await cloudflareRequest(endpoint(object.key), {
          method: "PUT", headers: {
            "Content-Length": String(bytes.length), "Content-Type": object.contentType,
            "Cache-Control": "public, max-age=3600", "cf-r2-data-catalog-check": "true",
          },
        }, () => bytes);
        assert.ok(response.ok, `R2 write failed (${response.status}): ${object.key}`);
        await response.body?.cancel();
        await readObject(object.key, object);
      }
      console.log(`${environment}: verified ${++completed}/${plan.objects.length} ${object.key}`);
      return;
    } catch (error) {
      if (error.code === "ERR_ASSERTION" || attempt >= 4) throw error;
      console.log(`Retry ${attempt}/3: ${object.key}`);
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
}
let next = 0;
await Promise.all(Array.from({ length: 2 }, async () => {
  while (next < plan.objects.length) await copy(plan.objects[next++]);
}));
await writeFile(`docs/cloudflare/organization-${environment}.json`, JSON.stringify({
  environment, bucket, verifiedAt: new Date().toISOString(),
  planSha256: digest(planText), objects: completed, publicUrls: Object.keys(map).length,
  fullChecksums: true, legacyObjectsPreserved: true, passed: true,
}, null, 2) + "\n");
