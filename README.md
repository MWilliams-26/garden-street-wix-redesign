# Garden Street Performing Arts Wix Redesign

## Purpose

This repository is the shared project headquarters for the Garden Street Performing Arts website redesign. The user-authorized custom Vite + React app is in `site/`; planning and source records remain at the root. Wix stays live until an approved migration. Do not deploy, change DNS, or alter Wix without explicit approval.

## What this repository is not

- It does not directly connect to the Wix website.
- It does not connect to, edit, or publish the live Wix site.
- It is not the system for registration, payments, accounts, or detailed availability.
- It is not a place for credentials, student records, payment data, private personal data, original archives, or large original videos.

## How the tools fit together

- **Google Drive:** client delivery and long-term storage for original materials, especially files that should not be committed to GitHub.
- **GitHub:** versioned, synchronized storage for planning, copy, selected website-ready assets, references, and progress records.
- **VS Code and Amp:** the local workspace used to inventory materials, prepare working copies, draft content, and maintain project documentation.
- **Wix:** the visual website builder for branding, presentation, program information, navigation, parent education, media, and calls to action.
- **Studio Pro:** the operational system for registration, payments, account management, detailed class availability, and related functions. Wix directs families there through verified links.

## Starting on a new computer

1. Install Git, GitHub Desktop, and VS Code if needed.
2. Clone the private `garden-street-wix-redesign` repository from GitHub Desktop.
3. Open the cloned folder in VS Code.
4. Confirm the active branch and pull the latest changes before doing any work.
5. Obtain client source materials from the approved Google Drive location and extract them locally into `client-imports/` only when needed. This folder is intentionally ignored by Git.
6. Never copy credentials, student records, payment data, or private records into the repository.

## Routine when switching computers

1. Pull the latest GitHub changes.
2. Open the repository in VS Code.
3. Place or update source materials in the ignored `client-imports/` folder when necessary.
4. Use Amp to inventory and organize working copies.
5. Review all changes before committing.
6. Commit with a clear message.
7. Push before switching computers.
8. Pull again before starting on the other computer.

## File placement

### Original materials

Place extracted original client materials in `client-imports/`. Treat everything there as read-only: do not rename, move, edit, compress, or delete it. Preserve original filenames and paths in `docs/content-inventory.md`.

### Organized working copies

- Website-ready images, logos, and other selected assets: `assets/`
- Organized source-document or flyer references: `reference/`
- Page copy and content specifications: `pages/`
- Planning, inventory, links, decisions, and launch records: `docs/`
- Wix build guidance, components, progress, and QA: `wix/`

Give working copies descriptive filenames and record their relationship to the original in the content inventory.

## Safe Git practices

- Pull before beginning work and push before moving to another computer.
- Review `git status` and the complete diff before committing.
- Keep the repository private.
- Never commit passwords, tokens, `.env` files, credentials, private records, ZIP archives, or large original videos.
- Keep selected and optimized website assets in `assets/`; these are intentionally tracked.
- If a file is sensitive or unexpectedly large, stop and confirm where it belongs before staging it.

## First project steps

1. Add extracted source materials to ignored `client-imports/`.
2. Inventory materials without changing the originals.
3. Create organized working copies in `assets/` or `reference/`.
4. Audit the current website and verify Studio Pro destinations.
5. Resolve missing or conflicting information before finalizing copy.
