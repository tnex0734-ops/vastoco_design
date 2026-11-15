# Vastoco workspace rules

## Always use Ponytail
- Apply the current Ponytail 5 rules in `.agents/skills/ponytail/SKILL.md` in **full** mode for every coding task, review, dependency decision, fix, and refactor in this repository. If the host exposes Ponytail commands, start with `/ponytail full`; otherwise this always-on `AGENTS.md` rule is the Antigravity fallback.
- Read the existing code and the files touched before changing them. Make the smallest complete change that satisfies the task.
- Do not add dependencies for small utilities, invent abstractions for hypothetical future features, or refactor unrelated code.
- Non-trivial logic must have a small test or assert-based self-check. Keep validation, error handling, privacy, accessibility and user-requested behaviour.
- At the end of a coding task, state what was deliberately not built or checked and disclose any material risk.

## Product invariants
- This is a **frontend-only** hackathon prototype. Do not claim that accounts, verification, payments, bookings, messaging, reviews or consultation calls are live.
- Keep the two required homepage doors distinct: `/clients` and `/professionals`. `/` is a lightweight visual gateway, not a replacement for either required homepage.
- Never invent platform metrics, testimonials, partner logos, real professionals, verified badges or consultation prices. Mark example content as illustrative.
- Preserve the official requirements: Delhi NCR launch context; paid video consultations of 15, 30 or 45 minutes; professional verification including a COA check for architects; free professional joining; 85% professional share; and links between both homepage doors.
- Current official professional-site context (supplementary to the hackathon PDF): paid consultations require a paid plan; Vastoco's 15% commission is deducted from the professional's fee, not added to the client's price. The current site describes identity plus qualification/documented-practice checks for interior designers and Vastu consultants. Keep these facts sourced in docs and recheck before release.
- Do not represent pending verification as complete. Do not claim income or client volume is guaranteed.

## Visual system
- Preserve the geometry of the supplied Vastoco wordmark, but use the monochrome Espresso version in the live interface. The original teal source file remains only in the read-only inspiration references.
- Use exactly two brand colours in the live interface and generated deliverables: Espresso `#3C2415` and Pale Oak `#DDD9CE`. Do not add teal, sage, clay, ivory, white, grey, success, danger or any other colour as a third hue. Opacity variations of Espresso/Pale Oak are permitted only for borders, shadows and subtle surfaces.
- Recolour every runtime illustration to the same Espresso/Pale Oak duotone. Statuses must be communicated with wording, labels, icons and structure, never with extra status colours.
- Typography: Playfair Display for editorial display; Inter for interface and body copy. Keep line length readable and avoid typographic gimmicks.
- Use an 8px spacing scale, deliberate border radii, thin structural borders and restrained depth. Do not make every surface a rounded card.
- The monitor-stage animation belongs to the gateway hero only. Respect `prefers-reduced-motion`; avoid scroll-jacking, excessive parallax, ambient video backgrounds and repeated reveal animations.
- Use the supplied architecture references for art direction, not as templates to copy. Use the supplied hero video only as inspiration for the framed-screen hero presentation.

## Engineering and QA
- Keep the implementation lightweight and dependency-free unless a concrete need is demonstrated.
- Use semantic HTML, keyboard support, visible focus, useful labels, accessible status messages and responsive touch targets.
- Avoid storing passwords or sending user data. Demo drafts may live only in session storage and must be identified as local-only.
- Optimise images, lazy-load below-the-fold assets, keep animation to transform/opacity, and test narrow and wide viewports.
- Run `npm test` and `npm run build` after meaningful changes. Check the browser console and test keyboard/reduced-motion flows when a browser is available.
