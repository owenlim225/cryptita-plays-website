# Cloudflare hosting and media

## Environments

The owner confirmed **cryptitaplays.com** (including the final `s`) on 2026-10-05.

| Environment | Branch | Public URL | Worker | R2 bucket |
| --- | --- | --- | --- | --- |
| Production | `main` | https://cryptitaplays.com | `cryptita-play-production` | `cryptita-plays-media-production` |
| Staging | `staging` | https://staging.cryptitaplays.com | `cryptita-play-staging` | `cryptita-plays-media-staging` |

Both sites use React Router server rendering on Workers, with static JS/CSS assets. Cloudflare manages the custom-domain certificates. `www.cryptitaplays.com` redirects to the apex with HTTP 308, preserving path and query. Staging is publicly accessible by owner choice, with `X-Robots-Tag: noindex, nofollow, noarchive` on responses and a disallow-all robots.txt. These controls discourage indexing; they are not authentication. Workers.dev and preview URLs are disabled.

Wrangler configuration is in `wrangler.jsonc`. The compatibility date is 2026-10-04: the current UTC date supported by the deployed runtime when configuration was created (2026-10-05 in Manila). Runtime logs sample 10% of requests. Every request enters the Worker so staging headers and the www redirect also apply to static files.

## Deployments

Install with `npm ci`, then run:

```sh
npm run cf:types
npm run check
node --experimental-strip-types --test scripts/media.test.mjs
npm run build:cloudflare
npx wrangler deploy --env staging
node scripts/verify-cloudflare.mjs staging
npx wrangler deploy --env production
node scripts/verify-cloudflare.mjs production
```

`.github/workflows/cloudflare.yml` deploys pushes to `main` and `staging` to their matching environments, with the same checks. GitHub needs the repository secret `CLOUDFLARE_API_TOKEN` and variable `CLOUDFLARE_ACCOUNT_ID`. Never commit a token or use a short-lived Wrangler OAuth token for CI. The owner configures the persistent token directly in GitHub. Cloudflare's Edit Workers template can be restricted to the target account and zone. R2 migration credentials are only needed when uploading media, not during ordinary builds.

Use `npm run build:cloudflare` for Cloudflare. The regular build retains the existing Vercel preset for rollback compatibility. Local Node preview also remains available. Cloudflare builds copy only referenced, approved public assets into a temporary build directory. They exclude inventories, READMEs, camera RAW files, unused originals, and unpublished videos. The final R2 asset map lets CI build without the local-only media directory. The source directories are never deleted by the build or migration scripts.

## Media contract

`media-audit.json` records local source paths, original public paths, byte sizes, MIME types, SHA-256 hashes, code references, and existing attribution notes. The owner approved assets currently displayed on the site for public use on 2026-10-05. Unknown credits remain unknown; the repository's MIT software license is not evidence of media licensing. Unreferenced files remain excluded pending review.

The central map is `shared/media-assets.json`. Its keys are stable public asset identifiers/paths; `publicUrl` records the explicit old-to-new mapping (unchanged). Each entry maps to an R2 key derived from the full SHA-256 hash and extension. Identical files can share an object without changing their editorial associations or URLs. A changed image gets a new object key, preserving the previous version for rollback.

R2 buckets are private. The website Worker has the bucket binding and serves only paths present in the central map. There is no public write endpoint, public bucket listing, R2 development URL, or permissive CORS configuration. Same-origin media needs no cross-origin CORS policy. Objects have their media content type and `Cache-Control: public, max-age=3600`. Public responses also provide byte lengths, SHA-256 ETags, Last-Modified, conditional responses, and byte-range support. Long immutable caching is deliberately avoided for stable URLs whose contents may change later.

Editorial text and initiative/blog/news records stay in `client/src/content/`; existing page copy stays in the application. No CMS has been selected or introduced. R2 stores media, not the editorial content model. The original `client/public/media/inventory.json` remains the attribution and editorial-context source, with this audit providing migration-specific evidence.

To upload an approved asset set with local originals available:

```sh
npx wrangler login
node scripts/migrate-media.mjs staging
node scripts/migrate-media.mjs production
```

Uploads are resumable, retry individual requests, stream file bodies, and verify full SHA-256 checksums after uploading. Existing content-addressed objects are read and compared; a mismatch stops migration rather than overwriting them. The scripts generate candidate maps under `tmp/` only after all uploads for an environment succeed. Compare the two maps before replacing the active central map, deploy staging, and validate before production promotion. Update metadata and the inventory alongside any new media. Current permission approval must not be assumed to cover newly added files.

## Known exceptions

- `/media/brand/cryptita-feature-placeholder.jpg` did not exist. The fallback constant now points to the approved `/images/learning-event.jpg`.
- `/media/initiatives/blockchain4youth/20260530_161709.mp4` was referenced but absent locally. Its broken gallery entry was removed; its inventory note remains. Playback cannot be verified until a playable, approved source is supplied.
- `client/public/images/tambunan-outreach.mp4` is a 184,373,058-byte local-only, unreferenced video. It is retained and excluded from publication/migration pending review.
- Nikon `.NEF` camera originals are not browser-displayable derivatives. They remain local, unmodified, and excluded pending source/rights review.
- Other unreferenced files and `assets/` source copies are retained. Consult the audit's `references` and `publicationPermission` fields for the exact list.
- The original site has no `srcset` or separately declared responsive variants. All declared image references and fallbacks are validated; no derivatives or transcoded videos are claimed.

Full GET responses are also cached through the Workers Cache API, keyed by environment origin and content hash. Changing the central map therefore selects a new edge cache entry without serving a stale object from the previous hash. Range and conditional requests bypass this full-response cache.

## Verification and cleanup

Run `node scripts/verify-cloudflare.mjs staging --full` and the production equivalent to validate public routes, redirects, noindex rules, every mapped media URL, MIME types, lengths, full-body checksums, a byte range, and a conditional request. Results are saved to `verification-staging.json` and `verification-production.json`. Browser checks cover rendering and image loading separately. Do not infer video playback success from byte-range unit tests: no available video is currently referenced by the published site.

Source cleanup is a separate step after successful validation. Keep an offline backup before untracking binaries. Remove only explicitly migrated and verified source files from Git tracking, retain local originals, keep the inventories, and ensure a clean checkout still builds and deploys. Unresolved/unreferenced files are not cleanup candidates. No history rewrite is included; untracking media does not remove it from older Git commits.

## Rollback

For deployment failures, use `npx wrangler deployments list --env staging` (or `production`), then `npx wrangler rollback <version-id> --env <environment>`. Pause automatic deploys or revert the offending Git commit as well, so the next push does not restore the failed version. Before R2 activation, the verified bundled-media versions were:

- Staging: `af29d5fe-7216-44e2-b414-b73a453ea7d4`
- Production: `6dc845c7-8717-401f-95c3-c3c366f953e2`

For media changes, revert the central map to the prior content hashes and redeploy; old R2 objects must remain available. If an object is lost, restore its original bytes from the preserved local source and re-run verification. Do not delete old objects during migration or ordinary deployment. Returning to bundled media requires restoring the corresponding build configuration and rebuilding with local originals available; the archived pre-R2 Worker versions already contain their bundled media.

## References

- [React Router on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/)
- [Workers custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [R2 Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/)
- [Wrangler commands](https://developers.cloudflare.com/workers/wrangler/commands/)
