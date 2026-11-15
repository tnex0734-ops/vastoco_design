# Asset attribution and provenance

- `vastoco-logo.png` — supplied by the user; its original wordmark geometry and transparency are retained, and the live version is monochrome Espresso. The untouched teal upload remains in `references/inspiration/` only.
- `palette-espresso-pale-oak.png` — supplied by the user; the exact Espresso and Pale Oak HEX values are preserved in the design tokens.
- `architecture-reference-01.png`, `architecture-reference-02.png`, `footer-reference.png` — supplied by the user as visual moodboard references. They are retained for internal design context and are not embedded as website content.
- `hero-motion-reference.mp4` — supplied by the user. Only the framed desktop-screen hero presentation is used as motion/layout inspiration; the original site content is not copied.
- `official-problem-statement.pdf` — supplied by the user; the content constraints are summarized in `01-official-brief-alignment.md`.
- `house-cutaway.webp` — original illustration generated for this project with OpenAI image generation from the user's request; converted to a strict Espresso/Pale Oak duotone and optimized as lossless WebP.
- `architect-workspace.svg`, `consultation-scene.svg`, `floorplan-sketch.svg`, `favicon.svg` — original SVG artwork created for this project.
- Fonts are loaded from Google Fonts (Playfair Display and Inter) under their respective licenses. The website retains local fallback stacks if the network is unavailable.
- Portfolio Photography: Real architectural and interior photographs for illustrative sample profiles are sourced from Unsplash under the Unsplash License (commercial and non-commercial use permitted):
  - `portfolio-naina-villa.webp` & `portfolio-naina-extension.webp`: R Architecture / Unsplash.
  - `portfolio-kabir-pavilion.webp` & `portfolio-kabir-terrace.webp`: R Architecture / Unsplash.
  - `portfolio-mira-living.webp` & `portfolio-mira-joinery.webp`: Spacejoy / Unsplash.
  - `portfolio-dev-courtyard.webp` & `portfolio-dev-sanctuary.webp`: R Architecture / Unsplash.
  All portfolio imagery is clearly identified as illustrative demonstration content and not attributed as real client deliverables.
- Editorial Vector Illustrations: `journey-understand.svg`, `journey-trust.svg`, `journey-showcase.svg`, `journey-join.svg`, `benefit-consultations.svg`, `benefit-profile.svg`, `benefit-briefs.svg`, `verify-architect.svg`, `verify-interior.svg`, `verify-vastu.svg` — original architectural linework SVGs created specifically for Vastoco using strictly `#3C2415` (Espresso) and `#DDD9CE` (Pale Oak).

The original user-provided reference images and video are included for context only. Do not reuse third-party reference-site screenshots or logos as live website assets. Verify license/ownership of any new portfolio imagery before production.

- Current product details (paid-plan requirement, 15% commission treatment and profession-specific verification descriptions) were checked against the official professional homepage at https://www.vastoco.in/ on 10 November 2026; they are supplementary to the hackathon PDF and should be rechecked before release.


## Strict two-colour treatment

The supplied logo geometry is retained in the live UI as a monochrome Espresso asset. The untouched teal source logo is kept only in `references/inspiration/` for provenance and is not loaded by the application. Runtime illustrations use Espresso and Pale Oak only.
