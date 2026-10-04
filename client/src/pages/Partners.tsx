import { brandBanner } from "../lib/responsive-images";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router";
import { SiteFooter } from "../components/SiteFooter";
import { useScrolledHeader } from "../hooks/useScrolledHeader";
import { communityPartners, educationalPartners, universityPartners, placesReached } from "../data/partners";

const partnerGroups = [
  { id: "educational-partners", title: "Educational Partners", partners: educationalPartners },
  { id: "community-partners", title: "Community Partners", partners: communityPartners.filter((partner) => partner.name !== "UPHSL GDC") },
  { id: "university-partners", title: "University / Student Organization Partners", partners: [...universityPartners, ...communityPartners.filter((partner) => partner.name === "UPHSL GDC")] },
];

function Header() {
  const isScrolled = useScrolledHeader();
  return <header className={`site-header site-header-solid ${isScrolled ? "is-scrolled" : ""}`}><div className="container nav-inner"><Link to="/" className="brand-lockup" aria-label="Cryptita Plays home"><img {...brandBanner} alt="Cryptita Plays" className="brand-logo" /></Link><nav className="desktop-nav" aria-label="Main navigation"><Link to="/initiatives">Initiatives</Link><Link to="/partners" aria-current="page">Partners</Link><Link to="/stories">Field Notes &amp; Events</Link><Link to="/contact" className="nav-donate">Contact us <ArrowRight /></Link></nav></div></header>;
}

export default function Partners() {
  return <div className="site-shell"><Header /><main>
    <section className="partner-directory section-padding" id="partner-directory" aria-label="Partner directory">
      <h1 className="sr-only">Our partners</h1>
      {partnerGroups.map((group) => (
        <section className="container partner-group" key={group.id} aria-labelledby={group.id}>
          <h2 id={group.id}>{group.title}</h2>
          <div className="partners-grid">
            {group.partners.map((partner) => (
              <article className="partner-card" key={partner.name}>
                <div className="partner-card__logo"><img src={partner.logo} alt="" loading="lazy" /></div>
                <h3>{partner.name}</h3>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
    <section className="places-section section-padding"><div className="container"><div className="places-heading"><div className="section-heading"><div className="chapter-label"><span className="chapter-dot" /> Out in the community</div><h2>Places where<br /><em>learning showed up.</em></h2><p>A growing photo journal of campus sessions and community learning. School and location names will be added as they’re confirmed.</p></div><span className="places-count">{String(placesReached.length).padStart(2, "0")} <small>field moments</small></span></div><div className="places-grid">{placesReached.map((place, index) => <figure className="place-card" key={place.src}><img src={place.src} alt={place.alt} loading="lazy" /><figcaption><span>{String(index + 1).padStart(2, "0")} / {place.program}</span><strong>{place.label}</strong><small><MapPin aria-hidden="true" /> Location details coming soon</small></figcaption></figure>)}</div></div></section>
    <section className="partner-invite"><div className="container partner-invite__inner"><div><div className="chapter-label chapter-label-light"><span className="chapter-dot" /> Help complete the directory</div><h2>Know a place<br />we’ve reached?</h2><p>Send the name, category, location, link, logo or photos, and a short note about the activity. We’ll add it here.</p></div><a className="button button-light" href="mailto:cryptitaplays@gmail.com?subject=Partners%20and%20Places%20Directory">Send partner details <ArrowRight /></a></div></section>
  </main><SiteFooter /></div>;
}
