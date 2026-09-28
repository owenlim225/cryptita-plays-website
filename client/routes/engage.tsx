import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return [
    { title: "Engage with Us — Cryptita Plays" },
    { name: "description", content: "Explore education, community, learning-resource, and program-support partnerships with Cryptita Plays." },
  ];
}

export default function EngageRoute() {
  return <InformationPage page="engage" />;
}
