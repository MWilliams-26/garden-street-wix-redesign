# Client design-direction review

## Purpose

The review tool preserves the **Current Preview** as a baseline and presents four proposed design directions for the same approved website. “Current Preview” refers to the custom React app before a direction is selected; it does not mean the live Wix site. The options do not change copy, navigation, routes, photography, links, or behavior. They change palette balance, corner treatment, borders, depth and typographic emphasis.

- **Current Preview:** the unchanged comparison baseline, visually separated from the proposed directions in the selector.
- **Bright & Balanced:** clean white and gray surfaces, bright-green action accents, restrained rounding and light depth.
- **Soft Editorial:** a black-forward direction with softened borders, subtle depth and lightly rounded controls.
- **Bold & Editorial:** near-black contrast, square controls, hard borders and bright-green graphic details.
- **Warm & Artistic:** cream and warm-neutral surfaces, forest green, generous organic rounding and soft depth.

The selector identifies whether the reviewer is seeing the mobile or desktop/laptop layout. Its **Preview mobile** or **Preview desktop** button opens the same route and selected theme in a real fixed-width embedded viewport. Responsive layouts intentionally differ: mobile prioritizes touch targets, shorter scanning paths and stacked imagery, while larger screens use wider grids and image overlays. A scaled desktop frame on a phone is useful for composition comparison, but reviewers should still confirm finalists on physical phone and computer screens.

The themes use the supplied `#95E159` bright green, `#256914` dark green, white, black, `#EBEBEB` light gray, `#595B5E` gray, and Poppins. Warm & Artistic adds the approved warm neutral `#F7F6F2`. Bold & Editorial uses only restrained neutral charcoals in addition to the supplied palette.

## Enable or disable review mode

Review mode is off by default.

- **One browser session:** open any preview URL with `?review=true`, for example `https://preview.example.com/?review=true`. The bar remains available while navigating and refreshing in that tab.
- **Disable query/session review:** open any route with `?review=false`, or close the tab. This does not override a build where `VITE_THEME_REVIEW=true`.
- **Enable for an entire review build:** set `VITE_THEME_REVIEW=true` in that preview environment before running or building the site. Do not set this variable in the final production environment.

The URL method is the preferred live-preview option because it does not require a separate deployment configuration. `ClientThemeReviewBar.jsx` contains the isolated review UI, and the associated CSS is grouped under `.theme-review-*` in `src/styles.css`.

## Selection persistence and failure behavior

The selected theme is stored in local storage under `gstreet-color-direction`. Review-mode session state uses session storage under `gstreet-theme-review`. If either storage API is blocked or unavailable, the selector still works for the current rendered page and defaults safely to Current Preview after a refresh.

## Change the default or permanently select a theme

The current default is `current-preview`.

1. Change `DEFAULT_THEME` in `src/components/ClientThemeReviewBar.jsx` to the selected theme key.
2. Change the `data-theme` value on the `<html>` element in `index.html` to the same key. This prevents a flash of the old colors before React starts.
3. Leave `VITE_THEME_REVIEW` unset in production.
4. Verify the selected theme at the supported viewport widths, then remove or retain the dormant review component as described below.

Valid keys are `current-preview`, `bright-balanced`, `soft-editorial`, `bold-editorial`, and `warm-artistic`.

## Remove the review selector after approval

For complete removal:

1. Remove the `ClientThemeReviewBar` import and render call from `src/components/Layout.jsx`.
2. Delete `src/components/ClientThemeReviewBar.jsx`.
3. Delete the grouped `.theme-review-*`, `body.theme-review-active`, and `body.theme-review-minimized` rules from `src/styles.css`.
4. Keep the selected theme tokens and the final `data-theme` value.

Leaving `VITE_THEME_REVIEW` unset hides the selector on ordinary URLs, while `?review=true` deliberately remains available for an authorized live-preview link. Complete component removal is required if the final production bundle must never expose review mode, even by query string.

## Semantic design tokens

Theme-specific values are centralized at the top of `src/styles.css`. Components consume semantic variables for color, corner radius, button shape, heading emphasis, card borders, shadows and section dividers; they do not branch on theme names.

