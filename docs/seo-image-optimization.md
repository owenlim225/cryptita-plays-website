# SEO image derivatives

Generated with Sharp 0.35.4; photo WebP quality 82, effort 6; brand WebP lossless. EXIF orientation is applied, aspect ratio and transparency retained, with no crop, enlargement, or generative edits. Original source bytes are preserved and checked against the existing approved hashes.

Run: `node scripts/optimize-seo-images.mjs`. Sharp must be available in the local Node environment (currently installed).

| Original | Original dimensions | Original bytes | Derivative | Dimensions | Bytes | Reduction | SHA-256 |
| --- | --- | ---: | --- | --- | ---: | ---: | --- |
| media/initiatives/web3-on-campus/DSC_5578.JPG | 6016×4000 | 6416435 | /images/optimized/web3-campus-640.webp | 640×426 | 40818 | 99.4% | 59a8bcf7ddb3e020f6638c922d6a9a8853f68fe9f1efb08be2668ebbf86d3919 |
| media/initiatives/web3-on-campus/DSC_5578.JPG | 6016×4000 | 6416435 | /images/optimized/web3-campus-1280.webp | 1280×851 | 112456 | 98.2% | 7eadbf6ca56f1f3b090f62b4c2408325791d47eb168e10ef80cd05f1959e47b5 |
| media/initiatives/mini-library/20260609_111450.jpg | 4000×2252 | 1439943 | /images/optimized/mini-library-640.webp | 640×360 | 41632 | 97.1% | f9234b6c815515acf8ab41cccc1cc497da1467f59b1d849f0ab5b981f88b4f6f |
| media/initiatives/mini-library/20260609_111450.jpg | 4000×2252 | 1439943 | /images/optimized/mini-library-1280.webp | 1280×721 | 123192 | 91.4% | 47c77396c51858c1c2ee724291aa80238959eedbc5a94dba204c9ff96f798491 |
| brand/cryptita-mark.png | 2688×2672 | 482500 | /images/optimized/cryptita-mark-160.webp | 160×159 | 17520 | 96.4% | 172de47207b9276198cc0329c677372c0b2d45d470c211344410ea43e1efd3e3 |
| brand/cryptita-mark.png | 2688×2672 | 482500 | /images/optimized/cryptita-mark-640.webp | 640×636 | 93296 | 80.7% | 2beffb932574042916eb33f5eb79f0faf64137408ff434157f65750d912e0d20 |
| brand/cryptita-plays-banner.png | 2902×857 | 304307 | /images/optimized/cryptita-banner-640.webp | 640×189 | 34508 | 88.7% | 91e1a363aed63adce160f0b2858824ad1a6da7a7e2b3c4e78f16e818fba7b9fa |
| brand/cryptita-plays-banner.png | 2902×857 | 304307 | /images/optimized/cryptita-banner-1280.webp | 1280×378 | 95306 | 68.7% | a04dc8402ed326b2ad9bca434fc455db2305ad59f08afaf125caddb347209689 |
| images/learning-event.jpg | 2048×1536 | 276524 | /images/optimized/learning-event-640.webp | 640×480 | 59760 | 78.4% | 33e59098e42fd6ca72820443a0c41ff4aea3b5ac5309a2a425b0020ec6066b0b |
| images/learning-event.jpg | 2048×1536 | 276524 | /images/optimized/learning-event-1280.webp | 1280×960 | 175074 | 36.7% | 3b9ff9005f2753fce4b6edca943a1767d4989daf10a2e88050ad19240518f636 |

## Integration

Use the 640/1280 photo pairs with explicit responsive srcSet and sizes; use the 1280 file as desktop fallback. Keep current alternative text. Set intrinsic width/height to reserve the aspect ratio. Use the 160 mark for small navigation/footer placement and the 640 mark where a larger logo is needed; banner 640/1280 preserves lettering and transparency losslessly. Use learning-event-1280.webp for the hero video poster.

These paths are inside /images/ and are recognized by the existing media reference scanner. Register derivative hashes under the current authorized performance work, then reference them directly so the existing Cloudflare build bundles these small files. No R2 upload or original-map replacement is required. Do not remove original sources or R2 assets: detail galleries and rollback still use them.

This script intentionally does not change component references, the R2 asset map, approval records, or deployed assets.
