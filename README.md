# Vastoco — Two doors. One platform.

A responsive, frontend-only product prototype for the Vastoco Design Hackathon 2026. The project explores the client and professional experiences as two distinct homepage doors under one brand system.

## What's included

- `/` — visual gateway featuring the Axis-inspired editorial architectural hero (Didone typography in Bodoni Moda), moving photographic strip of Delhi NCR architecture, Skiper 44 scroll-triggered blur/reveal story, branded architectural loader, and two numbered doorway cards with Skiper 90 monochromatic pointer-following spotlight.
- `/clients` — the client homepage & discovery portal: unified search, locality picker, discipline/service selectors, 6-group filter sidebar, clickable professional cards, and comparison tray dock.
- `/client/professionals/:id` — read-only professional monograph: authentic photography, verified COA registration details, upfront fee breakdown (85% pro / 15% platform), and genuine review distribution.
- `/client/compare` — side-by-side comparison matrix of verified credentials, tabular ratings, and aligned booking actions.
- `/client/consultations` — client video consultations portal (upcoming, completed, and cancelled).
- `/client/profile` — client account profile management with interactive View Mode, validated Edit Mode, dirty-tracking, discard modal, and sessionStorage persistence.
- `/professionals` — the professional homepage: practice setup, portfolio onboarding, and upfront 85% payout / 15% platform commission terms.
- `/signup` and `/signin` — shared authentication entry points with credential recovery demonstration.
- `CLIENT_UI_POLISH_CHANGELOG.md` — complete changelog of spacing, typography balance, zero `transition: all`, card click affordance, and fee transparency.
- `CLIENT_PROFILE_EDITING_SPEC.md` — full technical and UX specification for client account profile view/edit modes.
- `CLIENT_RESPONSIVE_QA.md` — responsive audit across 9 viewports (320px–1920px) verifying 0px horizontal overflow and mobile navigation.
- `CLIENT_STATES_AUDIT.md` — comprehensive state audit cataloguing normal, empty, loading, error, and recovery flows.
- `/professionals/join` — multi-step professional setup with conditional COA field and local image previews.
- `ASSET_SOURCES.md` — comprehensive licensing and source documentation for video recordings, photography, and illustrations.
- `HERO_REFINEMENT_CHANGELOG.md` — detailed design rationale and before/after comparisons for the visual refinement pass.
- `MOTION_IMPLEMENTATION_NOTES.md` — architectural motion principles, GSAP/ScrollTrigger/Lenis integration, and reduced-motion matrix.
- `RESPONSIVE_QA_REPORT.md` — responsive audit across 10 viewports (320px–1920px) verifying 0px horizontal page overflow.
- `docs/` — brief alignment, design tokens, UX decisions, content guidance, flows, edge cases, implementation notes, QA plan, and the handover PDF.
- `.agents/` — Antigravity workspace guidance and skills, including Ponytail and official GSAP AI skills.
- `references/` — inspiration assets, official hackathon brief, and visual refinement video pack.

## Run locally

Requirements: Node.js 20 or newer. There are no npm runtime or build dependencies.

```bash
npm run dev
```

Open `http://localhost:4173`.

Build a static folder:

```bash
npm run build
npm run preview
```

Run the automated test suite:

```bash
npm test
```

Audit the exact runtime raster/vector palette (optional developer check; requires Python Pillow and NumPy):

```bash
python scripts/audit_two_colour_assets.py
```

## Frontend-only limitations

This is a navigable prototype, not a live service. It does **not** create user accounts, authenticate users, verify credentials, publish professional profiles, retrieve live professionals, collect consultation fees, process payments, schedule real consultations, send messages or store uploaded project files on a server. Demo forms validate locally and explain that no data was sent. The professional setup draft is held in the current browser session only; passwords are never persisted.

All directory profiles and portfolio information are labelled illustrative placeholders. Replace them with approved Vastoco source data before public release. No fake ratings, testimonials, partner marks or platform statistics are used.

## Product facts preserved from the official brief

- Vastoco is launching first in Delhi NCR.
- Clients can find, compare and book verified architects, interior designers and Vastu consultants.
- Paid video consultation durations: 15, 30 and 45 minutes.
- Professional verification includes a Council of Architecture (COA) check for architects.
- Professionals join for free and keep 85% of every paid consultation fee. The current official professional page says paid consultations require a paid plan and Vastoco's 15% commission is deducted from the professional's fee, not added on top of the client's price.
- The current official professional page describes COA-register and qualification-document checks for architects, and identity plus qualification or documented-practice checks for interior designers and Vastu consultants. These are supplementary current product facts, separate from the hackathon PDF's minimum wording.
- The official handover requires two desktop homepage designs (1440px), two mobile homepage designs (390px), a Figma link or PDF, and a 2–3 minute walkthrough. This code project includes the four responsive routes and a PDF design handover; confirm with the organisers that a code-first PDF handover is accepted in place of a Figma file.

## Antigravity setup

Open this folder as the workspace in Antigravity. It discovers project skills from `.agents/skills/` and project rules from `AGENTS.md`; start a new conversation or refresh customizations if you add skills later.

The project instructions enforce the Ponytail skill in full mode for every coding task. The visual-design and frontend-review skills are project-specific and remain available in the same workspace.

## Strict two-colour design system

The live interface uses exactly two base colours: Espresso `#3C2415` and Pale Oak `#DDD9CE`. The runtime wordmark is monochrome Espresso, and all runtime illustrations use the same two-colour treatment. Opacity variations of these two colours are permitted only for borders, shadows and surface separation; no third hue is used. The original teal logo and full-colour moodboards in `references/inspiration/` are preserved solely as supplied source references and are not loaded by the application.

## Typography and assets

The project uses Playfair Display for editorial display type and Inter for body/UI, loaded from Google Fonts with local fallback stacks. The supplied Vastoco wordmark geometry is retained as a monochrome Espresso runtime asset; the untouched original teal source remains only in the inspiration folder. The house artwork and the architect, consultation and floor-plan illustrations use the same Espresso/Pale Oak two-colour treatment.

## Build structure

```text
vastoco-redesign/
├── AGENTS.md
├── index.html
├── package.json
├── server.mjs
├── src/
│   ├── main.js
│   ├── pages.js
│   ├── components.js
│   ├── icons.js
│   ├── data.js
│   ├── clientMain.js
│   ├── clientPages.js
│   ├── clientData.js
│   ├── utils.js
│   └── styles.css
├── public/assets/
├── docs/
├── references/inspiration/
├── tests/
├── scripts/build.mjs
└── .agents/skills/
```

## Before production

Connect the real Vastoco APIs and approved data; implement server-side authentication, account permissions, COA/credential verification, booking inventory, secure payments, cancellation/refund logic, consultation delivery, review eligibility, privacy/legal pages and upload storage. These are deliberately out of scope for this frontend prototype.
