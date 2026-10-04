import { pageMeta } from "../src/lib/seo";
import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return pageMeta({
    path: "/who-we-are",
    title: "Who We Are — Cryptita Plays",
    description: "Meet Cryptita Plays, a community-driven initiative bridging Web3 education and social development in the Philippines.",
  });
}

export default function WhoWeAreRoute() {
  return <InformationPage page="who-we-are" />;
}
