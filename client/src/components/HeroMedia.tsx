import { useEffect, useRef, useState } from "react";
import { heroPoster } from "../lib/responsive-images";

const VIDEO = "/images/tambunan-outreach-hero.mp4";
const PHOTOS = [
  heroPoster.src,
  "/images/community-gathering.jpg",
  "/images/classroom-session.jpg",
  "/images/group-discussion.jpg",
];

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!motionAllowed || failed || !video) return;
    setPlaying(false);
    let active = true;
    let timeout: ReturnType<typeof setTimeout>;
    const clear = () => clearTimeout(timeout);
    const fail = () => { if (active) { clear(); setPlaying(false); setFailed(true); } };
    const watch = () => { clear(); timeout = setTimeout(fail, 15000); };
    const started = () => { clear(); setPlaying(true); };
    video.addEventListener("playing", started);
    video.addEventListener("waiting", watch);
    video.addEventListener("error", fail);
    // Catch rejected autoplay as well as network/decoder errors. A still photo
    // covers startup; only a failure starts the backup carousel.
    video.muted = true;
    watch();
    video.play().catch(fail);
    return () => {
      active = false;
      clear();
      video.removeEventListener("playing", started);
      video.removeEventListener("waiting", watch);
      video.removeEventListener("error", fail);
      video.pause();
    };
  }, [motionAllowed, failed]);

  useEffect(() => {
    if (!failed || !motionAllowed) return;
    const timer = window.setInterval(() => setPhotoIndex(index => (index + 1) % PHOTOS.length), 5000);
    return () => window.clearInterval(timer);
  }, [failed, motionAllowed]);

  return <>
    {(!playing || failed || !motionAllowed) && <img key={PHOTOS[photoIndex]} {...(photoIndex === 0 ? heroPoster : { src: PHOTOS[photoIndex] })} sizes="100vw" alt="" aria-hidden="true" className="hero-fallback-image" />}
    {motionAllowed && !failed && <video
      ref={videoRef}
      src={VIDEO}
      className={`hero-video${playing ? " is-playing" : ""}`}
      autoPlay muted loop playsInline preload="auto"
      poster={PHOTOS[0]}
      aria-hidden="true" tabIndex={-1}
    />}
  </>;
}
