import { pageMeta } from "../src/lib/seo";
import { InitiativeDetail } from "../src/pages/EditorialDetail";
import { initiativeBySlug } from "../src/content/initiatives";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";

export function loader({ params }: LoaderFunctionArgs) {
  return new Response(null, { status: initiativeBySlug[params.slug || ""] ? 200 : 404 });
}

export const meta: MetaFunction = ({ params }) => {
  const item = initiativeBySlug[params.slug || ""];
  return item
    ? pageMeta({ path: `/initiatives/${item.slug}`, title: `${item.title} — Cryptita Plays`, description: item.summary, image: item.heroImage, imageAlt: item.imageAlt })
    : [{ title: "Initiative not found — Cryptita Plays" }, { name: "robots", content: "noindex" }];
};
export default InitiativeDetail;
