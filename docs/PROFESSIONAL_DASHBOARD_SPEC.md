# Vastoco Professional Practice Dashboard Specification

## 1. Overview & Architectural Role
The Authenticated Professional Workspace (`/professional/*`) is engineered specifically for independent architectural practices, boutique interior ateliers, and certified Vastu practitioners across Delhi NCR. It avoids commoditized freelancer widgets and focuses on high-trust consultation management, brief evaluation, and monograph curation.

---

## 2. Layout Structure & Design Tokens
- **Surface Palette**: Pale Oak `#DDD9CE` canvas with `rgba(60, 36, 21, 0.02–0.05)` structural card fills.
- **Typographic Palette**: Deep Espresso `#3C2415` ink. Display headlines rendered in Playfair Display (600 weight); metadata, forms, and numerals rendered in Inter with tabular digits (`font-variant-numeric: tabular-nums`).
- **Drafting Grid & Radii**: Strict 8px spatial grid; rectilinear 2px–4px architectural corner discipline (zero pill-shaped buttons).
- **Navigation Shell**:
  - **Desktop (>=1024px)**: Top fixed masthead (`height: 64px`) with COA statutory seal + Left practice sidebar (`width: 260px`) with real-time counters and platform economics banner (85% professional share).
  - **Mobile (<768px)**: Compact responsive header + 5-destination bottom touch bar (`Overview`, `Briefs`, `Offers`, `Schedule`, `Profile`) with 48px+ touch targets.

---

## 3. Component Breakdown

### A. Performance Metric Strip
Located immediately beneath the practice greeting, providing four authoritative data points:
1. **Confirmed Video Consultations**: Total upcoming booked sessions with date/time of next session.
2. **Active Proposals Dispatched**: Total offers currently in client review (`status: 'sent'`).
3. **Net Consultation Share (85%)**: Cumulative retained earnings (e.g., `₹84,200`) explicitly noting that the 15% platform commission is already factored in.
4. **Statutory Verification**: Displaying active Council of Architecture status with validity date (31 December 2028).

### B. Next Scheduled Consultation Spotlight
A high-contrast Espresso container highlighting the most imminent client engagement:
- Project topic (e.g., "Noida Villa Biophilic Courtyard Review").
- Client display name, general locality, scheduled time window, and duration.
- Financial breakdown: Gross Client Fee vs Net Practitioner Share (85%).
- Interactive "Simulate Video Call" button launching the encrypted video consultation room modal.

### C. Matching Client Briefs Feed Widget
Displays the 3 most recently posted homeowner briefs matching the practitioner's discipline and Delhi NCR locality. Features category pills, budget brackets, scope descriptions, and direct links to `/professional/briefs/:id`.

### D. Upcoming Consultations Agenda
A chronological agenda listing today's and upcoming sessions with start times, duration, net payout, and verified confirmation badges. Overlapping sessions are visibly flagged with conflict warnings.

