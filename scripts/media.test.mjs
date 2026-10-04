import test from "node:test";
import assert from "node:assert/strict";
import { serveMedia } from "../workers/media.ts";

const bytes = new TextEncoder().encode("0123456789abcdef");
const asset = { key: "sha256/example.png", sha256: "example", bytes: bytes.length, contentType: "image/png" };
const metadata = { uploaded: new Date("2026-10-04T00:00:00Z") };
const bucket = {
  async head() { return metadata; },
  async get(key, options) {
    assert.equal(key, asset.key);
    const range = options.range;
    return { ...metadata, body: range ? bytes.slice(range.offset, range.offset + range.length) : bytes };
  },
};
const request = (headers, method = "GET") => new Request("https://cryptitaplays.com/test.png", { method, headers });

test("full and HEAD reads expose MIME, length, and cache metadata", async () => {
  const response = await serveMedia(request(), bucket, asset);
  assert.equal(await response.text(), "0123456789abcdef");
  assert.equal(response.headers.get("content-type"), "image/png");
  assert.equal(response.headers.get("content-length"), "16");
  assert.equal(response.headers.get("cache-control"), "public, max-age=3600");
  assert.equal(await (await serveMedia(request({}, "HEAD"), bucket, asset)).text(), "");
});
test("prefix, suffix, and open-ended ranges support resumable reads", async () => {
  for (const [range, text] of [["bytes=0-3", "0123"], ["bytes=-4", "cdef"], ["bytes=12-", "cdef"]]) {
    const response = await serveMedia(request({ Range: range }), bucket, asset);
    assert.equal(response.status, 206);
    assert.equal(await response.text(), text);
    assert.equal(response.headers.get("content-length"), "4");
  }
});
test("invalid ranges, preconditions, and missing objects have correct status", async () => {
  assert.equal((await serveMedia(request({ Range: "bytes=16-" }), bucket, asset)).status, 416);
  assert.equal((await serveMedia(request({ Range: "bytes=-0" }), bucket, asset)).status, 416);
  assert.equal((await serveMedia(request({ "If-Match": '"other"' }), bucket, asset)).status, 412);
  assert.equal((await serveMedia(request({ "If-None-Match": 'W/"example"' }), bucket, asset)).status, 304);
  assert.equal((await serveMedia(request({ Range: "bytes=0-3", "If-Range": '"other"' }), bucket, asset)).status, 200);
  assert.equal((await serveMedia(request(), { get: async () => null }, asset)).status, 404);
});
test("public media route rejects writes", async () => {
  const result = await serveMedia(request({}, "DELETE"), bucket, asset);
  assert.equal(result.status, 405);
  assert.equal(result.headers.get("allow"), "GET, HEAD");
});
