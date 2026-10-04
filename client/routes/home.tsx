import { pageMeta, identityMeta } from "../src/lib/seo";
import Home from "../src/pages/Home";

export function meta() {
  return [...pageMeta({
    path: "/",
    title: "Cryptita Plays | Web3 Education and Social Impact",
    description: "Cryptita Plays makes digital literacy, blockchain awareness, and future-ready education accessible to underserved communities in the Philippines.",
  }), identityMeta];
}

export default Home;
