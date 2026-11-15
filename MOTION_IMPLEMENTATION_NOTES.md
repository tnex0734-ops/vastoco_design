# Vastoco — Motion Implementation & Animation Engineering Notes
**Project:** Vastoco Design Hackathon 2026  
**Scope:** Architectural Motion, Easing Curves, Scroll Interactions & Accessibility  
**Palette:** Strict Espresso `#3C2415` & Pale Oak `#DDD9CE`  

---

## 1. Architectural Motion Philosophy

The motion language of Vastoco is inspired by architectural drawing, precision drafting, and spatial reveals. Motion is never gratuitous, playful, or bouncy; instead, it is structural, deliberate, and high-performance.

Key tenets:
1. **Structural Easing**: We employ `power2.out` for reveals and `power2.inOut` for transitions, mimicking the physical mass and inertia of architectural materials.
2. **Monochrome Restraint**: All highlights and spotlights use low-opacity tones of Espresso (`#3C2415` at 5% to 8%) on Pale Oak (`#DDD9CE`), preserving the strict two-colour identity without color contamination.
3. **Zero Layout Shifts**: All animations rely strictly on GPU-accelerated compositing properties (`transform` and `opacity`), ensuring consistent 60fps rendering without reflows.

---

## 2. Animation Systems Breakdown

### 2.1 Vastoco Branded Architectural Loader
- **Grid Layout**: A minimalist blueprint overlay (`.loader-blueprint-grid`) draws into place with fine dashed lines (`rgba(60, 36, 21, 0.18)`), framing the Vastoco wordmark.
- **GSAP Timeline**:
  ```javascript
  const tl = window.gsap.timeline({ onComplete: dismissLoader });
  tl.fromTo('.loader-blueprint-grid', 
    { opacity: 0, scale: 0.94 }, 
    { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
  )
  .fromTo('.loader-mark-wrap', 
    { opacity: 0, y: 14 }, 
    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 
    '-=0.15'
  )
  .to({}, { duration: 0.4 }) // deliberate settle beat
  .to(loader, { opacity: 0, duration: 0.35, ease: 'power2.inOut' });
  ```
- **Lifecycle & Fallback**:
  - `sessionStorage.getItem('vastoco_visited')` ensures the loader only runs once per browser session.
  - An accessible `[data-loader-skip]` button dismisses the overlay instantly.
  - If GSAP is unavailable or network is constrained, a fallback `setTimeout(dismissLoader, 1300)` completes the dismissal.
  - If `prefers-reduced-motion: reduce` is active, the loader is immediately removed (`loader.classList.add('is-hidden')`).

### 2.2 Moving Architectural Photo Strip (Axis-Inspired)
- **Continuous Translation**: Uses hardware-accelerated CSS keyframe translation:
  ```css
  .hero-strip-track {
    display: flex;
    gap: 20px;
    width: max-content;
    will-change: transform;
    animation: strip-scroll 48s linear infinite;
  }
  @keyframes strip-scroll {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }
  ```
- **Seamless Looping**: The strip contains 6 primary Delhi NCR architectural images followed by an identical duplicate sequence, enabling an imperceptible loop boundary at `-50%`.
- **Hover & Manual Controls**:
  - Hovering anywhere on the gallery track pauses translation:
    ```css
    .hero-strip-stage:hover .hero-strip-track {
      animation-play-state: paused;
    }
    ```
  - An explicit toggle button (`[data-motion-toggle]`) pauses/resumes the track via `.is-paused` class, toggling `aria-pressed` and updating button text for assistive technology.

### 2.3 Scroll-Triggered Blur/Reveal Story (Skiper 44 Pattern)
- **Visual Rhythm**: Inactive narrative beats maintain low contrast and subtle Gaussian blur (`opacity: 0.35`, `filter: blur(1.5px)`). When a beat enters focus, it transitions to full crisp clarity (`opacity: 1`, `filter: blur(0px)`) with `transition: opacity 0.45s ease, filter 0.45s ease`.
- **ScrollTrigger Integration**:
  ```javascript
  beats.forEach((beat, idx) => {
    window.ScrollTrigger.create({
      trigger: beat,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => setActiveBeat(idx),
      onEnterBack: () => setActiveBeat(idx)
    });
  });
  ```
- **Visual Preview Synchrony**: As the active beat index changes, the adjacent UI preview window updates both its mock URL bar (`vastoco.in/clients/explore` → `vastoco.in/clients/compare` → `vastoco.in/clients/consultations`) and the active scene pane.
- **IntersectionObserver Fallback**: If GSAP/ScrollTrigger is not active or on smaller screens, a native `IntersectionObserver` updates beats cleanly without pinning.

### 2.4 Monochromatic Pointer Spotlight (Skiper 90 Pattern)
- **Interactive Coordinate Calculation**:
  ```javascript
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--mouse-x');
    card.style.removeProperty('--mouse-y');
  });
  ```
- **Pure Two-Colour Gradient**:
  ```css
  .door-card-spotlight {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    background: radial-gradient(
      circle 320px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(60, 36, 21, 0.07),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .editorial-door-card:hover .door-card-spotlight {
    opacity: 1;
  }
  ```
- **Touch & Mobile Guard**: Automatically disabled via `@media (pointer: coarse)` and `window.matchMedia('(pointer: coarse)')` to avoid unnecessary calculation on mobile/touch screens.

### 2.5 Lenis Smooth Scroll & GSAP Ticker Synchronization
- **Lenis Configuration**:
  ```javascript
  const lenis = new window.Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false
  });
  ```
- **Ticker Coupling**:
  ```javascript
  lenis.on('scroll', window.ScrollTrigger.update);
  window.gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  window.gsap.ticker.lagSmoothing(0);
  ```
  This guarantees that scroll velocity matches GSAP ScrollTrigger updates with zero micro-stutter or frame lag.

---

## 3. Accessibility & Reduced Motion Matrix

| Feature | Standard Motion Experience | Reduced-Motion Experience (`prefers-reduced-motion`) | Coarse Pointer / Mobile |
|---|---|---|---|
| **Brand Loader** | ~1.2s blueprint reveal + fade out | Skipped instantly (`display: none`) | Skipped if visited; skip button visible |
| **Photo Strip** | Continuous 48s horizontal translate | Static scrollable gallery with snap points | Native swipe gestures with scroll-snap |
| **Scroll Story** | ScrollTrigger blur/focus transitions | All beats crisp (`blur: 0, opacity: 1`); linear scroll | Natural vertical flow without pinning |
| **Spotlight Hover** | Smooth pointer-following spotlight | Disabled | Disabled (`display: none`) |
| **Lenis Scroll** | Momentum-smoothed scrolling | Native instant browser scrolling | Native touch scrolling |

---

## 4. Vendor Libraries Audit

All motion libraries are stored locally in `src/vendor/` to ensure full offline capability and deterministic execution:
1. `src/vendor/gsap.min.js`: GreenSock Animation Platform v3.12.5 (72.2 KB).
2. `src/vendor/ScrollTrigger.min.js`: ScrollTrigger plugin v3.12.5 (43.4 KB).
3. `src/vendor/lenis.min.js`: Studio Freight / Darkroom Lenis v1.1.18 (13.0 KB).

Total vendor bundle size: 128.6 KB uncompressed (zero npm build dependencies required).

