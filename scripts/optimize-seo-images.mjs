import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const outputDirectory = "client/public/images/optimized";
const approvals = JSON.parse(await readFile("docs/cloudflare/media-approvals.json", "utf8"));
const jobs = [
  { source: "media/initiatives/web3-on-campus/DSC_5578.JPG", name: "web3-campus", widths: [640, 1280] },
  { source: "media/initiatives/mini-library/20260609_111450.jpg", name: "mini-library", widths: [640, 1280] },
  { source: "brand/cryptita-mark.png", name: "cryptita-mark", widths: [160, 640], lossless: true },
  { source: "brand/cryptita-plays-banner.png", name: "cryptita-banner", widths: [640, 1280], lossless: true },
  { source: "images/learning-event.jpg", name: "learning-event", widths: [640, 1280] },
];
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const rows = [];
await mkdir(outputDirectory, { recursive: true });
for (const job of jobs) {
  const sourcePath = `client/public/${job.source}`;
  const original = await readFile(sourcePath);
  const sourceHash = hash(original);
  if (!approvals.sha256.includes(sourceHash)) throw new Error(`Source has no recorded publication approval: ${sourcePath}`);
  const metadata = await sharp(original).metadata();
  for (const width of job.widths) {
    const filename = `${job.name}-${width}.webp`;
    const { data, info } = await sharp(original)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6, lossless: job.lossless ?? false })
      .toBuffer({ resolveWithObject: true });
    await writeFile(`${outputDirectory}/${filename}`, data);
    rows.push({ source: job.source, sourceHash, sourceBytes: original.length, sourceDimensions: `${metadata.width}×${metadata.height}`, path: `/images/optimized/${filename}`, width: info.width, height: info.height, bytes: data.length, sha256: hash(data) });
  }
  if (hash(await readFile(sourcePath)) !== sourceHash) throw new Error(`Original changed during optimization: ${sourcePath}`);
}
const report = `# SEO image derivatives\n\nGenerated with Sharp ${sharp.versions.sharp}; photo WebP quality 82, effort 6; brand WebP lossless. EXIF orientation is applied, aspect ratio and transparency retained, with no crop, enlargement, or generative edits. Original source bytes are preserved and checked against the existing approved hashes.\n\nRun: \`node scripts/optimize-seo-images.mjs\`. Sharp must be available in the local Node environment (currently installed).\n\n| Original | Original dimensions | Original bytes | Derivative | Dimensions | Bytes | Reduction | SHA-256 |\n| --- | --- | ---: | --- | --- | ---: | ---: | --- |\n` + rows.map(row => `| ${row.source} | ${row.sourceDimensions} | ${row.sourceBytes} | ${row.path} | ${row.width}×${row.height} | ${row.bytes} | ${(100 * (1 - row.bytes / row.sourceBytes)).toFixed(1)}% | ${row.sha256} |`).join("\n") + `\n\n## Integration\n\nUse the 640/1280 photo pairs with explicit responsive srcSet and sizes; use the 1280 file as desktop fallback. Keep current alternative text. Set intrinsic width/height to reserve the aspect ratio. Use the 160 mark for small navigation/footer placement and the 640 mark where a larger logo is needed; banner 640/1280 preserves lettering and transparency losslessly. Use learning-event-1280.webp for the hero video poster.\n\nThese paths are inside /images/ and are recognized by the existing media reference scanner. Register derivative hashes under the current authorized performance work, then reference them directly so the existing Cloudflare build bundles these small files. No R2 upload or original-map replacement is required. Do not remove original sources or R2 assets: detail galleries and rollback still use them.\n\nThis script intentionally does not change component references, the R2 asset map, approval records, or deployed assets.\n`;
await writeFile("docs/seo-image-optimization.md", report);
console.log(JSON.stringify(rows, null, 2));
