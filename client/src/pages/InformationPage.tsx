import { brandBanner } from "../lib/responsive-images";
import { useState } from "react";
import { faqItems } from "../lib/faq";
import { Link } from "react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { SiteFooter } from "../components/SiteFooter";
import { useScrolledHeader } from "../hooks/useScrolledHeader";

type InformationPageKey = "faq" | "who-we-are" | "engage" | "terms" | "privacy" | "cookies";

// Shared with the contact page so answers stay consistent.

const pageContent: Record<Exclude<InformationPageKey, "faq">, { title: string; intro: string; sections: { title: string; paragraphs: string[]; bullets?: string[] }[] }> = {
  "who-we-are": {
    title: "Who We Are",
    intro: "Cryptita Plays is a community-driven social impact initiative bridging Web3 education and social development for underserved communities in the Philippines.",
    sections: [
      { title: "Knowledge should reach every community", paragraphs: ["The initiative began in response to the digital divide facing rural and hard-to-reach communities, where access to educational resources and reliable internet can be limited. We bring books, storytelling, and shared learning together with clear introductions to emerging technology.", "Our goal is not immediate blockchain adoption. We help learners build familiarity, critical thinking, and digital safety so they can make informed decisions as technology changes."] },
      { title: "Learning that meets people where they are", paragraphs: ["Our work includes community mini-libraries and outreach, university and community learning sessions, beginner-friendly Web3 materials, and the ACIS: Adopt-a-Child Iskolar Program."], bullets: ["Mini-libraries provide books, learning materials, and QR-based resources in safe community spaces.", "Seminars and workshops introduce blockchain basics, digital safety, career awareness, and responsible participation.", "Learning materials make complex ideas easier for children and young people to explore.", "ACIS supports five selected iskolar beneficiaries in each Mini-Library area with monthly educational assistance and supplies."] },
      { title: "People over technology", paragraphs: ["Cryptita Plays was founded by Arshelene R. Lingao, a Web3 community builder and social impact advocate. Her work focuses on youth empowerment, inclusive education, and safe, values-driven learning environments, including support for women-led initiatives in technology and education.", "We collaborate with educational institutions, community leaders, foundations, and Web3 organizations that share a commitment to ethical education and long-term community impact."] },
    ],
  },
  engage: {
    title: "Engage with Us",
    intro: "We welcome thoughtful conversations with people and organizations who want to widen access to learning and create lasting social impact.",
    sections: [
      { title: "Education and community partnerships", paragraphs: ["Schools, universities, libraries, and community leaders can explore seminars, workshops, outreach, and learning spaces shaped around local needs."] },
      { title: "Learning resources and co-development", paragraphs: ["We create beginner-friendly materials for children and young people. If your team has an idea for a book, activity, or learning resource that fits an education-first approach, let’s discuss it."] },
      { title: "Support for programs", paragraphs: ["Partners can discuss support for mini-libraries, educational materials, community learning, and ACIS. Contact founder Arshelene Lingao to talk through donation arrangements and the programs you would like to support."] },
      { title: "Events and sharing the work", paragraphs: ["We welcome invitations and opportunities to share practical, safety-conscious Web3 education. You can also follow Cryptita Plays and help more people discover the stories and resources."] },
    ],
  },
  terms: {
    title: "Terms of Use",
    intro: "These terms describe the intended use of the Cryptita Plays website and the information published here.",
    sections: [
      { title: "About this website", paragraphs: ["This site shares information about Cryptita Plays, its education-first mission, programs, learning resources, and ways to get in touch. Content is provided for general informational and educational purposes.", "Descriptions of programs and plans may change as community needs and available resources change. Contact Cryptita Plays if you need clarification about a specific program."] },
      { title: "Educational content", paragraphs: ["Web3 and blockchain materials are introductory education. They are not a recommendation to use, buy, sell, or invest in any digital asset or technology. Cryptita Plays emphasizes foundational understanding, critical thinking, and digital safety rather than immediate adoption."] },
      { title: "Donations and external services", paragraphs: ["The website does not provide an on-site payment or wallet connection. Donation arrangements are discussed directly with the founder. Please wait for details shared through Cryptita Plays’ verified contact channels before sending funds.", "Links to other websites are provided for convenience. Those websites operate under their own terms and privacy notices; Cryptita Plays does not control their content or services."] },
      { title: "Responsible use and updates", paragraphs: ["Please use this website lawfully and do not attempt to disrupt its operation or misuse its content or contact channels.", "These terms may be updated when the website or its services change. Questions about these terms can be sent to cryptitaplays@gmail.com."] },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "This notice explains what information may be handled when you visit the Cryptita Plays website or contact the organization through it.",
    sections: [
      { title: "Who this notice covers", paragraphs: ["This notice applies to the Cryptita Plays website and information sent directly to Cryptita Plays. It does not cover third-party sites or services you visit through external links; those services publish their own privacy notices."] },
      { title: "Information you choose to send", paragraphs: ["If you email us, we receive the email address and any name, message, or attachments you choose to include. We use that information to read and respond to your inquiry, including questions about programs, education, or partnerships."] },
      { title: "Website and service providers", paragraphs: ["The website does not currently offer user accounts, contact forms, an on-site donation checkout, or a wallet connection. The site serves the Poppins typeface from its own hosting; loading the typeface does not require a request to Google Fonts. Website hosting and delivery providers may process basic technical request information to serve and protect the site."] },
      { title: "How information is handled", paragraphs: ["We use inquiry information for the purpose for which it was sent and limit access to people who need it to respond or coordinate the work. We do not use the website to run advertising profiles or sell personal information.", "If a donation or other service is later provided by a third party, that provider will have its own data practices and notice. Please review those details before using the service."] },
      { title: "Questions or requests", paragraphs: ["For questions about this notice or information you have sent to Cryptita Plays, email cryptitaplays@gmail.com. Please do not include passwords, recovery phrases, or other sensitive credentials in a message."] },
      { title: "Changes to this notice", paragraphs: ["We may update this page if the website or the way it handles information changes. The version published on this page describes the current website features."] },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro: "This page explains how cookies and similar browser storage are used on the Cryptita Plays website.",
    sections: [
      { title: "Current use", paragraphs: ["The current website does not set analytics or advertising cookies and does not include a cookie consent center. The Poppins typeface is served from the website’s own hosting and does not require a request to Google Fonts."] },
      { title: "What cookies are", paragraphs: ["Cookies are small pieces of information a website may ask a browser to store and return on later visits. Similar technologies can store preferences in the browser without using cookies."] },
      { title: "Third-party links", paragraphs: ["Social media and other external links take you to services operated by other organizations. Their use of cookies or similar technologies is controlled by their own settings and privacy notices."] },
      { title: "Managing browser storage", paragraphs: ["You can review or clear cookies and other site data through your browser settings. Blocking site data may affect features on websites you visit. If Cryptita Plays adds optional cookies or analytics in the future, this notice will be updated to explain them."] },
    ],
  },
};

function InformationHeader() {
  const [open, setOpen] = useState(false);
  const isScrolled = useScrolledHeader();
  return (
    <header className={`site-header site-header-solid info-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand-lockup" aria-label="Cryptita Plays home"><img {...brandBanner} alt="Cryptita Plays" className="brand-logo" /></Link>
        <nav className={`desktop-nav info-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <Link to="/">Home</Link><Link to="/who-we-are">Who we are</Link><Link to="/engage">Engage with us</Link><Link to="/faq">FAQ</Link><Link to="/contact" className="nav-donate">Contact us <ArrowRight /></Link>
        </nav>
        <button className="menu-trigger info-menu-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

export function InformationPage({ page }: { page: InformationPageKey }) {
  return (
    <div className="site-shell information-page">
      <InformationHeader />
      <main>
        <section className="info-hero">
          <div className="container info-hero-inner">
            <div className="chapter-label"><span className="chapter-dot" /> Cryptita Plays / Information</div>
            <h1>{page === "faq" ? "Frequently Asked Questions" : pageContent[page].title}</h1>
            <p>{page === "faq" ? "Clear answers about our work, programs, learning approach, and ways to connect." : pageContent[page].intro}</p>
          </div>
        </section>
        {page === "faq" ? (
          <section className="section-padding info-content"><div className="container info-narrow info-faq-list">
            {faqItems.map(([question, answer]) => <details className="info-faq-item" key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
            <p className="info-contact-note">Have another question? <a href="mailto:cryptitaplays@gmail.com">Email Cryptita Plays <ArrowRight /></a></p>
          </div></section>
        ) : (
          <section className={`section-padding info-content ${page === "terms" || page === "privacy" || page === "cookies" ? "policy-content" : ""}`}>
            <div className="container info-narrow">
              {pageContent[page].sections.map((section, index) => <article className="info-section" key={section.title}>
                <div className="info-section-number">{String(index + 1).padStart(2, "0")}</div>
                <div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div>
              </article>)}
              {(page === "engage" || page === "who-we-are") && <div className="info-contact-cta"><div><h2>Let’s build the bridge together.</h2><p>Start a conversation with Cryptita Plays.</p></div><a className="button button-primary" href="mailto:cryptitaplays@gmail.com?subject=Cryptita%20Plays%20inquiry">Contact us <ArrowRight /></a></div>}
              {page === "privacy" && <p className="policy-contact">Depending on the circumstances and applicable law, you may have rights to be informed about, access, or correct personal data, object to processing, request erasure or blocking, and request data portability. Read the <a href="https://privacy.gov.ph/data-subject-rights/" target="_blank" rel="noopener noreferrer">Philippine National Privacy Commission’s overview of data subject rights</a>.</p>}
              {(page === "terms" || page === "privacy" || page === "cookies") && <p className="policy-contact">Questions about this page? <a href="mailto:cryptitaplays@gmail.com">cryptitaplays@gmail.com</a></p>}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
