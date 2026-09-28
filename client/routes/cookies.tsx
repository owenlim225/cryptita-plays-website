import { InformationPage } from "../src/pages/InformationPage";

export function meta() {
  return [
    { title: "Cookie Policy — Cryptita Plays" },
    { name: "description", content: "Current cookie and browser-storage practices for the Cryptita Plays website." },
  ];
}

export default function CookiesRoute() {
  return <InformationPage page="cookies" />;
}
