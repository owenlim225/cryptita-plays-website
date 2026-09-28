/* Learning Constellation: donation actions stay calm, explicit, and safe; depth supports trust, never urgency or speculation. */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleDollarSign,
  Copy,
  ExternalLink,
  HelpCircle,
  LockKeyhole,
  Menu,
  QrCode,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";

const ASSETS = {
  logo: "/manus-storage/CryptitaLongBevel_80c76541.png",
  mark: "/manus-storage/cryptita-mark_119281b7.png",
  library: "/manus-storage/cryptita-mini-library_fe95fb47.jpg",
};

// Replace only with public, verified organization wallet details before launch.
const donationConfig = {
  network: "Binance network",
  chainLabel: "Public chain details pending verification",
  walletAddress: "",
  explorerUrl: "",
  campaignLabel: "Future-ready learning",
};

const faqs = [
  ["What happens after I donate?", "For the static launch flow, your transaction can be verified on the public blockchain explorer once the verified organization wallet is live. If you need an acknowledgment, email the transaction hash and your preferred contact details to cryptitaplays@gmail.com."],
  ["Which asset should I send?", "Only send a token and network combination that Cryptita Plays has explicitly published on this page. Never send a token through a different network just because the wallet address looks similar."],
  ["Can I support a specific program?", "The first campaign is designed to support the organization’s education-first work across mini-libraries, learning materials, university programs, outreach, and ACIS scholars. Program-specific giving can be added when allocation details are confirmed."],
  ["Is my donation tax-deductible?", "Tax treatment depends on your location and the organization’s legal status. Cryptita Plays does not make a tax-deductibility claim on this page without approved documentation."],
];

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header site-header-solid">
      <div className="container nav-inner">
        <Link href="/" className="brand-lockup" aria-label="Cryptita Plays home">
          <img src={ASSETS.logo} alt="Cryptita Plays" className="brand-logo" />
          <img src={ASSETS.mark} alt="" className="brand-mark" aria-hidden="true" />
        </Link>
        <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <Link href="/">Home</Link>
          <a href="/#programs">Programs</a>
          <a href="/#approach">Approach</a>
          <Link href="/donate" className="nav-donate">Donate <ArrowRight className="arrow-up-right" /></Link>
        </nav>
        <button className="menu-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

