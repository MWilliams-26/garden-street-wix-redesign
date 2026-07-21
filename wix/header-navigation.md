# Header and Navigation

## Navigation goals

- Help parents recognize the studio and reach common destinations quickly.
- Keep the Studio Pro handoff explicit and verified.
- Maintain clear, touch-friendly behavior across desktop, laptop, tablet verification and mobile.

## Approved planning structure

| Item | Destination | Desktop treatment | Tablet verification | Mobile treatment | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Logo / Home | `/` | Left-aligned logo; no separate Home text link required | Remains recognizable and does not crowd links | Compact logo linked to Home | Planned |
| Classes | `/classes` | Text link | Must not wrap | First menu item | Planned |
| Musical Theatre | `/musical-theatre` | Text link | Must not wrap | Second menu item | Planned |
| Camps & Performances | `/camps-performances` | Text link | Watch label width closely | Third menu item | Planned |
| Parties & Rentals | `/parties-rentals` | Text link | Must not wrap | Fourth menu item | Planned |
| About | `/about` | Text link | Must not wrap | Fifth menu item | Planned |
| Contact | `/contact` | Text link | Must not wrap | Sixth menu item | Planned |
| Register | Verified general Studio Pro URL in `docs/studio-pro-links.md` | Dark-green or high-contrast button | Remains fully visible or moves into compact menu | Prominent menu action | URL verified; Wix placement untested |

## Desktop recommendation

Use a full-width header strip with logo and content inside Wix gridlines. Keep labels readable and one Register action visually distinct. Avoid dropdowns unless content growth proves they are necessary. Do not use hover as the only signal.

## Tablet recommendation

Classic Wix Editor does not supply an independent tablet layout. Preview the desktop header at common portrait and landscape tablet widths. If links collide, simplify spacing/logo width or use the same compact menu behavior as mobile; never allow two-line navigation labels.

## Mobile recommendation

Use Wix Mobile Editor to create a compact header with logo, a clearly labeled menu control and a readily accessible Register action. Keep the primary menu order from `docs/sitemap.md`, then list Important Dates, Shop, Mailing List, Parent Login and Instagram. Use comfortable 44 px-or-larger targets and sufficient spacing.

## Header behavior

- Sticky behavior: Pending testing and approval; avoid consuming excessive phone height
- Announcement bar: Use only for verified, current information
- Logo destination: Home
- Current page: distinguish visually without color alone
- External links: apply the final same/new-tab decision consistently
- Keyboard/focus behavior: visible focus and logical order; pending QA in Wix

## Footer structure

- Logo and short mission/value line
- Primary internal links
- Important Dates, Shop, Mailing List, Parent Login and Instagram
- Verified contact/location details only
- Registration action
- Any required legal/privacy links

Use three or four concise columns on desktop, verify two-column behavior on tablet, and stack groups on mobile. Do not publish a Parent Login link until its exact destination is verified.

## QA checklist

- [ ] Every destination is correct.
- [ ] Studio Pro URL is recorded in `docs/studio-pro-links.md`.
- [ ] Menu works with keyboard and touch.
- [ ] Labels do not wrap or clip.
- [ ] Header works on desktop, tablet, and mobile.
