import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return [
    { title: "Terms of Use — Cryptita Plays" },
    { name: "description", content: "Terms for using the Cryptita Plays website and its educational information." },
  ];
}

export default function TermsRoute() {
  return <InformationPage page="terms" />;
}
