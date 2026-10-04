import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// This is a one-time plan. Keep its assigned photo numbers stable after review.
const map = JSON.parse(await readFile("shared/media-assets.json", "utf8"));
const audit = JSON.parse(await readFile("docs/cloudflare/media-audit.json", "utf8"));
const groups = new Map();
for (const [url, asset] of Object.entries(map)) {
  const group = groups.get(asset.key) || { ...asset, publicPaths: [] };
  group.publicPaths.push(url);
  groups.set(asset.key, group);
}
const initiativeNames = {
  acis: "acis-adopt-a-child-iskolar",
  blockchain4youth: "blockchain4youth",
  "builder-highlight": "builder-highlight",
  "builder-programs": "builder-programs",
  "ecosystem-collaboration": "ecosystem-collaboration",
  "grantix-fundraising": "grantix-fundraising",
  "learning-resources": "learning-resources",
  "mini-library": "mini-library-mission-outreach",
  "web3-on-campus": "web3-on-campus",
};
const special = {
  "/brand/cryptita-mark.png": "brand/logos/cryptita-plays-mark",
  "/brand/cryptita-plays-banner.png": "brand/logos/cryptita-plays-banner",
  "/favicon.ico": "brand/icons/cryptita-plays-favicon",
  "/images/tita-arsh.png": "people/arshelene-lingao/arshelene-lingao-portrait",
  "/images/cook-cover.png": "resources/books/code-like-a-cook/cover",
  "/images/encyclopedia-cover.png": "resources/books/barya-to-blockchain/cover",
  "/images/wave3-cover.png": "resources/books/wave3-handbook/cover",
};
const counters = new Map();
const objects = [...groups.values()].map(asset => {
  const urls = asset.publicPaths.sort();
  const first = urls[0];
  const initiatives = [...new Set(urls.filter(u => u.startsWith("/media/initiatives/")).map(u => {
    const name = initiativeNames[u.split("/")[3]];
    assert.ok(name, `Unclassified initiative: ${u}`);
    return name;
  }))].sort();
  let stem;
  if (initiatives.length) {
    const name = initiatives.join("-and-");
    const directory = `${initiatives.length > 1 ? "shared/" : ""}initiatives/${name}/photos`;
    const number = (counters.get(directory) || 0) + 1;
    counters.set(directory, number);
    stem = `${directory}/${name}-photo-${String(number).padStart(3, "0")}`;
  } else if (special[first]) {
    stem = special[first];
  } else if (first.startsWith("/brand/partners/")) {
    stem = first.slice("/brand/".length).replace(/\.[^.]+$/, "") + "/logo";
  } else if (first.startsWith("/images/")) {
    stem = "site/editorial/" + path.posix.basename(first, path.posix.extname(first));
  } else throw new Error(`Unclassified media: ${first}`);
  const key = `${stem}--${asset.sha256.slice(0, 12)}${path.posix.extname(first).toLowerCase()}`;
  assert.match(key, /^[a-z0-9][a-z0-9/.-]+$/);
  const records = urls.map(url => audit.records.find(r => r.publicPath === url));
  return {
    assetId: `sha256:${asset.sha256}`, oldKey: asset.key, key,
    sha256: asset.sha256, bytes: asset.bytes, contentType: asset.contentType,
    publicPaths: urls, initiatives,
    sourcePaths: urls.map(url => map[url].source),
    descriptions: [...new Set(records.map(r => r?.inventoryNote?.alt).filter(Boolean))],
    credits: [...new Set(records.map(r => r?.credit || "Unrecorded; confirm preferred attribution"))],
  };
});
assert.equal(new Set(objects.map(o => o.key)).size, objects.length, "Key collision");
const plan = {
  schemaVersion: 1, createdOn: "2026-10-05", publicUrlsUnchanged: true,
  policy: "Readable category and initiative keys with stable photo numbers and a 12-character content version. Original source names and unresolved credits remain in this catalog. Photo numbers do not imply event dates. Shared assets keep every initiative association. Legacy sha256 objects remain for rollback; no deletion is performed.",
  objects,
};
await writeFile("docs/cloudflare/media-organization.json", JSON.stringify(plan, null, 2) + "\n");
console.log(JSON.stringify({ objects: objects.length, publicUrls: Object.keys(map).length, categories: [...new Set(objects.map(o => o.key.split("/")[0]))] }));
