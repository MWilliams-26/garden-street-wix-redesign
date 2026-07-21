# Client approval checklist

Record approver, date, and notes for every item. Approval of content is not approval to deploy or change DNS.

## Content and operations

- [x] Existing page copy, program names, age ranges, policies, and calls to action approved by the user on July 21, 2026.
- [x] Supplied dates, including 2026–27 season dates and Summer Camp's stated June 21, 2027 start, approved by the user on July 21, 2026.
- [x] Supplied prices and package details approved by the user on July 21, 2026; the site does not imply that Grown-Up & Me is free.
- [x] Supplied Trolls Kids and Willy Wonka Jr. ages, Monday times, `$125/month` tuition, September 14, 2026 start, costume note, and “Winter 2027 details coming” wording approved by the user on July 21, 2026.
- [ ] Resolve the excluded source conflict that listed Saturday Intro to Dance ending at 11:45 p.m.
- [x] Current supplied staff list, titles, bios, and headshots approved by the user on July 21, 2026.
- [ ] Verify every Studio Pro CTA logged out on mobile and desktop. Confirm Studio Pro remains responsible for registration, availability, accounts, and payment.
- [ ] Supply/approve a live Studio Pro schedule URL if desired; none is currently available and the site must not claim otherwise.
- [x] Photo selection and public use approved by the user on July 21, 2026. Approved photos are bundled as optimized copies; crops, alt text, context, and adjacent copy still receive normal preview QA.
- [x] Supplied phone, email, street address, directions, social, shop, and mailing-list details approved by the user on July 21, 2026. External behavior still receives normal preview QA.

## Site quality and migration

- [ ] Review all pages at 375, 430, 768, 1024, and 1440px; approve navigation, readability, keyboard/focus behavior, contrast, and reduced motion.
- [ ] Approve titles/descriptions, sitemap, robots behavior, canonical domain, and 404 page.
- [ ] Approve the high-confidence redirects and explicitly decide the medium-confidence `/our-teams` and `/copy-of-pricing` mappings.
- [ ] Inventory and resolve every old PDF URL; unresolved PDFs are a launch issue and must not be guessed.
- [ ] Approve the Cloudflare Git project settings and `pages.dev` preview after `npm run lint` and `npm run build` pass.
- [ ] Approve the production domain, cutover date, DNS owner, and tested rollback plan separately.
- [ ] Confirm the DNS inventory preserves MX, SPF, DKIM, DMARC, and every verification/service record before any nameserver or DNS change.
- [ ] Complete post-launch checks for routes/redirects, TLS, mobile/desktop, contact, Studio Pro, analytics/search, errors, and email delivery.
- [ ] Keep Wix live and paid during cutover and the agreed stability period.
- [ ] **Cancel Wix only after the new site is stable, post-launch issues are resolved, needed exports are retained, and the client gives explicit final approval.**

Status reminder: Wix is live; no deployment, DNS change, commit, or push has been done.
