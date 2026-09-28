/* Learning Constellation: donation actions stay calm, explicit, and safe; depth supports trust, never urgency or speculation. */
import { useState } from "react";
import { Link } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CircleDollarSign,
  HelpCircle,
  LockKeyhole,
  Menu,
  QrCode,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";
import { SiteFooter } from "../components/SiteFooter";

const ASSETS = {
  logo: "/brand/cryptita-plays-banner.png",
  mark: "/brand/cryptita-mark.png",
  library: "/images/community-gathering.jpg",
};

// Planned donation method; receiving details remain unavailable in this phase.
const donationConfig = {
  method: "USDT via Binance Pay",
  status: "Receiving details pending approval",
  campaignLabel: "Future-ready learning",
};

const faqs = [
  ["Can I donate now?", "Not yet. Cryptita Plays will publish an approved receiving method here when it is ready. Do not send funds based on an unverified QR code or address."],
  ["Which asset should I send?", "USDT through Binance Pay is the planned method. Wait for the approved receiving details on this page before sending anything."],
  ["Can I support a specific program?", "The first campaign is designed to support the organization’s education-first work across mini-libraries, learning materials, university programs, outreach, and ACIS scholars. Program-specific giving can be added when allocation details are confirmed."],
  ["Is my donation tax-deductible?", "Tax treatment depends on your location and the organization’s legal status. Cryptita Plays does not make a tax-deductibility claim on this page without approved documentation."],
];

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header site-header-solid">
      <div className="container nav-inner">
        <Link to="/" className="brand-lockup" aria-label="Cryptita Plays home">
          <img src={ASSETS.logo} alt="Cryptita Plays" className="brand-logo" />
          <img src={ASSETS.mark} alt="" className="brand-mark" aria-hidden="true" />
        </Link>
        <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <Link to="/">Home</Link>
          <a href="/#programs">Programs</a>
          <a href="/#approach">Approach</a>
          <Link to="/donate" className="nav-donate">Donate <ArrowRight className="arrow-up-right" /></Link>
        </nav>
        <button className="menu-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

