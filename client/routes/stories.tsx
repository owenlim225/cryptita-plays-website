import { pageMeta } from "../src/lib/seo";
import Stories from "../src/pages/Stories";
import { stories } from "../src/content/stories";
export function meta() { return pageMeta({
    path: "/stories",
    title: "Field Notes & Events — Cryptita Plays",
    description: "Stories from Cryptita Plays learning programs, community, and emerging technology.",
    noindex: !stories.some((story) => story.publicationStatus !== "draft"),
  }); }
export default Stories;
