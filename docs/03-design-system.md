# Vastoco Design System

## 1. Design Intent & Character

* **Architectural Editorial**: Refined, grounded, tactile, and dignified. High editorial discipline inspired by architectural monographs and design journals.
* **Two Doors, One Platform**: Distinct homepage doors for Clients (`/clients`) and Professionals (`/professionals`), unified under a shared visual language, typography, and two-colour brand system.
* **Anti-Template Discipline**: Generous Pale Oak negative space, strong Espresso typography, precise structural hairline borders, and restrained elevation. No generic SaaS cards, floating decorative blobs, artificial gradients, neon accents, glassmorphic blur effects, or AI-slop elements.
* **Truthful Prototype Limits**: Sample profiles, listings, and portfolio items are visibly marked as illustrative. State changes are explicit; no live payments, accounts, or background checks are implied.

---

## 2. Strict Two-Colour Brand System

The live interface, generated illustrations, design tokens, and deliverables strictly use **two base colours**:

| Colour Name | Hex Code | RGB | Role |
| :--- | :--- | :--- | :--- |
| **Espresso** | `#3C2415` | `rgb(60, 36, 21)` | Primary typography, headers, dark surfaces, hairline linework, icons, and monochrome logo |
| **Pale Oak** | `#DDD9CE` | `rgb(221, 217, 206)` | Canvas background, elevated surfaces, reverse text, and light illustration fills |

### Rules & Constraints
* **Zero Third Hues**: Pure black (`#000`), pure white (`#FFF`), greys, teals, blues, greens, terracottas, oranges, or reds are prohibited.
* **Opacity Variations**: Opacity variations of Espresso and Pale Oak are permitted only for borders, shadows, scrim overlays, hover states, and disabled controls.
* **Contrast Ratio**: Espresso on Pale Oak yields an exact WCAG contrast ratio of **10.23:1**, exceeding WCAG AAA requirements for normal and display text.
* **State Communication**: Success, error, pending, and verified states are communicated via explicit wording, semantic icons, hairline borders, and placement—never through arbitrary red/green status colours.

---

## 3. Semantic Tokens Architecture

