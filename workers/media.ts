export type MediaAsset = { key: string; sha256: string; bytes: number; contentType: string };

export async function serveMedia(request: Request, bucket: R2Bucket, asset: MediaAsset): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const etag = `"${asset.sha256}"`;
  const headers = new Headers({
    "Content-Type": asset.contentType,
    "Cache-Control": "public, max-age=3600",
    "ETag": etag,
    "Accept-Ranges": "bytes",
    "X-Media-Store": "r2",
  });
  const noneMatch = request.headers.get("If-None-Match");
  if (noneMatch?.split(",").some(value => value.trim().replace(/^W\//, "") === etag || value.trim() === "*")) {
    return new Response(null, { status: 304, headers });
  }
  const ifMatch = request.headers.get("If-Match");
  if (ifMatch && !ifMatch.split(",").some(value => value.trim() === etag || value.trim() === "*")) {
    return new Response(null, { status: 412, headers });
  }
  let range: { offset: number; length: number } | undefined;
  const rangeHeader = request.headers.get("Range");
  const ifRange = request.headers.get("If-Range");
  if (request.method === "GET" && rangeHeader && (!ifRange || ifRange === etag)) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
    if (match && (match[1] || match[2])) {
      const start = match[1] ? Number(match[1]) : Math.max(0, asset.bytes - Number(match[2]));
      const end = match[1] && match[2] ? Math.min(Number(match[2]), asset.bytes - 1) : asset.bytes - 1;
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= asset.bytes || start > end) {
        headers.set("Content-Range", `bytes */${asset.bytes}`);
        return new Response(null, { status: 416, headers });
      }
      range = { offset: start, length: end - start + 1 };
      headers.set("Content-Range", `bytes ${start}-${end}/${asset.bytes}`);
    }
  }
  if (request.method === "HEAD") {
    const object = await bucket.head(asset.key);
    if (!object) return new Response("Media not found", { status: 404, headers: { "Cache-Control": "no-store" } });
    headers.set("Content-Length", String(asset.bytes));
    headers.set("Last-Modified", object.uploaded.toUTCString());
    return new Response(null, { headers });
  }
  const object = await bucket.get(asset.key, { range });
  if (!object) return new Response("Media not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  headers.set("Content-Length", String(range?.length ?? asset.bytes));
  headers.set("Last-Modified", object.uploaded.toUTCString());
  return new Response(object.body, { status: range ? 206 : 200, headers });
}
