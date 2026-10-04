import { brandBanner } from "../lib/responsive-images";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { SiteFooter } from "../components/SiteFooter";
import { stories } from "../content/stories";

export default function Stories() {
  const publishedStories = stories.filter((story) => story.publicationStatus !== "draft");
  return <div className="site-shell editorial-shell">
    <header className="site-header site-header-solid"><div className="container nav-inner"><Link to="/" className="brand-lockup" aria-label="Cryptita Plays home"><img {...brandBanner} alt="Cryptita Plays" className="brand-logo" /></Link><nav className="desktop-nav" aria-label="Main navigation"><Link to="/initiatives">Initiatives</Link><Link to="/stories" aria-current="page">Field Notes &amp; Events</Link><Link to="/contact" className="nav-donate">Contact us <ArrowRight /></Link></nav></div></header>
    <main>
      <section className="editorial-listing-intro section-padding"><div className="container"><div className="chapter-label"><span className="chapter-dot" /> Field Notes &amp; Events</div><h1>Ideas, people, and moments worth sharing.</h1><p>Stories from our learning programs, community, and the wider world of emerging technology.</p></div></section>
      <section className="editorial-listing section-padding"><div className="container"><div className="editorial-card-grid">{publishedStories.length === 0 && <div><h2>Field notes are on the way.</h2><p>We are preparing verified stories from our programs. In the meantime, explore our initiatives and follow our main Facebook channel for updates.</p><Link to="/initiatives" className="text-link">Explore our initiatives <ArrowRight /></Link><p><a href="https://www.facebook.com/cryptitaplays" target="_blank" rel="noopener noreferrer">Follow Cryptita Plays on Facebook</a></p></div>}{publishedStories.map((story) => <article className="editorial-card" key={story.slug}><Link to={`/stories/${story.slug}`} className="editorial-card-link" aria-label={`Read ${story.title}`}><div className="editorial-card-image"><img src={story.heroImage} alt={story.imageAlt || ""} loading="lazy" /></div><div className="editorial-card-content"><span className="editorial-card-category">{story.category}</span><h2>{story.title}</h2><p>{story.summary}</p><span className="editorial-card-cta">Read story <ArrowRight /></span></div></Link></article>)}</div></div></section>
    </main><SiteFooter />
  </div>;
}
