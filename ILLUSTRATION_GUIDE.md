# Vastoco Illustration Art Direction & Design Guide

> **Brand Identity:** Vastoco — Two doors. One platform.  
> **Brand Palette:** Espresso `#3C2415` & Pale Oak `#DDD9CE`  
> **Visual Philosophy:** Premium Architectural Editorial & Technical Drafting  
> **Typeface Alignment:** Playfair Display (Headings) & Inter (UI/Annotations)

---

## 1. Visual Philosophy & Core Direction

Vastoco is an editorial architectural platform designed to connect discerning homeowners with verified architects, interior designers, and Vastu consultants in Delhi NCR.

The illustration art direction must reflect the authentic working culture of architectural practice:
- **Rooted in Reality:** Drawings resemble genuine architectural deliverables—site analyses, elevations, axonometric cutaways, structural sections, joinery specifications, and spatial diagrams.
- **Refined & Restrained:** Never generic corporate vectors, floating blob graphics, 3D clay characters, or cartoon emojis.
- **Materiality & Line Quality:** Delicate technical drawing lines, crisp dimension markers, subtle cross-hatching, and balanced architectural negative space.
- **Editorial Poise:** Artwork feels at home in an international architectural monograph or prestigious design review.

---

## 2. Color Palette Rules (Strict Two-Colour System)

The visual system permits **strictly two colours** for all interface elements, SVGs, icons, borders, backgrounds, and custom illustrations:

| Color Token | Hex Code | RGB | Role in Illustrations |
| :--- | :--- | :--- | :--- |
| **Espresso** | `#3C2415` | `rgb(60, 36, 21)` | Linework, structural outlines, annotations, silhouettes, typography |
| **Pale Oak** | `#DDD9CE` | `rgb(221, 217, 206)` | Paper background, fill surfaces, negative space, blueprint grids |

### Permitted Variations:
- **Solid Espresso (`#3C2415`)**: Outlines, strokes, dimension ticks, structural pillars, typography.
- **Solid Pale Oak (`#DDD9CE`)**: Background canvases, cards, paper planes.
- **Espresso Opacity Variations (`rgba(60, 36, 21, alpha)`)**:
  - `0.06` – `0.12`: Drafting grid lines, hatching fills, subtle drop planes.
  - `0.20` – `0.35`: Secondary drawing guidelines, projection rays, axis ticks.
  - `0.65` – `0.85`: Secondary annotations, dimension text, structural shading.
- **Pale Oak Opacity Variations (`rgba(221, 217, 206, alpha)`)**:
  - `0.40` – `0.85`: Glass panels, wash fills, overlay shields.

### Strictly Prohibited:
- ❌ No third hue (no blue, green, orange, red, yellow, purple, cyan).
- ❌ No neutral greys (`#888`, `#ccc`), pure whites (`#fff`), or pitch blacks (`#000`).
- ❌ No rainbow status tags; states must be communicated through text labels, iconography, and architectural line patterns.

> **Exception Note on Photography:** Real project photographs of built homes and interiors retain their natural photographic colors to maintain architectural authenticity. All UI frames, borders, badges, buttons, and illustrations around them remain strictly Espresso and Pale Oak.

---

## 3. Illustration Anatomy & Linework Standards

Every Vastoco SVG illustration is constructed with consistent drafting principles:

### A. Stroke Weights & Hierarchy
1. **Primary Structural Contour (`stroke-width="2"` to `2.5"`):**  
   Outer boundary of buildings, walls, desks, framing portals, and structural profiles.
2. **Secondary Detail Linework (`stroke-width="1.2"` to `1.5"`):**  
   Window mullions, furniture joints, staircase risers, compass needles, interior divisions.
3. **Tertiary Drafting & Dimension Lines (`stroke-width="0.75"` to `1"`):**  
   Dimension extension lines, projection rays, leader arrows, cross-hatching, axis guidelines.

### B. Geometry & Projection
- **Axonometric / Isometric (30°/30° or 45°/45°):**  
  Preferred for depicting residential architecture, room volumes, spatial arrangements, and city blocks.
- **Orthographic Elevation & Section:**  
  Preferred for professional monographs, facade comparisons, and structural sanction drawings.
- **Technical Floor Plan Sketching:**  
  Wall cutaways with solid Espresso fills, door swings indicated by 90° arc strokes, and room label annotations.

### C. Human Scale & Figures
- Human figures are rendered as architectural silhouettes or delicate contour drawings (similar to architectural scale models or drafting entourage).
- Proportions must be natural and calm—architects at drawing desks, clients reviewing floor plans, or practitioners presenting models.
- Never cartoonish or exaggerated.

---

## 4. Subject Mapping Across Product Surfaces

| Surface | Subject Matter | Metaphor & Product Concept |
| :--- | :--- | :--- |
| **Gateway Hero (5 Scenes)** | Axonometric Discovery, Compare Easel, Video Session, Monograph Spread, COA Registry | Comprehensive gateway to verified design expertise in Delhi NCR |
| **Client How It Works** | City exploration, dual drafting easel, plan approval stamp, video desk | Find → Compare → Evaluate → Book |
| **Client Search & Explore** | Axonometric neighborhood map, drafting desk with search grid | Transparent discovery without registration barriers |
| **Comparison System** | Dual drafting guides, alignment compass, specification checklists | Side-by-side clarity on fees, experience, and verified credentials |
| **Professional Journey** | Studio drafting desk, statutory COA registry check, monograph display, profile creation | Understand → Trust → Showcase → Join |
| **Practice Growth Pillars** | 85%/15% payout model, public monograph seal, structured client brief clipboard | Direct monetization without unpaid speculative pitches |
| **Discipline Verification** | Architect (COA register check), Interior Designer (material board), Vastu Consultant (spatial orientation compass) | Verifiable standards specific to each discipline |
| **Professional Onboarding** | Registration desk, studio details, COA certificate upload, project board, verification review | Guided 5-step practice profile setup |
| **System & Empty States** | Clean blueprint drafting board, calendar reservation marker, drawing re-upload sheet, perspective void | Accessible error recovery and non-blocking guidance |

---

## 5. Technical Implementation Guidelines

- **Vector Format (SVG):** All architectural line illustrations are authored as pure SVG elements with explicit `viewBox`, `xmlns`, and inline CSS/attributes.
- **Responsive Scalability:** SVGs scale fluidly via `width="100%"` with preserved aspect ratios (`preserveAspectRatio="xMidYMid meet"`).
- **Accessibility:** 
  - Meaningful standalone illustrations include descriptive `<title>` and `alt` attributes.
  - Purely decorative illustrations carry `aria-hidden="true"` or empty `alt=""` to avoid screen reader noise.
- **Zero Layout Shift:** Explicit `width` and `height` attributes ensure browsers allocate layout geometry before assets download.
- **Bundle Efficiency:** Pure SVG linework requires no external fonts or heavy bitmap textures, keeping payload sizes typically under 5 KB per illustration.

