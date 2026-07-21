# Responsive Notes

## Principles

- Design parent tasks mobile-first, then use added space to improve hierarchy rather than add clutter.
- Keep content order meaningful at every breakpoint.
- Avoid hover-only interactions and text embedded in images.
- Verify layouts in Wix on actual desktop, tablet, and mobile sizes.

## Wix Editor model

This site uses the classic Wix Editor, not Wix Studio. Build and adjust the desktop and mobile layouts available in Wix Editor. Treat laptop and tablet widths as mandatory verification surfaces for the desktop layout rather than promising independent breakpoint controls.

| Context | Build/verification approach | Starting constraints |
| --- | --- | --- |
| Large desktop | Desktop Editor plus preview | Full-width sections; important content inside gridlines; avoid excessive line length |
| Laptop | Verify desktop rendering near 1280 × 800 and 1366 × 768 | Header must not wrap; useful hero content must remain visible |
| Tablet landscape/portrait | Verify desktop rendering around 1024 × 768 and 768 × 1024 | Avoid fragile fixed-width columns and overlap; switch to compact navigation where Wix permits |
| Mobile | Mobile Editor plus preview around 390 × 844 and 360 × 800 | 20–24 px side space, 44 px touch targets, one-column priority order |

## Global behavior

### Desktop

- Use whitespace and columns to clarify relationships.
- Keep line lengths readable and key actions visible.

### Tablet

- Verify rather than assume independent control.
- Prefer desktop patterns that remain readable when space narrows: two-column grids, flexible image/text sections and no edge-to-edge text.
- Confirm navigation, text wrapping and media crops in both orientations.

### Mobile

- Stack content in task-priority order.
- Use comfortable touch targets and spacing.
- Avoid oversized hero sections that hide useful content below the fold.
- Reorder decorative media after the heading/action when necessary in Mobile Editor.
- Use full-width buttons only where they improve tapping and scanning; maintain hierarchy between primary and secondary actions.

## Reusable section behavior

| Pattern | Desktop/laptop | Tablet verification | Mobile Editor |
| --- | --- | --- | --- |
| Hero | Two-column copy/image or readable copy over a darkened image | Heading and CTA remain visible; crop preserves focal subject | Copy first with one strong image; avoid text over busy imagery |
| Card grid | Three or four cards only when widths remain comfortable | Prefer two columns; verify labels do not wrap awkwardly | One card per row or deliberate horizontal gallery with visible controls |
| Image/text split | 50/50 or 60/40 | No overlap or overly narrow text | Stack copy before image unless the image provides essential context |
| Gallery | Restrained grid with consistent crops | Two or three columns | Two columns or Wix gallery with touch/swipe support; no hover captions only |
| CTA band | Horizontal copy and button | Wrap cleanly without crowding | Stack with action immediately after copy |
| Footer | Three/four concise groups | Two groups per row if space allows | Single-column groups with clear headings |

## Page-specific notes

| Page/component | Desktop | Tablet | Mobile | Issue/status |
| --- | --- | --- | --- | --- |
| Header | Logo, six links, Register button | Verify no wrapping; use compact menu if required | Compact logo/menu; Register easy to reach | Planned, not built |
| Home | Follow `wix/homepage-build-plan.md`; use simple strips and card grids | Confirm card and navigation fit | Follow the exact priority order in homepage plan | Planned, not built |
| Classes | Age paths, then categories; keep schedule summary scannable | Two-column cards where readable | One-column cards; availability CTA after each meaningful group | Planned, source corrections pending |
| Musical Theatre | Two equal program cards with artwork plus real text | Cards may remain two columns only if readable | Stack Trolls Kids then Willy Wonka Jr.; full-width specific actions | Planned, details/deep links pending |
| Camps & Performances | Alternate concise text and galleries | Avoid crowded gallery grids | Camp details before gallery; no internal competition dates | Planned, camp content blocked |
| Parties & Rentals | Three package cards and theme accordion | Test card copy length; two-plus-one layout acceptable | Stack packages; keep price/details as real text | Planned, contact pending |
| About | Mission/history, owners, staff grid and studio gallery | Two-column staff grid | One staff card per row; concise visible bios | Planned, staff confirmations pending |
| Contact | Contact/map and action blocks | Keep map useful and controls tappable | Contact actions first; map after essential text | Planned, details pending |
| Important Dates | Grouped date lists/cards | Two columns only if chronological scan remains clear | One chronological column | Planned, date conflicts pending |
| Footer | Concise columns | Verify two-column fit | Stacked link groups | Planned, links/contact pending |

## Test devices/viewports

Record exact viewports and real devices in `wix/qa-notes.md`. At minimum test current Chrome and Safari on laptop/desktop, one iPhone-sized viewport, one Android-sized viewport and tablet portrait/landscape. Check zoom at 200% and keyboard focus where the Wix experience permits.
