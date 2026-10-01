# Media library

All public media belongs under this directory and is grouped by content purpose, then initiative or article slug. Use lowercase kebab-case stable names (for example `hero-marinduque-2026.jpg`). Keep source files and replace placeholder assets only when approved media is supplied. Reuse current approved site imagery across content until initiative-specific media is provided.

For every asset, record its relative path, intended page/slot, alt text, caption, creator/credit, rights/permission status, and replacement status in `inventory.json`. Never invent attribution. Add responsive derivatives only when useful; retain a stable base name for each image/video. Do not commit secrets or private media here.

## Cloudflare migration prompt

Migrate the website media and structured content represented in this library to the Cloudflare products approved by the project. First inspect the taxonomy, inventory, references, formats, sizes, rights, and attribution. Preserve stable identifiers and public URLs where possible; otherwise create a complete old-to-new URL map. Upload images/videos with correct content types, metadata, caching, and access controls. Keep editorial text in the approved content source and media in the approved object/media store. Centralize URL resolution in the application asset map. Do not delete or overwrite local originals. Verify every reference, responsive image, video playback, alt text, and fallback; document configuration, rollback, and unresolved rights/source questions before proposing cleanup.
