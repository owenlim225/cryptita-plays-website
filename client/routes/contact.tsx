import { pageMeta } from "../src/lib/seo";
import Contact from "../src/pages/Contact";

export function meta() {
  return pageMeta({
    path: "/contact",
    title: "Contact Us — Cryptita Plays",
    description: "Contact Cryptita Plays founder Arshelene Lingao about donations, partnerships, volunteering, programs, or general questions.",
  });
}

export default Contact;
