import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { canonicalRedirect, robotsText, sitemapPaths, sitemapXml, staticPagePaths } from "../workers/seo.ts";
import worker from "../workers/app.ts";

test("production normalization preserves deep paths and queries in one permanent redirect", async () => {
  for (const input of [
    "http://cryptitaplays.com/initiatives/web3-on-campus/?utm_source=facebook&keep=1",
    "http://www.cryptitaplays.com/initiatives/web3-on-campus/?utm_source=facebook&keep=1",
    "https://www.cryptitaplays.com/initiatives/web3-on-campus/?utm_source=facebook&keep=1",
  ]) {
    const response = await worker.fetch(new Request(input), { ENVIRONMENT: "production" }, {});
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), "https://cryptitaplays.com/initiatives/web3-on-campus?utm_source=facebook&keep=1");
  }
  assert.equal(canonicalRedirect(new URL("https://cryptitaplays.com/"), true), null);
  assert.equal(canonicalRedirect(new URL("https://cryptitaplays.com/contact"), true), null);
  assert.equal(canonicalRedirect(new URL("http://cryptitaplays.org/contact/"), true), null);
  assert.equal(canonicalRedirect(new URL("http://staging.cryptitaplays.com/contact/"), false), null);
});

test("sitemap static inventory tracks public route configuration and excludes special routes", async () => {
  const source = await readFile("client/routes.ts", "utf8");
  const staticRoutes = [...source.matchAll(/route\("([^"*:]+)"/g)]
    .map(match => `/${match[1]}`).filter(path => !["/404", "/donate"].includes(path));
  assert.deepEqual([...staticPagePaths].sort(), ["/", ...staticRoutes].sort());
  const paths = sitemapPaths();
  assert.equal(paths.length, new Set(paths).size);
  assert.ok(paths.includes("/initiatives/web3-on-campus"));
  assert.ok(!paths.includes("/404"));
  assert.ok(!paths.includes("/donate"));
  assert.ok(!paths.includes("/stories/what-responsible-web3-education-looks-like"));
  assert.ok(paths.every(path => !/[?#]/.test(path)));
  const xml = sitemapXml();
  assert.match(xml, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  assert.equal([...xml.matchAll(/<loc>/g)].length, paths.length);
  assert.ok(!xml.includes("<lastmod>"));
});

test("production sitemap and robots are readable; staging can be crawled to discover noindex", async () => {
  for (const environment of ["production", "staging"]) {
    for (const route of ["robots.txt", "sitemap.xml"]) {
      const response = await worker.fetch(new Request(`https://cryptitaplays.com/${route}`), { ENVIRONMENT: environment }, {});
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("x-robots-tag"), environment === "production" ? null : "noindex, nofollow, noarchive");
      if (route === "robots.txt") assert.equal(await response.text(), robotsText(environment === "production"));
      else {
        assert.match(response.headers.get("content-type"), /application\/xml/);
        assert.equal(await response.text(), sitemapXml());
      }
      const head = await worker.fetch(new Request(`https://cryptitaplays.com/${route}`, { method: "HEAD" }), { ENVIRONMENT: environment }, {});
      assert.equal(head.status, 200);
      assert.equal(await head.text(), "");
    }
  }
  assert.match(robotsText(true), /Sitemap: https:\/\/cryptitaplays.com\/sitemap.xml/);
  assert.ok(!robotsText(false).includes("Disallow:"));
  assert.ok(!robotsText(false).includes("Sitemap:"));
});

test("story hub enters sitemap only when a story is published", () => {
  const draft = { slug: "draft-update", publicationStatus: "draft" };
  for (const stories of [[], [draft]]) {
    assert.ok(!sitemapPaths(stories).includes("/stories"));
    assert.ok(!sitemapPaths(stories).includes("/stories/draft-update"));
  }
  const published = sitemapPaths([draft, { slug: "first-update", publicationStatus: "published" }]);
  assert.ok(published.includes("/stories"));
  assert.ok(published.includes("/stories/first-update"));
  assert.ok(!published.includes("/stories/draft-update"));
});
