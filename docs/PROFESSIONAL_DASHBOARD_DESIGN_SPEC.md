# Vastoco Professional Workspace — Visual Design Specification
**Document ID:** `DOC-PRO-DS-02`  
**Revision:** `2.0.0` (Wispr Flow Aesthetic & Strict Two-Colour Discipline)  
**Status:** Canonical Design Token Reference  
**Application Root:** `vastoco-redesign/src/styles.css`

---

## 1. Design Philosophy: The Wispr Flow & Architectural Monograph Benchmark

The Vastoco Professional Workspace rejects the loud gradients, arbitrary neon badges, and drop-shadow heavy cards typical of generic SaaS products. Instead, it embodies the restrained elegance of an architectural monograph and the operational poise of **Wispr Flow**:
- **Tactile Material Honesty**: Every surface is built from real paper and ink values — `#3C2415` (Deep Espresso) and `#DDD9CE` (Pale Oak).
- **Hairline Precision**: Structural containment is established through 1px crisp borders rather than heavy drop shadows.
- **Concentric Geometry**: Border radii nest mathematically so inner cards flow inside outer shells with visual harmony.
- **Editorial Typography**: Pairing robust geometric sans-serif body typography with subtle serif accents gives the interface an established, architectural dignity.

---

## 2. Strict Two-Colour Palette System

To satisfy the hackathon's strict brand constraints, the system operates exclusively on **two hue anchors** manipulated through opacity and alpha channels. No secondary accents (blue, green, orange, or neutral grey) are permitted in production CSS.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ PRIMARY BRAND COLOURS                                                   │
│ 1. Deep Espresso: #3C2415  (rgb: 60, 36, 21)                            │
│ 2. Pale Oak:      #DDD9CE  (rgb: 221, 217, 206)                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.1 CSS Custom Property Token Hierarchy

```css
:root {
  /* Brand Constants */
  --pro-color-espresso: #3c2415;
  --pro-color-pale-oak: #ddd9ce;

  /* Surfaces & Backgrounds */
  --pro-bg-base: #ddd9ce;                                  /* Global canvas */
  --pro-surface-card: rgba(255, 255, 255, 0.55);            /* Translucent card surface */
  --pro-surface-elevated: #ffffff;                         /* Pure white high-contrast elements */
  --pro-surface-recessed: rgba(60, 36, 21, 0.04);          /* Inset wells & table headers */

  /* Text & Foreground */
  --pro-text-primary: #3c2415;                             /* High-contrast titles & metrics */
  --pro-text-secondary: rgba(60, 36, 21, 0.72);            /* Body copy, labels, explanations */
  --pro-text-muted: rgba(60, 36, 21, 0.52);                /* Captions, timestamps, breadcrumbs */

  /* Structural Hairlines */
  --pro-border-subtle: rgba(60, 36, 21, 0.12);             /* Standard card and table dividers */
  --pro-border-strong: rgba(60, 36, 21, 0.28);             /* Input borders and active tab rings */
  --pro-border-focus: #3c2415;                             /* Keyboard focus indicator */

  /* Status Emulation via Alpha (Zero Out-of-Brand Pigments) */
  --pro-status-active-bg: rgba(60, 36, 21, 0.08);          /* Confirmed session badge */
  --pro-status-active-text: #3c2415;
  --pro-status-alert-border: rgba(60, 36, 21, 0.45);        /* Conflict / notice alert */
}
```

---

## 3. Typographic System

The typography creates immediate distinction between clinical operational data and human architectural narrative:
- **Primary Interface Typeface**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif. Used for all UI controls, navigation labels, and interactive states.
- **Editorial Accent Typeface**: `Playfair Display`, `Newsreader`, `Georgia`, serif. Applied sparingly to practice titles, client quotes, and monograph descriptions.
- **Tabular Numerals**: All numerical data (currency in INR, consultation slot times, percentages) mandate `font-variant-numeric: tabular-nums` to guarantee vertical alignment in lists and summary cards.

### 3.1 Type Scale Hierarchy

| Token | CSS Rule | Size / Leading | Weight | Usage |
|:---|:---|:---|:---|:---|
| `pro-display` | `font-size: 2.25rem` | 36px / 44px | 700 Serif | Practice greeting hero |
| `pro-h1` | `font-size: 1.75rem` | 28px / 36px | 600 Sans | Page titles & primary headers |
| `pro-h2` | `font-size: 1.25rem` | 20px / 28px | 600 Sans | Section cards & table titles |
| `pro-h3` | `font-size: 1.00rem` | 16px / 22px | 600 Sans | Item headings & modal subtitles |
| `pro-body` | `font-size: 0.875rem` | 14px / 20px | 400 Sans | Standard body copy & brief notes |
| `pro-caption` | `font-size: 0.75rem` | 12px / 16px | 500 Sans | Metadata, timestamps, pill badges |

---

## 4. Concentric Spatial Grid & Radii Rules

To maintain the architectural feeling of physical blueprint drafting, spacing follows strict multiples of **8px**:

```
Spacing Scale:
4px  (0.5×) — Micro padding inside pills and badge counters
8px  (1.0×) — Standard gap between icon and adjacent label
16px (2.0×) — Internal card padding on mobile; standard stack gap
24px (3.0×) — Standard desktop card padding & column gutters
32px (4.0×) — Section separation margin
48px (6.0×) — Major hero and operational zone margins
```

### 4.1 Concentric Border Radii Mathematics
Nested elements must never share the same corner radius; inner radii must equal outer radius minus padding:
- **Container Shells (`.pro-surface-card`)**: `border-radius: 12px` (Outer container)
- **Nested Inner Well (`.pro-spotlight-session`)**: `border-radius: 8px` (Child element, $12\text{px} - 4\text{px}$)
- **Micro Interactive Controls (`.status-pill`, `.button--small`)**: `border-radius: 4px` (Child control)

This mathematical nesting prevents unsightly "corner collisions" and gives the layout a polished industrial finish.

---

## 5. Hairline Elevations vs Drop Shadows

Heavy black drop shadows destroy the tactile paper aesthetic of the Pale Oak palette. Vastoco enforces:
- **Flat Elevation 0 (Resting)**: `box-shadow: none; border: 1px solid var(--pro-border-subtle);`
- **Interactive Elevation 1 (Hover)**: `box-shadow: 0 4px 16px rgba(60, 36, 21, 0.06); border-color: var(--pro-border-strong);`
- **Modal Elevation 2 (Dialogs)**: `box-shadow: 0 16px 48px rgba(60, 36, 21, 0.18); border: 1px solid var(--pro-color-espresso);`

---

## 6. Iconography and Visual Assets

All icons are rendered inline via SVG functions in `vastoco-redesign/src/utils.js`:
- Consistent `1.5px` stroke weight.
- `stroke: currentColor` ensuring immediate cascade with surrounding type tokens.
- Square viewBox `0 0 24 24` with geometric centering.
- Strict suppression of colored SVG emojis or external raster icons.

