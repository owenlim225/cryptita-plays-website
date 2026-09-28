import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type LogoLoopItem =
  | { src: string; alt: string }
  | { text: string; ariaLabel: string }
  | { node: ReactNode; ariaLabel: string };

export type LogoLoopProps = {
  logos: LogoLoopItem[];
  direction: "left" | "right";
  speed: number;
  logoHeight: number;
  gap: number;
  accessibleLabel: string;
};

export function LogoLoop({ logos, direction, speed, logoHeight, gap, accessibleLabel }: LogoLoopProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const [copyCount, setCopyCount] = useState(2);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const itemsKey = useMemo(
    () => logos.map((item) => ("src" in item ? item.src : "text" in item ? item.text : item.ariaLabel)).join("|") + `:${gap}:${logoHeight}`,
    [logos, gap, logoHeight],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const sequence = sequenceRef.current;
    if (!viewport || !sequence) return;
    const recalculate = () => {
      const width = sequence.getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      if (!width || !viewportWidth) return;
      setSequenceWidth((current) => (Math.abs(current - width) > 0.5 ? width : current));
      setCopyCount(Math.max(2, Math.ceil(viewportWidth / width) + 1));
    };
    const observer = new ResizeObserver(recalculate);
    observer.observe(viewport);
    observer.observe(sequence);
    recalculate();
    return () => observer.disconnect();
  }, [itemsKey]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !sequenceWidth) return;
    let frame = 0;
    let previousTime = 0;
    const sign = direction === "left" ? -1 : 1;
    const start = direction === "left" ? 0 : -sequenceWidth;
    offsetRef.current = 0;
    track.style.transform = `translate3d(${start}px, 0, 0)`;
    if (reducedMotion || speed <= 0) return;
    const animate = (time: number) => {
      if (previousTime) {
        offsetRef.current = (offsetRef.current + ((time - previousTime) * speed) / 1000) % sequenceWidth;
        track.style.transform = `translate3d(${start + sign * offsetRef.current}px, 0, 0)`;
      }
      previousTime = time;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [direction, speed, copyCount, reducedMotion, sequenceWidth]);

  const renderItem = (item: LogoLoopItem, index: number) => (
    <li className="partner-logo-loop__item" key={`${index}-${"src" in item ? item.src : "text" in item ? item.text : item.ariaLabel}`}>
      {"src" in item ? <img src={item.src} alt={item.alt} /> : "text" in item ? <span aria-label={item.ariaLabel}>{item.text}</span> : <span aria-label={item.ariaLabel}>{item.node}</span>}
    </li>
  );

  return (
    <div
      className="partner-logo-loop"
      ref={viewportRef}
      role="region"
      aria-label={accessibleLabel}
      style={{ "--partner-logo-gap": `${gap}px`, "--partner-logo-height": `${logoHeight}px` } as CSSProperties}
    >
      <div className="partner-logo-loop__track" ref={trackRef}>
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="partner-logo-loop__sequence"
            key={copyIndex}
            ref={copyIndex === 0 ? sequenceRef : undefined}
            aria-hidden={copyIndex > 0 ? true : undefined}
          >
            {logos.map(renderItem)}
          </ul>
        ))}
      </div>
    </div>
  );
}
