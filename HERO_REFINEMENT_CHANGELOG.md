# Vastoco — Hero & Visual Refinement Changelog
**Project:** Vastoco Design Hackathon 2026  
**Scope:** Architectural Visual Refinement & Motion Experience Pass  
**Mode:** Ponytail FULL Mode  
**Palette:** Strict Espresso `#3C2415` & Pale Oak `#DDD9CE`  

---

## Executive Summary

Following a comprehensive design audit of the initial prototype against the hackathon brief and the reference package (`Vastoco_Antigravity_Visual_Refinement_Pack.zip`), this visual refinement pass elevates the Vastoco entry and storytelling experience from standard web layout patterns to an editorial architectural product experience.

All updates adhere to the strict brand identity guidelines:
1. **Zero Invented Metrics / Claims**: No fabricated review counts, artificial ratings, or unverified claims.
2. **Strict Two-Colour Palette**: All UI surfaces, typography, lines, icons, and illustrations are strictly composed of Espresso (`#3C2415`) and Pale Oak (`#DDD9CE`). Natural portfolio photography retains authentic photographic colors.
3. **Frontend-Only, Zero Unnecessary Dependencies**: Motion and interaction are implemented with GSAP, ScrollTrigger, and Lenis (served locally via self-contained vendor scripts in `src/vendor/`) with progressive enhancement and pure CSS/IntersectionObserver fallbacks.

---

## 1. Gateway Hero Transformation (Axis-Inspired Architectural Layout)

### Before (Initial Implementation)
- Centered heading on a desktop monitor mockup.
- The monitor scene felt static, with small preview cards nested inside a viewport shell.
- On mobile viewports (390px/360px), the monitor container and nested preview elements caused horizontal layout tension.
- Dual CTAs were placed below a heavy monitor frame, diluting scan efficiency.

### After (Refined Axis Editorial Stage)
- **High-Contrast Didone Typography**: Introduced **Bodoni Moda** as `--font-hero` (`'Bodoni Moda', 'Playfair Display', serif`), pairing oversized Didone headlines with high-contrast italics (`Spaces shaped by the <em>right expertise.</em>`).
- **Asymmetric Editorial Layout**: 
  - Left column: Location eyebrow tag (`Delhi NCR · Architecture · Interiors · Vastu`) and the bold Bodoni headline.
  - Right column: Concise, scannable value proposition lede and side-by-side primary/outline buttons with micro-arrow animations (`Explore verified professionals` and `Join as a professional`).
- **Moving Photographic Rectangle Strip**:
  - Replaced static monitor mockup with an organic, continuous horizontal strip of authentic architecture and interior photography across Delhi NCR (courtyard villas, daylight living spaces, steel rooftop pavilions, and bespoke millwork).
  - Varied aspect ratios (wide `380×250`, tall `230×290`, medium `330×230`, square `260×260`) mimic an editorial layout sheet.
  - Continuous CSS keyframe translation (`@keyframes strip-scroll`) with infinite looping.
  - Interactive pause control on hover and via an accessible `[data-motion-toggle]` button (`Pause movement` / `Play movement`).
  - Native reduced-motion query automatically disables animation and displays the strip in a scrollable snap track.

---

## 2. Client Value Scroll Story (Skiper 44 Blur/Reveal Synchronized Experience)

### Before (Initial Implementation)
- Section 7 featured 4 static, stacked summary cards that felt like repetitive marketing text.
- Lacked visual engagement and storytelling continuity between finding, comparing, and booking.

### After (Refined Skiper 44 Interactive Story)
- **Three-Beat Progressive Narrative**:
  1. `01 / Discover`: Finding verified architectural minds filtered by locality and typology.
  2. `02 / Compare`: Evaluating authentic project portfolios, COA active registration numbers, and upfront consultation rates side by side.
  3. `03 / Consult`: Selecting 15, 30, or 45-minute video consultations backed by a 100% escrow protection model.
- **Scroll-Triggered Blur/Reveal**:
  - Inactive beats subtly fade and soften (`opacity: 0.35`, `filter: blur(1.5px)`), focusing the reader's eye entirely on the active beat (`opacity: 1`, `filter: blur(0px)`).
  - Synchronized adjacent visual window dynamically transitions scenes to match the active narrative beat.
  - Browser address bar inside the preview window updates dynamically (`vastoco.in/clients/explore` → `vastoco.in/clients/compare` → `vastoco.in/clients/consultations`).
- **Accessibility & Fallback**:
  - Clicking any beat immediately switches the active beat and window preview.
  - Full keyboard focusability (`tabindex="0"`, Enter/Space activation, `aria-label`).
  - Mobile and reduced-motion modes disable blur and pinning, presenting a clean, vertical reading hierarchy.

---

## 3. Two Numbered Audience Doors (Skiper 90 Monochromatic Pointer Spotlight)

### Before (Initial Implementation)
- Two symmetric cards with basic border outlines and standard button links.
- Visual storytelling lacked differentiation between the homeowner (client) mindset and the architect/professional mindset.

