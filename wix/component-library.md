# Wix Component Library

## Purpose

Define reusable Wix patterns so the site remains visually consistent and easier to maintain.

## Component registry

| Component | Purpose/content | Desktop/laptop | Tablet verification | Mobile Editor | Wix element/pattern | Accessibility | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Header/mobile menu | Logo, primary links and Register | One row inside gridlines | No wrapping or overlap | Compact logo/menu; ordered links | Header strip, menu and button | Keyboard/touch access, current state, descriptive labels | Planned |
| Hero | H1, short intro, primary/optional secondary CTA and image | Full-width strip; copy/image split preferred | Copy remains readable; crop holds | Copy first; restrained height | Strip, columns, image and buttons | One H1; sufficient overlay contrast; useful alt text | Planned |
| Primary button | Highest-priority action: label and destination | Inline/content width | Remains at least 44 px high | Full width when useful | Styled Wix button | Visible focus and specific label | Planned |
| Secondary button | Lower-priority action | Beside or below primary | No crowding | Usually below primary | Outlined Wix button | Contrast and distinct purpose | Planned |
| Age-group card | Age, guidance, examples and internal path | Four-card row only if comfortable | Two columns | One per row | Box/strip group or repeater | H3, logical order, not color-only | Planned |
| Program card | Image, heading, age/context, summary and CTA | Two/three-column grid | Two columns if readable | Stacked card | Repeater or grouped elements | Logical heading, alt text, real text details | Planned |
| Staff card | Portrait, name, approved role and short bio | Three-column grid | Two columns | One per row | Repeater/grouped elements | Consistent heading order; no placeholder role | Planned |
| Promotion card | Artwork/photo, current details and action | Two/three-column grid | Two columns | One per row | Repeater/grouped elements | Flyer facts repeated as text | Planned |
| Section intro | Optional eyebrow, H2 and short body | Constrained readable width | No orphaned lines | Left aligned and concise | Text elements | Correct heading level | Planned |
| Image/text split | Story plus supporting image | 50/50 or 60/40 | No cramped columns | Copy before image | Strip with columns | Meaningful order and alt text | Planned |
| Gallery | Approved community/performance images | Restrained grid | Two/three columns | Touch-friendly gallery or two columns | Wix Pro Gallery/standard gallery if plan allows | Non-identifying alt text; no hover-only captions | Planned |
| Accordion/FAQ | Themes or parent guidance | Readable single column | Same | Full width | Wix collapsible content if available; otherwise stacked headings | Keyboard operation and clear expanded state | Planned |
| Registration callout | Final heading, short support and Studio Pro action | Horizontal band | Wraps without crowding | Stacked centered or left aligned | Strip, text and button | Strong contrast and exact destination label | Planned |
| Contact block | Verified address/contact and task links | Two columns with map optional | Maintain usable map | Actions first, map second | Text, buttons, Wix map/form | Persistent form labels and error messages | Blocked on details |
| Footer | Logo, link groups, contact and registration | Three/four groups | Two-column outcome | Stacked groups | Footer strip | Heading/link order, contrast and touch size | Planned |

## Component specification template

### Component name

- **Purpose:** Pending
- **Required content:** Pending
- **Optional content:** Pending
- **Wix implementation:** Name the standard Wix Editor elements; avoid Wix Studio-only features.
- **Desktop behavior:** Include laptop behavior and safe gridline placement.
- **Tablet verification:** Describe the required outcome, not a separately editable breakpoint.
- **Mobile behavior:** Specify Mobile Editor order, crop, spacing and CTA width.
- **Accessibility requirements:** Pending
- **Approved variants:** Pending
- **Pages used:** Pending

## Governance

- Prefer an existing approved component before creating a variant.
- Add meaningful variations only when content or behavior requires them.
- Record major component decisions in `docs/decisions-log.md`.
- Do not create a component variant solely to fix one page; adjust content first.
