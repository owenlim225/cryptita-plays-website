# Cryptita Plays SEO and Google Search Console Plan

Prepared 5 October 2026, Asia/Manila. This plan makes `https://cryptitaplays.com/` the clearest official destination for searches for **Cryptita Plays**, then builds discovery for its Web3 education and social-impact work. It covers engineering, Search Console, identity, content, external links, and measurement. Implementation has now been deployed; see [launch status and remaining work](seo-launch-status.md). Audit findings below describe the pre-implementation baseline.

The goal is a sustained first organic homepage result in the agreed market. No one can guarantee first position, indexing, a particular snippet, sitelinks, or placement above advertisements and other search features. Google controls those outcomes. [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## Decisions and known inputs

- User reports domain verification is complete and other Search Console setup has not been done. Preserve the existing verification; inspect its property type before adding anything.
- Canonical destination: `https://cryptitaplays.com/`.
- Confirmed audience: Philippines, English only. Translations and other country targets are outside the current scope.
- Confirmed purpose: the official website for the organization. Recommended priorities: make the organization easy to find, understand, and trust; help visitors explore its work; provide straightforward contact and Facebook access. Partnership inquiries are secondary, with no donation or sales conversion target required.
- User confirms ownership of `cryptitaplays.org` and explicitly requests leaving it untouched. Domain migration, redirects from .org, and Change of Address are outside this plan. Focus solely on .com; existing .org visibility may continue competing for the brand.
- Confirmed official channels: Facebook (primary), X, Instagram, LinkedIn, and Telegram. Facebook URL: https://www.facebook.com/cryptitaplays. Publishing capacity: two substantive updates per month. Continue using Cryptita Plays consistently; verify any additional organizational claims before publication.
- Search Console private reports, historical traffic, Google-selected canonicals, backlinks, and mobile field performance have not been inspected. The public search tool is not a controlled Google rank tracker; its results do not establish Google position or complete index coverage.

## Audit evidence

Public HTTP checks and source inspection on 5 October 2026 found:

| Item | Evidence | Consequence |
| --- | --- | --- |
| HTTPS homepage | HTTP 200, meaningful server-rendered HTML, title and description | Good starting foundation |
| HTTP homepage | HTTP 200 with redirects disabled | Add a permanent HTTPS redirect |
| HTTPS www homepage | HTTP 308 to `https://cryptitaplays.com/` | Preserve and test on deep paths |
| Sitemap | `/sitemap.xml` returned HTTP 404 | Build and submit a sitemap |
| Production robots | HTTP 200, allows crawling, no sitemap line | Add sitemap location |
| Canonicals and identity data | No canonical or JSON-LD found in sampled homepage, `/who-we-are`, or `/stories`; no implementation found in reviewed route/root files | Add shared metadata and appropriate structured data |
| Homepage title | `Cryptita Plays \| Web3 Education and Social Impact` | Retain this useful brand-focused title |
| Homepage H1 | `Bridging Web3 Education and Social Impact` | Make the brand explicit in nearby visible text; optionally refine heading |
| Invalid page | Random nonexistent URL returned HTTP 404 | Preserve real error status behavior |
| Staging | Homepage sends `X-Robots-Tag: noindex, nofollow, noarchive`; robots disallows all crawling | Resolve crawler blocking versus readable noindex |
| Other domain | `.org` appears in public search results and an initial fetch served a separate page; a later fetch failed | Owner confirms ownership and requests no changes; monitor competition only |
| Existing implementation | React Router SSR; route-specific titles/descriptions; editorial routes; `/donate` redirects to `/contact` in source | Extend existing architecture; exclude redirects from sitemap |

These are sampled checks, not a full crawl. Local uncommitted changes exist, so implementation must be reconciled against the deployed version.

## Delivery sequence and responsibility

Timing below is a work schedule after access and decisions are available, not a ranking forecast.

| Priority and window | Owner | Deliverable | Completion evidence |
| --- | --- | --- | --- |
| P0, days 1–2 | Site owner and SEO operator | Property/access review and brand baseline | Verified property recorded; inspection and baseline exports saved |
| P0, days 1–5 | Developer | HTTPS normalization, canonicals, sitemap, staging policy | Public HTTP and HTML checks pass |
| P1, week 1 | Developer and site owner | Brand copy, WebSite/Organization data, sharing metadata | Accurate visible content and valid markup |
| P1, weeks 1–2 | SEO operator | Sitemap submission and core-page inspection | Sitemap processed; issues classified; indexing requests recorded |
| P1, weeks 1–3 | Site owner | Owned-profile updates pointing to .com | Approved official website destinations verified |
| P2, weeks 2–4 | Editor and developer | Strong core pages, first substantive stories, performance fixes | Editorial review and mobile baseline comparison |
| P2, days 30–90 | SEO operator and editor | Weekly monitoring and monthly improvement | Branded visibility and conversion reports with next actions |

## Search Console setup and operating checklist

1. Open the existing property. Confirm whether it is the Domain property `cryptitaplays.com` or only a URL-prefix property. A verified Domain property covers protocols and subdomains. If only a prefix exists, add a DNS-verified Domain property when DNS access is available; retain useful existing properties. Keep the verification record in place. Assign access to named accounts with appropriate permissions. [Ownership verification](https://support.google.com/webmasters/answer/9008080)
2. Inspect the homepage before making changes. Record indexing status, last crawl, user-declared canonical, Google-selected canonical, crawl/index permissions, and rendered content. Live Test checks present accessibility; it does not prove inclusion in the index.
3. Review Page indexing, Sitemaps, HTTPS, Core Web Vitals, Manual actions, Security issues, and any existing removals. Resolve an actual blocking issue before expanding content. Empty reports on a new property are not automatically errors.
4. Export available Performance data for the last 28 and 90 days. If there is no data, record that fact and the setup date rather than inventing a baseline.
5. After the technical release, submit `https://cryptitaplays.com/sitemap.xml`. Confirm successful processing and inspect errors; sitemap acceptance is not proof every URL is indexed. [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
6. Inspect `/`, `/who-we-are`, `/initiatives`, `/partners`, `/engage`, `/contact`, `/stories`, and one real initiative and story detail page. Check both mobile-rendered content and selected canonical where available.
7. Request indexing for the homepage and a few important changed pages after fixes pass. Use sitemap discovery for the full set. Repeated daily requests do not accelerate crawling; allow days to weeks and follow actual report evidence. [Recrawl requests](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
8. Review indexing exclusions individually. Redirects, nonexistent URLs, and intentionally excluded previews need not be indexed. For important excluded pages, distinguish blocked crawling, noindex, duplicate canonical selection, discovery delays, and insufficient content before choosing a fix.

## Technical SEO implementation

**One preferred URL per page.** Redirect HTTP and alternate hostnames permanently to HTTPS non-www while preserving path and useful query parameters. Test HTTP/HTTPS, www/non-www, deep links, trailing slashes, and redirects already in the app. Avoid loops and unnecessary chains. Add one absolute, self-referencing canonical per indexable page; never canonicalize distinct stories to the homepage. Tracking parameters should resolve to the clean content canonical. Align internal links and sitemap URLs. [Canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

**Sitemap generation.** Generate from the actual route/content inventory so new stories and initiatives appear automatically. Include only canonical, public, indexable HTTP 200 URLs. Exclude staging, `/404`, unknown slugs, redirecting `/donate`, fragments such as `/#learning`, asset URLs, and parameter duplicates. Use truthful modification dates or omit them. Return XML with the right content type and add `Sitemap: https://cryptitaplays.com/sitemap.xml` to production robots. Keep policy pages accessible; their sitemap inclusion is optional and lower priority.

**Crawler access and rendering.** Keep titles, descriptions, main content, canonical, links, and JSON-LD in server HTML. Verify navigation uses crawlable links and that animation/hydration does not leave important content permanently hidden. Check representative media/CSS/JS URLs and any bot challenges using Search Console Live Test. A normal HTTP fetch alone does not prove Googlebot access. Preserve real 404 responses for invalid story and initiative slugs. [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

**Staging and preview hosts.** Prefer authenticated staging if it fits the review workflow. If staging must remain public, allow crawling so its noindex response header can be read; do not rely on `Disallow: /` plus noindex as guaranteed exclusion. Audit legacy Vercel/Workers preview URLs as well. Staging must never enter the production sitemap, internal links, or published brand URLs. [Noindex requirements](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

**Metadata and appearance.** Retain a distinct descriptive title and summary per route. Add Open Graph and social-card metadata with an approved share image and absolute URLs. This improves sharing consistency, not a guaranteed ranking signal. Verify the favicon is accessible and recognizable. Google can rewrite titles and snippets. [Titles](https://developers.google.com/search/docs/appearance/title-link), [snippets](https://developers.google.com/search/docs/appearance/snippet)

Proposed code responsibilities: shared metadata utility and `client/root.tsx`; route meta functions under `client/routes`; sitemap routing via `client/routes.ts` or the existing Worker; protocol/host/robots policy in `workers/app.ts`; content inventory under `client/src/content`; real editorial copy in the existing pages. Choose one sitemap implementation, not two competing endpoints.

## Brand identity and page content

Keep the exact public name consistent across the site and owned profiles. Candidate homepage introduction, subject to owner approval: “Cryptita Plays is a Philippine community initiative connecting Web3 education with social impact through learning programs, builder opportunities, and community partnerships.” Prefer specific, verified facts over unsupported claims about registration, impact numbers, founding dates, or partnerships.

| Page | Search intent and content requirement |
| --- | --- |
| Homepage | Official Cryptita Plays destination; clear introduction, main programs, current activity, official links, primary action |
| Who We Are | Mission, real team/founder information, history, operating geography, accountable contact, verified status |
| Initiatives and details | Explain each actual program, participants, locations, process, outcomes, photos, related stories, and how to engage |
| Partners | Explain actual relationship and projects, with approved names/logos and relevant outbound links |
| Stories and details | Original event/program reports with dates, author/editor, evidence, useful context, and related program links |
| Engage and Contact | Clear paths for schools, partners, volunteers, and supporters; working contact actions |
| FAQ | Answer real audience questions visibly; do not depend on FAQ rich results |
| Resources, if approved | Dedicated useful book/resource landing pages if enough original content exists; homepage fragments alone are not separate pages |

Add homepage `WebSite` data with name, canonical URL, and only genuine alternate names. Add an `Organization` entity describing the initiative with its URL, logo, and owner-confirmed `sameAs` links. Do not assert a legally registered nonprofit subtype or a physical business location without confirmation. These entities explain identity; they do not force ranking or a knowledge panel. [Site names](https://developers.google.com/search/docs/appearance/site-names), [Organization data](https://developers.google.com/search/docs/appearance/structured-data/organization)

Add Article and BreadcrumbList data to suitable editorial pages when the required facts and visible breadcrumb structure exist. Use Event only for real event detail pages with accurate status/date/location. Use VideoObject only for appropriate visible video content; background hero videos do not justify a separate video SEO project. A Person/ProfilePage is optional for a genuine individual bio, not the site's primary brand model. Validate supported types using Rich Results Test and site-name syntax with Schema Markup Validator. Follow the linked official guidance in the companion research file.

## External brand signals and the existing domain

The owner controls .org and has requested that it remain untouched. Do not change its hosting, content, redirects, Search Console settings, or indexing rules. Do not submit a Change of Address. This plan optimizes .com independently. Because the earlier site remains live, its existing links and identity signals are not automatically transferred; Google may continue showing it for branded searches. Monitor that competition without treating it as authorization to alter .org.

Use these owner-confirmed official profiles: `https://www.facebook.com/cryptitaplays` (primary), `https://x.com/cryptitaplays`, `https://www.instagram.com/cryptitaplays/`, `https://www.linkedin.com/company/cryptitaplays/`, and `https://t.me/cryptitaplays`. List Facebook first in site social links and include all five in planned Organization sameAs data. Recommend that the owner set `.com` as the website link on these profiles and align the name, logo, and bio. Linktree, YouTube, and TikTok remain unconfirmed and are not part of the official profile set.

Ask real school, event, and community partners to link relevant mentions to the homepage or the relevant program/story. Prepare a short approved organization bio and logo pack for them. Prioritize genuine existing relationships; do not buy ranking links, manufacture reviews, or mass-submit directory entries. These are proposed owner outreach actions, not messages sent by this plan. [Search Essentials](https://developers.google.com/search/docs/essentials)

## Content and performance work

Confirmed sustainable cadence: two substantive updates per month. First candidates are a complete mission/team page, a documented Mini-Library report, a Web3 campus workshop recap, and a builder-program case study. Each should answer an actual question using firsthand details, approved photos, named authors or editors, accurate dates, and a relevant action. There is no word-count quota. Avoid publishing generic crypto commentary or empty location pages just for keywords.

Broader discovery can follow: Web3 education programs in the Philippines, campus workshops, mini-library initiatives, and builder opportunities. Map each genuine intent to one strong page; use Search Console query evidence to refine targeting after data accumulates. Keep this content in English for the Philippine audience; no multilingual rollout is planned.

Measure mobile homepage, initiative detail, story detail, and contact performance with PageSpeed Insights and available field data. Target the good Core Web Vitals ranges at the 75th percentile: LCP at most 2.5 seconds, INP at most 200 ms, CLS at most 0.1. Investigate image/video weight, numerous image preloads, font loading, image dimensions, and third-party calendar loading before optimizing. Use responsive modern images, lazy-load below-fold media, reserve media space, and defer costly embeds where useful. No speed scores were measured in this audit; a Lighthouse score does not guarantee rank. [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)

## Measurement and review decisions

Search Console is sufficient for search visibility. Optional analytics can measure on-site actions; installing analytics is not an SEO requirement. If adopted, agree on privacy settings and track partnership/contact clicks, event sign-up clicks, and resource downloads. An email-link click is not a completed inquiry; reconcile with actual inquiries separately.

| Measure | Baseline and target | Review action |
| --- | --- | --- |
| Homepage indexing | Unknown; target indexed with preferred `.com` canonical | Fix crawl/noindex/duplicate/content issues based on inspection |
| Sitemap health | Currently missing; target processed with eligible URLs | Repair generation, fetch, XML, or URL eligibility problems |
| Exact brand visibility | Unknown; aim for sustained first organic homepage result in agreed market | Inspect competing domains, chosen canonical, identity, and trusted mentions |
| Branded performance | Clicks, impressions, CTR, average position by query, page, country, device | Compare rolling 28 days against previous 28 once enough data exists |
| Useful visitor actions | Optional diagnostics: program exploration, contact clicks, and Facebook visits; baseline unmeasured | Support understanding and access; do not impose sales or donation targets |
| Mobile experience | Unmeasured | Fix measured bottlenecks and reassess field data when available |

Use query filters for `cryptita plays` and `cryptitaplays`; optionally group related brand searches with a case-insensitive pattern such as `(?i)cryptita\s*plays`, then inspect exact and modified queries separately. Domain-property reports can include staging or other subdomains, so filter production HTTPS URLs. Average position is not a universal fixed rank; low-volume/anonymized query reporting limits precision. Record country/device/date for manual Google spot checks. [Performance report](https://support.google.com/webmasters/answer/7576553)

Week 1: verify release and sitemap processing. Weeks 2–4: review indexing and canonical choices weekly, update profiles, publish useful evidence. Days 30, 60, and 90: compare branded visibility, useful landing pages, and visitor actions. If the homepage is not indexed, resolve that before commissioning more content. If indexed but `.org` or social pages lead, prioritize .com identity evidence, current original content, and owner-approved external website links while leaving .org untouched. If impressions grow but clicks do not, inspect actual result appearance and competing features before rewriting copy.

## Release acceptance and remaining inputs

- All intended sitemap URLs return 200, are crawlable/indexable, and use correct HTTPS canonicals; redirects and 404s are excluded.
- HTTP and alternate hosts redirect correctly on homepage and deep paths; invalid detail slugs remain 404.
- Server HTML contains meaningful content and correct metadata, with no conflicting canonicals or production noindex.
- Staging/preview exclusion is deliberate and independently verified.
- Structured data matches visible facts and passes the applicable validators.
- Run existing `npm run check` and `npm run build:cloudflare` after implementation, plus targeted URL/metadata checks. Verify production after deployment; build success alone is insufficient.
- Search Console submission, sampled inspections, baseline, and owner responsibilities are recorded. Indexing is a monitored outcome, not a deploy gate with a guaranteed completion date.

Before Search Console implementation, confirm the existing verified property type and responsible account/DNS operator. Audience, official social profiles, organizational purpose, and publishing cadence are settled. Credentials are not needed in chat. The first build step can be HTTPS redirects, canonical metadata, and sitemap generation while owner-dependent content decisions remain pending.

See [Google source research](seo-google-research.md) for additional official references. No paid SEO platform is required to begin; developer time, owner decisions, and accurate content are the primary resources.


