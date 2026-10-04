import { pageMeta } from "../src/lib/seo";
import type { Route } from "./+types/partners";
import Partners from "../src/pages/Partners";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    path: "/partners",
    title: "Partners & Places Reached — Cryptita Plays",
    description: "Meet the community, education, and university partners helping Cryptita Plays bring learning to more people.",
  });
}

export default Partners;
