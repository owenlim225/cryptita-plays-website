import { readdir, readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import path from "node:path";

export async function files(directory) {
  const result = [];
  const entries = await readdir(directory, { withFileTypes: true }).catch(error => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  for (const item of entries) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) result.push(...await files(file));
    else if (item.isFile()) result.push(file);
  }
  return result;
}

export const contentTypes = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml",
  ".gif": "image/gif", ".ico": "image/x-icon", ".mp4": "video/mp4",
  ".webm": "video/webm", ".nef": "image/x-nikon-nef", ".pdf": "application/pdf",
};

export async function assetReferences() {
  const references = new Map();
  for (const file of (await files("client")).filter(f => /\.(tsx?|css)$/.test(f))) {
    const text = await readFile(file, "utf8");
    const pattern = /(["'`])((?:\/(?:images|brand|media)\/|\/favicon\.ico)[^"'`\r\n]*)\1/g;
    for (const match of text.matchAll(pattern)) {
      const sources = references.get(match[2]) || [];
      sources.push(file.replaceAll("\\", "/"));
      references.set(match[2], [...new Set(sources)]);
    }
  }
  return references;
}

export async function inventory() {
  const references = await assetReferences();
  const notes = JSON.parse(await readFile("client/public/media/inventory.json", "utf8"));
  const approvals = JSON.parse(await readFile("docs/cloudflare/media-approvals.json", "utf8"));
  const records = [];
  for (const root of ["client/public", "assets"]) {
    for (const file of await files(root)) {
      const extension = path.extname(file).toLowerCase();
      if (!contentTypes[extension]) continue;
      const publicPath = root === "client/public" ? "/" + path.relative(root, file).replaceAll("\\", "/") : null;
      const hash = createHash("sha256");
      for await (const chunk of createReadStream(file)) hash.update(chunk);
      const note = notes.assets.find(asset => asset.path === publicPath);
      const sources = references.get(publicPath) || [];
      const sha256 = hash.digest("hex");
      records.push({
        source: file.replaceAll("\\", "/"), publicPath,
        bytes: (await stat(file)).size, contentType: contentTypes[extension],
        sha256, references: sources,
        publicationPermission: approvals.sha256.includes(sha256) ? `Owner approved currently displayed site assets on ${approvals.approvedOn}` : "Unreviewed; do not publish automatically",
        credit: note?.credit || "Unrecorded; confirm preferred attribution",
        inventoryNote: note || null,
        migrationStatus: sources.length ? "Pending upload and validation" : "Excluded pending review",
      });
    }
  }
  const missing = [...references.keys()].filter(p => !records.some(r => r.publicPath === p));
  const unavailableInventoryEntries = notes.assets.filter(note => !records.some(record => record.publicPath === note.path));
  return { schemaVersion: 1, records, missing, unavailableInventoryEntries };
}
