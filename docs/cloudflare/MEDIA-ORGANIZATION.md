# R2 media organization

The staging and production buckets use the same reviewed catalog in [media-organization.json](media-organization.json). It records each stable asset ID, previous R2 key, readable R2 key, original filenames, public URL aliases, initiative associations, and unresolved attribution notes. Editorial text remains in the application content model.

```text
brand/
  icons/
  logos/
partners/
  community/<partner>/
  educational/<partner>/
people/arshelene-lingao/
resources/books/
  barya-to-blockchain/
  code-like-a-cook/
  wave3-handbook/
site/editorial/
initiatives/<initiative>/photos/
shared/initiatives/<associated-initiatives>/photos/
sha256/  (previous objects retained for rollback)
```

| Active category | Unique files |
| --- | ---: |
| Brand logos and icons | 3 |
| Partner logos | 19 |
| Founder portrait | 1 |
| Book covers | 3 |
| General editorial photos | 4 |
| Initiative photos | 64 |
| Photos shared across initiatives | 19 |
| **Total** | **113** |

Examples:

- `brand/logos/cryptita-plays-mark--0802f4a5ef47.png`
- `partners/community/blocktides/logo--06ae556cbddc.png`
- Initiative photos use `<initiative>-photo-001--<12-character-checksum>.jpg`.

Names are lowercase with hyphens. Descriptive names come from existing site and inventory information; no location, event date, person, or credit is inferred from an unidentified photograph. Photo numbers are catalog identifiers, not chronological claims. Keep existing numbers stable when adding files. The short checksum distinguishes content versions, while the catalog retains the complete SHA-256 for integrity checks. Original filenames remain searchable in `sourcePaths`.

Identical images reused by Builder Programs and GrantiX share one object under `shared/initiatives/`; the same applies to the photo shared by Learning Resources and Mini-Library. All original public URL aliases still work. This avoids inventing a primary owner or duplicating active files for each association.

## Applying and validating the catalog

Run the **Organize R2 media** GitHub Actions workflow for staging, then production. It uses the existing account token, verifies the source checksum, writes only catalogued destination keys with the original content type and cache policy, and verifies each destination checksum. Existing destination objects must match exactly. It never deletes source keys and does not expose an upload endpoint.

The equivalent local command is `node scripts/organize-r2-media.mjs staging --apply` (or `production`). Without `--apply`, it only validates the catalog. This script handles the currently catalogued small images, with a 32 MiB size guard; use a streaming transfer for larger future video assets.

Save the workflow reports as `organization-staging.json` and `organization-production.json` beside this document. Run `node scripts/activate-media-organization.mjs` only after both reports pass and match the catalog hash. Deploy staging first and run the full media audit; then promote to production and repeat the audit. Activation changes only the central map's R2 keys, preserving public paths, media bytes, IDs, application references, and credits.

## Future uploads and rollback

For a new or changed file, assign a readable key in a reviewed candidate asset map, record approval for its checksum, and update the catalog without renumbering existing photos. Run `node scripts/migrate-media.mjs <environment> <candidate-map.json>` for both buckets, compare the generated candidate maps, and verify before activation. Existing registered files keep their organized names. Do not regenerate the one-time catalog over reviewed assignments.

To roll back this organization, restore the previous central asset map from Git or replace each catalogued `key` with its `oldKey`, then redeploy. The original `sha256/` objects stay available for previous Worker versions. No local source file, original R2 object, or repository media is deleted by this operation. Removing those rollback objects is a separate cleanup decision.
