import { pageMeta } from "../src/lib/seo";
import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return pageMeta({
    path: "/privacy",
    title: "Privacy Policy — Cryptita Plays",
    description: "How the Cryptita Plays website handles information sent through site visits and email inquiries.",
  });
}

export default function PrivacyRoute() {
  return <InformationPage page="privacy" />;
}
