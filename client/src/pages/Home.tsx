/* Learning Constellation: editorial humanism, beveled learning objects, and Cryptita Violet as the connective signal. */
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Menu,
  Network,
  Quote,
  X,
} from "lucide-react";

const ASSETS = {
  logo: "/brand/cryptita-plays-banner.png",
  mark: "/brand/cryptita-mark.png",
  hero: "/images/learning-event.jpg",
  heroVideo: "/images/tambunan-outreach.mp4",
  library: "/images/community-gathering.jpg",
  university: "/images/classroom-session.jpg",
  outreach: "/images/group-discussion.jpg",
};

const programs = [
  {
    number: "01",
    icon: BookOpen,
    kicker: "Access before adoption",
    title: "Mini-library mission",
    copy: "We create community-based mini libraries where books, Web3 learning materials, and QR-based resources make curiosity possible—even without reliable internet.",
    image: ASSETS.library,
    alt: "People seated together at tables during a community gathering",
    tone: "light",
  },
  {
    number: "02",
    icon: GraduationCap,
    kicker: "Campus to community",
    title: "University Connect",
    copy: "Seminars and workshops introduce blockchain basics, digital safety, career awareness, and responsible participation with honesty and context.",
    image: ASSETS.university,
    alt: "Attendees listening to a speaker in a classroom",
    tone: "light",
  },
  {
    number: "03",
    icon: HeartHandshake,
    kicker: "Everyday learning tools",
    title: "Learning that travels",
    copy: "From Barya to Blockchain to activity books and story-led materials, we turn complex concepts into useful, age-appropriate learning moments.",
    image: ASSETS.outreach,
    alt: "People gathered around a table for a group discussion",
    tone: "violet",
  },
];

