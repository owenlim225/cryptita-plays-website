import { brandBanner, brandMark, campusPhoto, libraryPhoto } from "../lib/responsive-images";
/* Learning Constellation: editorial humanism, beveled learning objects, and Cryptita Violet as the connective signal. */
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  Menu,
  Network,
  Quote,
  X,
} from "lucide-react";
import { ApproachCarousel } from "../components/ApproachCarousel";
import { HeroMedia } from "../components/HeroMedia";
import { BookVideo } from "../components/BookVideo";
import { SiteFooter } from "../components/SiteFooter";
import { CommunityPartnersStrip } from "../components/sections/CommunityPartnersStrip";
import { EducationalPartnersStrip } from "../components/sections/EducationalPartnersStrip";
import { useScrolledHeader } from "../hooks/useScrolledHeader";

const PUBLIC_CALENDAR_URL = "https://calendar.google.com/calendar/embed?src=6035e2225ec6cddc3f94deaf8167fdfaea780e2e9663460d5c18c73c5599e695%40group.calendar.google.com&ctz=Asia%2FManila";

const books = [
  {
    title: "Barya to Blockchain: Web3 Young Learners Encyclopedia",
    author: "Arshelene Lingao (Cryptita Plays)",
    image: "/images/encyclopedia-cover.png",
    video: "/media/books/barya-to-blockchain.mp4",
    alt: "Cover of Web3 Young Learners Encyclopedia",
  },
  {
    title: "Programming for Youth: Code Like a Cook",
    author: "GANAP with Eli (Eli Rabadon)",
    image: "/images/cook-cover.png",
    video: "/media/books/code-like-a-cook.mp4",
    alt: "Cover of Programming for Youth: Code Like a Cook",
  },
  {
    title: "Wave3 Handbook",
    author: "Mary Dee Ruzgal & Christop Waves",
    image: "/images/wave3-cover.png",
    video: "/media/books/wave3-handbook.mp4",
    alt: "Cover of Wave3 Handbook",
  },
];

const programs = [
  {
    slug: "mini-library-mission-outreach",
    number: "01",
    icon: BookOpen,
    kicker: "Access before adoption",
    title: "Mini-Library Mission & Outreach Program",
    copy: "Our flagship social-impact initiative brings books, educational resources, school supplies, and learning opportunities to underserved communities, with a long-term goal of establishing 10 mini-libraries nationwide.",
    image: libraryPhoto,
    alt: "Students and community members gathered inside a school",
    tone: "light",
  },
  {
    slug: "web3-on-campus",
    number: "02",
    icon: HeartHandshake,
    kicker: "Learning in community",
    title: "Cryptita Plays: Web3 On Campus",
    copy: "We bring blockchain, Web3, AI, GameFi, DeFi, cybersecurity, and digital literacy to students through campus seminars, university partnerships, technical learning, and community-building.",
    image: campusPhoto,
    alt: "Students attending a campus seminar in a lecture hall",
    tone: "violet",
  },
  {
    slug: "builder-programs",
    number: "03",
    icon: GraduationCap,
    kicker: "Campus to community",
    title: "Cryptita Plays Builder Programs",
    copy: "Learners move beyond concepts to build, test, deploy, and showcase projects through a hands-on pathway: Learn → Build → Deploy → Showcase.",
    image: { src: "/media/initiatives/builder-programs/20260823_174425.jpg", width: 4000, height: 2252 },
    alt: "Students gathered for a hands-on builder program",
    tone: "light",
  },
];

