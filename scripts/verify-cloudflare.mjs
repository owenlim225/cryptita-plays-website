import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { assetReferences } from "./media-inventory.mjs";
import { tsImport } from "tsx/esm/api";

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
const { initiatives, stories } = await tsImport("../client/src/content/initiatives.ts", import.meta.url);
const excludedStoryPaths = stories.filter(story => story.publicationStatus === "draft").map(story => `/stories/${story.slug}`);
if (!stories.some(story => story.publicationStatus !== "draft")) excludedStoryPaths.push("/stories");
paths.push(
  ...initiatives.map(({ slug }) => `/initiatives/${slug}`),
  ...stories.map(({ slug }) => `/stories/${slug}`)
);
for (const route of paths) {
  const response = await fetch(origin + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.match(
    html,
    /<h1\b/i,
    `${route} must render on the server`
  );
  if (excludedStoryPaths.includes(route)) assert.match(html, /name="robots" content="[^"]*noindex/i, `${route} stays excluded until publication`);
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
const robotsBody = await robots.text();
assert.match(robotsBody, /Allow: \//);
assert.doesNotMatch(robotsBody, /Disallow: \//);
if (environment === "production") assert.match(robotsBody, /Sitemap: https:\/\/cryptitaplays.com\/sitemap.xml/);
else assert.match(robots.headers.get("x-robots-tag") || "", /noindex/);
const sitemap = await fetch(origin + "/sitemap.xml");
assert.equal(sitemap.status, 200);
assert.match(sitemap.headers.get("content-type") || "", /application\/xml/);
const sitemapBody = await sitemap.text();
const sitemapUrls = [...sitemapBody.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.ok(sitemapUrls.length > 0, "Sitemap contains URLs");
assert.equal(sitemapUrls.length, new Set(sitemapUrls).size, "Sitemap has no duplicates");
for (const url of sitemapUrls) {
  assert.ok(url.startsWith("https://cryptitaplays.com/"), "Sitemap uses production canonical host");
  assert.ok(!["/404", "/donate", ...excludedStoryPaths].includes(new URL(url).pathname), "Sitemap excludes redirects, errors, drafts and empty story hub");
  const page = await fetch(origin + new URL(url).pathname, { redirect: "manual" });
  assert.equal(page.status, 200, url);
  const html = await page.text();
  assert.doesNotMatch(html, /name="robots" content="[^"]*noindex/i, url);
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `Canonical matches sitemap: ${url}`);
}
if (environment === "production") {
  for (const alternate of ["http://cryptitaplays.com", "http://www.cryptitaplays.com", "https://www.cryptitaplays.com", origin]) {
    const redirect = await fetch(alternate + "/contact/?keep=1", { redirect: "manual" });
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get("location"), origin + "/contact?keep=1");
  }
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
const optimizedPaths = [...(await assetReferences()).keys()].filter(path => path.startsWith("/images/optimized/"));
for (const path of optimizedPaths) {
  const response = await fetch(origin + path, { signal: AbortSignal.timeout(30_000) });
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type") || "", /image\/webp/, path);
  const expected = await readFile(`client/public${path}`);
  const received = Buffer.from(await response.arrayBuffer());
  assert.equal(createHash("sha256").update(received).digest("hex"), createHash("sha256").update(expected).digest("hex"), `${path} checksum`);
}
for (const weight of [400, 500, 600, 700, 800]) {
  const path = `/fonts/poppins/poppins-latin-${weight}.woff2`;
  const response = await fetch(origin + path, { signal: AbortSignal.timeout(30_000) });
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type") || "", /font\/woff2/, path);
  const expected = await readFile(`client/public${path}`);
  const received = Buffer.from(await response.arrayBuffer());
  assert.equal(createHash("sha256").update(received).digest("hex"), createHash("sha256").update(expected).digest("hex"), `${path} checksum`);
}
const result = {
  fonts: 5,
  environment,
  origin,
  verifiedAt: new Date().toISOString(),
  routes: paths.length,
  assets: count,
  optimizedAssets: optimizedPaths.length,
  fullChecksums: process.argv.includes("--full"),
  passed: true,
};
console.log(JSON.stringify(result));
if (process.argv.includes("--full"))
  await writeFile(
    `docs/cloudflare/verification-${environment}.json`,
    JSON.stringify(result, null, 2) + "\n"
  );
