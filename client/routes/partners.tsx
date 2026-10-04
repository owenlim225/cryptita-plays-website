import type { Route } from "./+types/partners";
import Partners from "../src/pages/Partners";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Partners & Places Reached — Cryptita Plays" },
    { name: "description", content: "Meet the community, education, and university partners helping Cryptita Plays bring learning to more people." },
  ];
}

export default Partners;
