# Vastoco Design Hackathon 2026 — package contents

This archive contains the editable code-first frontend prototype, the static build, project instructions, assets supplied for this task, generated illustration assets, and the design/UX handover.

## Start here

1. Open this folder as the workspace in Antigravity.
2. Read `ANTIGRAVITY_START_HERE.md` and `AGENTS.md`.
3. The workspace includes the requested Ponytail skill in `.agents/skills/ponytail/`; use full mode for every code task.
4. Run `npm run dev` with Node.js 20+ and open `http://localhost:4173`.
5. Run `npm test` and `npm run build` before changing or handing off the project. For a pixel-level asset palette check, run `python scripts/audit_two_colour_assets.py` (requires Pillow and NumPy).

No npm install is required: the prototype has no runtime or build dependencies.

## Main routes

| Route | Purpose |
|---|---|
| `/` | Gateway with the Axis-inspired architectural editorial hero, photo strip, blur-reveal story, and dual door cards |
| `/clients` | Official client homepage |
| `/professionals` | Official professional homepage |
| `/signup` / `/signin` | Shared, local-only authentication prototypes |
| `/clients/explore` | Illustrative professional discovery and comparison |
| `/clients/professional` | Illustrative professional profile with monograph, portfolio toggle, and COA check |
| `/clients/booking` | Consultation details, upfront pricing, and duration preview |
| `/professionals/join` | Five-step professional setup and portfolio preview |

## Important limitations

This is a frontend prototype only. It does not authenticate, save accounts on a server, perform credential or COA checks, publish professional profiles, query live availability, schedule real consultations, process payments, store uploaded images remotely, or initiate video calls. All sample professionals and project material are illustrative. Do not enter a real password or sensitive credential document.

The strict live palette is limited to Espresso `#3C2415` and Pale Oak `#DDD9CE`; the wordmark and runtime illustrations use the same two-colour treatment. The original teal wordmark and full-colour inspiration images remain only as source references and are never loaded by the app.

The official hackathon requires four homepage views at 1440px and 390px plus a Figma link or a PDF handover and a 2–3 minute walkthrough. The included PDF documents the solution and code-first approach; confirm with the organisers that this PDF format satisfies their design-artifact requirement instead of assuming the website alone is sufficient.

## Folder guide

- `src/` — application pages, components, route logic, styles, and offline vendor scripts (`gsap.min.js`, `ScrollTrigger.min.js`, `lenis.min.js`).
- `public/assets/` — logo, optimized house artwork, project photography, and original SVG/raster illustrations including `professional-door-02-architect-at-work.png`.
- `tokens/` — machine-readable two-colour, typography, spacing, radius and motion tokens.
- `scripts/apply_two_colour_brand.py` — re-applies the strict two-colour treatment to runtime raster/vector assets.
- `scripts/audit_two_colour_assets.py` — pixel-level raster and SVG palette audit (Pillow + NumPy required).
- `scripts/audit_responsiveness.mjs` — headless Chrome responsive horizontal overflow test across 10 viewports.
- `scripts/capture_all_review_screenshots.mjs` — captures all 20 full-fidelity review screenshots.
- `scripts/generate_handover_pdf.mjs` — renders the official design hackathon PDF handover.
- `tests/` — Node test suite (21 unit tests) for route logic, validation, page requirements, demo boundaries and two-colour compliance.
- `docs/` — brief alignment, UX decisions, design system, edge cases, implementation, testing, walkthrough, attribution and the two-colour revision record.
- `docs/Vastoco-Design-Hackathon-Handover.pdf` — design and implementation handover document.
- `ASSET_SOURCES.md` — source and licensing audit for recordings, photography, and custom illustrations.
- `HERO_REFINEMENT_CHANGELOG.md` — comprehensive changelog and rationale for the architectural visual refinement pass.
- `MOTION_IMPLEMENTATION_NOTES.md` — motion principles, GSAP/ScrollTrigger/Lenis engineering notes, and accessibility fallbacks.
- `RESPONSIVE_QA_REPORT.md` — 10-viewport responsive audit report confirming 0px horizontal page overflow.
- `references/` — inspiration assets, official hackathon brief, and visual refinement reference pack.
- `.agents/skills/` — Ponytail FULL mode skill plus official GSAP skills and Antigravity workspace guides.
- `dist/` — compiled static site output created by `npm run build`.
