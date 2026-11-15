# Skills, references and Antigravity setup

## Skills included in this workspace

### Ponytail — full mode, always

`.agents/skills/ponytail/SKILL.md` contains the current Ponytail 5 working rules adapted for an Antigravity workspace. The root `AGENTS.md` makes it mandatory for every code change, review, refactor and dependency decision. The MIT license is included beside the skill.

The practical loop is: read the touched code and callers first; make the smallest complete change; preserve validation, error handling, security and accessibility; add a small check for non-trivial logic; run the relevant tests/build; finish with what was not checked and any remaining risk.

Upstream: https://github.com/DietrichGebert/ponytail

### Vastoco visual-design skill

`.agents/skills/vastoco-visual-design/SKILL.md` is project-specific. It controls the two-door content hierarchy, strict Espresso/Pale Oak two-colour palette, monochrome Espresso logo, Playfair Display + Inter typography, architectural illustration direction, conversion-focused copy and anti-template rules.

### Vastoco frontend-review skill

`.agents/skills/vastoco-frontend-review/SKILL.md` is the project-specific QA checklist for responsive layouts, accessibility, performance, truthful states and demo boundaries.

## External skills reviewed for use in Antigravity

The following are upstream skills, not vendored copies in this ZIP. Network access was unavailable to the build environment, so the project includes the relevant local operating guidance and the verified install commands below. Install them in Antigravity only when you want the full upstream skill/data set available to future sessions.

| Skill | What it contributes | Current setup |
|---|---|---|
| UI UX Pro Max | Searchable design intelligence for styles, palettes, font pairings, UX rules and stacks | `npm install -g ui-ux-pro-max-cli` then `uipro init --ai antigravity` |
| Frontend Design | Distinctive visual direction and avoidance of generic AI-generated layouts | `npx skills add anthropics/skills --skill frontend-design` |
| Emil Design Eng | Motion craft, timing, easing and animation restraint | `npx skills add emilkowalski/skills --skill emil-design-eng` |
| Vercel Web Design Guidelines | Review for web-interface, usability and accessibility issues | `npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines` |
| High-end Visual Design | Typography, spacing, depth and high-end visual craft | Skill Issue provides a manual source route; review its `SKILL.md` before copying into `.agents/skills/high-end-visual-design/` |

Skill Issue design directory: https://skill-issue.in/?domain=design

### How these are applied here

- The project's distinctive direction is defined by the local Vastoco visual-design skill; external skills should improve execution, not override the supplied brand.
- UI UX Pro Max is the best general reference when a design decision needs a searchable style, typography, palette or UX rule. The repository README lists `uipro init --ai antigravity` as the current installation route.
- Frontend Design is relevant for visual originality and anti-template critique.
- Emil Design Eng is relevant to the single monitor-stage hero transition, not a reason to animate every section.
- Vercel guidelines are a final code review step. Fetch their current guidance when performing a fresh audit rather than relying on a stale copy.
- High-end Visual Design is intentionally not duplicated alongside several overlapping design skills in this workspace. The local Vastoco visual skill and Frontend Design reference already provide the project-specific direction.

## Antigravity discovery

Antigravity supports workspace skills under `.agents/skills/<skill-name>/SKILL.md` and workspace instructions in `AGENTS.md`. Open this project folder as the workspace, then inspect the Customizations panel if a skill is not visible. Start a new agent session or reload customizations after adding an upstream skill.

Official docs: https://antigravity.google/docs/skills

## External source links

- Ponytail: https://github.com/DietrichGebert/ponytail
- UI UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Anthropic skills: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- Emil skills: https://github.com/emilkowalski/skills
- Vercel agent skills: https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines
- Skill Issue: https://skill-issue.in/?domain=design
- Antigravity skills: https://antigravity.google/docs/skills

## Source status

The local Ponytail and two Vastoco-specific skills are included and ready. The external skills above are researched and documented, but not installed into this ZIP because the build environment could not reach npm/GitHub during packaging. Do not treat an install command as proof that an external skill is already active.
