import { StoryDetail } from "../src/pages/EditorialDetail";
import { stories } from "../src/content/stories";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";

export function loader({ params }: LoaderFunctionArgs) {
  return new Response(null, { status: stories.some(story => story.slug === params.slug) ? 200 : 404 });
}

export const meta: MetaFunction = ({ params }) => {
  const story = stories.find(item => item.slug === params.slug);
  return story
    ? [{ title: `${story.title} — Cryptita Plays` }, { name: "description", content: story.summary }]
    : [{ title: "Story not found — Cryptita Plays" }, { name: "robots", content: "noindex" }];
};
export default StoryDetail;
