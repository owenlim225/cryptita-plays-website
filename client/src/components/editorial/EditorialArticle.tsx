import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { EditorialStory } from "../../content/editorial-types";
import { SiteFooter } from "../SiteFooter";

type Props = { story: EditorialStory; backHref: string; backLabel: string; listingHref?: string };

export function EditorialArticle({ story, backHref, backLabel, listingHref }: Props) {
  const published = story.publishedAt ? new Date(story.publishedAt) : null;
  const publishedLabel = published && !Number.isNaN(published.valueOf())
    ? new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(published)
    : null;

  return <div className="site-shell editorial-shell">
    <header className="site-header site-header-solid"><div className="container nav-inner">
      <Link to="/" className="brand-lockup" aria-label="Cryptita Plays home"><img src="/brand/cryptita-plays-banner.png" alt="Cryptita Plays" className="brand-logo" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><Link to="/initiatives">Initiatives</Link><Link to="/stories">Field Notes &amp; Events</Link><Link to="/contact" className="nav-donate">Contact us <ArrowRight /></Link></nav>
    </div></header>
    <main className="editorial-main">
      <article>
        <div className="editorial-heading container">
          <Link to={backHref} className="back-link"><ArrowLeft /> {backLabel}</Link>
          <div className="chapter-label"><span className="chapter-dot" /> {story.category}</div>
          <h1>{story.title}</h1>
          <p className="editorial-deck">{story.intro || story.summary}</p>
          {(story.author || publishedLabel) && <div className="editorial-byline">{story.author && <span>By {story.author}</span>}{publishedLabel && <time dateTime={story.publishedAt}>{publishedLabel}</time>}</div>}
        </div>
        <figure className="editorial-hero container">
          <img src={story.heroImage} alt={story.imageAlt || ""} />
          {story.imageCaption && <figcaption>{story.imageCaption}</figcaption>}
        </figure>
        {!!story.gallery?.length && <section className="editorial-media container" aria-label={`${story.title} photo and video gallery`}>
          <div className="editorial-media-heading"><div className="chapter-label"><span className="chapter-dot" /> From the field</div><p>Media from this initiative</p></div>
          <div className="editorial-media-grid">{story.gallery.map((media, index) => <figure className="editorial-media-item" key={media.src}>
            {media.type === "video" ? <video controls preload="none" aria-label={media.alt}><source src={media.src} /></video> : <img src={media.src} alt={media.alt} loading="lazy" />}
            <figcaption>{media.alt || `Program ${media.type} ${index + 1}`}</figcaption>
          </figure>)}</div>
        </section>}
        <div className="editorial-body">
          {story.sections.map((section, index) => <section className="editorial-section" key={`${section.heading}-${index}`}>
            <span className="editorial-section-number">{String(index + 1).padStart(2, "0")}</span>
            <div><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}{section.bullets?.length ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</div>
          </section>)}
          {listingHref && <div className="editorial-related"><span className="chapter-label"><span className="chapter-dot" /> Keep exploring</span><Link to={listingHref} className="text-link">More stories <ArrowRight /></Link></div>}
        </div>
      </article>
    </main>
    <SiteFooter />
  </div>;
}