The design system implements semantic tokens in [`tokens/design-tokens.json`](file:///tokens/design-tokens.json) and [`src/styles.css`](file:///src/styles.css):

### Surfaces
* `--surface-canvas`: `var(--pale-oak)` — Main background canvas.
* `--surface-elevated`: `rgba(221, 217, 206, 0.92)` — Elevated modals, headers, and floating badges.
* `--surface-subtle`: `rgba(221, 217, 206, 0.65)` — Quiet card backgrounds and secondary panels.
* `--surface-dark`: `var(--espresso)` — Primary inverted sections, dark CTA buttons, and tray.
* `--surface-dark-subtle`: `rgba(60, 36, 21, 0.05)` — Subtle tinted callouts and table rows.
* `--surface-overlay`: `rgba(60, 36, 21, 0.56)` — Dialog backdrop scrim.

### Typography & Text
* `--text-primary`: `var(--espresso)` — Default heading and body text.
* `--text-secondary`: `rgba(60, 36, 21, 0.78)` — Secondary copy and form labels.
* `--text-muted`: `rgba(60, 36, 21, 0.64)` — Helper notes, captions, and secondary metadata.
* `--text-inverse`: `var(--pale-oak)` — Text on Espresso dark surfaces.
* `--text-inverse-muted`: `rgba(221, 217, 206, 0.75)` — Muted text on Espresso dark surfaces.

### Borders & Hairlines
* `--border-subtle`: `1px solid rgba(60, 36, 21, 0.12)` — Structural dividers and subtle table rows.
* `--border-default`: `1px solid rgba(60, 36, 21, 0.18)` — Standard component borders and cards.
* `--border-strong`: `1px solid rgba(60, 36, 21, 0.34)` — Inputs, focused boundaries, and interactive borders.
* `--border-inverse`: `1px solid rgba(221, 217, 206, 0.22)` — Borders on dark surfaces.

### Interactive & States
* **Focus Ring**: `2px solid var(--espresso)` with `outline-offset: 2px`.
* **Browser Selection**: `::selection` uses `background: rgba(60, 36, 21, 0.18)` with `color: var(--espresso)`.
* **Error State**: `--state-error-border: rgba(60, 36, 21, 0.85)` with `background: rgba(60, 36, 21, 0.07)` and explicit error icon/copy.
* **Success State**: `--state-success-border: var(--espresso)` with `background: rgba(60, 36, 21, 0.06)` and check icon.
* **Pending State**: `--state-pending-border: rgba(60, 36, 21, 0.28)` with `background: rgba(221, 217, 206, 0.5)`.
* **Disabled State**: Opacity `0.45`, `cursor: not-allowed`, no hover transform.
* **Loading State**: `.loading-indicator`, `.spinner` (Espresso border rotation), and `.skeleton` (subtle pulse).
* **Empty State**: `.empty-state` with dashed border, centered editorial typography, and action button.

---

## 4. Typography System

The typography pairs an editorial display serif with a clean, neutral UI grotesque:

* **Display & Editorial Headings**: **Playfair Display** (Weights: 400, 600, 700; Italic: 400).
  * High-contrast transitional serif with architectural poise.
  * Controlled tracking (`-0.018em` to `-0.005em`) and line heights (`1.05` to `1.25`).
  * OpenType features enabled: `font-kerning: normal; font-feature-settings: "kern" 1, "liga" 1;`.
* **Body, UI, Forms & Buttons**: **Inter** (Weights: 400, 500, 600, 700).
  * Highly legible at all sizes with neutral character.
* **Fallbacks**: `Georgia, "Times New Roman", serif` for display; `"Segoe UI", Arial, sans-serif` for UI.

### Fluid Modular Scale
| Token | Variable | Desktop | Mobile (390px) | Weight & Leading | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `--text-display` | `clamp(48px, 6vw, 76px)` | `38px–52px` | 600 / 1.05 | Gateway and audience hero titles |
| **H1** | `--text-h1` | `clamp(38px, 4.5vw, 56px)` | `36px–48px` | 600 / 1.08 | Page headers and primary doors |
| **H2** | `--text-h2` | `clamp(28px, 3.2vw, 40px)` | `26px–36px` | 600 / 1.14 | Section headings and dialog titles |
| **H3** | `--text-h3` | `clamp(20px, 2.2vw, 26px)` | `20px–24px` | 600 / 1.25 | Card titles and subsections |
| **H4** | `--text-h4` | `18px` | `16px` | 600 / 1.35 | Sub-items and feature headings |
| **Body Large** | `--text-body-lg` | `16px` | `14px` | 400 / 1.65 | Hero lede and intros |
| **Body** | `--text-body` | `15px` | `14px` | 400 / 1.58 | Standard paragraph copy |
| **Body Small** | `--text-body-sm` | `13px` | `12px` | 500 / 1.50 | Navigation, buttons, form inputs |
| **Caption** | `--text-caption` | `11px` | `11px` | 600 / 1.45 | Metadata, pills, kickers, flags |

> **Typographic Discipline**: Minimum legible font size across desktop and mobile is **11px** (no sub-11px micro-text). Arbitrary font sizes and decorative all-caps shouting are eliminated.

---

## 5. Spacing, Layout & Radii

### 8px Spacing System
Built upon an 8px base scale with justified 4px micro-adjustments:
```text
4px  (space-1)  · Micro padding and badge adjustments
8px  (space-2)  · Tight item gaps and icon offsets
12px (space-3)  · Input padding and list spacing
16px (space-4)  · Standard card padding and button margins
20px (space-5)  · Form element gaps
24px (space-6)  · Component margins and card interiors
32px (space-7)  · Grid gaps and medium sections
40px (space-8)  · Subsection padding
48px (space-9)  · Section dividers and hero spacing
64px (space-10) · Section padding
80px (space-11) · Major feature separations
96px (space-12) · Large desktop hero paddings
112px(space-13) · Maximum layout rhythm
```

### Layout Widths & Viewports
* **Max Content Width**: `1240px` (centered with fluid gutters).
* **Desktop Gutters**: `32px` (at `1440px`).
* **Tablet Gutters**: `24px` (at `768px–1024px`).
* **Mobile Gutters**: `16px` (at `390px`).
* **Section Padding**: `clamp(56px, 8vw, 112px)` for proportional vertical rhythm.

### Architectural Radius Scale
Restrained, non-pill radii preserving architectural structure:
* `xs`: `4px` — Subtle tags, flags, and check boxes
* `sm`: `6px` — Form inputs, buttons, and alert bars
* `md`: `10px` — Cards, search boxes, and dialogue blocks
* `lg`: `16px` — Large hero art containers and modal dialogs
* `xl`: `24px` — Gateway monitor frame corners
* `pill`: `999px` — Navigation pills and compare dock

---

## 6. Duotone Artwork & Pixel-Level Asset Audit

* **Wordmark**: [`public/assets/vastoco-logo.png`](file:///public/assets/vastoco-logo.png) is rendered in monochrome Espresso, retaining 100% of the original wordmark geometry and transparency.
* **Architectural Cutaway**: [`public/assets/house-cutaway.webp`](file:///public/assets/house-cutaway.webp) is a pixel-audited duotone WebP asset using only Espresso and Pale Oak. No CSS tint filters (`filter: saturate()` or CSS colour washes) are applied.
* **Vector Illustrations**:
  * [`architect-workspace.svg`](file:///public/assets/architect-workspace.svg)
  * [`consultation-scene.svg`](file:///public/assets/consultation-scene.svg)
  * [`floorplan-sketch.svg`](file:///public/assets/floorplan-sketch.svg)
  * [`favicon.svg`](file:///public/assets/favicon.svg)
* **Pixel Audit Verification**: Confirmed via `python scripts/audit_two_colour_assets.py`:
  * `vastoco-logo.png`: 1 visible colour (Espresso `#3C2415`), 0 unexpected pixels.
  * `house-cutaway.webp`: 2 visible colours (Espresso `#3C2415`, Pale Oak `#DDD9CE`), 0 unexpected pixels.
  * All SVGs: 100% compliant with the two approved colour values.

---

## 7. Motion & Accessibility

* **Gateway Monitor Stage**: Isolated to the gateway hero (`/`), cycling 5 distinct architectural scenes representing:
  1. *Client discovery & professional comparison* (`house-cutaway.webp` + elevation lines + comparison matrix)
  2. *Architectural consultation* (`consultation-scene.svg` + 15/30/45 min duration badge)
  3. *Professional portfolio & projects* (`floorplan-sketch.svg` + architectural drawings callout)
  4. *Credential verification* (`architect-workspace.svg` + COA register verification seal)
  5. *Consultation booking & economics* (`house-cutaway.webp` + upfront fee clarity & 85% professional payout)
* **Stage Controls**:
  * Prev/Next navigation buttons (`[data-scene-prev]`, `[data-scene-next]`).
  * Direct scene dot indicators (`[data-scene-dot]`).
  * Visible pause/resume toggle (`[data-motion-toggle]`).
  * Automatic pause on hover and keyboard focus.
* **Mobile 390px Recomposition**:
  * Recomposes into an architectural vertical stack instead of scaling down a desktop monitor.
  * Preserves copy legibility, touch targets (≥ 44px), and artwork visibility.
* **Accessibility**:
  * `prefers-reduced-motion`: Automatically pauses rotation and removes transition animation.
  * Keyboard navigation: Full tab navigation through scenes, dots, controls, and dual action doors.
  * Contrast: Strict 10.23:1 WCAG AAA contrast ratio maintained throughout.

---

## 8. Client Homepage (`/clients`) Architecture

* **Target Audience**: Homeowners and families planning residential architecture, interiors, or Vastu alignments across Delhi NCR.
* **Core Journey Framework**: `Find -> Compare -> Evaluate -> Book`
* **Discovery & Filtering**:
  * Multi-parameter discovery search by Discipline, Locality (South Delhi, Gurgaon, Noida, broad NCR), and scope keywords.
  * One-click discipline filters for Architects, Interior Designers, and Vastu Consultants.
* **Sample Professional Showcase**:
  * Authentic duotone architectural project visuals (`project-residential.webp`, `project-interior.webp`, `project-vastu.webp`).
  * Visible verification methodology, experience, portfolio previews, upfront rates, and review policies.
  * Unmistakably labelled as `[Sample profile · Illustrative only]`.
* **Integrated Interactions**:
  * Floating comparison dock (`[data-compare-tray]`) and side-by-side comparison modal dialog (`[data-compare-dialog]`).
  * Quick Profile view modal (`[data-profile-modal]`).
  * Consultation Booking demonstration (`[data-booking-dialog]`) with 15/30/45-min duration calculation, Delhi NCR time slots, project brief capture, and confirmed summary state.
  * Interactive Project Scope & Budget Planner with dynamic guidance for Delhi NCR builds.
* **Trust & Integrity**:
  * Truthful Council of Architecture (COA) register check explanation.
  * Escrow payment protection holding client funds until session completion.
  * Reviews collected only from authenticated clients who attended verified video sessions (0 reviews on sample profiles).
* **Cross-Door Connection**: Persistent navigation and high-contrast conversion banner directly linking to the professional door (`/professionals`).
