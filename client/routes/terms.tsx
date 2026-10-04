import { pageMeta } from "../src/lib/seo";
import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return pageMeta({
    path: "/terms",
    title: "Terms of Use — Cryptita Plays",
    description: "Terms for using the Cryptita Plays website and its educational information.",
  });
}

export default function TermsRoute() {
  return <InformationPage page="terms" />;
}
