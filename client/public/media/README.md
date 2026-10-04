# Media library

All public media belongs under this directory and is grouped by content purpose, then initiative or article slug. Use lowercase kebab-case stable names (for example `hero-marinduque-2026.jpg`). Keep source files and replace placeholder assets only when approved media is supplied. Reuse current approved site imagery across content until initiative-specific media is provided.

For every asset, record its relative path, intended page/slot, alt text, caption, creator/credit, rights/permission status, and replacement status in `inventory.json`. Never invent attribution. Add responsive derivatives only when useful; retain a stable base name for each image/video. Do not commit secrets or private media here.

## Cloudflare migration prompt

Migrate the website’s media and content assets to Cloudflare using the project’s approved Cloudflare products and current configuration. First inspect the existing folder taxonomy, asset inventory, references, file sizes, formats, licenses, and attribution notes. Preserve stable asset identifiers and public URLs where possible, or provide an explicit old-to-new URL mapping. Upload images and videos with appropriate metadata, content types, caching rules, and access controls. Update application references through a centralized asset map rather than scattered hard-coded URLs. Keep editorial text and structured initiative/blog/news content in the approved content source; do not treat media storage as a substitute for the content model. Do not delete or overwrite source assets during migration. Validate every migrated reference, responsive image variant, video playback path, and fallback before proposing source cleanup. Document configuration, rollback steps, and any assets that could not be migrated because their rights, attribution, or source information is unclear.

## Deployment and migration records

See `docs/cloudflare/README.md` for environment configuration, the migration audit, verification results, and rollback instructions. The owner approved currently displayed assets for public use on 2026-10-05; unresolved creator and credit notes remain in the inventory. This approval does not extend to unreferenced camera originals, unused files, or unpublished videos.
