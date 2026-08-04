# Garden Street custom website

This is the future Garden Street School of the Performing Arts presentation site: Vite, React, and React Router. **Wix remains live; repository previews and code pushes do not authorize deployment or DNS changes.** Studio Pro remains the system of record for registration, class availability, accounts, and payments; this site explains programs and sends families there.

## Local setup and checks

From the repository root:

```sh
cd site
npm install
npm run dev       # Vite development server; use the URL printed in the terminal
npm run lint      # ESLint
npm run build     # production output in site/dist
npm run preview   # locally serve the production build
```

Use Node 22. Run lint and build after content/code changes, then use preview to check every affected route at mobile and desktop widths. Preview supports SPA history fallback but does not exactly emulate Cloudflare redirect processing.

## Architecture and file map

| Path | Purpose |
|---|---|
| `src/main.jsx` | App bootstrap and route definitions |
| `src/pages/Pages.jsx` | Page-level React views |
| `src/components/` | Shared layout, SEO, image, CTA, and Studio Pro components |
| `src/data/` | Editable navigation, dates, promotions, staff, schedules, links, settings, and image registry |
| `src/styles.css` | Global tokens, layout, responsive rules, and component styles |
| `public/images/` | Bundled optimized copies of approved photos and artwork |
| `public/_redirects` | Cloudflare legacy redirects plus SPA fallback |
| `public/sitemap.xml`, `public/robots.txt` | Search-engine discovery files |
| `dist/` | Generated build output; do not hand-edit |

Routes are `/`, `/classes`, `/musical-theatre`, `/camps-performances`, `/parties-rentals`, `/about`, `/contact`, and `/important-dates`. See `CONTENT-UPDATES.md` for routine edits, `DESIGN-SYSTEM.md` for UI rules, and the deployment/migration guides before launch work.

## Publishing boundaries

Approved photos are bundled in `public/images` as optimized copies; source originals remain untouched elsewhere. Do not add raw camera originals. Do not invent schedules or operational details. The live schedule URL is currently absent (`liveSchedule: null`), so do not claim that a live schedule link exists. Deployment, custom-domain attachment, DNS changes, commits, pushes, Wix publishing, and Wix cancellation all require explicit authorization.
