import { pageMeta } from "../src/lib/seo";
import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return pageMeta({
    path: "/faq",
    title: "FAQ — Cryptita Plays",
    description: "Answers about Cryptita Plays, its education-first mission, programs, and ways to connect.",
  });
}

export default function FAQRoute() {
  return <InformationPage page="faq" />;
}
