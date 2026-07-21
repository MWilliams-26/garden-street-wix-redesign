# Design system

## Brand tokens

Use these exact approved values consistently; do not substitute near matches.

| Token | Value | Typical use |
|---|---|---|
| Bright green | `#95E159` | Accent, highlight, selected state |
| Dark green | `#256914` | Primary brand surfaces and actions |
| White | `#FFFFFF` | Light surface and text on dark surfaces |
| Black | `#000000` | Primary text |
| Light gray | `#EBEBEB` | Rules, borders, subtle backgrounds |
| Gray | `#595B5E` | Secondary text (verify contrast for its background) |
| Typeface | Poppins | All interface and content type |

Poppins is locally bundled with `@fontsource/poppins` in weights 400, 600, and 700. Keep a system sans-serif fallback. Use 400 for body copy, 600 for controls/subheads, and 700 sparingly for major headings.

## Layout and responsive behavior

- Use a clear content hierarchy, short readable lines, consistent spacing, and a centered content container. Avoid dense flyer-like layouts.
- Start mobile-first. At approximately 375–430px, stack grids, keep key actions visible, and avoid horizontal scrolling. At tablet widths around 768px, use columns only when content remains readable. At 1024px and above, expand grids without letting text lines become too long.
- Navigation must be keyboard/touch operable and understandable without hover. Keep touch targets at least 44 by 44 CSS pixels.
- Images use intrinsic width/height, intentional crops, and a mobile crop where needed. Do not put essential wording only inside artwork.

## Components

- Reuse `Layout` for the header, navigation, main landmark, and footer; reuse `Seo` for each route's title/description.
- Use `ExternalCta` for Studio Pro and other off-site actions, with labels that identify the destination. Studio Pro owns registration, payment, accounts, and availability.
- Use `ResponsiveImage` and an `imageSelections.js` registry entry rather than an untracked image path.
- Use one clear primary action per section. Cards with repeated content must preserve heading order and work as a single column on mobile.
- New components should support ordinary text zoom, long labels, reduced motion, keyboard focus, and narrow screens before being reused.

## Accessibility acceptance criteria

- Semantic landmarks and one descriptive `h1` per page; headings descend logically.
- Every interactive element has a visible high-contrast focus indicator and works by keyboard. Never communicate state by color alone.
- Meaningful images have useful alt text; decorative images use empty alt text. Controls have accessible names.
- Maintain WCAG AA contrast (4.5:1 for normal text, 3:1 for large text and UI boundaries). Verify token combinations rather than assuming brand colors pass.
- Honor `prefers-reduced-motion`; avoid autoplay, flashing content, hover-only instructions, and tiny text.
- Test at 200% zoom and at 375, 430, 768, 1024, and 1440px before approval.
