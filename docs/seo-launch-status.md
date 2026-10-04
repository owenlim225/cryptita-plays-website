# SEO launch status — 5 October 2026

Technical SEO is deployed to cryptitaplays.com. Google Search Console setup and priority indexing submissions are complete, except that the submitted sitemap still needs a successful processed status from Google. Indexing and first-place rankings are not yet established or guaranteed. The .org domain was not modified.

## Deployed changes

- Server-rendered page titles, descriptions, canonical URLs, Open Graph and Twitter metadata across public content routes.
- Homepage WebSite and Organization structured data with Facebook first among the five confirmed official social profiles. Schema.org validation found zero errors and warnings; Google's Rich Results Test fetched the page but reported no supported rich-result items. These are different checks, and no rich-result appearance is promised.
- Permanent normalization to HTTPS and non-www, including clean trailing-slash redirects that preserve query strings.
- Dynamic 27-URL XML sitemap and robots.txt discovery. Empty story hub and draft sample story are excluded from the sitemap and carry noindex; publishing a real story enables its eligible listing automatically. Staging carries noindex headers.
- Clear organization introduction, program links and Facebook access; no invented impact statistics. Placeholder impact sections are omitted from public rendering. Content remains visible without animation JavaScript.
- Responsive WebP derivatives of approved images, with original files preserved. Eight referenced derivatives ship as static assets. Poppins is self-hosted using official licensed files; all five weights total 39,272 bytes and critical preloads total 15,700 bytes. Existing hero and book videos remain.
- SEO regression checks added to the existing deployment workflow. Deployment verification checks canonical metadata, redirects, sitemap eligibility, draft exclusions, media availability and image/font hashes.

## Search Console actions and actual results

Used the already verified domain property `sc-domain:cryptitaplays.com`; no new DNS records, users, permissions or verification credentials were needed.

| Action | Observed result |
| --- | --- |
| Ownership | Existing verified domain owner |
| Manual actions | No issues detected |
| Security issues | No issues detected |
| Homepage live inspection | Fetch successful; crawl and indexing allowed; correct declared canonical |
| Homepage Request Indexing | Accepted into priority crawl queue |
| `/who-we-are` Request Indexing | Accepted into priority crawl queue |
| `/initiatives` Request Indexing | Accepted into priority crawl queue |
| Sitemap submission | Submitted successfully; report still says **Couldn't fetch**, zero discovered pages |
| Sitemap live inspection | Google fetch successful, crawl allowed, indexing allowed at 06:03 Manila |
| Performance/indexing reports | Processing data; no trustworthy traffic or ranking baseline yet |

The sitemap was resubmitted once after a successful Google live fetch. Repeated submissions were stopped because they do not establish successful processing. Public HTTP checks return valid XML with 27 canonical URLs and status 200. The warning remains unresolved; a delayed report or later crawler attempt may change it, but that is not proven. Follow [Google's sitemap troubleshooting](https://support.google.com/webmasters/answer/7451001) if it persists. Do not loosen Cloudflare protections without evidence of a blocked Google crawl.

Evidence: [homepage request accepted](seo-evidence/homepage-indexing-request.jpg), [Google sitemap live fetch](seo-evidence/sitemap-live-fetch.jpg).

## Release and validation

- Final direct staging deployment: `7d3346dd-b2c1-4ecd-9047-430bcfc0d0df`.
- Final direct production deployment: `02a03749-300b-4030-85a3-d7e17376162d`.
- Pre-release production rollback reference: `90f8acbc-95d7-42bc-b945-865074671786`.
- TypeScript check, nine SEO tests, four existing media tests, production build and whitespace checks passed during this work.
- Staging and production live validation passed: 29 routes, 136 existing R2 media URLs, eight optimized image checksum checks and five font checksum checks. Existing media used availability/header/range/cache checks; this run did not download all original media for fresh full checksums. Production passed at 06:14 Manila.
- Desktop and mobile layout reviewed; final staging retained the original Poppins design and playing hero video. No browser errors observed during visual checks.

## Work after launch

### Mobile performance evidence

Single-run Lighthouse 13.5 mobile tests on 5 October, Moto G Power and slow 4G. There is no real-user field dataset yet. [Before performance optimization, 05:58](https://pagespeed.web.dev/analysis/https-cryptitaplays-com/5narsdpy7n?form_factor=mobile) and [after, 06:13](https://pagespeed.web.dev/analysis/https-cryptitaplays-com/8patlxuldy?form_factor=mobile):

| Metric | Before | After |
| --- | --- | --- |
| Performance | 63 | 70 |
| Accessibility | 100 | 100 |
| Best practices | 96 | 96 |
| SEO | 100 | 100 |
| First contentful paint | 3.0 s | 2.4 s |
| Largest contentful paint | 11.3 s | 8.8 s |
| Total blocking time | 0 ms | 20 ms |
| Cumulative layout shift | 0.154 | 0 |
| Speed index | 3.3 s | 4.4 s |
| Image-delivery estimated savings | 8,419 KiB | 297 KiB |

LCP is still poor; the reported element is the hero heading. Speed index regressed in this run and lab results vary. The best-practices deduction came from a hero-video connection failure inside Google's test; the media URL passed independent production verification and video playback worked in the browser. Further mobile LCP/media profiling remains warranted. These scores do not establish Google rank or a complete accessibility audit.

### Operational follow-up

1. Recheck the sitemap report and processing reports after Google has had time to crawl. If the warning persists, inspect crawl logs and DNS/HTTP delivery with evidence before changing configuration.
2. Once data is available, establish a Philippines baseline for the branded queries **cryptita plays** and **cryptitaplays**, separately tracking homepage impressions, clicks, CTR and average position. Inspect Google-selected canonicals and indexed pages. Use several weeks of data, not one personalized search.
3. Publish two genuine, source-backed organizational updates monthly using the [editorial calendar](seo-editorial-calendar.md). The owner supplies approved dates, locations, photos, participation figures and outcomes; draft placeholders must not be promoted as evidence.
4. Keep official social-profile website links pointed to .com and seek relevant earned partner links. No external profiles, posts or messages were modified or sent in this execution.
5. Review mobile field performance when enough real-user data exists; retain lab measurements as diagnostics, not ranking guarantees.

No recurring monitoring job was created. This file records the remaining operational work rather than implying it is already running.
