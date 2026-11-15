# Vastoco Complete Website Page Inventory & Illustration Audit

> **Document Version:** 1.0.0  
> **Date:** November 11, 2026  
> **Platform:** Vastoco — Two doors. One platform. (Delhi NCR)  
> **Brand Palette:** Espresso `#3C2415` & Pale Oak `#DDD9CE`  
> **Typography:** Playfair Display (Display/Headings) & Inter (UI/Body)

---

## 1. Executive Summary & Audit Scope

This audit provides an exhaustive inventory of every page, route, view, modal, drawer, form, and edge state in the Vastoco frontend codebase (`c:\Users\TNEX\OneDrive\Desktop\vastoco\vastoco-redesign`).

For every screen, this document records:
1. **Route & Function**: URL, template handler, and core purpose.
2. **Current Visual Assets**: Existing illustrations, photographs, icons, and components.
3. **Illustration Requirements**: Conceptually distinct visual storytelling assets required by the brief.
4. **Responsive Considerations**: Breakpoint-specific adaptations for 320px, 360px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px, and 1920px.

---

## 2. Complete Page & View Inventory

### Page 01: Main Gateway Landing Page
- **Route:** `/` (`homePage()`)
- **Audience:** Shared entry (Both homeowners and design practitioners).
- **Core Purpose:** The central architectural portal presenting the "Two doors. One platform." brand vision. Features the animated monitor stage demonstrating 5 live product scenes.
- **Current Visual Assets:**
  - Monochrome Vastoco logo (`/assets/vastoco-logo.png`).
  - Interactive Monitor Stage with 5 HTML/CSS scenes:
    - 01 Discover (`/assets/portfolio-naina-villa.webp`, `/assets/portfolio-kabir-pavilion.webp`)
    - 02 Compare (Side-by-side spec comparison table)
    - 03 Consult (15/30/45m duration selector, calendar timeslots, escrow badge)
    - 04 Showcase (`/assets/portfolio-naina-villa.webp`, `/assets/floorplan-sketch.svg`)
    - 05 Verified (COA statutory registry check and checklist)
  - Door cards: Client Door (`/assets/house-cutaway.webp`), Professional Door (`/assets/architect-workspace.svg`).
  - Trust strip icons: Shield, Calendar, Lock.
- **Illustration Requirements:**
  - Monitor Stage Scene 01: Axonometric building and location exploration.
  - Monitor Stage Scene 02: Side-by-side professional comparison easel.
  - Monitor Stage Scene 03: Video consultation drawing review.
  - Monitor Stage Scene 04: Architectural monograph presentation with drawings & photos.
  - Monitor Stage Scene 05: Council of Architecture statutory registry check.
- **Responsive Considerations:**
  - 1440px: Two-column grid (Copy Left 48%, Monitor Right 52%).
  - 1024px: Balanced two-column grid with fluid monitor scaling.
  - 768px: Stacked layout; monitor drops below copy with 100% width.
  - 390px / 360px: Full-width stacked CTAs (`min-height: 48px`), heading font clamp `clamp(30px, 6.5vw, 42px)`, fluid monitor stage with no horizontal clipping.

---

### Page 02: Client Homepage
- **Route:** `/clients` (`clientPage()`)
- **Audience:** Homeowners & families in Delhi NCR seeking architects, interior designers, and Vastu consultants.
- **Core Journey:** Find → Compare → Evaluate → Book.
- **Current Visual Assets:**
  - Hero showcase: Architectural cutaway illustration (`/assets/house-cutaway.webp`) with blueprint grid and metadata tags.
  - Journey cards: 4 steps with SVG icons (`search`, `compare`, `shield`, `video`).
  - Discipline cards: 3 disciplines with icons (`compass`, `house`, `layers`).
  - Directory grid: Sample cards with real portfolio photography (`portfolio-*.webp`).
  - Trust pillars: 3 discipline verification breakdown cards.
  - Consultation pricing cards: 15, 30, and 45-minute tier cards with feature lists.
  - Review integrity banner.
  - Project Scope & Budget Planner with interactive slider.
  - Cross-door link to `/professionals`.
- **Illustration Requirements:**
  1. *Finding an architect*: Axonometric residential discovery diagram (`client-how-find.svg`).
  2. *Comparing professionals*: Side-by-side elevation drawings on drafting board (`client-how-compare.svg`).
  3. *Discussing a house project*: Consultation drawing review (`consultation-scene.svg`).
  4. *Consultation durations*: Structured timeline diagram (`client-how-book.svg`).
  5. *Understanding budget & scope*: Spatial zoning and floor plan cost allocation (`client-planner-scope.svg`).
  6. *Secure escrow booking*: Escrow transaction protection seal (`client-payment-escrow.svg`).
