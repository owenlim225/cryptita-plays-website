# Cryptita Plays editorial calendar

Prepared 5 October 2026 (Asia/Manila). Audience: Philippines; language: English. Purpose: document the organization's work and help people understand its programs. Facebook is the primary official social channel: https://www.facebook.com/cryptitaplays.

Two substantive updates per month are the agreed capacity. Dates below are editorial targets, not claims that events occurred or commitments to invent reports. Updating a program page with verified evidence counts as an update. If evidence is unavailable, move the slot; do not publish an empty event report to meet the calendar.

| Target | Piece and existing source | Evidence needed from the organization | Destination and useful action |
| --- | --- | --- | --- |
| 15 October 2026 | Mini-Library Mission: one documented community visit. Existing program notes name Murcia, Kabatuhan, Comota National High School and Marinduque. Choose one actual visit. | Organizer's confirmed date and location; what was provided; approved photos/captions; verified counts only where recorded; one approved reflection. | Update `/initiatives/mini-library-mission-outreach`; add a story only when it has a complete firsthand account. Link back to the program. |
| 29 October 2026 | Web3 On Campus: how a real session introduced digital safety. | Confirm the institution and session date; actual agenda; a teaching example; participant feedback with permission; approved institution name and photographs. | Update `/initiatives/web3-on-campus`; use a verified classroom example to finish the current draft article if suitable. Invite readers to explore the initiative. |
| 12 November 2026 | Builder Programs: Learn → Build → Deploy → Showcase in practice. | One real project, learner/team permission, confirmed workshop/cohort details, public demo or repository if shareable, what the learner actually completed. | `/initiatives/builder-programs` and a case study when ready; link the relevant project and program. |
| 26 November 2026 | ACIS: how educational support works. | Confirm current selection and support process, coordinator-approved description, what can safely be shared. Use aggregate reporting; do not publish children's private details. | Strengthen `/initiatives/acis-adopt-a-child-iskolar`; link to Contact for organizational questions. |
| 10 December 2026 | Books and learning resources: a practical activity using an existing book. | Author-approved excerpt/activity, book availability and correct credits; accurate instructions; permission for any reproduced material. | Update the existing homepage Books section or a sufficiently complete resource page when approved; avoid an empty new landing page. |
| 24 December 2026 | Documented program review: what the organization learned. | Review the preceding published updates; confirm outcomes, limits and next steps with the founder. Distinguish future goals from completed work. | A grounded story linked to the relevant initiatives and Who We Are. Move this target if the holiday schedule makes it impractical. |

## Repeatable workflow

1. Seven days before a target, the organization supplies source notes, approved media and the person who can confirm facts. A file's name or timestamp is not sufficient evidence of an event's date.
2. Draft in English with a clear title, what happened or what the program does, why it matters, and relevant program links. Name the actual author/editor only with confirmation.
3. Verify names, dates, locations, attributed quotes and counts against source records. Keep drafts marked `publicationStatus: "draft"`; never fabricate bylines, publication dates or impact statistics.
4. The responsible organizational editor approves factual claims and media use. Set `publicationStatus: "published"` only when ready; set `publishedAt` to the actual publication date and `updatedAt` only after a substantive update.
5. Check the published page's title, canonical, readable mobile layout, alt text, links and sitemap inclusion. Keep one main page per subject and link stories to their associated initiatives.
6. The owner may share the published `.com` URL on Facebook and other official profiles. This calendar does not send or schedule external posts.
7. At the next monthly review, use available Search Console impressions, clicks and indexing evidence to refine useful topics. A new site's sparse data is not a reason to manufacture additional content.

## Current editorial gaps

`client/src/content/initiatives.ts` contains program descriptions and explicit evidence requests in impact fields. Public initiative rendering omits those drafting prompts and wholly empty impact sections; no replacement outcomes are invented. Those source prompts remain the collection checklist for the editor.

The existing `sampleStory` is a draft, with its sample disclosure intact. It is excluded from the public story listing and must stay out of the sitemap and search index until the organization supplies an approved factual account. Homepage teasers now point to existing initiatives rather than implying that future stories or reading times are already available.

No future publication or reminder is scheduled by this file. The editorial targets require firsthand inputs and review; implementation work cannot manufacture that evidence.
