import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Link } from "react-router";
import { SiteFooter } from "../components/SiteFooter";
import { useScrolledHeader } from "../hooks/useScrolledHeader";
import { communityPartners, educationalPartners, universityPartners, placesReached } from "../data/partners";

const filters = ["All partners", "Educational", "Community", "University"] as const;
type Filter = (typeof filters)[number];

function Header() {
  const isScrolled = useScrolledHeader();
  return <header className={`site-header site-header-solid ${isScrolled ? "is-scrolled" : ""}`}><div className="container nav-inner"><Link to="/" className="brand-lockup" aria-label="Cryptita Plays home"><img src="/brand/cryptita-plays-banner.png" alt="Cryptita Plays" className="brand-logo" /></Link><nav className="desktop-nav" aria-label="Main navigation"><Link to="/initiatives">Initiatives</Link><Link to="/partners" aria-current="page">Partners</Link><Link to="/stories">Field Notes &amp; Events</Link><Link to="/contact" className="nav-donate">Contact us <ArrowRight /></Link></nav></div></header>;
}

export default function Partners() {
  const [filter, setFilter] = useState<Filter>("All partners");
  const [query, setQuery] = useState("");
  const partners = useMemo(() => [
    ...(filter === "All partners" || filter === "Educational" ? educationalPartners.map((partner) => ({ ...partner, category: "Educational" })) : []),
    ...(filter === "All partners" || filter === "Community" ? communityPartners.map((partner) => ({ ...partner, category: "Community" })) : []),
    ...(filter === "All partners" || filter === "University" ? universityPartners.map((partner) => ({ ...partner, category: "University" })) : []),
  ].filter((partner) => partner.name.toLowerCase().includes(query.trim().toLowerCase())), [filter, query]);

  return <div className="site-shell"><Header /><main>
    <section className="partners-hero"><div className="container partners-hero__inner"><div><div className="chapter-label"><span className="chapter-dot" /> The people beside the work</div><h1>Learning travels<br /><em>further together.</em></h1><p>Meet the organizations, communities, and universities helping open up education and opportunity.</p><a className="button button-light" href="#partner-directory">Explore our partners <ArrowRight /></a></div><div className="partners-hero__photo"><img src="/media/initiatives/web3-on-campus/DSC_5578.JPG" alt="Students taking part in a Web3 On Campus learning session" /><span>Learning together, on campus</span></div></div></section>
    <section className="partner-directory section-padding" id="partner-directory"><div className="container"><div className="section-heading"><div className="chapter-label"><span className="chapter-dot" /> Our network</div><h2>Partners who make<br /><em>the work possible.</em></h2><p>From learning resources to campus workshops, these partners help bring new ideas into reach.</p></div>
      <div className="partner-tools"><div className="partner-filters" role="group" aria-label="Filter partners by category">{filters.map((item) => <button key={item} type="button" className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="partner-search"><Search aria-hidden="true" /><span className="sr-only">Search partners</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search partners" /></label></div>
      {partners.length ? <div className="partners-grid">{partners.map((partner) => <article className="partner-card" key={`${partner.category}-${partner.name}`}><div className="partner-card__logo"><img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" /></div><div className="partner-card__details"><span>{partner.category} partner</span><h3>{partner.name}</h3>{partner.name === "University of Perpetual Help System Laguna" && <p>Official university partner of Cryptita Plays.</p>}</div></article>)}</div> : <p className="partner-empty">No partners match that search yet.</p>}
      <p className="partner-directory__note">Partner details and links will be expanded as the directory is updated.</p>
    </div></section>
    <section className="places-section section-padding"><div className="container"><div className="places-heading"><div className="section-heading"><div className="chapter-label"><span className="chapter-dot" /> Out in the community</div><h2>Places where<br /><em>learning showed up.</em></h2><p>A growing photo journal of campus sessions and community learning. School and location names will be added as they’re confirmed.</p></div><span className="places-count">{String(placesReached.length).padStart(2, "0")} <small>field moments</small></span></div><div className="places-grid">{placesReached.map((place, index) => <figure className="place-card" key={place.src}><img src={place.src} alt={place.alt} loading="lazy" /><figcaption><span>{String(index + 1).padStart(2, "0")} / {place.program}</span><strong>{place.label}</strong><small><MapPin aria-hidden="true" /> Location details coming soon</small></figcaption></figure>)}</div></div></section>
    <section className="partner-invite"><div className="container partner-invite__inner"><div><div className="chapter-label chapter-label-light"><span className="chapter-dot" /> Help complete the directory</div><h2>Know a place<br />we’ve reached?</h2><p>Send the name, category, location, link, logo or photos, and a short note about the activity. We’ll add it here.</p></div><a className="button button-light" href="mailto:cryptitaplays@gmail.com?subject=Partners%20and%20Places%20Directory">Send partner details <ArrowRight /></a></div></section>
  </main><SiteFooter /></div>;
}