- **Responsive Considerations:**
  - Hero: Two-column on desktop; stacked on mobile with search bar full-width.
  - Directory: 2-column grid on desktop/tablet; 1-column on mobile.
  - Progressive comparison dock: Sticky at bottom, collapses from horizontal row to compact stacked pill container at `<= 640px`.

---

### Page 03: Professional Homepage
- **Route:** `/professionals` (`professionalPage()`)
- **Audience:** Architects, interior designers, and Vastu consultants in Delhi NCR.
- **Core Journey:** Understand → Trust → Showcase → Join.
- **Current Visual Assets:**
  - Professional Hero: Editorial architectural drafting scene (`/assets/architect-workspace.svg`).
  - 4 Full-Width Journey Rows: Alternating editorial rows using `journey-understand.svg`, `journey-trust.svg`, `journey-showcase.svg`, and `journey-join.svg`.
  - 3 Full-Width Benefit Rows: Alternating feature rows using `benefit-consultations.svg`, `benefit-profile.svg`, and `benefit-briefs.svg`.
  - Portfolio Monograph Demo: Studio Aakar monograph with tabs, real villa photos, and floor plans.
  - Verification Section: Dynamic image container (`verify-architect.svg`, `verify-interior.svg`, `verify-vastu.svg`) with 3 interactive discipline tabs.
  - Earnings Split Section: Interactive 85%/15% fee payout calculator and donut visual.
  - Onboarding Steps: 5-step guided path.
  - Cross-door link to `/clients`.
- **Illustration Requirements:**
  - Understand: Architectural studio, spatial drawing, and video consultation.
  - Trust: Council of Architecture statutory registry check and credentials review.
  - Showcase: Architectural monograph with elevations, models, and material schedules.
  - Join: Practitioner creating verified profile with 85% payout terms.
  - Benefits: Paid video consultations, verified public profiles, structured client briefs.
  - Verification tabs: 3 distinct illustrations for Architects (elevation/COA), Interior Designers (room layout/materials), and Vastu Consultants (directional compass/spatial axis).
- **Responsive Considerations:**
  - Editorial rows: Desktop alternating grid (`1fr 1.15fr` and `1.15fr 1fr`); Tablet/Mobile stacks with illustration on top, content below.
  - Calculator: Side-by-side desktop; stacked on mobile.
  - Verification: Two-column desktop; stacked on mobile with full-width tabs.

---

### Page 04: Client Search & Discovery
- **Route:** `/clients/explore` (`explorePage()`)
- **Audience:** Homeowners filtering by specialization, locality, or keyword.
- **Current Visual Assets:**
  - Search & filter toolbar: Text input, discipline selector, locality pill.
  - Professional listing cards: Real portfolio photography, fee display, credentials, and comparison toggle.
  - Empty search state: Basic text message and reset button.
  - Comparison dock: Docked bottom bar with selection counter and compare trigger.
  - Comparison modal: Side-by-side comparison table.
- **Illustration Requirements:**
  - *Empty search results / No matching profiles*: Axonometric drafting table with magnifying grid showing no matching architectural criteria (`empty-search.svg`).
  - *Supporting discovery visual*: Delhi NCR urban neighborhood zoning map (`discovery-aerial.svg`).
  - *Comparison empty tray*: Dual parallel drafting guides with compass (`comparison-empty.svg`).
  - *Comparison missing info state*: Architectural spec sheet with pending documentation markers (`comparison-missing.svg`).
- **Responsive Considerations:**
  - Toolbar wraps gracefully from single row (desktop) to stacked inputs (mobile).
  - Cards stack in 1 column at `<= 768px`.
  - Comparison tray fits mobile safe areas with clear touch targets.

---

### Page 05: Professional Profile Page
- **Route:** `/clients/professional?id=...` (`profilePage()`)
- **Audience:** Homeowners evaluating a specific professional.
- **Current Visual Assets:**
  - Header banner: Name, discipline, location, experience, qualification.
  - Practice Overview: Editorial bio and design philosophy.
  - Selected Works Gallery: Real portfolio photography cards with tags and captions.
  - Empty portfolio simulation state: Text box with empty icon.
  - Verification standard box: COA register details.
  - Client feedback section: Authentic zero-reviews explanation box.
  - Sticky consultation booking card: 15, 30, and 45-min rate breakdown.
