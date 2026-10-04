import { describe, expect, it, vi } from "vitest";
import { canonicalUrl, identityMeta, OFFICIAL_SOCIAL_URLS, pageMeta } from "./seo";
import { meta as storiesMeta } from "../../routes/stories";
import { stories } from "../content/stories";

vi.mock("../pages/Stories", () => ({ default: () => null }));

describe("production SEO metadata", () => {
  it("makes the empty story hub indexable when its first story is published", () => {
    const originalStories = [...stories];
    try {
      stories.splice(0, stories.length, { ...originalStories[0], publicationStatus: "draft" });
      expect(storiesMeta()).toContainEqual({ name: "robots", content: "noindex" });
      stories[0] = { ...stories[0], publicationStatus: "published" };
      expect(storiesMeta()).not.toContainEqual({ name: "robots", content: "noindex" });
    } finally {
      stories.splice(0, stories.length, ...originalStories);
    }
  });

  it("normalizes content URLs without carrying tracking or alternate hosts", () => {
    expect(canonicalUrl("/")).toBe("https://cryptitaplays.com/");
    expect(canonicalUrl("/initiatives/web3-on-campus/?utm_source=facebook#photos"))
      .toBe("https://cryptitaplays.com/initiatives/web3-on-campus");
    expect(canonicalUrl("https://preview.example/stories?ref=test"))
      .toBe("https://cryptitaplays.com/stories");
  });

  it("uses one canonical and absolute image URLs for distinct content", () => {
    const meta = pageMeta({ path: "/initiatives/web3-on-campus", title: "Campus", description: "Campus learning", image: "/images/classroom-session.jpg", imageAlt: "Campus learners" });
    expect(meta.filter(item => "rel" in item && item.rel === "canonical"))
      .toEqual([{ tagName: "link", rel: "canonical", href: "https://cryptitaplays.com/initiatives/web3-on-campus" }]);
    expect(meta).toContainEqual({ property: "og:image", content: "https://cryptitaplays.com/images/classroom-session.jpg" });
    expect(meta).toContainEqual({ property: "og:image:alt", content: "Campus learners" });
    expect(meta).not.toContainEqual({ name: "robots", content: "noindex" });
  });

  it("allows temporary noindex without changing the eventual canonical", () => {
    const page = { path: "/stories", title: "Stories", description: "Program stories" };
    expect(pageMeta({ ...page, noindex: true })).toContainEqual({ name: "robots", content: "noindex" });
    expect(pageMeta({ ...page, noindex: false })).not.toContainEqual({ name: "robots", content: "noindex" });
    expect(pageMeta({ ...page, noindex: true })).toContainEqual({ tagName: "link", rel: "canonical", href: "https://cryptitaplays.com/stories" });
  });

  it("publishes owner-confirmed identity without unsupported nonprofit or address claims", () => {
    const graph = (identityMeta as { "script:ld+json": { "@graph": Record<string, unknown>[] } })["script:ld+json"]["@graph"];
    expect(graph.map(item => item["@type"])).toEqual(["WebSite", "Organization"]);
    expect(graph[1].sameAs).toEqual(OFFICIAL_SOCIAL_URLS);
    expect(OFFICIAL_SOCIAL_URLS).toHaveLength(5);
    expect(OFFICIAL_SOCIAL_URLS[0]).toBe("https://www.facebook.com/cryptitaplays");
    expect(graph[1]).not.toHaveProperty("address");
    expect(graph[1]).not.toHaveProperty("foundingDate");
  });
});
