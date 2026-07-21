# Wix Design System

## Status

Build-ready starting system based on supplied brand materials. Values are practical starting points to tune visually in Wix, not immutable pixel specifications.

## Brand foundations

### Logo usage

- Use the black/dark-green transparent logo on white or light gray.
- Use the white/bright-green transparent logo on dark green, black or a photo with a sufficiently dark overlay.
- Preserve proportions and clear space; never stretch the logo or place it over a busy crop.
- Use the compact green “G” mark only after checking recognition at favicon/mobile size.
- Current web-ready files are documented inside the read-only expanded client archive; root asset paths must be reconciled before Wix upload.

### Color palette

| Role | Color | Hex | Usage | Contrast checked |
| --- | --- | --- | --- | --- |
| Brand accent | Primary green | `#95E159` | Highlights, icons, selected card accents and buttons with black text | Use black text; do not use white body text on this green |
| Brand anchor | Dark green | `#256914` | Headings, banners, footer and primary buttons | Use white text; verify final Wix rendering |
| Main background | White | `#FFFFFF` | Primary page and card backgrounds | Use black or dark green text |
| Strong neutral | Black | `#000000` | Body text, icons and high-contrast controls | Use on white, light gray or primary green |
| Soft background | Light gray | `#EBEBEB` | Alternating sections, subtle cards and dividers | Use black or dark green text |
| Secondary text | Dark gray | `#595B5E` | Supporting copy and metadata | Use on white/light gray; avoid for tiny text |

Primary green is an accent rather than a default text color. Check all final text/background combinations in Wix with a contrast tool; target WCAG AA (4.5:1 for normal text and 3:1 for large text and controls).

### Typography

Use **Poppins** throughout. This avoids an unverified Gotham web license and creates a consistent Wix theme.

| Style | Weight | Desktop/laptop starting point | Mobile starting point | Line height | Use |
| --- | ---: | ---: | ---: | ---: | --- |
| Hero heading | 700 | 52–64 px | 36–44 px | 1.05–1.15 | One H1 per page; keep homepage line count short |
| Page heading | 700 | 44–52 px | 32–40 px | 1.1–1.2 | Interior-page H1 |
| Section heading | 600–700 | 30–40 px | 26–32 px | 1.15–1.25 | H2 section titles |
| Card heading | 600 | 20–24 px | 20–22 px | 1.2–1.3 | H3 inside cards |
| Body large | 400 | 18–20 px | 17–19 px | 1.5–1.65 | Hero and section introductions |
| Body | 400 | 16–18 px | 16–18 px | 1.5–1.7 | Main copy; do not go below 16 px without a specific reason |
| Label/button | 600 | 15–17 px | 16–18 px | 1.2 | Buttons, navigation and short labels |

Classic Wix Editor provides desktop and mobile styles. Tablet is a required test outcome of the desktop layout, not a separate typography breakpoint.

## Layout system

- **Content width:** Keep important content inside Wix desktop gridlines; aim for an effective reading width around 1100–1200 px on large screens.
- **Desktop/laptop gutters:** Start around 48–72 px where Wix structure permits.
- **Tablet verification:** Ensure desktop content retains roughly 32–48 px side space and does not depend on fixed-width multi-column blocks.
- **Mobile gutters:** Start around 20–24 px.
- **Section spacing:** Start around 80–112 px desktop and 56–72 px mobile; shorten only when content grouping remains clear.
- **Text measure:** Keep long body copy near 55–75 characters per line.
- **Corners:** Use a consistent moderate radius, approximately 12–18 px, for cards and callouts.
- **Shadows:** Prefer borders, background contrast and spacing; use a subtle shadow only where card separation is otherwise unclear.

## UI styles

### Primary button

- Dark green background, white Poppins 600 label, generous horizontal padding and at least a 44 px control height.
- Use for Register and the single highest-priority action in a section.
- Hover: slightly darker treatment or clear outline without relying on motion alone.
- Focus: visible high-contrast outline that is not removed.

### Secondary button

- White or transparent background, dark-green text and a 2 px dark-green border.
- Use beside—not above—the primary action.
- On primary-green backgrounds, black text/border may provide the strongest contrast.

### Age-group card

- Short age label, one-sentence guidance, relevant program examples and a specific internal CTA.
- White card on light gray or a restrained green-tint section; consistent height on desktop, content-height on mobile.

### Program card

- Image, H3, age/context, 40–70 word summary and one specific CTA.
- Keep time-sensitive availability out of the card unless approved; link to Studio Pro.

### Staff card

- Consistent portrait ratio, name, approved role and concise 50–90 word bio.
- Never publish placeholder roles. Use one card per row on small mobile screens.

### Promotion card

- Current artwork/photo, program name, approved date/age summary and specific CTA.
- Essential information must also appear as text outside the image.

### Registration callout

- Dark-green full-width band with white text, one short supporting sentence and a primary-green button with black text or a white outlined button after contrast testing.
- Use once at the end of every major page.

### Footer

- Dark green or black background, white text, light/bright-green accents, logo, secondary links and verified contact/account actions.
- Keep link groups short and stacked on mobile.

### Cards and containers

Use 4:3 or 3:2 landscape crops for program cards, 1:1 or 4:5 for staff cards and flexible wide crops for heroes. Start with 24–32 px card padding desktop and 20–24 px mobile. Do not force equal heights if it creates large blank areas on mobile.

### Forms

Use persistent labels above fields, clear required indicators, specific error text and a confirmation state. Do not use placeholder text as the only label. Confirm the chosen Wix form feature is available on Premium Lite before build.

## Accessibility checks

- [ ] Text contrast
- [ ] Focus indicators
- [ ] Minimum readable type sizes
- [ ] Touch-target sizing
- [ ] Meaningful link labels
- [ ] Reduced reliance on motion

## Wix Editor implementation notes

- Define site text themes and reusable button styles before building pages.
- Prefer full-width strips/sections with content kept inside gridlines, simple columns and standard Wix galleries.
- Avoid Wix Studio-only breakpoint instructions, custom-code dependencies, hover-only content and complex overlapping layers.
- Build desktop first from the approved content hierarchy, then deliberately reorder and resize in Mobile Editor. Verify laptop and tablet widths before approval.

## Decisions to log

Record approved system decisions in `docs/decisions-log.md`.
