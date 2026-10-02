import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { SiteFooter } from "../components/SiteFooter";
import { stories } from "../content/stories";

export default function Stories() {
  return <div className="site-shell editorial-shell">
    <header className="site-header site-header-solid"><div className="container nav-inner"><Link to="/" className="brand-lockup" aria-label="Cryptita Plays home"><img src="/brand/cryptita-plays-banner.png" alt="Cryptita Plays" className="brand-logo" /></Link><nav className="desktop-nav" aria-label="Main navigation"><Link to="/initiatives">Initiatives</Link><Link to="/stories" aria-current="page">Field Notes &amp; Events</Link><Link to="/donate" className="nav-donate">Support us <ArrowRight /></Link></nav></div></header>
    <main>
      <section className="editorial-listing-intro section-padding"><div className="container"><div className="chapter-label"><span className="chapter-dot" /> Field Notes &amp; Events</div><h1>Ideas, people, and moments worth sharing.</h1><p>Stories from our learning programs, community, and the wider world of emerging technology.</p></div></section>
      <section className="editorial-listing section-padding"><div className="container"><div className="editorial-card-grid">{stories.map((story) => <article className="editorial-card" key={story.slug}><Link to={`/stories/${story.slug}`} className="editorial-card-link" aria-label={`Read ${story.title}`}><div className="editorial-card-image"><img src={story.heroImage} alt={story.imageAlt || ""} loading="lazy" /></div><div className="editorial-card-content"><span className="editorial-card-category">{story.category}</span><h2>{story.title}</h2><p>{story.summary}</p><span className="editorial-card-cta">Read story <ArrowRight /></span></div></Link></article>)}</div></div></section>
    </main><SiteFooter />
  </div>;
}
