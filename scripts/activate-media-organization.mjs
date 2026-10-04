import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const planText = await readFile(
  "docs/cloudflare/media-organization.json",
  "utf8"
);
const planHash = createHash("sha256")
  .update(planText.replaceAll("\r\n", "\n"))
  .digest("hex");
const plan = JSON.parse(planText);
const map = JSON.parse(await readFile("shared/media-assets.json", "utf8"));
for (const environment of ["staging", "production"]) {
  const report = JSON.parse(
    await readFile(`docs/cloudflare/organization-${environment}.json`, "utf8")
  );
  assert.equal(report.environment, environment);
  assert.equal(report.bucket, `cryptita-plays-media-${environment}`);
  assert.equal(
    report.planSha256,
    planHash,
    "Report does not match reviewed catalog"
  );
  assert.equal(report.objects, plan.objects.length);
  assert.equal(report.publicUrls, Object.keys(map).length);
  assert.equal(report.fullChecksums, true);
  assert.equal(report.passed, true);
}
const urls = new Set();
for (const object of plan.objects) {
  for (const url of object.publicPaths) {
    assert.ok(!urls.has(url), `Duplicate URL: ${url}`);
    urls.add(url);
    const asset = map[url];
    assert.ok(asset, `Unknown URL: ${url}`);
    assert.equal(asset.sha256, object.sha256);
    assert.equal(asset.bytes, object.bytes);
    assert.equal(asset.contentType, object.contentType);
    assert.ok([object.oldKey, object.key].includes(asset.key));
    asset.key = object.key;
  }
}
assert.equal(urls.size, Object.keys(map).length);
await writeFile(
  "shared/media-assets.json",
  JSON.stringify(map, null, 2) + "\n"
);
console.log(
  `Activated ${plan.objects.length} verified organized keys for ${urls.size} unchanged public URLs. Deploy staging and verify before production.`
);
