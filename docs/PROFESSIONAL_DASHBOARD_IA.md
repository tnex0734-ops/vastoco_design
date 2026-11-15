# Vastoco Professional Workspace — Information Architecture & Navigation Spec
**Document ID:** `DOC-PRO-IA-01`  
**Revision:** `2.0.0` (Wispr Flow / Linear Clarity Architecture)  
**Status:** Approved for Implementation & Hackathon Evaluation  
**System Scope:** Professional Practice Operations (`/professional/*`)

---

## 1. Executive Summary & Design Vision

The Vastoco Professional Workspace serves certified Indian architects, interior designers, and Vedic Vastu consultants. Unlike marketing surfaces or consumer discovery feeds, this interface is a high-tempo, focused operational dashboard designed around three core daily workflows:
1. **Executing today's confirmed video consultations without operational friction.**
2. **Reviewing and pitching on high-relevance client project briefs.**
3. **Tracking proposal conversions and gross-to-net escrow payouts.**

Drawing inspiration from **Wispr Flow** and **Linear**, the architecture strips away cognitive noise, redundant secondary menus, duplicate appointment banners, and extraneous statutory tags. The result is a calm, monolithic, high-density workspace structured on an 8px architectural grid.

---

## 2. Navigation Paradigm

### 2.1 Desktop Navigation Hierarchy (≥ 1024px)
The desktop workspace employs a clean **Two-Tier Layout**:
1. **Persistent Top Utility Bar (`proAppHeader`)**:
   - **Practice Identity**: Vastoco mark + discrete `/ Practice Overview` breadcrumb badge.
   - **Universal Fast-Action Command Search (`[⌘K]`)**: Instant keyboard-driven lookup for briefs, active clients, and scheduled consultations.
   - **Primary Action**: Discrete text link to the practitioner's live public profile (`Public Monograph ↗`).
   - **System Alerts**: Notification trigger with live pending count indicator.
   - **User Chip**: Minimalist initialled circle (`NK` for Ar. Naina Kapoor) indicating active authenticated practice context.
   - *Design Decision*: The statutory COA registration number is removed from this persistent header to reduce visual clutter and relocated into the practice metadata subheader and verification profile.

2. **Persistent Practice Navigation Sidebar (`proSidebar`)**:
   - Fixed 260px left rail with semantic grouping into three operational tiers:
     - **WORKSPACE**:
       - `Overview` (`/professional`) — Daily flight deck, next session spotlight, brief highlights, and performance charts.
       - `Client Briefs` (`/professional/briefs`) — Live RFP marketplace with matching algorithms.
       - `Proposals & Offers` (`/professional/offers`) — 3-stage negotiation pipeline.
     - **MY PRACTICE**:
       - `Consultations` (`/professional/consultations`) — Dual-mode schedule (Agenda Timeline vs Weekly Matrix) with conflict detection.
       - `Monograph Portfolio` (`/professional/portfolio`) — Visual project archive and case-study management.
       - `Practice Profile` (`/professional/profile`) — Bio, hourly rates, and working hours.
     - **ACCOUNT**:
       - `Verification & COA` (`/professional/verification`) — Statutory accreditation tracker and certificate verification.
       - `Payout Settings` (`/professional/settings`) — Bank account details and escrow cycle settings.
   - **Platform Economics Footer Card**: Persistent indicator explaining the transparent **85% Professional Share / 15% Vastoco Platform Fee** model.

### 2.2 Mobile Navigation Hierarchy (< 768px)
On mobile devices, vertical screen real estate is preserved by completely hiding the desktop sidebar and horizontal action bars:
- **Sticky 5-Destination Bottom Navigation Bar (`proMobileBottomNav`)**:
  1. `Home` (`/professional`) — Daily priority overview and session alert.
  2. `Briefs` (`/professional/briefs`) — Quick brief scanning and offer dispatch.
  3. `Offers` (`/professional/offers`) — Real-time proposal tracker with status chips.
  4. `Meetings` (`/professional/consultations`) — Today's agenda with one-tap video room join.
  5. `Profile` (`/professional/profile`) — Rates, availability toggles, and account status.
- Implements iOS Safari home-indicator safe area inset (`env(safe-area-inset-bottom)`).
- Minimum touch target: 44 × 44px with 8px label spacing.

---

## 3. Core Route Specifications

| Route Path | View Component | Primary Intent | Core Interaction Target |
|:---|:---|:---|:---|
| `/professional` | `proOverviewDashboardPage()` | Daily situational awareness & triage | Immediate launch of next upcoming video session |
| `/professional/briefs` | `proBriefsFeedPage()` | Discover and filter Delhi NCR client RFPs | Open proposal modal & submit fixed-fee offer |
| `/professional/offers` | `proOffersPipelinePage()` | Track proposal lifecycle & escrow | View accepted brief & initiate client consultation |
| `/professional/consultations` | `proConsultationsPage()` | Manage meeting schedule & detect conflicts | Switch between Agenda and 7-day Matrix views |
| `/professional/portfolio` | `proPortfolioManagementPage()` | Curate high-resolution project monographs | Add/edit architectural projects with photo arrays |
| `/professional/verification` | `proVerificationTrackerPage()` | Statutory COA accreditation compliance | Upload renewed license & track verified badge |

---

## 4. Elimination of Cognitive Duplication & Clutter

### 4.1 Single Source of Truth for Schedule
- **Legacy Issue**: The previous interface displayed the upcoming session twice: once in a massive top spotlight card, and immediately below in the first row of the "Upcoming Consultations" table.
- **Architectural Solution**: The redesigned component (`.pro-agenda-consolidated`) separates the schedule into:
  1. **Spotlight Card**: Strictly dedicated to `schedule[0]` (the immediate next session), highlighting countdown, duration, escrow fee, and direct "Simulate Video Call" action.
  2. **Remaining Sessions Table**: Strictly renders `schedule.slice(1)` (subsequent bookings only). When `schedule.length <= 1`, this table cleanly disappears, eliminating any repetition.

### 4.2 Streamlined Header Architecture
- **Legacy Issue**: A top horizontal navigation row duplicated links already present in the sidebar, causing conflicting focus and cognitive overhead.
- **Architectural Solution**: The top header is strictly a **utility and breadcrumb bar**. Navigation belongs exclusively to the left rail on desktop and the bottom bar on mobile.

### 4.3 Focused Three-Metric Triage
Rather than overwhelming the practitioner with 8 disjointed stat widgets, the overview hero presents only **Three Actionable Indicators**:
1. **Today's Consultations** (`3 Confirmed`): Immediate operational load for the current workday.
2. **Matching Client Briefs** (`4 New RFPs`): Unlocked commercial pipeline opportunities.
3. **Offers Awaiting Response** (`2 In Negotiation`, net value `₹3,910`): Pipeline capital awaiting client escrow commitment.

---

## 5. State Machine & Route Transitions

```
[ Dashboard Overview: /professional ]
       │
       ├─► [ Next Session Spotlight ] ──► Launch Video Room Modal
       │
       ├─► [ Matching Brief Card ]    ──► /professional/briefs?id=b-101
       │                                         │
       │                                         └─► Open Offer Composer Modal
       │
       ├─► [ Offers Funnel ]          ──► /professional/offers
       │                                         │
       │                                         └─► Filter by: Sent / Viewed / Booked
       │
       └─► [ Schedule Card ]          ──► /professional/consultations
                                                 │
                                                 ├─► Agenda Timeline
                                                 └─► Weekly Calendar Matrix
```

All route switches and modal states retain scroll anchors and synchronize state with `sessionStorage` fallback stores, guaranteeing zero data loss during page reloads.

