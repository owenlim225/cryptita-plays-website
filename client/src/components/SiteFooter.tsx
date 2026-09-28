import { Link } from "react-router";

const sitemapLinks = [
  { label: "Home", to: "/" },
  { label: "Mission", to: "/#mission" },
  { label: "Programs", to: "/#programs" },
  { label: "Books & resources", to: "/#learning" },
  { label: "Approach", to: "/#approach" },
  { label: "Impact", to: "/#impact" },
  { label: "Our Story", to: "/#our-story" },
  { label: "Who We Are", to: "/who-we-are" },
  { label: "Engage with us", to: "/engage" },
  { label: "Stories & events", to: "/#events" },
  { label: "Donate", to: "/donate" },
  { label: "How to give", to: "/donate#giving" },
  { label: "Where it goes", to: "/donate#where-it-goes" },
  { label: "Giving & trust", to: "/donate#trust" },
  { label: "Giving FAQ", to: "/donate#faq" },
] as const;

const informationLinks = [
  { label: "FAQ", to: "/faq" },
  { label: "Who We Are", to: "/who-we-are" },
  { label: "Engage with us", to: "/engage" },
  { label: "Terms of Use", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Cookie Policy", to: "/cookies" },
] as const;

const socialLinks = [
  { label: "X / Twitter", href: "https://x.com/cryptitaplays" },
  { label: "Instagram", href: "https://www.instagram.com/cryptitaplays/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cryptitaplays/" },
  { label: "Telegram", href: "https://t.me/cryptitaplays" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact" aria-label="Contact and site links">
      <div className="container footer-main">
        <div className="footer-intro">
          <Link to="/" className="footer-brand" aria-label="Cryptita Plays home">
            <img src="/brand/cryptita-plays-banner.png" alt="Cryptita Plays" />
          </Link>
          <p>Bridging Web3 Education and Social Impact</p>
          <a className="footer-email" href="mailto:cryptitaplays@gmail.com">cryptitaplays@gmail.com</a>
        </div>

        <nav className="footer-column" aria-label="Sitemap">
          <h2>Sitemap</h2>
          <ul>{sitemapLinks.map(({ label, to }) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul>
        </nav>

        <nav className="footer-column" aria-label="Information">
          <h2>Information</h2>
          <ul>{informationLinks.map(({ label, to }) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul>
        </nav>

        <div className="footer-column footer-contact">
          <h2>Contact Us</h2>
          <ul>
            <li><a href="mailto:cryptitaplays@gmail.com">General inquiry</a></li>
            <li><a href="mailto:cryptitaplays@gmail.com?subject=Partnership%20inquiry">Partnership inquiry</a></li>
            <li><a href="tel:+639060925761">+63-906-0925-761</a></li>
          </ul>
        </div>

        <div className="footer-column footer-social">
          <h2>Follow us</h2>
          <div className="footer-social-links">
            {socialLinks.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <SocialIcon label={label} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        Copyright © 2018–{new Date().getFullYear()} Cryptita Plays. All rights reserved.
      </div>
    </footer>
  );
}

// SVG paths from the supplied footer-section.tsx.
function SocialIcon({ label }: { label: string }) {
  if (label === "X / Twitter") {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18.901 3H21l-6.876 7.86L22.5 21h-6.563l-5.137-6.164L5.405 21H3.304l7.353-8.405L1.5 3h6.73l4.644 5.581L18.901 3zm-2.3 16.438h1.164L7.61 4.476H6.36L16.6 19.438z" fill="currentColor" /></svg>;
  }

  if (label === "Instagram") {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 7.382a4.618 4.618 0 100 9.236 4.618 4.618 0 000-9.236zm0 7.622A3.007 3.007 0 018.997 12 3.007 3.007 0 0112 8.997 3.007 3.007 0 0115.004 12 3.007 3.007 0 0112 15.004z" fill="currentColor" />
      <path d="M17.884 7.197a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 3c-2.448 0-2.746.01-3.713.051-.957.052-1.615.196-2.18.422a4.311 4.311 0 00-1.595 1.039 4.311 4.311 0 00-1.039 1.594c-.226.566-.37 1.224-.422 2.18C3.011 9.255 3 9.553 3 12s.01 2.746.051 3.713c.042.957.196 1.615.422 2.18.226.597.535 1.091 1.039 1.595.504.504.998.813 1.594 1.039.576.226 1.224.37 2.18.422.957.04 1.266.051 3.714.051s2.746-.01 3.713-.051c.957-.042 1.615-.196 2.18-.422a4.311 4.311 0 001.595-1.039 4.311 4.311 0 001.039-1.594c.226-.576.37-1.224.422-2.18.04-.957.051-1.266.051-3.714s-.01-2.746-.051-3.713c-.042-.957-.196-1.615-.422-2.18a4.312 4.312 0 00-1.039-1.595 4.311 4.311 0 00-1.594-1.039c-.576-.226-1.224-.37-2.18-.422C14.745 3.011 14.447 3 12 3zm0 1.625c2.407 0 2.685.01 3.641.052.874.04 1.358.185 1.666.308.422.165.72.36 1.04.669.318.319.514.617.668 1.039.123.318.267.792.308 1.666.042.946.052 1.234.052 3.641s-.01 2.685-.052 3.641c-.04.874-.185 1.358-.308 1.666-.165.422-.36.72-.669 1.04a2.66 2.66 0 01-1.039.668c-.318.123-.792.267-1.666.308-.946.042-1.234.052-3.641.052s-2.685-.01-3.641-.052c-.874-.04-1.358-.185-1.666-.308a2.911 2.911 0 01-1.04-.669 2.659 2.659 0 01-.668-1.039c-.123-.318-.267-.792-.308-1.666-.042-.946-.052-1.234-.052-3.641s.01-2.685.052-3.641c.04-.874.185-1.358.308-1.666.165-.422.36-.72.669-1.04a2.658 2.658 0 011.039-.668c.318-.123.792-.267 1.666-.308.956-.042 1.234-.052 3.641-.052z" fill="currentColor" />
    </svg>;
  }

  if (label === "LinkedIn") {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19.663 3H4.327A1.32 1.32 0 003 4.306v15.398C3 20.424 3.597 21 4.327 21h15.336c.74 0 1.337-.576 1.337-1.296V4.306C21 3.586 20.403 3 19.663 3zM8.338 18.346H5.664V9.758h2.674v8.588zM7.001 8.575a1.54 1.54 0 01-1.543-1.543c0-.854.69-1.553 1.543-1.553.854 0 1.553.7 1.553 1.553 0 .854-.7 1.543-1.553 1.543zm11.335 9.771h-2.664V14.17c0-.997-.02-2.283-1.389-2.283-1.388 0-1.604 1.09-1.604 2.211v4.248h-2.664V9.758h2.561v1.172h.03c.36-.679 1.235-1.388 2.531-1.388 2.705 0 3.199 1.78 3.199 4.093v4.711z" fill="currentColor" /></svg>;
  }

  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.622 3.743L2.928 10.562c-1.208.517-1.208 1.208-.173 1.467l4.488 1.467 10.53-6.646c.517-.259.949-.172.604.173l-8.545 7.681.087.173-.087-.173-.345 4.66c.432 0 .69-.172.95-.43l2.243-2.159 4.575 3.366c.863.432 1.467.26 1.64-.776l3.02-14.24c.345-1.209-.431-1.727-1.294-1.382z" fill="currentColor" /></svg>;
}
