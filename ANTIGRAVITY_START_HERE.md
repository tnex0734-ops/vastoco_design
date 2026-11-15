# Start here in Antigravity

## 1. Open the workspace

Open the `vastoco-redesign` folder as the Antigravity workspace. The project contains:

- `AGENTS.md` — project-wide rules and required Ponytail usage.
- `.agents/skills/ponytail/SKILL.md` — Ponytail, full mode.
- `.agents/skills/vastoco-visual-design/SKILL.md` — Vastoco art direction and UX content rules.
- `.agents/skills/vastoco-frontend-review/SKILL.md` — responsive, accessibility, performance and edge-state review.

Antigravity should discover project skills from `.agents/skills/` and rules from `AGENTS.md`. Check the Customizations panel if a skill is not visible; start a new agent session or reload skills after adding files.

## 2. Run the project

Requirements: Node.js 20+.

```bash
npm run dev
```

Open `http://localhost:4173`.

```bash
npm test
npm run build
npm run preview
```

There are no package dependencies and no `npm install` step is needed.

## 3. First prompt to use with Antigravity

```text
Read AGENTS.md, ANTIGRAVITY_START_HERE.md, README.md, and every document in docs/ before changing anything. Use /ponytail full for this and every subsequent coding task. Apply the vastoco-visual-design and vastoco-frontend-review skills.

This is a frontend-only Vastoco Design Hackathon 2026 prototype. Use only Espresso `#3C2415` and Pale Oak `#DDD9CE` as base colours across the live UI and illustrations; keep the supplied wordmark geometry in monochrome Espresso, with no teal or other accent hues. Preserve the official challenge: two distinct homepage doors (/clients and /professionals), one shared brand, visible cross-links, mobile-first responsive layouts, truthful trust/fee language, and no invented statistics, testimonials or partner logos. The root / route is only a lightweight gateway, not a replacement for the two official homepages.

First inspect the current code, run npm test and npm run build, then perform a visual QA pass in the browser at 1440px and 390px for /, /clients and /professionals. Check intermediate widths, keyboard behaviour, forms, empty states, comparison dialog, onboarding, reduced motion, console errors and asset loading. Do not rewrite the project or add dependencies unless a demonstrated issue requires it. Make the smallest complete fixes, add tests for any non-trivial change, and update the relevant docs. Keep all sample data visibly illustrative and never imply that authentication, verification, booking or payment is live.

At the end, report what passed, what was not tested and any remaining risk.
```

## 4. Product and implementation boundaries

- Public client homepage: `/clients`.
- Public professional homepage: `/professionals`.
- Shared signup: `/signup`; role selection only when the entry intent is unknown.
- Client prototype: `/clients/explore`, `/clients/professional`, `/clients/booking`.
- Professional setup prototype: `/professionals/join`.
- No backend services are connected.
- Do not create a mobile bottom tab bar for the public marketing homepages. Reconsider it only for an authenticated product area with recurring destinations.

## 5. Next work after visual QA

1. Refine the actual visual composition against the supplied reference images and confirm the responsive monitor stage.
2. Tune the illustration artwork and image crops after browser review.
3. Confirm the real Vastoco copy, logo clear-space and any brand rules with the organisers.
4. Replace sample directory/profile content only when official data is available.
5. Record the 2–3 minute walkthrough using the outline in `docs/08-walkthrough-outline.md`.
6. Confirm with Vastoco that the PDF handover satisfies the Figma/PDF submission requirement for a code-first entry.
