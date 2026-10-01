# Cryptita Plays website roadmap

Updated 2026-09-29. This is the website delivery plan; `sprint/` and `.codex/` describe agent tooling, not product features. Approve each later phase separately.

## Current baseline

- React Router serves eight public routes. The local production server returns real 404 responses; the protected Vercel preview renders the same not-found page. The current Home, Donate, information-page, and partner-strip designs are the visual baseline.
- Home content, books, partner names, policies, and navigation remain source-edited. There is no CMS, article route, member account, CRM, or website database.
- Google Calendar is the sole events/availability source. Maintainers edit events in Google Calendar; the website embeds the public calendar and offers an email inquiry link. Do not add Calendly or a custom booking database.
- The Donate page is informational and disabled. USDT/Binance Pay receiving details and wallet integration are deferred.
- The current preview hero uses curated photos from `client/public/images/`. The ignored local video is not a deployment dependency; an optimized video requires a separate media decision.

## Dependency edges

```text
Current site stabilization + owner content/asset review
    -> CMS choice and editor-role contract
    -> CMS pilot for one page and one post
    -> marketing/blog rollout + public SEO (requires canonical domain)
    -> production promotion

Verified donation destination + separate owner approval
    -> donation instructions later (independent of the CMS rollout)
```

## Phase 1 — stabilize the current site

**Goal:** keep the latest design and make local and Vercel previews behave consistently.

**Workstreams:** Homepage/media owns `client/src/pages/Home.tsx`, its section components, and related CSS. Routing/QA owns `client/routes/` and `scripts/smoke-routes.mjs`. Editorial review owns `docs/website-editorial-model.md` and a read-only approval queue for public claims, books, logos, photos, calendar events, and policy pages. Do not assign two implementation workers to Home or CSS at once.

**Gate:** `pnpm run check`, `pnpm run build`, all eight public routes, 404/noindex, hero asset, reduced-motion behavior, desktop/mobile visual review, and a protected Vercel preview. Build, route, preview, desktop, and mobile checks pass for this stabilization slice. Reduced-motion behavior is implemented but still needs a device/browser sign-off before production. Owner content and media approval also remains a production gate.

**Do not do yet:** add CMS dependencies, accounts, CRM, donation details, or new visual sections.

## Phase 2 — nontechnical editing pilot

**Goal:** choose a headless CMS without changing the approved page composition; let a maintainer edit and preview one marketing page and one news post without repository access.

**Dependency:** owner-approved content model, CMS choice, editor/publisher roles, and media permissions. Freeze the schema contract before parallel work: one worker owns CMS types and editor configuration, another owns server-side reads and preview authorization, and another owns the post/page presentation components. Calendar events remain in Google Calendar.

**Gate:** draft preview is access-controlled and noindex; an approved publish/unpublish change updates server-rendered HTML, lists, and route behavior. No editor credential reaches browser code.

**Do not do yet:** migrate every section, create member accounts, or store donor records.

## Phase 3 — public content and SEO rollout

**Goal:** move approved marketing copy and blog/news into the CMS, add indexable post URLs, sitemap, canonical and social metadata, and a redirect process for changed slugs.

**Dependency:** Phase 2 pilot, approved copy/images/credits/partner use, and the canonical production domain. SEO route work and content entry can proceed in parallel after the URL contract is fixed.

**Gate:** published pages render in initial HTML and appear in the sitemap; drafts and removed posts do not; metadata and redirects match public URLs; production content and policies receive owner review.

**Do not do yet:** custom community product, CRM, or wallet connection.

## Later — donation activation

Require separate owner approval of the exact Binance Pay receiving QR/address, USDT instructions, custody responsibility, campaign accounting, and compliance wording. Verify the destination out of band before enabling any donation action. Website wallet integration remains a later optional decision.

## Decisions still needed

1. CMS provider and who may edit versus publish.
2. Canonical domain for public SEO and production promotion.
3. Approval of partner/logo use, book titles and credits, founder image, event visibility, ACIS wording, and policy text.
4. Whether an optimized, hosted hero video should replace the photo baseline later.
5. Donation destination and operational decisions only when the donation phase is approved.
