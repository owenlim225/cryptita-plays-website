import { brandBanner } from "../lib/responsive-images";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { SiteFooter } from "../components/SiteFooter";
import { useScrolledHeader } from "../hooks/useScrolledHeader";
import { initiatives } from "../content/initiatives";

function Header() {
  const isScrolled = useScrolledHeader();
  return <header className={`site-header site-header-solid ${isScrolled ? "is-scrolled" : ""}`}><div className="container nav-inner"><Link to="/" className="brand-lockup" aria-label="Cryptita Plays home"><img {...brandBanner} alt="Cryptita Plays" className="brand-logo" /></Link><nav className="desktop-nav" aria-label="Main navigation"><Link to="/#programs">Commitments</Link><Link to="/who-we-are">Who we are</Link><Link to="/contact" className="nav-donate">Contact us <ArrowRight /></Link></nav></div></header>;
}

export default function Initiatives() {
  return <div className="site-shell"><Header /><main><section className="initiative-hero section-padding"><div className="container"><Link to="/#programs" className="back-link"><ArrowLeft /> Our commitments</Link><div className="chapter-label"><span className="chapter-dot" /> The work, in full</div><h1>Initiatives &amp; programs</h1><p className="initiative-intro">A connected set of learning, builder, and community programs that makes education and opportunity more accessible.</p><div className="initiative-count"><strong>{initiatives.length}</strong><span>initiatives<br />and programs</span></div></div></section><section className="initiative-directory section-padding"><div className="container"><div className="initiative-grid" role="list">{initiatives.map((initiative, index) => <Link className="initiative-card" key={initiative.slug} to={`/initiatives/${initiative.slug}`} role="listitem"><div className="initiative-card-image"><img src={initiative.heroImage} alt={initiative.imageAlt} loading={index < 3 ? "eager" : "lazy"} /></div><div className="initiative-card-content"><div className="initiative-card-top"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight aria-hidden="true" /></div><p className="initiative-category">{initiative.category}</p><h2>{initiative.title}</h2><p className="initiative-description">{initiative.summary}</p><span className="initiative-card-link">Explore initiative <ArrowRight aria-hidden="true" /></span></div></Link>)}</div></div></section><section className="initiative-cta"><div className="container initiative-cta-inner"><div><span className="chapter-label"><span className="chapter-dot" /> Get involved</span><h2>Help learning reach further.</h2><p>Connect with us about partnerships, volunteering, or supporting a program.</p></div><Link to="/engage" className="button button-dark">Explore ways to engage <ArrowRight /></Link></div></section></main><SiteFooter /></div>;
}
