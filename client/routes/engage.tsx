import { pageMeta } from "../src/lib/seo";
import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return pageMeta({
    path: "/engage",
    title: "Engage with Us — Cryptita Plays",
    description: "Explore education, community, learning-resource, and program-support partnerships with Cryptita Plays.",
  });
}

export default function EngageRoute() {
  return <InformationPage page="engage" />;
}
