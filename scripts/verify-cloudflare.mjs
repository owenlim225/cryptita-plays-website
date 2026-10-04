import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const environment = process.argv[2];
assert.ok(
  ["staging", "production"].includes(environment),
  "Specify staging or production"
);
const origin =
  environment === "production"
    ? "https://cryptitaplays.com"
    : "https://staging.cryptitaplays.com";
const paths = [
  "/",
  "/contact",
  "/faq",
  "/who-we-are",
  "/engage",
  "/initiatives",
  "/partners",
  "/stories",
  "/terms",
  "/privacy",
  "/cookies",
];
const source = await readFile("client/src/content/initiatives.ts", "utf8");
const slugs = [...source.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
// Initiative slugs precede the sample story in the content source.
paths.push(
  ...slugs.slice(0, -1).map(slug => `/initiatives/${slug}`),
  `/stories/${slugs.at(-1)}`
);
for (const route of paths) {
  const response = await fetch(origin + route);
  assert.equal(response.status, 200, route);
  assert.match(
    await response.text(),
    /<h1\b/i,
    `${route} must render on the server`
  );
  if (environment === "staging")
    assert.match(response.headers.get("x-robots-tag") || "", /noindex/);
  else assert.equal(response.headers.get("x-robots-tag"), null);
}
const redirect = await fetch(origin + "/donate", { redirect: "manual" });
assert.equal(redirect.status, 301);
assert.equal(redirect.headers.get("location"), "/contact");
for (const route of [
  "/404",
  "/missing-deployment-test-page",
  "/initiatives/missing-deployment-test",
  "/stories/missing-deployment-test",
]) {
  const response = await fetch(origin + route);
  assert.equal(response.status, 404, route);
  assert.match(await response.text(), /name="robots" content="noindex"/);
}
const robots = await fetch(origin + "/robots.txt");
assert.match(
  await robots.text(),
  environment === "staging" ? /Disallow: \// : /Allow: \//
);
if (environment === "production") {
  const www = await fetch("https://www.cryptitaplays.com/test?keep=1", {
    redirect: "manual",
  });
  assert.equal(www.status, 308);
  assert.equal(www.headers.get("location"), origin + "/test?keep=1");
}
const map = JSON.parse(await readFile("shared/media-assets.json", "utf8"));
let count = 0;
for (const [url, asset] of Object.entries(map)) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(origin + encodeURI(url), {
        method: process.argv.includes("--full") ? "GET" : "HEAD",
        signal: AbortSignal.timeout(180_000),
      });
      assert.equal(response.status, 200, url);
      assert.equal(response.headers.get("x-media-store"), "r2", url);
      const length = response.headers.get("content-length");
      // Cloudflare can compress an icon or stream a response without Content-Length.
      // fetch exposes decoded bytes; verify their size and hash for full checks.
      if (length !== null && !response.headers.get("content-encoding"))
        assert.equal(Number(length), asset.bytes, url);
      assert.equal(
        response.headers.get("content-type"),
        asset.contentType,
        url
      );
      if (environment === "staging")
        assert.match(response.headers.get("x-robots-tag") || "", /noindex/);
      if (process.argv.includes("--full")) {
        const hash = createHash("sha256");
        let bytes = 0;
        for await (const chunk of response.body) {
          hash.update(chunk);
          bytes += chunk.byteLength;
        }
        assert.equal(bytes, asset.bytes, `${url} decoded byte length`);
        assert.equal(hash.digest("hex"), asset.sha256, `${url} checksum`);
      }
      break;
    } catch (error) {
      if (error.code === "ERR_ASSERTION" || attempt >= 4) throw error;
      console.log(
        `${environment}: retry ${attempt}/3 for ${url}: ${error.message}`
      );
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
  count++;
  if (count % 25 === 0)
    console.log(
      `${environment}: verified ${count}/${Object.keys(map).length} media URLs`
    );
}
const first = Object.keys(map)[0];
const range = await fetch(origin + first, { headers: { Range: "bytes=0-15" } });
assert.equal(range.status, 206);
assert.equal((await range.arrayBuffer()).byteLength, 16);
const conditional = await fetch(origin + first, {
  headers: { "If-None-Match": `"${map[first].sha256}"` },
});
assert.equal(conditional.status, 304);
const result = {
  environment,
  origin,
  verifiedAt: new Date().toISOString(),
  routes: paths.length,
  assets: count,
  fullChecksums: process.argv.includes("--full"),
  passed: true,
};
console.log(JSON.stringify(result));
if (process.argv.includes("--full"))
  await writeFile(
    `docs/cloudflare/verification-${environment}.json`,
    JSON.stringify(result, null, 2) + "\n"
  );
