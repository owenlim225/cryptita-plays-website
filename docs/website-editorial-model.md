# Website editorial model for a future headless CMS

This document is the content and editing contract for a later CMS phase. It does not select a vendor or authorize publishing new claims. The React Router/Vercel foundation is in place; future editing work should preserve the current page designs.

## Current site and source reconciliation

- The live application source is `client/src/pages/Home.tsx`, `client/src/pages/Donate.tsx`, `client/src/pages/InformationPage.tsx`, and `client/src/App.tsx`. Routes are `/`, `/donate`, `/faq`, `/who-we-are`, `/engage`, `/terms`, `/privacy`, `/cookies`, and a catch-all 404. Home has hardcoded programs, books, partner strips, three **Coming soon** field-note cards, and an embedded public Google Calendar. There are no article routes or CMS integration.
- The user-supplied *Cryptita Plays — Organization and Frontend Content Guide* describes a different frontend structure and refers to `docs/00-master-context.md`, `docs/06-brand-kit.md`, `src/features/`, `src/components/sections/`, and `public/brand/`. Those paths are absent from this checkout. Treat its descriptions of those files, routes, and visible sections as historical context, not evidence of the current site.
- In particular, the current Home page **does** render a founder section, contrary to the guide's description of its other frontend. Its current program layout has four cards, while the guide describes a five-part approved program catalog. Model all five program entries without forcing five visible cards into the current layout. The existing educational and community partner strips are display components, not evidence that every relationship and logo use has been approved for production.
- The current site loads Poppins in `client/root.tsx` and uses a bespoke responsive type scale in `client/src/index.css`. The guide requests fixed Poppins 42px titles, DM Sans 36px subtitles, and Baloo 32px headings. Applying those exact roles would visibly change this design; record this as a design approval item for the later editorial phase rather than silently changing foundation styling.
- `assets/` contains brand marks, partner logos, and photos. Their presence does not prove image consent, logo-use permission, or that each image depicts the person or program named in alt text. Asset selection and captions require owner review.
- The homepage hero uses curated photos from `client/public/images/` for the current Vercel baseline. A large local-only video is ignored by Git and is not a published asset; use a separately approved, optimized media source if video returns later.

## Editing boundaries and content types

Maintain the visual system as approved components. A nontechnical editor can edit text, select approved images, and reorder approved section types where the page permits it; they cannot inject arbitrary HTML, custom CSS, scripts, or a donation destination.

| Type | Core fields | Publishing behavior |
| --- | --- | --- |
| **Site settings** | Canonical contact and social links; the approved public Google Calendar embed and full-calendar URLs; navigation labels; footer copy | Reviewed settings publish across the site. Editors manage event dates and details in Google Calendar, while the website displays the approved public calendar. Wallet/QR data is excluded. |
| **Marketing page** | Stable slug; page title and summary; ordered instances of approved section types; SEO title, description, and social image | Public URL renders published content and route-specific metadata. Home is a singleton; avoid making its layout fully free-form. |
| **Section** | Type; eyebrow, heading, body, call to action, and image fields relevant to that type | Use existing hero, mission, program, impact, founder, field-note, and CTA presentation patterns. Optional fields stay optional; no placeholder claim is filled automatically. |
| **Program** | Approved name, short description, audience, learning approach, optional image, order, and related links | Keep the five catalog entries distinguishable: Mini-Library Mission and Outreach; Replenish Mini-Library; Web3 Education Seminars and Workshops; Web3 Learning Materials Development; ACIS. The page may group them into fewer visual cards. |
| **Learning resource / book** | Exact title; optional approved description, cover, author, availability, and link | Permit title-only records. The current Home page displays covers and author credits for three books; confirm those titles, credits, and media rights before making them editable or adding purchase links. |
| **Blog/news post** | Title; unique stable slug; summary; body; approved cover and alt text; author/byline if confirmed; category (`news`, `field note`, or `learning`); publication time; SEO fields | Drafts and scheduled/unpublished posts are absent from public lists and sitemap. A published post has its own indexable URL. Do not convert current **Coming soon** cards into published posts without approved content. |

