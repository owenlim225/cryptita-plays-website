import { pageMeta } from "../src/lib/seo";
import Initiatives from "../src/pages/Initiatives";

export function meta() {
  return pageMeta({
    path: "/initiatives",
    title: "Initiatives & Programs — Cryptita Plays",
    description: "Explore the education, builder, community, and social-impact initiatives of Cryptita Plays.",
  });
}

export default Initiatives;