- **Illustration Requirements:**
  - *Practice architectural process*: 3-stage architectural lifecycle diagram (`profile-process-diagram.svg`).
  - *Empty portfolio state*: Clean blueprint drafting board awaiting project submissions (`portfolio-empty.svg`).
- **Responsive Considerations:**
  - Two-column on desktop (Content 65%, Sticky Booking Card 35%).
  - At `<= 900px`, booking card moves below portfolio; sticky mobile CTA button appears.

---

### Page 06: Progressive Comparison Experience
- **Components:**
  - Stage 1: Card-level "Add to compare +" toggle.
  - Stage 2: Bottom Comparison Tray (`.client-compare-dock`).
  - Stage 3: Expanded Comparison Dialog (`[data-compare-dialog]`).
- **Audience:** Homeowners comparing 2 professionals side by side.
- **Current Visual Assets:**
  - Tray: Slot 1 (filled/empty), Slot 2 (filled/empty), counter, limit warning, clear button.
  - Modal: Desktop table view; mobile stacked paired cards view.
- **Illustration Requirements:**
  - Empty tray state: Technical drafting compass and alignment guides (`comparison-empty.svg`).
  - Missing info state: Architectural specification sheet with pending markers (`comparison-missing.svg`).
- **Responsive Considerations:**
  - Desktop (> 640px): Comprehensive side-by-side table rows.
  - Mobile (<= 640px): Stacked paired attribute cards (`.compare-pair-block`) avoiding awkward horizontal scrolling.

---

### Page 07: Consultation Booking & Checkout Demonstration
- **Route:** `/clients/booking?pro=...` (`bookingPage()`)
- **Audience:** Homeowners scheduling a video session and reviewing upfront fees.
- **Current Visual Assets:**
  - 4-step booking form:
    1. Duration options (15m, 30m, 45m radio pills).
    2. Date & timeslot chips with unavailable slot simulation.
    3. Project details (typology, budget range, timeline, scope textarea).
    4. Payment simulation (UPI, Card, Netbanking, failure simulation checkbox).
  - Upfront Fee Summary aside: Itemized breakdown, taxes included, escrow note.
  - Unavailable slot alert.
  - Payment failure simulation alert.
  - Booking confirmation success state.
- **Illustration Requirements:**
  - Unavailable timeslot state: Calendar grid with reserved architectural session marker (`state-slot-unavailable.svg`).
  - Escrow payment protection visual: Escrow seal and fee guarantee diagram (`client-payment-escrow.svg`).
  - Booking confirmation success seal: Verified appointment stamp.
- **Responsive Considerations:**
  - Desktop: Form on left, Summary aside on right.
  - Mobile: Form on top, Summary stacks cleanly below with sticky submit button.

---

### Page 08: Professional Onboarding / Join Setup
- **Route:** `/professionals/join` (`professionalJoinPage()`)
- **Audience:** Practitioners setting up a public profile and submitting credentials.
- **Current Visual Assets:**
  - Sidebar with step list (01 Your details, 02 Your practice, 03 Verification, 04 Portfolio, 05 Review) and progress bar.
  - Draft recovery banner (`data-resume-banner`).
  - Step 1: Account & contact fields.
  - Step 2: Discipline, location, experience.
  - Step 3: Verification guidance & COA field with "Document Needs Correction" simulation.
  - Step 4: Portfolio setup & file upload zone with upload failure simulation.
  - Step 5: Profile preview card with pending verification status.
- **Illustration Requirements:**
  - Step 1: Architect registration desk diagram (`onboarding-account.svg`).
  - Step 2: Practice specializations & studio diagram (`onboarding-practice.svg`).
  - Step 3: Council of Architecture statutory registry check visual (`onboarding-credentials.svg`).
  - Step 4: Portfolio project drafting board (`onboarding-portfolio.svg`).
  - Step 5: Monograph review and verification inspection desk (`onboarding-review.svg`).
  - Error/Correction States:
    - Document correction needed: Annotated COA certificate (`state-correction-needed.svg`).
    - Upload failure: Network interrupted drawing upload (`state-upload-error.svg`).
    - Empty portfolio warning: Clean drafting board awaiting images (`portfolio-empty.svg`).
    - Successful submission seal: Verified application stamp (`onboarding-success.svg`).
- **Responsive Considerations:**
  - Desktop: Sidebar on left (28%), Form on right (72%).
  - Mobile: Horizontal step progress bar on top, form below with full-width action buttons.

---

