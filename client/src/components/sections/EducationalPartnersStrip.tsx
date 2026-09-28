import { educationalPartners } from "../../data/partners";
import { LogoLoop } from "../LogoLoop";

const headingId = "educational-partners-strip-heading";
const logos = educationalPartners.map(({ name, logo }) => ({ src: logo, alt: name }));

export function EducationalPartnersStrip() {
  return (
    <section className="partner-strip" aria-labelledby={headingId} id="partners">
      <div className="container">
        <h2 className="partner-strip__heading" id={headingId}>Our educational partners</h2>
      </div>
      <LogoLoop logos={logos} direction="left" speed={58} logoHeight={80} gap={72} accessibleLabel="Educational partner logos" />
    </section>
  );
}
