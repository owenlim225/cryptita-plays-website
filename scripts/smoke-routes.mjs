#!/usr/bin/env node

import assert from "node:assert/strict";

const baseUrl = process.argv[2];
if (!baseUrl) {
  console.error("Usage: node scripts/smoke-routes.mjs <base-url>");
  process.exit(2);
}

async function readRoute(path) {
  const response = await fetch(new URL(path, baseUrl), { redirect: "manual" });
  return { status: response.status, html: await response.text() };
}

const title = (html) => html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
const publicPaths = ["/", "/contact", "/faq", "/who-we-are", "/engage", "/initiatives", "/partners", "/stories", "/terms", "/privacy", "/cookies"];
const publicPages = await Promise.all(publicPaths.map(readRoute));
const titles = new Set();

for (const [index, page] of publicPages.entries()) {
  const path = publicPaths[index];
  assert.equal(page.status, 200, `${path} should return HTTP 200`);
  assert.match(page.html, /<h1\b/i, `${path} should have a server-rendered heading`);
  assert.match(page.html, /<meta\s+name="description"/i, `${path} should have a description`);
  assert.ok(title(page.html), `${path} should have a title`);
  assert.ok(!titles.has(title(page.html)), `${path} should have a distinct title`);
  titles.add(title(page.html));
}

const oldDonationRoute = await fetch(new URL("/donate", baseUrl), { redirect: "manual" });
assert.equal(oldDonationRoute.status, 301, "The former donation URL should redirect");
assert.equal(oldDonationRoute.headers.get("location"), "/contact");

for (const path of ["/404", "/this-page-does-not-exist", "/initiatives/does-not-exist", "/stories/does-not-exist"]) {
  const page = await readRoute(path);
  assert.equal(page.status, 404, `${path} should return HTTP 404`);
  assert.match(page.html, /<meta\s+name="robots"\s+content="noindex"/i, `${path} should not be indexed`);
}

const heroImage = await fetch(new URL("/images/learning-event.jpg", baseUrl), { method: "HEAD" });
assert.equal(heroImage.status, 200, "The public hero image should be available");
assert.match(heroImage.headers.get("content-type") ?? "", /^image\//i, "The hero asset should be an image");

console.log(`Route smoke checks passed: ${publicPaths.length} public routes, 404 responses, and hero image.`);
