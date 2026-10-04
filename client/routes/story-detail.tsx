import { pageMeta } from "../src/lib/seo";
import { StoryDetail } from "../src/pages/EditorialDetail";
import { stories } from "../src/content/stories";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";

export function loader({ params }: LoaderFunctionArgs) {
  return new Response(null, { status: stories.some(story => story.slug === params.slug) ? 200 : 404 });
}

export const meta: MetaFunction = ({ params }) => {
  const story = stories.find(item => item.slug === params.slug);
  return story
    ? [
        ...pageMeta({ path: `/stories/${story.slug}`, title: `${story.title} — Cryptita Plays`, description: story.summary, image: story.heroImage, imageAlt: story.imageAlt }),
        ...(story.publicationStatus === "draft" ? [{ name: "robots", content: "noindex" }] : []),
      ]
    : [{ title: "Story not found — Cryptita Plays" }, { name: "robots", content: "noindex" }];
};
export default StoryDetail;