function Donate() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="site-shell donate-page">
      <SiteHeader />
      <main>
        <section className="donate-hero">
          <div className="donate-hero-glow" aria-hidden="true" />
          <div className="container donate-hero-grid">
            <div className="donate-hero-copy">
              <Link to="/" className="back-link"><ArrowLeft /> Back to Cryptita Plays</Link>
              <div className="eyebrow donate-eyebrow"><span className="eyebrow-line" /> Crypto giving, made clear</div>
              <h1>Make room for<br /><em>what comes next.</em></h1>
              <p>Support the books, learning spaces, workshops, and scholars that help communities meet a digital future with confidence.</p>
              <div className="donate-proof-row"><span><ShieldCheck /> Clear giving details</span><span><LockKeyhole /> Receiving details pending</span></div>
            </div>
            <div className="donate-orb-wrap" aria-hidden="true"><div className="donate-world-card"><img src={ASSETS.library} alt="" /><span>Books, spaces, scholars</span></div><div className="donate-orb"><div className="orb-core">CP</div><div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><span className="orb-node orb-node-a" /><span className="orb-node orb-node-b" /><span className="orb-node orb-node-c" /></div><div className="donate-orb-caption"><span>Give with intention</span><span>01</span></div></div>
          </div>
        </section>

        <section className="donate-flow-section section-padding">
          <div className="container donate-flow-layout">
            <div className="donate-flow-intro"><div className="chapter-label"><span className="chapter-dot" /> Your contribution</div><h2>Choose clarity<br />over complexity.</h2><p>Crypto can move quickly. When giving opens, check the approved receiving details and review the recipient and amount before you confirm a payment.</p><div className="giving-steps"><div><span>01</span><p>Check the approved QR</p></div><div><span>02</span><p>Review recipient and amount</p></div><div><span>03</span><p>Approve in Binance Pay</p></div></div></div>
            <div className="donation-card">
              <div className="donation-card-top"><div><span className="card-kicker">Support the work</span><h3>{donationConfig.campaignLabel}</h3></div><CircleDollarSign /></div>
              <div className="network-select-label">Planned giving method</div>
              <div className="network-pill"><div className="network-icon">B</div><div><strong>{donationConfig.method}</strong><span>{donationConfig.status}</span></div><LockKeyhole /></div>
              <div className="donation-warning"><AlertTriangle /><p><strong>Donations are not open yet.</strong> No receiving QR or address has been approved for this page. Please wait for verified details before sending USDT.</p></div>
              <div className="wallet-label-row"><span>Receiving details</span><span className="status-pending"><span /> Pending approval</span></div>
              <div className="wallet-box is-pending">
                <div className="qr-placeholder"><QrCode /><span>QR will appear here</span></div>
                <div className="wallet-address"><span>Approved Binance Pay receiving details will appear here when giving opens.</span><button aria-label="Receiving details unavailable" disabled><LockKeyhole /></button></div>
              </div>
              <div className="donation-card-actions"><button className="button button-primary full-button" disabled>Giving details coming soon <LockKeyhole /></button></div>
              <p className="donation-note"><WalletCards /> Cryptita Plays has not published a receiving QR or address. No website wallet connection is needed for this planned method.</p>
            </div>
          </div>
        </section>

        <section className="allocation-section section-padding">
          <div className="container">
            <div className="allocation-heading"><div><div className="chapter-label"><span className="chapter-dot" /> Where it goes</div><h2>A contribution can become<br /><em>a place to learn.</em></h2></div><p>Every chapter of the work is connected. Support helps the organization keep building access from the first book to the next confident question.</p></div>
            <div className="allocation-grid"><div className="allocation-card"><span>01</span><BookIcon /><h3>Mini-libraries</h3><p>Books, safe spaces, and learning resources in communities with limited connectivity.</p></div><div className="allocation-card allocation-card-dark"><span>02</span><WorkshopIcon /><h3>Workshops</h3><p>University seminars and community sessions grounded in safety and context.</p></div><div className="allocation-card allocation-card-violet"><span>03</span><ScholarIcon /><h3>ACIS scholars</h3><p>Monthly educational assistance, supplies, and encouragement for selected learners.</p></div></div>
          </div>
        </section>

        <section className="trust-section section-padding"><div className="container trust-layout"><div className="trust-symbol"><ShieldCheck /></div><div><div className="chapter-label"><span className="chapter-dot" /> A note on trust</div><h2>Transparency is part of the program.</h2><p>Cryptita Plays believes donors should understand where they are giving and how to verify what happens next. Once the receiving method is approved, this page can publish clear giving instructions, campaign updates, and program reports in one place.</p><Link to="/#approach" className="small-link">Read our approach <ArrowRight /></Link></div></div></section>

        <section className="faq-section section-padding"><div className="container faq-layout"><div className="faq-heading"><div className="chapter-label"><span className="chapter-dot" /> Before you send</div><h2>Good questions<br />are welcome.</h2><p>Crypto donations are irreversible. If something on this page feels unclear, pause and ask before sending.</p><a className="faq-contact" href="mailto:cryptitaplays@gmail.com">Ask Cryptita Plays <ArrowRight /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

        <section className="donate-bottom-cta"><div className="container"><div className="chapter-label chapter-label-light"><span className="chapter-dot" /> Keep the bridge open</div><h2>Learning is a<br /><em>shared asset.</em></h2><Link to="/" className="button button-light">Return to the story <ArrowLeft /></Link></div></section>
      </main>
      <SiteFooter page="donate" />
    </div>
  );
}

function BookIcon() { return <div className="allocation-icon"><span /><span /></div>; }
function WorkshopIcon() { return <div className="allocation-icon network-symbol"><span /><span /><span /></div>; }
function ScholarIcon() { return <div className="allocation-icon heart-symbol">♡</div>; }

export default Donate;
