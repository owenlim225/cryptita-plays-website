import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { inventory } from "./media-inventory.mjs";

const report = await inventory();
const map = JSON.parse(await readFile("shared/media-assets.json", "utf8").catch(error => {
  if (error.code === "ENOENT") return "{}";
  throw error;
}));
const unresolved = report.missing.filter(url => !map[url]);
if (unresolved.length) throw new Error(`Missing media: ${unresolved.join(", ")}`);
for (const asset of report.records) {
  if (map[asset.publicPath] && map[asset.publicPath].sha256 !== asset.sha256) {
    throw new Error(`Media changed; migrate and validate it before deploying: ${asset.publicPath}`);
  }
}
await mkdir("tmp", { recursive: true });
const publicDir = path.resolve(`tmp/cloudflare-public-${randomUUID()}`);
await mkdir(publicDir, { recursive: true });
// Licensed self-hosted fonts are static assets, outside the media/R2 inventory.
await cp("client/public/fonts", path.join(publicDir, "fonts"), { recursive: true });
const assets = report.records.filter(asset => asset.references.length && !map[asset.publicPath]);
for (const asset of assets) {
  if (asset.publicationPermission.startsWith("Unreviewed")) throw new Error(`Media requires owner approval: ${asset.publicPath}`);
  if (asset.bytes > 25 * 1024 * 1024) throw new Error(`Asset requires R2 before deployment: ${asset.publicPath}`);
  const target = path.join(publicDir, asset.publicPath.slice(1));
  await mkdir(path.dirname(target), { recursive: true });
  await cp(asset.source, target);
}
await mkdir("docs/cloudflare", { recursive: true });
if (!Object.keys(map).length) await writeFile("docs/cloudflare/media-audit.json", JSON.stringify(report, null, 2) + "\n");
const result = spawnSync(process.execPath, ["node_modules/@react-router/dev/bin.js", "build"], {
  stdio: "inherit",
  env: { ...process.env, DEPLOY_TARGET: "cloudflare", CF_PUBLIC_DIR: publicDir },
});
if (result.status !== 0) process.exit(result.status || 1);
console.log(`Cloudflare build: ${assets.length} bundled media assets, ${Object.keys(map).length} R2 mappings. Originals preserved.`);
