import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, AtSign, Instagram, Linkedin, Menu, MessageCircle, Phone, Send, X } from "lucide-react";
import { SiteFooter } from "../components/SiteFooter";
import { useScrolledHeader } from "../hooks/useScrolledHeader";

const channels = [
  { label: "X / Twitter", href: "https://x.com/cryptitaplays", icon: MessageCircle },
  { label: "Instagram", href: "https://www.instagram.com/cryptitaplays/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cryptitaplays/", icon: Linkedin },
  { label: "Telegram", href: "https://t.me/cryptitaplays", icon: Send },
];

function ContactHeader() {
  const [open, setOpen] = useState(false);
  const isScrolled = useScrolledHeader();
  return (
    <header className={`site-header site-header-solid ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand-lockup" aria-label="Cryptita Plays home"><img src="/brand/cryptita-plays-banner.png" alt="Cryptita Plays" className="brand-logo" /></Link>
        <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <Link to="/initiatives">Initiatives</Link><Link to="/who-we-are">Who we are</Link><Link to="/engage">Engage with us</Link>
          <Link to="/contact" aria-current="page" className="nav-donate">Contact us <ArrowRight /></Link>
        </nav>
        <button className="menu-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

export default function Contact() {
  return (
    <div className="site-shell contact-page">
      <ContactHeader />
      <main>
        <section className="contact-hero">
          <div className="container contact-hero-inner">
            <div className="chapter-label"><span className="chapter-dot" /> Start a conversation</div>
            <h1>Let’s make room<br /><em>for what comes next.</em></h1>
            <p>Have a question or want to support the work? Connect with our founder, Arshelene Lingao, to talk about donations, partnerships, volunteering, programs, or anything else on your mind.</p>
          </div>
        </section>

        <section className="contact-main section-padding">
          <div className="container contact-layout">
            <div className="contact-founder-card">
              <img src="/images/tita-arsh.png" alt="Arshelene R. Lingao at a Cryptita Plays community event" />
              <div><span>Founder, Cryptita Plays</span><h2>Arshelene R. Lingao</h2><p>Web3 community builder and social impact advocate focused on youth empowerment, inclusive education, and safe, values-driven learning environments.</p></div>
            </div>
            <div className="contact-options">
              <div className="chapter-label"><span className="chapter-dot" /> Get in touch</div>
              <h2>What would you like to talk about?</h2>
              <p>Reach out directly and share what you have in mind. We can discuss your interests and the best way to get involved.</p>
              <a className="contact-method" href="mailto:cryptitaplays@gmail.com?subject=Cryptita%20Plays%20inquiry"><span className="contact-method-icon"><AtSign /></span><span><small>Email</small><strong>cryptitaplays@gmail.com</strong></span><ArrowRight /></a>
              <a className="contact-method" href="tel:+639060925761"><span className="contact-method-icon"><Phone /></span><span><small>Phone</small><strong>+63 906 0925 761</strong></span><ArrowRight /></a>
              <div className="contact-topics"><span>Donations</span><span>Partnerships</span><span>Volunteering</span><span>Programs</span><span>General questions</span></div>
              <div className="contact-socials"><span>Find Cryptita Plays</span>{channels.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon /><span>{label}</span></a>)}</div>
            </div>
          </div>
        </section>

        <section className="contact-next-step"><div className="container"><div className="chapter-label chapter-label-light"><span className="chapter-dot" /> Support through conversation</div><h2>Every meaningful<br /><em>connection starts somewhere.</em></h2><p>Donation arrangements are discussed directly with Arshelene. Please wait for details shared through Cryptita Plays’ verified contact channels before sending any funds.</p><Link to="/initiatives" className="button button-light">Explore our initiatives <ArrowRight /></Link></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}
