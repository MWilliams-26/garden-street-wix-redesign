# Decisions Log

## Instructions

Add an entry after every major content, navigation, design, platform, or scope decision. Link supporting documents where useful.

## Decisions

| Date | Decision | Reason | Pages affected | Follow-up needed |
| --- | --- | --- | --- | --- |
| 2026-07-21 | Use this repository as project headquarters; build the site visually in Wix and retain operations in Studio Pro | Keeps versioned planning separate from presentation and operational systems | All | Verify and track each Studio Pro handoff |
| 2026-07-21 | Build visually in the existing Wix Editor duplicate on the Premium Lite plan; do not connect this repository to Wix | Preserves the current platform and avoids relying on Wix Studio-only breakpoint behavior | All | Test desktop, laptop, tablet and mobile in Wix before launch |
| 2026-07-21 | Treat Studio Pro as authoritative for registration, payment, live availability and account management | Prevents stale operational information in Wix | All program pages | Use only verified links and specific action labels |
| 2026-07-21 | Use the sitemap and primary navigation recorded in `docs/sitemap.md` | Gives Musical Theatre a clear parent path and keeps unapproved team details from becoming a primary destination | Header, footer, all pages | Confirm labels and slugs in the Wix duplicate |
| 2026-07-21 | Use Poppins and the supplied six-color palette as the Wix design-system starting point | Matches the supplied brand system while using a practical Wix-available family | All | Visually test weights and contrast in Wix |
| 2026-07-21 | Treat tablet as a required verification surface, not an independently editable Wix Studio breakpoint | Classic Wix Editor principally provides desktop and mobile editing | All | Check portrait and landscape tablet widths after desktop/mobile construction |
| 2026-07-21 | Keep Important Dates secondary/footer-level and omit a standalone Competition Teams page until public copy is approved | Reduces header crowding and respects the do-not-publish restriction on competition information | Navigation, Camps & Performances | Revisit after client approval |
| 2026-07-21 | Do not copy or optimize any remaining local-library photo until the client approves the shortlist and confirms releases | Protects originals and avoids preparing unapproved images | Image-led pages | Review `docs/remaining-photo-inventory.md` with client |
| 2026-07-21 | Supersede the Wix-only architecture with a Vite + React + JavaScript app in `site/`; keep Wix live until approved migration | User-authorized custom implementation while protecting the current production site | All | Obtain content, redirect, deployment and DNS approval before migration |

## Pending decisions

| Topic | Options | Decision owner | Needed by | Notes |
| --- | --- | --- | --- | --- |
| External-link tab behavior | Same tab or new tab for Studio Pro, Shop and mailing list | Project owner | Before header/footer build | Apply consistently and indicate external destinations accessibly |
| Sticky header | Static or sticky | Project owner | During homepage shell | Validate that a sticky header does not consume too much mobile space |
| Contact method | Email, form, phone and public hours | Client | Before Contact build | Verify all public details first |
