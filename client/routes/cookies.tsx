import { pageMeta } from "../src/lib/seo";
import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return pageMeta({
    path: "/cookies",
    title: "Cookie Policy — Cryptita Plays",
    description: "Current cookie and browser-storage practices for the Cryptita Plays website.",
  });
}

export default function CookiesRoute() {
  return <InformationPage page="cookies" />;
}
