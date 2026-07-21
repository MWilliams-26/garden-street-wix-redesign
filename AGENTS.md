# Garden Street Performing Arts Wix Redesign Instructions

## Project purpose

This repository is the project headquarters for the Garden Street Performing Arts Wix redesign. Use it to organize approved website copy, selected and optimized assets, source-material inventories, planning documents, references, links, screenshots, design decisions, QA notes, and Wix build progress. The live site is built visually in Wix; this repository is not a Wix codebase and must not be connected directly to Wix.

## Platform responsibilities

- **Wix:** branding, presentation, program information, navigation, parent education, photography and media, calls to action, and links to Studio Pro.
- **Studio Pro:** class registration, payments, account management, detailed class availability, and other operational functions.
- Do not duplicate operational data in Wix when Studio Pro is the authoritative destination. Present enough clear context for parents, then direct them to the correct verified Studio Pro link.

## Audience and responsive usability

- Make parent needs and common tasks the primary organizing principle.
- Prioritize fast, clear mobile navigation and readable, scannable copy.
- Every page, section, component, and call to action must include recommendations for desktop, tablet, and mobile behavior.
- Avoid designs that depend on hover, tiny text, dense layouts, or flyer-only information.

## Repository structure

- `client-imports/`: ignored, read-only original client materials.
- `docs/`: brief, audits, inventories, sitemap, decisions, links, and launch planning.
- `pages/`: page-level website copy and content specifications.
- `assets/`: selected, organized, and website-ready working copies.
- `reference/`: organized reference copies, screenshots, source documents, flyers, and inspiration.
- `wix/`: design system, navigation, responsive guidance, reusable components, build status, and QA.

## Source-material safety

- Treat everything in `client-imports/` as read-only. Never rename, move, edit, compress, replace, or delete anything there.
- Never delete client source files.
- Preserve each original source filename exactly in `docs/content-inventory.md`, along with its source path.
- Create working copies outside `client-imports/` with descriptive, web-friendly filenames. Record each working-copy path and proposed filename in the inventory.
- Do not assume materials are outdated because multiple versions or formats exist. Flag conflicts or ambiguity in `docs/missing-information.md` for review.
- Do not commit original ZIP archives or large original videos. Keep them in ignored `client-imports/` or approved external storage.

## Content and factual accuracy

- Do not invent business facts, class details, prices, dates, age ranges, schedules, instructor credentials, policies, or registration links.
- Mark missing, uncertain, or conflicting details explicitly and add them to `docs/missing-information.md`.
- Important website information must become accessible, searchable real text in Wix rather than remaining trapped inside images, PDFs, or flyers.
- Track every Studio Pro destination in `docs/studio-pro-links.md`. Use exact URLs only when supplied or verified, and record desktop and mobile placement.

## Privacy and repository hygiene

- Never store passwords, Wix or Studio Pro credentials, authentication tokens, payment information, student records, private personal data, or secrets.
- Do not commit `.env` files, credentials, private records, large archives, or original video files.
- Selected and optimized public website assets belong in `assets/` and should remain tracked.
- Review `git status` and staged changes before every commit.
- Ask before destructive Git operations. Do not modify or publish the live Wix website from this repository.

## Documentation workflow

- Update `docs/content-inventory.md` whenever source material is reviewed or a working copy is created.
- Update `docs/studio-pro-links.md` whenever a Studio Pro link is found, changed, placed, or verified.
- Update `docs/decisions-log.md` after every major content, navigation, design, platform, or scope decision.
- Update `wix/build-progress.md` as each page is built and completed across desktop, tablet, and mobile.
- Record unresolved QA issues in `wix/qa-notes.md` and launch blockers in `docs/launch-checklist.md`.
