# Seed & Measured Design Document

SOURCE: lapa.ninja/post/lars-muller-architectural-monographs | GALLERY: lapa.ninja Page 3 Pos 18 | DATE CRAWLED: 2026-11-13 | PAGES VISITED: /, /catalogue, /monographs/detail, /colophon

## 1. Concept and Voice
- **Big Idea**: The digital interface behaves like an open architectural prospectus printed on heavy unbleached tactile stock, where technical drafting precision meets museum-grade curation.
- **Tone of Copy**: Restrained, authoritative, uncompromisingly professional.
  - Pattern 1: Declarative architectural statements without marketing hyperbole ("Practices verified by register check", "Consultation fees deposited in escrow").
  - Pattern 2: Rigorous documentation labels with exact tabular specifications ("15 min · ₹1,200 · COA Reg. CA/2014/61284").

## 2. Color System
| Token / Role | Hex Code | Approx. Screen Share | Used For |
|---|---|---|---|
| `--color-bg-primary` (Surface Canvas) | `#DDD9CE` (Pale Oak) | 68% | Primary page background, card surfaces, modal base |
| `--color-ink-primary` (Deep Ink) | `#3C2415` (Espresso) | 22% | Headlines, primary text, solid buttons, active badges |
| `--color-ink-muted` (Secondary Ink) | `rgba(60, 36, 21, 0.72)` | 7% | Subtitles, helper text, timestamps, captions |
| `--color-border-subtle` (Drafting Line) | `rgba(60, 36, 21, 0.16)` | 2% | Structural borders, dividing lines, table rules |
| `--color-border-focus` (Active Focus) | `rgba(60, 36, 21, 0.85)` | 1% | Active states, focus rings, selected segment |

- **Contrast Structure**: Dark espresso ink on warm pale oak paper tone (WCAG AAA rating: 7.8:1 contrast ratio for body text, 10.4:1 for solid buttons).
- **Overlays & Translucency**: `rgba(221, 217, 206, 0.85)` with `backdrop-filter: blur(12px)` for sticky navigation and interactive drawers.

## 3. Typography
| Role | Family | Size (Desktop / Mobile) | Weight | Line-height | Tracking | Case |
|---|---|---|---|---|---|---|
| Display Hero | Playfair Display, serif | `clamp(2.5rem, 5vw, 4.25rem)` | 600 | 1.08 | `-0.02em` | Sentence |
| Section Headline | Playfair Display, serif | `clamp(1.75rem, 3vw, 2.5rem)` | 600 | 1.15 | `-0.015em` | Sentence |
| Subhead / Card Title | Playfair Display, serif | `1.25rem` / `1.125rem` | 600 | 1.25 | `-0.01em` | Sentence |
| Body Text | Inter, sans-serif | `1rem` (16px) / `0.9375rem` | 400 | 1.55 | `0` | Normal |
| Meta / Monograph Label | Inter, sans-serif | `0.8125rem` (13px) | 500 | 1.4 | `+0.04em` | All-caps / Tabular |
| Numerical Figures / Prices | Inter, sans-serif | `1.125rem` (18px) | 600 | 1.2 | `0` | Tabular numbers (`tnum`) |

## 4. Layout and Spacing
- **Grid Structure**: 12-column architectural grid on desktop (max-width `1280px`, margin `32px`, gutter `24px`); 4-column grid on mobile (`<768px`, margin `16px`, gutter `16px`).
- **Spacing Scale**: 8px rhythmic increments: `8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`.
- **Breakpoints**: Mobile: `320px–767px`; Tablet: `768px–1023px`; Desktop: `1024px–1440px+`.
- **Navigation Behavior**: Fixed editorial masthead (`height: 64px`), unobtrusive blur backdrop, clear dual-role indicators (`For Clients` / `For Professionals`).

