# Header and Navigation

## Navigation goals

- Help parents recognize the studio and reach common destinations quickly.
- Keep the Studio Pro handoff explicit and verified.
- Maintain clear, touch-friendly behavior across all breakpoints.

## Proposed structure

| Item | Destination | Priority | Desktop treatment | Tablet treatment | Mobile treatment | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Home | `/` | Primary | Pending | Pending | Pending | Draft |
| Classes | `/classes` | Primary | Pending | Pending | Pending | Draft |
| Camps & Events | `/camps-events` | Primary | Pending | Pending | Pending | Draft |
| Competition Teams | `/competition-teams` | Primary | Pending | Pending | Pending | Draft |
| Parties & Rentals | `/parties-rentals` | Primary | Pending | Pending | Pending | Draft |
| About | `/about` | Primary | Pending | Pending | Pending | Draft |
| Contact | `/contact` | Primary | Pending | Pending | Pending | Draft |
| Studio Pro CTA | Pending verified URL | High | Pending | Pending | Pending | Unverified |

## Desktop recommendation

Keep labels readable and one high-priority action visually distinct. Avoid overcrowding or wrapped navigation.

## Tablet recommendation

Switch to a compact pattern before labels collide. Test both portrait and landscape orientations.

## Mobile recommendation

Use a clear menu control, large touch targets, visible current-page state, and a readily accessible primary action.

## Header behavior

- Sticky behavior: Pending testing and approval
- Announcement bar: Use only for verified, current information
- Logo destination: Home
- Keyboard/focus behavior: Pending QA

## QA checklist

- [ ] Every destination is correct.
- [ ] Studio Pro URL is recorded in `docs/studio-pro-links.md`.
- [ ] Menu works with keyboard and touch.
- [ ] Labels do not wrap or clip.
- [ ] Header works on desktop, tablet, and mobile.