const events = programs.map((program) => ({
  date: "Explore our work",
  tag: program.kicker,
  title: program.title,
  copy: program.copy,
  href: `/initiatives/${program.slug}`,
}));

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const isScrolled = useScrolledHeader();
  const links = [
    ["Mission", "#mission"],
    ["Programs", "#programs"],
    ["Books", "#learning"],
    ["Approach", "#approach"],
    ["Stories", "#events"],
  ];
  return (
    <header className={`site-header site-header-home ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand-lockup" aria-label="Cryptita Plays home">
          <img {...brandBanner} alt="Cryptita Plays" className="brand-logo" />
          <img {...brandMark} alt="" className="brand-mark" aria-hidden="true" />
        </Link>
        <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <Link to="/contact" className="nav-donate" onClick={() => setOpen(false)}>
            Contact us <ArrowUpRight />
          </Link>
        </nav>
        <button className="menu-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function ArrowUpRight() {
  return <ArrowRight aria-hidden="true" className="arrow-up-right" />;
}

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      <div className="chapter-label"><span className="chapter-dot" /> {eyebrow}</div>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Home() {
  const [eventIndex, setEventIndex] = useState(0);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12 });
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add("reveal-pending");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, []);
  const activeEvent = events[eventIndex];
  const setEvent = (next: number) => setEventIndex((next + events.length) % events.length);

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero-section">
          <HeroMedia />
          <div className="hero-video-overlay" aria-hidden="true" />
          <div className="container hero-content">
            <Reveal className="hero-copy">
              <p className="chapter-label chapter-label-light">Cryptita Plays · Philippines</p>
              <h1>Bridging Web3 Education and Social Impact</h1>
              <p className="hero-intro">We connect communities in the Philippines with books, digital learning, and hands-on opportunities to build.</p>
              <div className="hero-actions">
                <Link to="/initiatives" className="button button-primary">Explore our initiatives <ArrowRight /></Link>
                <Link to="/who-we-are" className="button button-outline">Who we are <ArrowRight /></Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mission-section section-padding" id="mission">
          <div className="container mission-layout">
            <Reveal className="mission-side-note">
              <div className="vertical-label">The why</div>
              <div className="line-marker" />
              <span>01 / 05</span>
            </Reveal>
            <Reveal className="mission-main" delay={80}>
              <SectionHeading eyebrow="Our mission" title="The digital future should not be gated by geography." copy="We are building a bridge between education, technology, and social impact—one community, one learner, one safe introduction at a time." />
              <div className="mission-detail-grid">
                <p>Cryptita Plays is a community-driven social impact initiative focused on bridging Web3 education and social development for underserved communities in the Philippines. Founded with the belief that access to knowledge should not be limited by location, income, or internet availability, Cryptita Plays works to make digital literacy, blockchain awareness, and emerging technology education accessible, safe, and beginner-friendly.</p>
                <p>At its core, Cryptita Plays operates with a strong education-first mindset. The goal is not to encourage immediate adoption of blockchain technologies, but to build early familiarity and awareness so that students and communities are prepared when these technologies become part of everyday life. By focusing on foundational understanding, critical thinking, and digital safety, the initiative empowers individuals to make informed decisions in the future digital economy.</p>
              </div>
            </Reveal>
            <Reveal className="mission-quote" delay={160}>
              <Quote />
              <p>“People over technology. Education over hype.”</p>
              <span>— the Cryptita Plays commitment</span>
            </Reveal>
          </div>
        </section>

        <section className="programs-section section-padding" id="programs">
          <div className="container">
            <Reveal><SectionHeading eyebrow="Our commitments" title="Four ways we make the future feel reachable." copy="Our programs are designed to meet learners where they are—at the library shelf, the university table, or the doorstep of a community." /></Reveal>
            <div className="program-list">
              {programs.map((program, index) => {
                const Icon = program.icon;
                return (
                  <Reveal key={program.number} className={`program-row program-${program.tone}`} delay={index * 70}>
                    <div className="program-index"><span>{program.number}</span><div className="program-line" /></div>
                    <div className="program-copy">
                      <div className="program-kicker"><Icon /> {program.kicker}</div>
                      <h3>{program.title}</h3>
                      <p>{program.copy}</p>
                      <Link to={`/initiatives/${program.slug}`} className="small-link">Explore the program <ArrowRight /></Link>
                    </div>
                    <div className="program-image-wrap">
                      <img {...program.image} sizes="(max-width: 760px) calc(100vw - 40px), 470px" alt={program.alt} className="program-image" loading="lazy" decoding="async" />
                      <div className="image-corner-mark"><Network /></div>
                    </div>
                  </Reveal>
                );
              })}
              <Reveal className="program-row program-acis" delay={220}>
                <div className="program-index"><span>04</span><div className="program-line" /></div>
                <div className="program-copy">
                  <div className="program-kicker"><HeartHandshake /> Sustained support</div>
                  <h3>ACIS: Adopt-a-Child Iskolar</h3>
                  <p>Each Mini-Library area selects five iskolar beneficiaries for monthly educational assistance, school supplies, and the confidence to keep showing up.</p>
                  <Link to="/initiatives/acis-adopt-a-child-iskolar" className="small-link">Explore ACIS <ArrowRight /></Link>
                </div>
                <div className="acis-object"><img src="/media/initiatives/acis/20260107_120040(1).jpg" alt="ACIS scholars and community members gathered at an outreach activity" loading="lazy" decoding="async" /><div className="acis-label">ACIS scholars</div></div>
              </Reveal>
            </div>
            <div className="programs-more"><Link to="/initiatives" className="button button-dark">See all initiatives <ArrowRight /></Link></div>
          </div>
        </section>

        <section className="learning-section section-padding" id="learning">
          <div className="container">
            <Reveal><SectionHeading eyebrow="Books & learning resources" title="Books shaped by community." copy="Created with Cryptita communities and collaborators, these books make Web3 and coding easier to explore." /></Reveal>
            <div className="book-grid">
              {books.map((book, index) => (
                <Reveal className="book-card" key={book.title} delay={index * 70}>
                  <BookVideo book={book} index={index} total={books.length} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ApproachCarousel />

        <EducationalPartnersStrip />

        <section className="impact-section section-padding" id="impact">
          <div className="container">
            <Reveal><SectionHeading eyebrow="The impact we aim for" title="Small, tangible shifts can change a community’s horizon." copy="We measure the work in access, confidence, continuity, and the people who feel more ready for what comes next." /></Reveal>
            <div className="impact-grid">
              <Reveal className="impact-card impact-feature" delay={60}><span className="impact-number">01</span><h3>Learning stays open</h3><p>Mini libraries create a safe place to return to—even when the signal drops.</p><div className="impact-doodle"><BookOpen /></div></Reveal>
              <Reveal className="impact-card" delay={120}><span className="impact-number">02</span><h3>Complex becomes clear</h3><p>Beginner-friendly materials turn unfamiliar ideas into approachable questions.</p><Network className="impact-icon" /></Reveal>
              <Reveal className="impact-card" delay={180}><span className="impact-number">03</span><h3>Support compounds</h3><p>ACIS helps selected learners stay equipped, engaged, and encouraged.</p><HeartHandshake className="impact-icon" /></Reveal>
            </div>
          </div>
        </section>

        <section className="founder-section section-padding" id="our-story">
          <div className="container founder-layout">
            <Reveal className="founder-portrait-wrap"><img className="founder-portrait" src="/images/tita-arsh.png" alt="Arshelene R. Lingao at a Cryptita Plays community event" loading="lazy" decoding="async" /></Reveal>
            <div className="founder-copy-column"><Reveal className="founder-intro"><div className="chapter-label"><span className="chapter-dot" /> The people behind the work</div><h2>A future-ready education is a shared project.</h2></Reveal><Reveal className="founder-note" delay={100}><div className="founder-mark"><img {...brandMark} alt="" loading="lazy" decoding="async" /></div><p>Cryptita Plays was founded by <strong>Arshelene R. Lingao</strong>, a Web3 community builder and social impact advocate focused on youth empowerment, inclusive education, and safe, values-driven learning environments.</p><a href="mailto:cryptitaplays@gmail.com" className="small-link">Connect with Cryptita Plays <ArrowRight /></a></Reveal></div>
          </div>
        </section>

        <CommunityPartnersStrip />

        <section className="events-section section-padding" id="events">
          <div className="container events-layout">
            <Reveal className="events-heading"><SectionHeading eyebrow="Field notes & events" title="Follow the work as it moves." copy="Explore the programs behind our community work. Follow our main Facebook channel for updates while we prepare more field notes." /><div className="events-heading-actions"><Link to="/stories" className="button button-dark">All stories <ArrowRight /></Link><a href="https://www.facebook.com/cryptitaplays" target="_blank" rel="noopener noreferrer" className="text-link">Follow on Facebook <ArrowRight /></a></div></Reveal>
            <Reveal className="event-carousel" delay={100}>
              <div className="event-topline"><span>{activeEvent.date}</span><span>{String(eventIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}</span></div>
              <div className="event-card">
                <div className="event-card-text"><span className="event-tag">{activeEvent.tag}</span><h3>{activeEvent.title}</h3><p>{activeEvent.copy}</p><Link to={activeEvent.href} className="event-read-time">Explore the program <ArrowRight /></Link></div>
                <div className="event-visual"><div className="event-visual-word">FIELD<br /><em>notes</em></div><div className="event-visual-orbit" /><CalendarDays /></div>
              </div>
              <div className="event-controls"><div className="event-dots">{events.map((event, index) => <button key={event.title} onClick={() => setEvent(index)} className={index === eventIndex ? "active" : ""} aria-label={`View event ${index + 1}`} />)}</div><div className="event-arrows"><button onClick={() => setEvent(eventIndex - 1)} aria-label="Previous event"><ChevronLeft /></button><button onClick={() => setEvent(eventIndex + 1)} aria-label="Next event"><ChevronRight /></button></div></div>
            </Reveal>
          </div>
        </section>

        <section className="calendar-section" id="calendar" aria-labelledby="calendar-heading">
          <div className="container calendar-inner">
            <Reveal className="calendar-intro">
              <div className="chapter-label chapter-label-light"><span className="chapter-dot" /> Events & availability</div>
              <h2 id="calendar-heading">See when we're<br /><em>already booked.</em></h2>
              <p>Explore the dates and locations of our events. Dates with events are already committed. Select an event to see its location when provided, then get in touch if you'd like to plan one with us.</p>
              <a href="mailto:cryptitaplays@gmail.com?subject=Event%20inquiry" className="button button-light">Plan an event with us <ArrowRight /></a>
            </Reveal>
            <Reveal className="calendar-embed-wrap" delay={100}>
              <iframe
                className="calendar-embed"
                title="Cryptita Plays events and booked dates"
                src={`${PUBLIC_CALENDAR_URL}&showTitle=0&showPrint=0&showCalendars=0&showTz=0`}
                loading="lazy"
              />
              <a className="calendar-open-link" href={PUBLIC_CALENDAR_URL} target="_blank" rel="noopener noreferrer">Open full calendar <ArrowRight aria-hidden="true" /></a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default Home;
