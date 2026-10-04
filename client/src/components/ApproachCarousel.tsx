import { useState } from "react";

const slides = [
  { title: "Foundational before advanced", copy: "Build understanding before asking anyone to participate.", image: "/media/initiatives/web3-on-campus/DSC_5578.JPG" },
  { title: "Honest about risks", copy: "Make digital safety and critical thinking part of every lesson.", image: "/media/initiatives/web3-on-campus/DSC_5591.JPG" },
  { title: "Designed for real access", copy: "Keep learning useful even when connectivity is inconsistent.", image: "/media/initiatives/mini-library/20260609_111450.jpg" },
];

export function ApproachCarousel() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  return (
    <section className="approach-carousel" id="approach" aria-label="Our approach" aria-roledescription="carousel">
      <img className="approach-background" src={slide.image} alt="" loading="lazy" />
      <div className="approach-vignette" aria-hidden="true" />
      <div className="container approach-carousel-inner">
        <div className="chapter-label chapter-label-light"><span className="chapter-dot" /> Our approach</div>
        <h2>Start with the person.<br />Then introduce the protocol.</h2>
        <div className="approach-slide" aria-live="polite" aria-atomic="true" role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${slides.length}`}>
          <h3>{slide.title}</h3><p>{slide.copy}</p>
        </div>
        <div className="approach-controls" role="group" aria-label="Choose an approach slide">
          {slides.map((item, index) => <button key={item.title} type="button" aria-pressed={index === active} onClick={() => setActive(index)}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{item.title}</span></button>)}
        </div>
      </div>
    </section>
  );
}
