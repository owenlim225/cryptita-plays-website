import { Link } from "react-router";
import { communityPartners } from "../../data/partners";
import { LogoLoop } from "../LogoLoop";

const headingId = "community-partners-strip-heading";
const logos = communityPartners.map(({ name, logo }) => ({ src: logo, alt: name }));

export function CommunityPartnersStrip() {
  return (
    <section className="partner-strip" aria-labelledby={headingId}>
      <Link to="/partners" className="partner-strip-link" aria-label="View all partners">
      <div className="container">
        <h2 className="partner-strip__heading" id={headingId}>Our community partners</h2>
      </div>
      <LogoLoop logos={logos} direction="right" speed={58} logoHeight={80} gap={72} accessibleLabel="Community partner logos" />
      </Link>
    </section>
  );
}
