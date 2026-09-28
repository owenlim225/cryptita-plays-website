import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return [
    { title: "FAQ — Cryptita Plays" },
    { name: "description", content: "Answers about Cryptita Plays, its education-first mission, programs, and ways to connect." },
  ];
}

export default function FAQRoute() {
  return <InformationPage page="faq" />;
}
