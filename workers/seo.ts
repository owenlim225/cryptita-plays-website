import { initiatives, stories } from "../client/src/content/initiatives";

export const canonicalOrigin = "https://cryptitaplays.com";

// Keep aligned with the indexable static routes in client/routes.ts.
export const staticPagePaths = [
  "/", "/contact", "/faq", "/who-we-are", "/engage", "/initiatives",
  "/partners", "/stories", "/terms", "/privacy", "/cookies",
];

export function sitemapPaths(storyRecords: Pick<(typeof stories)[number], "slug" | "publicationStatus">[] = stories) {
  const publishedStories = storyRecords.filter(story => story.publicationStatus !== "draft");
  return Array.from(new Set([
    ...staticPagePaths.filter(path => path !== "/stories" || publishedStories.length > 0),
    ...initiatives.map(({ slug }) => `/initiatives/${encodeURIComponent(slug)}`),
    ...publishedStories.map(({ slug }) => `/stories/${encodeURIComponent(slug)}`),
  ]));
}

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, character => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
  })[character]!);
}

export function sitemapXml() {
  // Content has no reliable modification timestamps, so lastmod is omitted.
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    sitemapPaths().map(path => `  <url><loc>${escapeXml(canonicalOrigin + path)}</loc></url>`).join("\n") +
    "\n</urlset>\n";
}

export function canonicalRedirect(url: URL, production: boolean): string | null {
  // Only the two owned production hosts are normalized; staging and .org are untouched.
  if (!production || !["cryptitaplays.com", "www.cryptitaplays.com"].includes(url.hostname)) return null;
  const target = new URL(url);
  target.protocol = "https:";
  target.host = "cryptitaplays.com";
  target.pathname = target.pathname.replace(/\/+$/, "") || "/";
  return target.href === url.href ? null : target.href;
}

export function robotsText(production: boolean) {
  // Crawlers must be allowed to fetch staging pages to see X-Robots-Tag: noindex.
  return "User-agent: *\nAllow: /\n" +
    (production ? `Sitemap: ${canonicalOrigin}/sitemap.xml\n` : "");
}
