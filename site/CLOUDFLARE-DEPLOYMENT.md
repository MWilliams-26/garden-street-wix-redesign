# Cloudflare Pages deployment (approval required)

**Current state:** Wix remains live. Repository previews and code pushes have occurred, but no production deployment or DNS change is authorized by this runbook.

## Create the preview project

After approval to connect Git, push an approved branch/repository, then in Cloudflare choose **Workers & Pages → Create → Pages → Connect to Git**. Select the repository and production branch. Configure:

| Setting | Value |
|---|---|
| Framework | Vite (or none with explicit settings below) |
| Project root / root directory | `site` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | supported Node 22 release (set `NODE_VERSION=22` if required) |

No runtime environment variables are currently required. Never put secrets in Git. If future variables are needed, add preview and production values separately under Cloudflare project settings, classify secrets appropriately, and rebuild. Restrict production deployments to the approved production branch; use branch/PR deployments for review.

Cloudflare assigns a `*.pages.dev` preview/project domain. On that domain, verify all routes, direct URL loads, `_redirects`, sitemap/robots, mobile/desktop behavior, accessibility, external Studio Pro links logged out, and contact actions. The live schedule URL is absent, so it must not be represented as available.

## Attach the custom domain later

Only after written client approval and preview sign-off:

1. Inventory/export every existing DNS record and note current nameservers and TTLs. Identify rollback owners and a maintenance window.
2. Add the production hostname in **Pages → Custom domains** and follow Cloudflare's exact ownership/verification prompt.
3. If the zone is already on Cloudflare, add only the Pages hostname record Cloudflare requests. If Cloudflare requires a nameserver transfer, recreate and verify the complete DNS zone first, then update nameservers at the registrar only during the approved cutover.
4. **Preserve all mail and service records exactly:** MX, SPF, DKIM, DMARC, plus domain/service verification records. Do not flatten, replace, proxy, or delete them. A website cutover must not interrupt email.
5. Change DNS/nameservers only after explicit cutover approval. Confirm TLS and the canonical domain, then monitor propagation.

Do not cancel Wix at cutover. Keep it available until the new site and DNS have been stable and the client approves cancellation.

## Post-cutover and rollback

Check `/`, every sitemap route, all legacy redirects, refresh/direct navigation, HTTPS/canonical host, 404s, images, title/descriptions, robots/sitemap, contact links, and Studio Pro destinations. Verify mail delivery independently and review Cloudflare build/HTTP errors.

If critical web, redirect, TLS, DNS, or email checks fail, stop changes. Restore the documented previous DNS records/nameservers (or point the hostname back to Wix), allow for TTL propagation, and confirm Wix and mail are working. Cloudflare can also roll back the Pages production deployment to the last known-good deployment. Record what changed and obtain fresh approval before retrying.