const events = [
  {
    date: "Community journal",
    tag: "Coming soon",
    title: "Stories from the first mini-library",
    copy: "A closer look at the people, books, and small moments that turn an empty corner into a place to learn.",
    readTime: "5 min read",
  },
  {
    date: "Field notes",
    tag: "Coming soon",
    title: "What responsible Web3 education looks like",
    copy: "Why we start with digital safety, critical thinking, and foundational understanding—not hype.",
    readTime: "4 min read",
  },
  {
    date: "Program update",
    tag: "Coming soon",
    title: "Meet the next five iskolar scholars",
    copy: "Every Mini-Library area selects five student beneficiaries for monthly educational assistance and learning support.",
    readTime: "3 min read",
  },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Mission", "#mission"],
    ["Programs", "#programs"],
    ["Approach", "#approach"],
    ["Stories", "#events"],
  ];
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link to="/" className="brand-lockup" aria-label="Cryptita Plays home">
          <img src={ASSETS.logo} alt="Cryptita Plays" className="brand-logo" />
          <img src={ASSETS.mark} alt="" className="brand-mark" aria-hidden="true" />
        </Link>
        <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <Link to="/donate" className="nav-donate" onClick={() => setOpen(false)}>
            Support the work <ArrowUpRight />
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const activeEvent = events[eventIndex];
  const setEvent = (next: number) => setEventIndex((next + events.length) % events.length);

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero-section">
          <video src={ASSETS.heroVideo} poster={ASSETS.hero} aria-label="Tambunan community outreach program by Cryptita Plays" className="hero-background-video" autoPlay muted loop playsInline />
          <div className="hero-video-overlay" aria-hidden="true" />
          <div className="container hero-content">
            <Reveal className="hero-copy">
              <h1>Bridging Web3 Education and Social Impact</h1>
              <div className="hero-actions">
                <Link to="/donate" className="button button-primary">Donate <ArrowRight /></Link>
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
                <p>Cryptita Plays was founded in response to a growing digital divide in rural and hard-to-reach areas. Where internet access is limited, we combine traditional learning tools—books, storytelling, and shared spaces—with simplified introductions to Web3.</p>
                <p>Our goal is not immediate adoption. It is early familiarity, critical thinking, and digital safety, so students and communities are prepared to make informed decisions when these technologies become part of everyday life.</p>
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
                      <a href="#approach" className="small-link">See the approach <ArrowRight /></a>
                    </div>
                    <div className="program-image-wrap">
                      <img src={program.image} alt={program.alt} className="program-image" />
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
                  <a href="#impact" className="small-link">Meet the commitment <ArrowRight /></a>
                </div>
                <div className="acis-object" aria-hidden="true"><div className="acis-orbit" /><div className="acis-book">+</div><div className="acis-label">5 / area</div></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="approach-section section-padding" id="approach">
          <div className="container approach-layout">
            <Reveal className="approach-object-wrap">
              <div className="approach-object"><div className="approach-core">CP</div><div className="approach-ring ring-a" /><div className="approach-ring ring-b" /><span className="node node-a" /><span className="node node-b" /><span className="node node-c" /></div>
              <div className="object-caption"><span>02 / 05</span><span>How we show up</span></div>
            </Reveal>
            <Reveal className="approach-copy" delay={90}>
              <SectionHeading light eyebrow="Our approach" title="Start with the person. Then introduce the protocol." copy="We work with educational institutions, community leaders, foundations, and Web3 organizations that share a long-term, people-first view." />
              <div className="approach-principles">
                <div><strong>01</strong><span>Foundational before advanced</span><p>Build understanding before asking anyone to participate.</p></div>
                <div><strong>02</strong><span>Honest about risks</span><p>Make digital safety and critical thinking part of every lesson.</p></div>
                <div><strong>03</strong><span>Designed for real access</span><p>Keep learning useful even when connectivity is inconsistent.</p></div>
              </div>
            </Reveal>
          </div>
        </section>

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

        <section className="founder-section section-padding">
          <div className="container founder-layout">
            <Reveal className="founder-portrait-wrap"><img className="founder-portrait" src="/images/tita-arsh.png" alt="Arshelene R. Lingao at a Cryptita Plays community event" /></Reveal>
            <div className="founder-copy-column"><Reveal className="founder-intro"><div className="chapter-label"><span className="chapter-dot" /> The people behind the work</div><h2>A future-ready education is a shared project.</h2></Reveal><Reveal className="founder-note" delay={100}><div className="founder-mark"><img src={ASSETS.mark} alt="" /></div><p>Cryptita Plays was founded by <strong>Arshelene R. Lingao</strong>, a Web3 community builder and social impact advocate focused on youth empowerment, inclusive education, and safe, values-driven learning environments.</p><a href="mailto:cryptitaplays@gmail.com" className="small-link">Connect with Cryptita Plays <ArrowRight /></a></Reveal></div>
          </div>
        </section>

        <section className="events-section section-padding" id="events">
          <div className="container events-layout">
            <Reveal className="events-heading"><SectionHeading eyebrow="Field notes & events" title="Follow the work as it moves." copy="A living journal of workshops, community visits, program updates, and the people making the bridge wider." /><Link to="/donate" className="button button-dark">Support a chapter <ArrowRight /></Link></Reveal>
            <Reveal className="event-carousel" delay={100}>
              <div className="event-topline"><span>{activeEvent.date}</span><span>{String(eventIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}</span></div>
              <div className="event-card">
                <div className="event-card-text"><span className="event-tag">{activeEvent.tag}</span><h3>{activeEvent.title}</h3><p>{activeEvent.copy}</p><span className="event-read-time">{activeEvent.readTime} <ArrowRight /></span></div>
                <div className="event-visual"><div className="event-visual-word">FIELD<br /><em>notes</em></div><div className="event-visual-orbit" /><CalendarDays /></div>
              </div>
              <div className="event-controls"><div className="event-dots">{events.map((event, index) => <button key={event.title} onClick={() => setEvent(index)} className={index === eventIndex ? "active" : ""} aria-label={`View event ${index + 1}`} />)}</div><div className="event-arrows"><button onClick={() => setEvent(eventIndex - 1)} aria-label="Previous event"><ChevronLeft /></button><button onClick={() => setEvent(eventIndex + 1)} aria-label="Next event"><ChevronRight /></button></div></div>
            </Reveal>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-stars" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="container cta-inner">
            <Reveal><div className="chapter-label chapter-label-light"><span className="chapter-dot" /> Make the next chapter possible</div><h2>Put learning<br /><em>in more hands.</em></h2><p>Support the books, spaces, workshops, and scholars that help communities meet the digital future with confidence.</p><Link to="/donate" className="button button-light">See how to give <ArrowRight /></Link></Reveal>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-main"><Link to="/" className="footer-brand"><img src={ASSETS.logo} alt="Cryptita Plays" /></Link><div className="footer-contact"><span>Let's build the bridge together.</span><a href="mailto:cryptitaplays@gmail.com">cryptitaplays@gmail.com</a><a href="tel:+639060925761">+63 906 092 5761</a></div><div className="footer-links"><a href="https://www.instagram.com/cryptitaplays" target="_blank" rel="noreferrer">Instagram <ExternalLink /></a><Link to="/donate">Donate <ArrowRight /></Link></div></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Cryptita Plays</span><span>Education over hype. People over technology.</span><span>Philippines</span></div>
      </footer>
    </div>
  );
}

export default Home;