| Semantic token | Bright & Balanced | Bold & Editorial | Warm & Artistic |
|---|---:|---:|---:|
| Page background | `#FFFFFF` | `#FFFFFF` | `#FBF7EF` |
| Alternate section | `#EBEBEB` | `#EBEBEB` | `#EEE5D8` |
| Elevated surface | `#FFFFFF` | `#FFFFFF` | `#FFFDF8` |
| Primary text | `#171917` | `#171717` | `#34372F` |
| Secondary text | `#595B5E` | `#555854` | `#66685F` |
| Heading text | `#256914` | `#111411` | `#315B2A` |
| Border | `#EBEBEB` | `#111411` | `#D8CDBD` |
| Header background | `rgba(255,255,255,.96)` | `rgba(255,255,255,.97)` | `rgba(251,247,239,.96)` |
| Header text | `#171917` | `#111411` | `#34372F` |
| Footer background | `#111411` | `#080A08` | `#293427` |
| Footer text | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| Primary brand accent | `#95E159` | `#95E159` | `#95E159` |
| Text on brand accent | `#171917` | `#171917` | `#34372F` |
| Primary accent hover | `#256914` | `#256914` | `#315B2A` |
| Secondary accent | `#256914` | `#256914` | `#315B2A` |
| Dark feature background | `#256914` | `#161A17` | `#315B2A` |
| Dark feature text | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| Primary button background | `#95E159` | `#111411` | `#315B2A` |
| Primary button text | `#171917` | `#FFFFFF` | `#FFFFFF` |
| Primary button hover text | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| Secondary button border | `#256914` | `#111411` | `#315B2A` |
| Secondary button text | `#256914` | `#111411` | `#315B2A` |
| Card background | `#FFFFFF` | `#FFFFFF` | `#FFFDF8` |
| Card border | `#EBEBEB` | `#111411` | `#D8CDBD` |
| Link | `#256914` | `#256914` | `#315B2A` |
| Focus | `#256914` | `#256914` | `#315B2A` |
| Announcement/promotion | `#FFFFFF` with bright-green rule | `#FFFFFF` with bright-green rule | `#EEE5D8` with bright-green rule |
| Performance section | `#256914` | `#080A08` | `#315B2A` |
| Media section | `#EBEBEB` | `#EBEBEB` | `#EEE5D8` |
| Registration CTA | `#1A1D1A` | `#161A17` | `#315B2A` |
| Mobile hero surface | `#256914` | `#111411` | `#315B2A` |
| Image overlay | Black `72% → 8%` | Black `82% → 12%` | Warm charcoal `74% → 8%` |

To adjust a theme, edit its semantic declarations only. Add a new semantic token when a color has a distinct responsibility; do not add one-off theme selectors to individual React components.

## Homepage section rhythm

### Bright & Balanced

1. Light header
2. Photography-led hero with a restrained overlay
3. Light-gray parent pathways
4. White seasonal promotion with a bright-green rule
5. One dark-green performance section
6. White Why Garden Street section
7. Light-gray studio media section with white cards
8. White upcoming dates section
9. Light-gray owner section
10. Compact charcoal registration CTA
11. Charcoal footer

### Bold & Editorial

1. Crisp white header with stronger rule definition
2. Photography-led hero with a deeper editorial overlay
3. Light-gray parent pathways
4. White seasonal promotion with a graphic bright-green rule
5. Near-black performance section
6. White Why Garden Street section
7. Light-gray studio media section with white cards
8. White upcoming dates section
9. Light-gray owner section
10. Charcoal registration CTA
11. Near-black footer

This limits the homepage to two substantial dark moments before the footer: performance and registration.

### Warm & Artistic

1. Warm off-white header
2. Photography-led hero with a softened charcoal overlay
3. Supplied light-gray parent pathways
4. Warm off-white seasonal promotion with bright-green action details
5. Dark-green performance section
6. Warm off-white Why Garden Street section
7. Light-gray studio media section with white cards
8. Warm off-white upcoming dates section
9. Light-gray owner section
10. Dark-green registration CTA
11. Softened-charcoal footer

The warm direction uses **`#FBF7EF`** and **`#EEE5D8`** surfaces. They support photography without replacing the supplied greens or becoming the dominant brand colors.

## Comparison workflow

Use the review bar as the source of truth: stay on a page and switch among the five segmented choices. The thicker rule after Current Preview separates the baseline from the four proposals. Use the device-preview button for a quick responsive comparison, then verify finalists directly on both a phone and a computer.
