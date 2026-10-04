import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { tsImport } from "tsx/esm/api";

export async function generateSeoFiles(directory) {
  const { sitemapXml, robotsText } = await tsImport("../workers/seo.ts", import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "sitemap.xml"), sitemapXml(), "utf8");
  await writeFile(path.join(directory, "robots.txt"), robotsText(true), "utf8");
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await generateSeoFiles("client/public");
  console.log("Generated client/public/sitemap.xml and robots.txt from published content.");
}
