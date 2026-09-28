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

const [home, donate, explicit404, missing] = await Promise.all([
  readRoute("/"),
  readRoute("/donate"),
  readRoute("/404"),
  readRoute("/this-page-does-not-exist"),
]);

assert.equal(home.status, 200, "Home should return HTTP 200");
assert.equal(donate.status, 200, "Donate should return HTTP 200");
assert.equal(explicit404.status, 404, "/404 should return HTTP 404");
assert.equal(missing.status, 404, "Unknown routes should return HTTP 404");

for (const [name, page] of [["Home", home], ["Donate", donate]]) {
  assert.match(page.html, /<h1\b/i, `${name} should have a server-rendered heading`);
  assert.match(page.html, /<meta\s+name="description"/i, `${name} should have a description`);
}

const title = (html) => html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
assert.ok(title(home.html), "Home should have a title");
assert.ok(title(donate.html), "Donate should have a title");
assert.notEqual(title(home.html), title(donate.html), "Public routes need distinct titles");

console.log("Route smoke checks passed: /, /donate, /404, and unknown path.");