## 5. Components
- **Primary Action**: Solid Espresso `#3C2415` background, Pale Oak `#DDD9CE` text, 2px border radius, 44px min touch height.
- **Secondary Action**: Pale Oak `#DDD9CE` background, 1px solid Espresso `#3C2415` border, Espresso text.
- **Opportunity Card**: Strict architectural box, 1px border `rgba(60,36,21,0.16)`, subtle elevation on hover `translateY(-2px)`.
- **Offer Composer Drawer**: Slides up from bottom on mobile (`max-height: 90vh`), sliding side-panel on desktop (`width: 480px`).

## 6. Motion Specification
- **Core Library**: GSAP 3.12+ with native CSS hardware-accelerated transforms (`transform`, `opacity`).
- **Smooth Scroll**: Lenis (`lerp: 0.1`, `smoothTouch: false`).
- **Easing Curves**:
  - Dramatic reveal: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out).
  - Tactile interaction: `cubic-bezier(0.25, 1, 0.5, 1)` (power2 out).
  - Modal transitions: `cubic-bezier(0.32, 0.72, 0, 1)`.

### Animation Catalog
| # | Trigger | Target | Properties From -> To | Duration | Ease | Purpose |
|---|---|---|---|---|---|---|
| 1 | Page Load | Hero Headline | `opacity: 0, y: 30` -> `opacity: 1, y: 0` | 0.8s | `power2.out` | Editorial entrance |
| 2 | Page Load | Hero Photographic Card | `opacity: 0, scale: 0.96` -> `opacity: 1, scale: 1` | 1.0s | `expo.out` | Architectural poise |
| 3 | Scroll | Opportunity Brief Cards | `opacity: 0, y: 20` -> `opacity: 1, y: 0` (stagger 0.08s) | 0.6s | `power2.out` | Feed rhythm |
| 4 | Hover | Pro Listing Card | `y: 0, borderColor: subtle` -> `y: -3px, borderColor: heavy` | 0.25s | `power1.out` | Tactile affordance |
| 5 | Click | Send Offer Drawer | `y: 100%` -> `y: 0%` | 0.4s | `expo.out` | Proposal composure |
| 6 | State Change | Offer Status Pill | `scale: 0.9, opacity: 0` -> `scale: 1, opacity: 1` | 0.3s | `back.out(1.4)` | Status transition |
| 7 | Tab Switch | Calendar / Agenda Matrix | `opacity: 0, x: 10` -> `opacity: 1, x: 0` | 0.25s | `power2.out` | View swap |
| 8 | Hover | Monograph Project Thumbnail | `filter: brightness(1.0)` -> `filter: brightness(0.96), scale(1.02)` | 0.35s | `power2.out` | Photographic inspection |

## 7. Interaction Catalog
- **Brief Filtering**: Instant client-side faceted filtering by Locality (Noida, Gurugram, South Delhi, Faridabad), Project Type, and Budget.
- **Offer Pitch Composer**: Interactive slider/radio for 15, 30, and 45-minute consultations, dynamic calculation of the 85% professional payout vs 15% platform commission.
- **Client Offer Review & Acceptance**: Split-screen candidate comparison, one-click offer acceptance transitioning to calendar schedule confirmation.
- **Interactive Calendar**: Conflict detection for overlapping consultation slots, instant toggle between agenda list and grid.

## 8. Media Treatment
Authentic architectural photography (`professional-door-02-architect-at-work.png` and high-resolution Delhi NCR residential monographs). All imagery color-graded to sit harmoniously within the Pale Oak and Espresso material world. Zero synthetic 3D rendering tropes.

## 9. Technology & Performance
Zero build dependencies for runtime execution. ES modules loaded cleanly via browser-native `<script type="module">`. Core Web Vitals target: LCP < 1.2s, CLS 0, INP < 50ms.

## 10. Why It Works
1. Authentic parity between client needs and professional dignity.
2. Complete transparency: 85% fee retention clearly stated upfront.
3. Strict two-colour palette creates indelible architectural prestige.
4. Frictionless brief submission with granular privacy safeguards.
5. Fully responsive from 320px mobile to 1440px desktop.

## 11. Never Copy
No direct styling or branding from external directories. All mock data, copy, visual layouts, and SVG icon geometry are custom-authored for Vastoco.

