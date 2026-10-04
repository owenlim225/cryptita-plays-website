import type { MetaDescriptor } from "react-router";

export const SITE_URL = "https://cryptitaplays.com";
export const SITE_NAME = "Cryptita Plays";
export const OFFICIAL_SOCIAL_URLS = [
  "https://www.facebook.com/cryptitaplays",
  "https://x.com/cryptitaplays",
  "https://www.instagram.com/cryptitaplays/",
  "https://www.linkedin.com/company/cryptitaplays/",
  "https://t.me/cryptitaplays",
];

/** Keep query parameters and fragments out of canonical content URLs. */
export function canonicalUrl(path: string): string {
  const pathname = new URL(path, `${SITE_URL}/`).pathname.replace(/\/+$/, "") || "/";
  return `${SITE_URL}${pathname}`;
}

type PageMetadata = {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
};

export function pageMeta({ path, title, description, image = "/brand/cryptita-mark.png", imageAlt = SITE_NAME, noindex = false }: PageMetadata): MetaDescriptor[] {
  const url = canonicalUrl(path);
  const imageUrl = new URL(image, `${SITE_URL}/`).href;
  return [
    { title },
    { name: "description", content: description },
    ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_PH" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@cryptitaplays" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
  ];
}

export const identityMeta: MetaDescriptor = {
  "script:ld+json": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/brand/cryptita-mark.png`,
        sameAs: OFFICIAL_SOCIAL_URLS,
      },
    ],
  },
};
