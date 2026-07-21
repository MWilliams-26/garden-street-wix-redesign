# Wix-to-Cloudflare migration plan

Wix remains live until a separately approved cutover. No deployment, DNS change, commit, or push has been performed.

## Verified route inventory and proposed mappings

The old routes below were verified as existing; confidence describes the proposed destination, not route existence.

| Old route | Proposed new target | Confidence | Action |
|---|---|---:|---|
| `/` | `/` | High | Preserve home page |
| `/schedule-1` | `/classes` | High | 301; class overview/schedule content moved here |
| `/copy-of-our-teams` | `/classes` | High | 301; team-oriented duplicate content removed in favor of classes |
| `/our-teams` | `/musical-theatre` | Medium | 301 only after client confirms content intent |
| `/copy-of-pricing` | `/camps-performances` | Medium | 301 only after client confirms content intent |

These redirects are staged in `public/_redirects`, above the SPA fallback. The old PDF URL or URLs remain unresolved: crawl/export Wix and analytics, inventory each exact PDF URL and its content, then preserve it or map it to an approved accessible HTML/file destination. Do not guess or return every PDF to the home page.

## Content disposition

- Program, class, staff, contact, date, party, and camp information has been moved into focused new pages/data where applicable.
- Duplicate/copied Wix pages and obsolete team/pricing presentation are proposed for removal, with redirects above retaining entry paths.
- Registration, availability, payments, and account management are not migrated into the site; Studio Pro continues to handle operations.
- The live Studio Pro schedule URL is absent. Keep schedule CTAs disabled/omitted until a verified destination is supplied.

## Cutover sequence

1. Re-crawl Wix, collect exact URLs (including PDFs), review search/analytics entry pages, and approve the final redirect table.
2. Freeze approved copy and verify dates, prices, staff, photos, contact details, and Studio Pro links.
3. Run `npm run lint` and `npm run build`; review the Cloudflare `pages.dev` preview and redirects on mobile and desktop.
4. Export DNS and preserve analytics/search verification. Explicitly protect MX, SPF, DKIM, DMARC, and all verification/service records.
5. Obtain separate written approval for launch and rollback; only then attach the custom domain and change DNS/nameservers as required.
6. Keep Wix active through propagation and a stable observation period.

## Post-launch checks

Test every new and old route, direct refreshes, 404 behavior, HTTPS/canonical domain, page titles/descriptions, sitemap/robots, image loading, keyboard/mobile navigation, contact links, and logged-out Studio Pro destinations. Check analytics/search tooling, Cloudflare errors, and real inbound/outbound email. Monitor 404s for missed Wix/PDF URLs and add only reviewed redirects.

Rollback by restoring the documented former DNS/nameservers or Wix hostname target and the last known-good Cloudflare deployment. Verify both Wix and email after rollback. Cancel Wix **only after** the custom site has remained stable, unresolved routes are handled, and the client explicitly approves cancellation; retain any necessary export/records first.