The **Events** section uses a public Google Calendar to show dates and locations. Maintainers update events in Google Calendar, not in the CMS. The site retains a full-calendar link and an email inquiry path. Do not model an independent event registration, attendee, or calendar database for launch; do not add Calendly.

The Donate page remains a designed but disabled/informational page during foundation and CMS work. No wallet address, Binance Pay QR, custody credential, or payment callback belongs in routine marketing content. The future donation phase needs separate owner approval for its destination and exact USDT payment instructions.

## Editors and publication workflow

1. **Editor:** staff maintainer can create drafts, edit approved fields, choose approved media, and preview pages/posts without code access. Editors cannot publish or change organization-wide destinations by themselves.
2. **Publisher:** designated organization owner reviews facts, partner attribution, image permission, accessibility, and links, then publishes or unpublishes. The same person may hold both roles for a small team, but the review step remains explicit.
3. **Administrator:** manages CMS users, roles, and integrations. Member accounts and donor identities are separate systems and are not created by CMS access.

Content moves **draft → preview → approved/published → revised or unpublished**. Preview URLs are access-controlled and excluded from indexing. Published content reaches the site through a server-side CMS read path or build process suited to the chosen hosting setup; the public site must never need an editor credential in browser JavaScript. Publishing/unpublishing must update page HTML, navigation/listing visibility, sitemap inclusion, and canonical metadata together. Preserve stable slugs; a slug change needs a redirect plan before publication.

## Claim and asset approval queue

The attached guide is a user-provided editorial brief, not a substitute for the missing `docs/00-master-context.md` it cites. Current Home copy is implemented text, not independent proof. Owner approval is required before adding or amplifying the following:

- Reach and impact numbers such as 8 years, 10,000 beneficiaries, 500+ events, and the separate 2 million / 54 countries / $23 million / 32 projects text described in the guide; none appears with supporting evidence in this checkout.
- Named testimonials, portraits, dates, founding-year claims, event announcements, partner endorsements, book titles and credits, and purchase links. The guide itself flags some provenance or details as missing. The current site already displays a founder portrait, book covers and credits, partner logos, and a `2018–present` footer claim; review them before production promotion.
- ACIS capacity: the guide's approved wording is **up to 5 students per Mini-Library area**. Current Home copy says an area *selects five* and visually shows `5 / area`; revise that claim only with owner-approved wording in a content phase, keeping the design treatment.
- The partner groups and logos must retain separate educational/community categories. The current Home page already displays 19 logos from `client/public/brand/partners/`; confirm names, permission, and current relationships before production promotion. Do not infer an endorsement from a supplied logo.
- Contact values in the guide are `cryptitaplays@gmail.com` and `+63-906-0925-761`; the current page uses the same email and phone destination with different display spacing. Verify these and all social destinations with the owner before migrating them into Site settings.
- The Terms, Privacy, and Cookie pages are present in `client/src/pages/InformationPage.tsx`. Review their wording against the actual embedded Google Calendar, hosting, media, and inquiry behavior before production promotion.

Copy should stay practical and beginner-friendly: education, digital safety, access, care, and responsible Web3 awareness. Exclude financial-return language, speculative adoption promises, and unsupported impact metrics.

## CMS phase acceptance checklist

- A maintainer with no repository access can edit text and an approved image, reorder allowed sections, preview, and request publication.
- A publisher can publish, correct, and unpublish one post; the public URL, homepage list, sitemap, metadata, and 404/redirect behavior agree with its state.
- An editor can update the approved Google Calendar display URLs and verify that the embed and full-calendar link agree; event dates and details remain editable in Google Calendar, and no booking data is stored by the site.
- A title-only book record does not require invented metadata. The five program records remain representable even when the homepage groups them into four cards.
- Unverified metrics, testimonials, logos, and media are blocked from publication until owner review; missing media falls back gracefully without fabricated imagery or captions.
- Home and Donate retain their current major section order, spacing, colors, and responsive behavior unless a separate design change is approved.
- CMS editor credentials, drafts, preview data, and donation destination settings do not appear in public HTML or browser bundles.