### Page 09: Registration & Role Selection
- **Route:** `/signup` (`signupPage()`)
- **Audience:** New visitors choosing between Client and Professional roles.
- **Current Visual Assets:**
  - Aside with architectural illustration (`house-cutaway.webp`) and lede copy.
  - Contextual intent banner (`Change intent`).
  - Role selection buttons: "I'm looking for a professional" vs "I'm a design professional".
  - Public exploration banner ("No account required to explore").
  - Registration form (Name, email, password, terms).
  - Existing email alert simulation.
- **Illustration Requirements:**
  - Architectural Portal: The Two Doors classical archway illustration (`auth-gateway.svg`).
- **Responsive Considerations:**
  - Desktop: Two-column layout (Aside 40%, Form Panel 60%).
  - Mobile: Aside collapses to a compact header banner; form takes 100% width.

---

### Page 10: Sign In & Credential Recovery
- **Route:** `/signin` (`signinPage()`)
- **Audience:** Returning clients and practitioners.
- **Current Visual Assets:**
  - Aside with architectural drafting illustration (`architect-workspace.svg`).
  - Sign in form: Email, password, remember me, forgot password button.
  - Credential recovery panel with simulated recovery link dispatch.
- **Illustration Requirements:**
  - Architectural Portal visual: Shared two-door portal illustration (`auth-gateway.svg`).
- **Responsive Considerations:**
  - Desktop: Two-column layout.
  - Mobile: Single-column stack with form inputs at `100%` width and comfortable 48px touch targets.

---

### Page 11: 404 Not Found Page
- **Route:** `/not-found` (`notFoundPage()`)
- **Audience:** Visitors navigating to invalid or broken paths.
- **Current Visual Assets:**
  - Heading and copy.
  - Navigation buttons ("Back to Vastoco", "For clients").
- **Illustration Requirements:**
  - Isometric perspective staircase leading to an open architectural sky / void (`state-not-found.svg`).
- **Responsive Considerations:**
  - Centered layout, responsive at all viewports from 320px to 1920px.

---

## 3. Summary of Artwork Coverage Requirements

| Category | Page / Location | Required Illustration Assets | Format |
| :--- | :--- | :--- | :--- |
| **Landing Hero** | Monitor Stage 01–05 | Axonometric Discovery, Comparison Easel, Video Meeting, Monograph Spread, COA Registry | HTML/CSS + SVG |
| **Client Homepage** | How It Works & Planner | Find (`client-how-find.svg`), Compare (`client-how-compare.svg`), Evaluate (`client-how-evaluate.svg`), Book (`client-how-book.svg`), Scope Planner (`client-planner-scope.svg`), Escrow Security (`client-payment-escrow.svg`) | SVG |
| **Search & Discovery** | `/clients/explore` | Empty Search (`empty-search.svg`), Discovery Aerial (`discovery-aerial.svg`), Comparison Empty (`comparison-empty.svg`), Missing Info (`comparison-missing.svg`) | SVG |
| **Professional Profile** | `/clients/professional` | Practice Process Lifecycle (`profile-process-diagram.svg`), Empty Portfolio (`portfolio-empty.svg`) | SVG |
| **Professional Homepage** | Journey & Benefits | Journey Rows 01–04 (`journey-*.svg`), Benefit Rows 01–03 (`benefit-*.svg`), Dynamic Verification Tabs (`verify-*.svg`) | SVG |
| **Professional Onboarding** | `/professionals/join` | Steps 01–05 (`onboarding-*.svg`), Success Seal (`onboarding-success.svg`) | SVG |
| **Authentication** | `/signin` & `/signup` | Two-Door Architectural Portal (`auth-gateway.svg`) | SVG |
| **Edge & System States** | Booking, Join & 404 | Slot Unavailable (`state-slot-unavailable.svg`), Upload Error (`state-upload-error.svg`), Correction Alert (`state-correction-needed.svg`), 404 Void (`state-not-found.svg`) | SVG |

---

## 4. Next Implementation Steps

1. Create `ILLUSTRATION_GUIDE.md` establishing the architectural drawing syntax and palette constraints.
2. Create `ASSET_MANIFEST.md` cataloging all existing and newly generated SVG/raster assets with attributions and dimensions.
3. Generate the 15 new architectural SVG assets adhering strictly to Espresso `#3C2415` and Pale Oak `#DDD9CE`.
4. Integrate the new illustrations into `src/pages.js` across search, onboarding, comparison, booking, profile, and system states.
5. Perform responsive layout audit across 320px, 360px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px, and 1920px.
6. Verify test suite (`npm test`), palette audit (`audit_two_colour_assets.py`), and capture full verification screenshots.

