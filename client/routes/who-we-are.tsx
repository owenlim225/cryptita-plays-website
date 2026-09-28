import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return [
    { title: "Who We Are — Cryptita Plays" },
    { name: "description", content: "Meet Cryptita Plays, a community-driven initiative bridging Web3 education and social development in the Philippines." },
  ];
}

export default function WhoWeAreRoute() {
  return <InformationPage page="who-we-are" />;
}
