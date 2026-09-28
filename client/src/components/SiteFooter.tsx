import { ArrowRight, Instagram, Linkedin, Send } from "lucide-react";
import { Link } from "react-router";

const socialLinks = [
  { label: "X / Twitter", display: "@cryptitaplays", href: "https://x.com/cryptitaplays", icon: "x" },
  { label: "Instagram", display: "@cryptitaplays", href: "https://www.instagram.com/cryptitaplays/", icon: "instagram" },
  { label: "LinkedIn", display: "Cryptita Plays", href: "https://www.linkedin.com/company/cryptitaplays/", icon: "linkedin" },
  { label: "Telegram", display: "Cryptita Plays", href: "https://t.me/cryptitaplays", icon: "telegram" },
] as const;

export function SiteFooter({ page }: { page: "home" | "donate" }) {
  const destination = page === "home" ? { label: "Donate", to: "/donate" } : { label: "Home", to: "/" };

  return (
    <footer className="site-footer" id="contact" aria-label="Contact and site links">
      <div className="container footer-main">
        <div className="footer-intro">
          <Link to="/" className="footer-brand" aria-label="Cryptita Plays home">
            <img src="/brand/cryptita-plays-banner.png" alt="Cryptita Plays" />
          </Link>
          <p>Education over hype. People over technology.</p>
        </div>

        <nav className="footer-column" aria-label="Footer pages">
          <h2>Explore</h2>
          <Link to={destination.to} className="footer-page-link">{destination.label} <ArrowRight aria-hidden="true" /></Link>
        </nav>

        <div className="footer-column footer-contact">
          <h2>Contact us</h2>
          <a href="mailto:cryptitaplays@gmail.com">cryptitaplays@gmail.com</a>
          <a href="tel:+639060925761">+63-906-0925-761</a>
        </div>

        <div className="footer-column footer-social">
          <h2>Follow us</h2>
          <span className="footer-handle">@cryptitaplays</span>
          <div className="footer-social-links">
            {socialLinks.map(({ label, display, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label}: ${display}`}>
                {icon === "x" ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.901 3H21l-6.876 7.86L22.5 21h-6.563l-5.137-6.164L5.405 21H3.304l7.353-8.405L1.5 3h6.73l4.644 5.581L18.901 3zm-2.3 16.438h1.164L7.61 4.476H6.36L16.6 19.438z" /></svg>
                ) : icon === "instagram" ? <Instagram aria-hidden="true" /> : icon === "linkedin" ? <Linkedin aria-hidden="true" /> : <Send aria-hidden="true" />}
                <span className="footer-social-copy"><strong>{label}</strong><small>{display}</small></span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Cryptita Plays. All rights reserved.</span>
        <span>Philippines</span>
      </div>
    </footer>
  );
}
