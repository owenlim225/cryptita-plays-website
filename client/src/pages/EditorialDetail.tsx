import { Link, useParams } from "react-router";
import { EditorialArticle } from "../components/editorial/EditorialArticle";
import { initiativeBySlug } from "../content/initiatives";
import { stories } from "../content/stories";
import { SiteFooter } from "../components/SiteFooter";

function MissingStory({ kind }: { kind: "initiative" | "story" }) {
  return <div className="site-shell"><main className="editorial-missing container"><div className="chapter-label"><span className="chapter-dot" /> Page not found</div><h1>We couldn’t find that {kind}.</h1><p>It may have moved, or its address may be incomplete.</p><Link to={kind === "initiative" ? "/initiatives" : "/stories"} className="text-link">Back to {kind === "initiative" ? "initiatives" : "Field Notes & Events"}</Link></main><SiteFooter /></div>;
}

export function InitiativeDetail() {
  const { slug = "" } = useParams();
  const item = initiativeBySlug[slug];
  if (!item) return <MissingStory kind="initiative" />;
  return <EditorialArticle story={item} backHref="/initiatives" backLabel="All initiatives" />;
}

export function StoryDetail() {
  const { slug = "" } = useParams();
  const story = stories.find((item) => item.slug === slug);
  if (!story) return <MissingStory kind="story" />;
  return <EditorialArticle story={story} backHref="/stories" backLabel="Field Notes & Events" listingHref="/stories" />;
}
