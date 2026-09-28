import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return [
    { title: "Privacy Policy — Cryptita Plays" },
    { name: "description", content: "How the Cryptita Plays website handles information sent through site visits and email inquiries." },
  ];
}

export default function PrivacyRoute() {
  return <InformationPage page="privacy" />;
}