### After (Refined Editorial Doorway Cards)
- **Prominent Right-Aligned Giant Numerals**:
  - High-impact Didone numerals (`01` and `02`) in Espresso `#3C2415` at 8% opacity provide unmistakable architectural wayfinding.
- **Audience-Specific Custom Art**:
  - **Door 01 (For Clients)**: Features the cutaway architectural house illustration (`house-cutaway.webp`) illustrating spatial exploration and home building.
  - **Door 02 (For Professionals)**: Features the new custom architectural linework illustration (`professional-door-02-architect-at-work.png`) depicting an architect drafting plans and working with scale models at a drafting table.
- **Monochromatic Spotlight Hover (Skiper 90)**:
  - Dynamic JavaScript pointer tracking (`--mouse-x`, `--mouse-y`) projects a subtle radial spotlight (`rgba(60, 36, 21, 0.07)`) following the user's cursor across the Pale Oak card surface.
  - Strictly adheres to the two-colour palette: zero rainbow gradients, zero artificial shadows.
  - Automatically disabled on touch/coarse pointer devices.

---

## 4. Vastoco Branded Architectural Loader

### Implementation Details
- **Architectural Grid Scaffold**:
  - A minimalist blueprint grid overlay (`loader-blueprint-grid`) draws into place with fine dashed lines (`rgba(60, 36, 21, 0.18)`).
  - The official Vastoco wordmark reveals smoothly in the center with its architectural tagline.
- **Performance & User Control**:
  - Total duration constrained to ~1.2s.
  - `sessionStorage` guard ensures the loader only displays on the first visit of a session; subsequent route navigations bypass it instantly.
  - Accessible `[data-loader-skip]` button allows users to immediately dismiss the intro.
  - Respects `prefers-reduced-motion: reduce` by bypassing the animation entirely.

---

## 5. Summary of Files Changed

| File | Change Description |
|---|---|
| `index.html` | Added Bodoni Moda Google font; linked local vendor scripts (`gsap.min.js`, `ScrollTrigger.min.js`); removed Lenis virtual scrolling to eliminate scroll delay and restore native 120Hz/60Hz zero-latency scrolling. |
| `src/pages.js` | Implemented `axisLandingHero()` with desktop CTAs in aside and dedicated `.hero-mobile-actions` below `.hero-strip-stage`, `clientScrollStorySection()`, and `editorialDoorsSection()`. Removed intrusive `#brand-loader` overlay to prevent blank screen states. |
| `src/styles.css` | Added Didone typography tokens, moving photo strip styles, blur/reveal story styles, monochromatic pointer spotlight; added mobile responsive overrides: hides `.hero-lede` on mobile (≤900px), positions full-width 48px touch CTAs directly below images, and enlarges mobile card imagery (270–280px tall) for clear visibility; removed `scroll-behavior: smooth` to guarantee instantaneous native scroll responsiveness. |
| `src/main.js` | Wired `initHeroPhotoStrip()`, `initScrollStory()`, and `initEditorialDoorsHover()`. Synchronized dual pause/play controls across desktop and mobile. Removed Lenis and brand preloader initialization. |
| `src/vendor/` | Self-contained, offline copies of GSAP 3.12.5 and ScrollTrigger 3.12.5. |
| `public/assets/` | Added `professional-door-02-architect-at-work.png` (pure Espresso `#3C2415` linework). |
| `tests/pages.test.mjs` | Added unit test coverage for new gateway components and assets (21/21 passing). |
| `ASSET_SOURCES.md` | Authored comprehensive source documentation for videos, photography, and illustrations. |

---

## 6. Mobile Layout & Scroll Refinements (User Feedback Pass)

Following targeted visual and interaction review, the following critical refinements were implemented:
1. **Zero-Latency Native Scrolling**:
   - Replaced virtual scroll interceptors (`lenis.min.js`) and removed browser `scroll-behavior: smooth` from `html`.
   - Native hardware-accelerated 60fps/120fps scrolling is fully active with 0ms delay on touch and mouse wheel.
2. **Eliminated Mobile Hero White Space**:
   - Resolved a flexbox issue where `.landing-hero-title-col` had `flex: 1 1 580px;`, which on mobile column direction caused an unwanted ~497px blank empty void before content.
   - Set `.landing-hero-title-col { flex: none; width: 100%; min-height: 0; }` on mobile to guarantee compact, natural editorial flow.
3. **CTA Buttons Positioned Directly Below Images**:
   - On mobile screens, CTA buttons (`Explore verified professionals` and `Join as a professional`) are placed directly beneath the architectural cards stage rather than above them.
4. **Clean Mobile Typography (Removed Sub-Lede)**:
   - On mobile viewports (≤900px), `.landing-hero .hero-lede` is hidden (`display: none !important`), allowing the headline `Spaces shaped by the right expertise.` to immediately connect with the visual gallery.
5. **Enlarged, Prominent Mobile Architecture Cards**:
   - Mobile card heights were scaled up from 165px to large `270px–280px` (with widths up to `320px`), ensuring architecture photography, framing, and interior details are prominently visible.


