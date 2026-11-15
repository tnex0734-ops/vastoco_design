# Vastoco Two-Sided Marketplace Redesign Changelog

## Version: 3.0.0 (Two-Sided Architecture & Design Professional Marketplace)
**Date**: November 13, 2026
**Scope**: Complete Bilateral Marketplace Implementation & Taste Engine v3 Architecture

---

### 1. Taste Engine Design Artifacts (`design/` & `vastoco-redesign/design/`)
- Created `brief.md`: Audience profiles for homeowners and design practitioners, first 3-second feeling, and single product goal.
- Created `dice.md`: Documented terminal dice rolls (seed: *Lars Müller Monographs*, anchors: motion language, interaction mechanics, type hierarchy, wildcard world: art book publisher).
- Created `design.md`: Measured design document with numeric specifications for color, type, 8-row animation catalog, and components.
- Created `references.md`: Scan of 4 monograph platforms (*Lars Müller*, *El Croquis*, *Studio Mumbai*, *Are.na*) and 120-word market gap analysis.
- Created `concept.md`: 5 big ideas generated, 2 eliminated in slop burn, and core concept selected: *The Architectural Monograph Ledger*.
- Created `direction.md`: Mutation plan, signature moves, memorable moments, and complete section architecture.
- Created `tokens.md`: CSS custom properties for Espresso `#3C2415` and Pale Oak `#DDD9CE`, 8px spatial grid, and motion curves.
- Created `critique.md`: Gate 1 similarity evaluation (6/6 mutated), Gate 2 zero-slop audit (0 hits), Gate 3 reference parity, and 39.8/40 scorecard.

---

### 2. Bilateral Data Engine (`src/marketplaceData.js`)
- Added `calculateFeeBreakdown`: Explicit 85% practitioner share and 15% platform commission calculation.
- Added `DEFAULT_CLIENT_BRIEFS`: 4 authentic Delhi NCR homeowner briefs (Noida Sector 44, DLF Phase 5 Gurugram, South Extension, Greenfield Faridabad) with privacy protections (no phone/email/house numbers).
- Added `DEFAULT_PRO_OFFERS`: Sent proposals with durations (15/30/45 min), fees, and personal pitches.
- Added `DEFAULT_PRO_SCHEDULE`: Agenda items with start/end times and automated conflict detection.
- Added `DEFAULT_PRO_PORTFOLIO`: Monograph project self-management (add, edit, delete, reorder).
- Added `PRO_VERIFICATION_PROFILE`: Statutory COA registration status (`CA/2014/61284`), UIDAI KYC, and bank payout account.
- Implemented `sessionStorage` persistence with graceful in-memory fallbacks.

---

### 3. Public Professional Portal Redesign (`/professionals`)
- Hero section redesigned with authentic photography (`professional-door-02-architect-at-work.png`) replacing generic clipart.
- Headline updated to concise editorial statement: *"Make your work visible. Grow your practice."*
- Primary CTA: *"Join Vastoco — it's free"*; Secondary: *"See how it works"*; Tertiary: *"Already verified? Open Practice Workspace &rarr;"*.
- Added What Vastoco Offers (4 pillars).
- Added 4-Step Professional Journey (Understand -> Verify -> Showcase -> Join).
- Added statutory Council of Architecture (COA) register check explainer.
- Added authentic monograph project previews with Delhi NCR photography.
- Added Consultation Model with 85% pro share and 15% platform commission notice.
- Added Live Client Opportunities Feed teaser linking to `/professional/briefs`.
- Added comprehensive FAQ section addressing verification, payouts, and client confidentiality.

---

### 4. Authenticated Professional Workspace (`/professional/*`)
- Built unified shell: Top fixed masthead + Desktop practice sidebar + Mobile 5-destination bottom navigation bar.
- Implemented `/professional`: Overview dashboard with KPI cards, next consultation spotlight, dual-column briefs/agenda matrix.
- Implemented `/professional/briefs`: Filterable opportunities board with locality and discipline pills.
- Implemented `/professional/briefs/:id`: Brief inspection view + Send Consultation Offer Composer with dynamic 85/15 fee calculations.
- Implemented `/professional/offers`: Sent proposals pipeline tracking (`Draft`, `Sent`, `Accepted`, `Declined`, `Withdrawn`).
- Implemented `/professional/consultations` & `/professional/calendar`: Dual-view schedule with chronological agenda and weekly calendar matrix with conflict detection.
- Implemented `/professional/portfolio`: Project manager with add, preview, and delete functions.
- Implemented `/professional/profile`: Practice bio and consultation duration/fee editor.
- Implemented `/professional/verification`: COA registration tracker and discipline verification standards.
- Implemented `/professional/settings`: Payout bank details (HDFC Bank Ltd.) and notification preferences.
- Added interactive video consultation simulation modal with camera/audio controls and escrow indicators.

---

### 5. Client Workspace Integration (`/client/*`)
- Added `/client/briefs`: Project Hub displaying published briefs and incoming professional consultation proposals.
- Added "Post a Project Brief" form with privacy options (`open`, `selected`, `private`).
- Added Accept & Decline proposal actions with auto-transition to booked consultation.

---

### 6. Styles & Brand Compliance (`src/styles.css`)
- Appended responsive styles for the entire two-sided marketplace.
- Enforced strict two-colour palette: only `#3C2415` and `#DDD9CE` (and their `rgba` variants).
- 0 instances of `transition: all`.
- Tabular numerals applied to all monetary and numeric displays.

---

### 7. Verification & Packaging
- Added `tests/marketplace.test.mjs`: Total unit tests increased from 41 to 47. **47/47 PASS**.
- Brand palette audit: **42/42 assets PASS**.
- Production build: `dist/` updated cleanly.
- Visual QA: Captured and inspected 17 desktop and mobile viewports into `REVIEW_SCREENSHOTS/` and `docs/screenshots/`.

