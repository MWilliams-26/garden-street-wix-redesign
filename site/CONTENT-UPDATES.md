# Content update guide

Make changes only from an approved source. Studio Pro is authoritative for operations (availability, registration, accounts, and payment). Its live schedule URL is not supplied; `liveSchedule` must remain `null` until a verified URL is received.

## Common changes

### Add, edit, or remove a promotion

Open `src/data/promotions.js`. Each item has `title`, `text`, and an internal `to` route. Add an object to show a promotion, edit its fields, or remove the entire object (including its comma) to retire it. Confirm the destination exists and remove expired promotions promptly.

### Change an important date

Edit the matching tuple in `src/data/importantDates.js`: `['YYYY-MM-DD', 'Label']`. Use an ISO date, plain-language label, and add/remove the whole tuple as needed. Check all promotional and page copy for duplicate references to the date.

### Update staff

Edit `src/data/staff.js`. Preserve the `name`, `role`, `image`, and `bio` fields. The `image` value must match a key in `src/data/imageSelections.js`. Remove former staff from the array; do not invent biographies or credentials.

### Replace or add a photo

Keep the approved original untouched. Create a descriptive WebP copy (install WebP tools if `cwebp` is unavailable):

```sh
cwebp -q 82 -resize 2400 0 /path/to/approved-input.jpg \
  -o public/images/classes/descriptive-name.webp
```

Choose the appropriate `public/images/<category>/` folder; never bundle raw originals. Inspect quality and crop, obtain pixel dimensions (for example, `sips -g pixelWidth -g pixelHeight public/images/classes/descriptive-name.webp` on macOS), then add/update the entry in `src/data/imageSelections.js`. Record the public `src`, original `sourcePath`, page/section, crop positions, useful `alt`, and intrinsic `width`/`height`. Render the registry key through `ResponsiveImage`. Approved photos are already bundled as optimized copies, but each replacement still needs crop, context, and alt-text review.

### Change a Studio Pro link

Edit only `src/data/externalLinks.js`. Replace the appropriate value with the exact verified HTTPS URL; keep `null` when no destination exists. Search for the old URL, test logged out on desktop and mobile, and confirm it reaches the intended Studio Pro action. Do not put operational data into this site as a substitute for Studio Pro.

### Add a page

1. Add the view and route following the patterns in `src/pages/Pages.jsx` and `src/main.jsx`.
2. Add a unique title and description to `seo` in `src/data/siteSettings.js`, and render `Seo` on the page.
3. If the page belongs in the primary menu, add its label/path to `src/data/navigation.js`; also check footer and mobile navigation.
4. Add its canonical URL to `public/sitemap.xml`. Add any approved old-route redirect above the SPA fallback in `public/_redirects`.
5. Test direct loading, keyboard navigation, responsive behavior, page heading, title/description, links, and 404 behavior.

## Validate locally

```sh
cd /Users/michaelwilliams/Desktop/GStreetPAWebsite/garden-street-wix-redesign/site
npm run lint
npm run build
npm run preview
```

Review every changed page in the preview, including 375px mobile and desktop. A successful build does not constitute approval or deployment.
