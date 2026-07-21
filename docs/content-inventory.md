# Content Inventory

## Instructions

Record every reviewed source item. Preserve source paths and original filenames exactly. A specialized inventory may hold per-file rows for a large collection when this index links to it explicitly. Never modify originals in `client-imports/`; create and track descriptive working copies elsewhere.

## Inventory

### Custom-site working copies (2026-07-21)

Approved for custom-site preview/public use per explicit user confirmation. Final crop and copy review remains required before launch. Selected web-ready brand, musical-theatre, party, studio, staff, camp and performance assets from `GardenStreet_Website_Workspace_Expanded.zip` are organized under `site/public/images/`. Six optimized class-photo derivatives are under `site/public/images/classes/`: `hero-ballet-class.webp` (DSC09066), `community-dance-class.webp` (DSC09264), `community-ballet-class.webp` (DSC09321), `ballet-class.webp` (DSC09164), `teaching-portrait.webp` (DSC09393), and `solo-leap.webp` (DSC09337). Original paths, placements, dimensions, crops and alt text are indexed in `site/src/data/imageSelections.js`; source files and ZIPs remain ignored and untouched.

| Source path | Original filename | File type | Subject | Website page | Intended section | Proposed working filename | Working-copy path | Studio Pro destination, when applicable | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `client-imports/` | `GardenStreet_Website_Workspace_Expanded.zip` | ZIP archive | Most complete organized 2026–27 copy, CSVs, web-ready asset set and references | All | Source evidence | Not applicable | Read-only ignored archive | General link documented separately | Reviewed; retain outside Git | Supersedes the overlapping Current archive for planning; do not commit the ZIP or expose `reference/internal-do-not-publish/` |
| `client-imports/` | `GardenStreet_Website_Workspace_Current.zip` | ZIP archive | Earlier organized workspace | All | Source evidence | Not applicable | Read-only ignored archive | General link documented separately | Reviewed; duplicate/legacy | Substantially duplicated by Expanded; preserve original and do not delete without approval |
| `client-imports/` | `GardenStreet_Branding_Organized.zip` | ZIP archive | Brand colors, logos and supporting material | Sitewide | Design system/header/footer | Not applicable | Read-only ignored archive | Not applicable | Reviewed; overlapping source | Overlaps brand content in both workspace archives; reported rather than deleted |
| `client-imports/photos-20260721/Photos/Classes/Belle Ballet 06_26_26 Edited (1)/` | 80 original JPG filenames recorded individually in `remaining-photo-inventory.md` | JPG | Young-child dance/ballet class session | Home, Classes, About | Heroes/cards/gallery/community | Six selected filenames documented above | `site/public/images/classes/` | Not applicable | Selected and prepared | Read-only originals remain untouched; per-image recommendations are in `docs/remaining-photo-inventory.md` and final placements are in `site/src/data/imageSelections.js` |
| `client-imports/photos-20260721/Photos/Performances/` | `677476ad-9c9a-43a6-aef2-077a33980f2c.JPG` | JPG | Costumed children near curtains; context unconfirmed | Camps & Performances | Reserve only | Not selected | None created | Not applicable | Approved library; not used | The custom site uses the better-documented approved performance WebP library instead |
| `client-imports/current-site-screenshots-source/` | 11 original screenshot filenames retained in the read-only folder | PNG | Current Wix pages and Studio Pro reference | Planning/QA | Current-state reference | Pending only if selected | None created | See `docs/studio-pro-links.md` | Located; not copied | Keep source screenshots read-only; live-site visual audit remains a separate task |

## Specialized detailed inventories

- `docs/remaining-photo-inventory.md` records every filename in the 81-photo local library, editorial assessment, duplicate grouping, shortlist and release classification.
- The Expanded archive’s `docs/content-inventory-current.md`, `docs/image-library.md` and CSVs contain the supplied structured source/asset inventories. They remain source evidence until safe text/assets are deliberately reconciled into the root workspace.
- `docs/missing-information.md` is the canonical open-question register for this repository; the archived `docs/needs-confirmation.md` is preserved as source evidence.

## Status key

- **Not reviewed:** Source has not been assessed.
- **Needs review:** Relevance, quality, rights, facts, or destination needs confirmation.
- **Selected:** Approved for a working copy.
- **Prepared:** Working copy has been created and recorded.
- **Placed:** Added to the custom-site build.
- **Not used:** Retained as source but excluded from the website, with reason noted.

## Conflicts and follow-up

Add missing or conflicting facts to [missing-information.md](missing-information.md).
