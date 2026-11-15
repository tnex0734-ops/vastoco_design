# Vastoco Architectural Design Tokens & System

## 1. Color Palette Tokens (Strict Two-Colour System)
```css
:root {
  /* Surface Canvas (Pale Oak) */
  --bg-primary: #DDD9CE;
  --bg-secondary: rgba(60, 36, 21, 0.05);
  --bg-tertiary: rgba(60, 36, 21, 0.08);
  --bg-hover: rgba(60, 36, 21, 0.06);
  --bg-active: rgba(60, 36, 21, 0.12);
  --bg-overlay: rgba(221, 217, 206, 0.92);
  --bg-frosted: rgba(221, 217, 206, 0.85);

  /* Deep Typographic Ink (Espresso) */
  --ink-primary: #3C2415;
  --ink-secondary: rgba(60, 36, 21, 0.76);
  --ink-muted: rgba(60, 36, 21, 0.58);
  --ink-subtle: rgba(60, 36, 21, 0.38);
  --ink-inverse: #DDD9CE;

  /* Architectural Drafting Borders */
  --border-subtle: rgba(60, 36, 21, 0.14);
  --border-default: rgba(60, 36, 21, 0.22);
  --border-strong: rgba(60, 36, 21, 0.45);
  --border-focus: #3C2415;

  /* Status Accents (Exclusively within Espresso/Pale Oak range) */
  --status-pending-bg: rgba(60, 36, 21, 0.08);
  --status-pending-ink: #3C2415;
  --status-active-bg: #3C2415;
  --status-active-ink: #DDD9CE;
  --status-verified-bg: rgba(60, 36, 21, 0.12);
  --status-verified-ink: #3C2415;
  --status-declined-bg: rgba(60, 36, 21, 0.04);
  --status-declined-ink: rgba(60, 36, 21, 0.45);
}
```

## 2. Typography Tokens
```css
:root {
  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Font Sizes */
  --text-hero: clamp(2.5rem, 5vw, 4.25rem);
  --text-h1: clamp(2.0rem, 3.5vw, 2.75rem);
  --text-h2: clamp(1.5rem, 2.5vw, 2.0rem);
  --text-h3: 1.25rem;
  --text-body: 1rem;
  --text-body-sm: 0.875rem;
  --text-meta: 0.8125rem;
  --text-micro: 0.75rem;

  /* Line Heights */
  --lh-tight: 1.1;
  --lh-snug: 1.25;
  --lh-body: 1.55;

  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.08em;
}
```

## 3. Spatial & Geometric Tokens
```css
:root {
  /* Architectural 8px Grid */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Crisp Box Radii (Strictly Architectural) */
  --radius-none: 0px;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;

  /* Depth & Shadows */
  --shadow-subtle: 0 1px 3px rgba(60, 36, 21, 0.06);
  --shadow-card: 0 4px 12px rgba(60, 36, 21, 0.08);
  --shadow-drawer: 0 -4px 24px rgba(60, 36, 21, 0.14);
  --shadow-modal: 0 12px 36px rgba(60, 36, 21, 0.18);
}
```

## 4. Motion & Animation Tokens
```css
:root {
  /* Timing Durations */
  --motion-instant: 150ms;
  --motion-quick: 250ms;
  --motion-base: 350ms;
  --motion-deliberate: 500ms;
  --motion-monograph: 800ms;

  /* Easing Functions */
  --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth-out: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce-soft: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

