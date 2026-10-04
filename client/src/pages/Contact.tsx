import { useState } from "react";
import { faqItems } from "../lib/faq";
import "./Contact.css"; // Page-specific presentation.
import { Link } from "react-router";
import { ArrowDown, ArrowRight, AtSign, BookOpen, ChevronDown, HeartHandshake, Users, Instagram, Linkedin, Menu, MessageCircle, Phone, Send, X } from "lucide-react";
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

const inquiryTopics = [
  { title: "Support a program", description: "Talk about donations for mini-libraries, learning materials, or ACIS scholars.", hint: "Share the program you’d like to support.", subject: "Program support inquiry", icon: HeartHandshake },
  { title: "Partner with us", description: "Explore workshops, outreach, or learning resources for your school or community.", hint: "Tell us about your organization and idea.", subject: "Partnership inquiry", icon: BookOpen },
  { title: "Explore volunteering", description: "Start a conversation about how your time and skills could support the work.", hint: "Include your interests and availability.", subject: "Volunteering inquiry", icon: Users },
];

export default function Contact() {
  return (
    <div className="site-shell contact-page contact-refresh">
      <ContactHeader />
      <main>
        <section className="connect-hero" aria-labelledby="connect-title">
          <div className="container connect-hero-grid">
            <div className="connect-intro">
              <div className="chapter-label"><span className="chapter-dot" /> Contact & FAQ</div>
              <h1 id="connect-title">Good things start<br />with <em>a conversation.</em></h1>
              <p>Have a question or an idea? Let’s talk about bringing more opportunities to learn to communities in the Philippines.</p>
              <a href="#faq" className="connect-faq-link">Looking for a quick answer? Read the FAQ <ArrowDown aria-hidden="true" /></a>
            </div>
            <div className="connect-card">
              <span className="connect-eyebrow">Get in touch directly</span>
              <h2>We’d love to hear from you.</h2>
              <a className="contact-method" href="mailto:cryptitaplays@gmail.com?subject=Cryptita%20Plays%20inquiry"><span className="contact-method-icon"><AtSign /></span><span><small>Email</small><strong>cryptitaplays@gmail.com</strong></span><ArrowRight /></a>
              <a className="contact-method" href="tel:+639060925761"><span className="contact-method-icon"><Phone /></span><span><small>Phone</small><strong>+63 906 0925 761</strong></span><ArrowRight /></a>
              <div className="connect-person"><img src="/images/tita-arsh.png" alt="Arshelene R. Lingao" /><div><span>Your point of contact</span><strong>Arshelene R. Lingao</strong><span>Founder, Cryptita Plays</span></div></div>
            </div>
          </div>
        </section>

        <section className="connect-topics" aria-labelledby="topics-title">
          <div className="container">
            <div className="connect-section-heading"><div><div className="chapter-label"><span className="chapter-dot" /> Find your starting point</div><h2 id="topics-title">How would you like to get involved?</h2></div><p>A little context helps us understand your idea.<br />Choose a topic to start an email.</p></div>
            <div className="connect-topic-grid">{inquiryTopics.map(({ title, description, hint, subject, icon: Icon }, index) => <a className="connect-topic" href={`mailto:cryptitaplays@gmail.com?subject=${encodeURIComponent(subject)}`} key={title}><div className="connect-topic-top"><Icon aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p><div className="connect-topic-bottom"><span>{hint}</span><ArrowRight aria-hidden="true" /></div></a>)}</div>
            <p className="connect-general">Something else on your mind? <a href="mailto:cryptitaplays@gmail.com?subject=General%20inquiry">Send a general inquiry <ArrowRight aria-hidden="true" /></a></p>
          </div>
        </section>
        <section className="connect-faq" id="faq" aria-labelledby="faq-title">
          <div className="container connect-faq-grid">
            <div className="connect-faq-intro"><div className="chapter-label"><span className="chapter-dot" /> A little clarity</div><h2 id="faq-title">Questions,<br /><em>answered.</em></h2><p>Get to know our work, who it’s for, and how you can be part of it.</p><Link to="/initiatives">Explore our initiatives <ArrowRight aria-hidden="true" /></Link></div>
            <div className="connect-faq-list">{faqItems.map(([question, answer], index) => <details key={question} className="connect-faq-item"><summary><span className="connect-faq-number">0{index + 1}</span><span>{question}</span><ChevronDown aria-hidden="true" /></summary><p>{answer}</p></details>)}<p className="connect-faq-note">Still have a question? <a href="mailto:cryptitaplays@gmail.com">We’re an email away.</a></p></div>
          </div>
        </section>
        <section className="connect-follow" aria-labelledby="follow-title"><div className="container connect-follow-inner"><div><div className="chapter-label"><span className="chapter-dot" /> Keep in touch</div><h2 id="follow-title">Follow the work as it grows.</h2><p>Find community stories, learning, and updates from Cryptita Plays.</p></div><div className="connect-socials">{channels.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><Icon aria-hidden="true" /><span>{label}</span><ArrowRight aria-hidden="true" /></a>)}</div></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}