function Donate() {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const addressReady = Boolean(donationConfig.walletAddress);

  const copyAddress = async () => {
    if (!addressReady) {
      toast("The public wallet address is being verified before publishing.");
      return;
    }
    await navigator.clipboard.writeText(donationConfig.walletAddress);
    setCopied(true);
    toast.success("Wallet address copied");
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="site-shell donate-page">
      <SiteHeader />
      <main>
        <section className="donate-hero">
          <div className="donate-hero-glow" aria-hidden="true" />
          <div className="container donate-hero-grid">
            <div className="donate-hero-copy">
              <Link href="/" className="back-link"><ArrowLeft /> Back to Cryptita Plays</Link>
              <div className="eyebrow donate-eyebrow"><span className="eyebrow-line" /> Crypto giving, made clear</div>
              <h1>Make room for<br /><em>what comes next.</em></h1>
              <p>Support the books, learning spaces, workshops, and scholars that help communities meet a digital future with confidence.</p>
              <div className="donate-proof-row"><span><ShieldCheck /> Transparent by design</span><span><LockKeyhole /> Non-custodial flow</span></div>
            </div>
            <div className="donate-orb-wrap" aria-hidden="true"><div className="donate-world-card"><img src={ASSETS.library} alt="" /><span>Books, spaces, scholars</span></div><div className="donate-orb"><div className="orb-core">CP</div><div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><span className="orb-node orb-node-a" /><span className="orb-node orb-node-b" /><span className="orb-node orb-node-c" /></div><div className="donate-orb-caption"><span>Give with intention</span><span>01</span></div></div>
          </div>
        </section>

        <section className="donate-flow-section section-padding">
          <div className="container donate-flow-layout">
            <div className="donate-flow-intro"><div className="chapter-label"><span className="chapter-dot" /> Your contribution</div><h2>Choose clarity<br />over complexity.</h2><p>Crypto can move quickly. Our donation page is designed to slow the important parts down: check the network, verify the address, then send only what you intend.</p><div className="giving-steps"><div><span>01</span><p>Check the verified network</p></div><div><span>02</span><p>Copy or scan the address</p></div><div><span>03</span><p>Confirm on-chain</p></div></div></div>
            <div className="donation-card">
              <div className="donation-card-top"><div><span className="card-kicker">Support the work</span><h3>{donationConfig.campaignLabel}</h3></div><CircleDollarSign /></div>
              <div className="network-select-label">Supported network</div>
              <div className="network-pill"><div className="network-icon">B</div><div><strong>{donationConfig.network}</strong><span>{donationConfig.chainLabel}</span></div><Check /></div>
              <div className="donation-warning"><AlertTriangle /><p><strong>Only send on the published network.</strong> Assets sent through another network may be permanently lost. Always verify this page before donating.</p></div>
              <div className="wallet-label-row"><span>Public wallet address</span><span className={addressReady ? "status-live" : "status-pending"}><span /> {addressReady ? "Verified" : "Pending verification"}</span></div>
              <div className={`wallet-box ${addressReady ? "is-ready" : "is-pending"}`}>
                <div className="qr-placeholder"><QrCode /><span>{addressReady ? "Scan to give" : "QR will appear here"}</span></div>
                <div className="wallet-address"><span>{addressReady ? donationConfig.walletAddress : "Public address will be published after final network verification."}</span><button onClick={copyAddress} aria-label="Copy wallet address" disabled={!addressReady}>{copied ? <Check /> : <Copy />}</button></div>
              </div>
              <div className="donation-card-actions"><button className="button button-primary full-button" onClick={copyAddress} disabled={!addressReady}>{copied ? "Address copied" : addressReady ? "Copy wallet address" : "Address coming soon"}{copied ? <Check /> : <Copy />}</button>{donationConfig.explorerUrl && <a href={donationConfig.explorerUrl} target="_blank" rel="noreferrer" className="explorer-link">View public wallet <ExternalLink /></a>}</div>
              <p className="donation-note"><WalletCards /> The final public address is intentionally not shown until Cryptita Plays verifies the asset, chain, and custody details.</p>
            </div>
          </div>
        </section>

        <section className="allocation-section section-padding">
          <div className="container">
            <div className="allocation-heading"><div><div className="chapter-label"><span className="chapter-dot" /> Where it goes</div><h2>A contribution can become<br /><em>a place to learn.</em></h2></div><p>Every chapter of the work is connected. Support helps the organization keep building access from the first book to the next confident question.</p></div>
            <div className="allocation-grid"><div className="allocation-card"><span>01</span><BookIcon /><h3>Mini-libraries</h3><p>Books, safe spaces, and learning resources in communities with limited connectivity.</p></div><div className="allocation-card allocation-card-dark"><span>02</span><WorkshopIcon /><h3>Workshops</h3><p>University seminars and community sessions grounded in safety and context.</p></div><div className="allocation-card allocation-card-violet"><span>03</span><ScholarIcon /><h3>ACIS scholars</h3><p>Monthly educational assistance, supplies, and encouragement for selected learners.</p></div></div>
          </div>
        </section>

        <section className="trust-section section-padding"><div className="container trust-layout"><div className="trust-symbol"><ShieldCheck /></div><div><div className="chapter-label"><span className="chapter-dot" /> A note on trust</div><h2>Transparency is part of the program.</h2><p>Cryptita Plays believes donors should understand where they are giving and how to verify what happens next. As the campaign grows, this page can publish verified wallet details, transaction links, campaign updates, and program reports in one place.</p><Link href="/#approach" className="small-link">Read our approach <ArrowRight /></Link></div></div></section>

        <section className="faq-section section-padding"><div className="container faq-layout"><div className="faq-heading"><div className="chapter-label"><span className="chapter-dot" /> Before you send</div><h2>Good questions<br />are welcome.</h2><p>Crypto donations are irreversible. If something on this page feels unclear, pause and ask before sending.</p><a className="faq-contact" href="mailto:cryptitaplays@gmail.com">Ask Cryptita Plays <ArrowRight /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

        <section className="donate-bottom-cta"><div className="container"><div className="chapter-label chapter-label-light"><span className="chapter-dot" /> Keep the bridge open</div><h2>Learning is a<br /><em>shared asset.</em></h2><Link href="/" className="button button-light">Return to the story <ArrowLeft /></Link></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-main"><Link href="/" className="footer-brand"><img src={ASSETS.logo} alt="Cryptita Plays" /></Link><div className="footer-contact"><span>Questions about giving?</span><a href="mailto:cryptitaplays@gmail.com">cryptitaplays@gmail.com</a><a href="tel:+639060925761">+63 906 092 5761</a></div><div className="footer-links"><a href="https://www.instagram.com/cryptitaplays" target="_blank" rel="noreferrer">Instagram <ExternalLink /></a><Link href="/">Home <ArrowRight /></Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Cryptita Plays</span><span>Education over hype. People over technology.</span><span>Philippines</span></div></footer>
    </div>
  );
}

function BookIcon() { return <div className="allocation-icon"><span /><span /></div>; }
function WorkshopIcon() { return <div className="allocation-icon network-symbol"><span /><span /><span /></div>; }
function ScholarIcon() { return <div className="allocation-icon heart-symbol">♡</div>; }

export default Donate;
