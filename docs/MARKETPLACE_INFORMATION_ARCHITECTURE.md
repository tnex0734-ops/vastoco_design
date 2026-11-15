# Vastoco Two-Sided Marketplace Information Architecture

## 1. Executive Summary & Market Mechanics
Vastoco is structured as an architectural monograph and bilateral transaction ledger connecting homeowners across Delhi NCR (Noida, Gurugram, South Delhi, Faridabad) with vetted architecture, interior design, and Vastu professionals.

Unlike aggregators that commoditize spatial design into low-cost contractor bids, Vastoco enforces:
- **Statutory Credential Verification**: Council of Architecture (COA) register checks for architects; institutional qualification and completed residential portfolio audits for interior designers and Vastu practitioners.
- **Granular Client Privacy**: No client phone numbers, emails, or exact plot coordinates are exposed publicly or to prospective bidders.
- **Transparent Fee Model**: Practitioners retain **85%** of every consultation fee; Vastoco deducts a **15%** platform commission to maintain escrow protection, statutory audit pipelines, and video infrastructure.

---

## 2. Global Navigation & Door Architecture
```
                                  [ Vastoco Gateway (/) ]
                                  Two Doors. One Platform.
                                     /               \
                       [ Client Door ]               [ Professional Door ]
                         (/clients)                    (/professionals)
                             |                                |
                 [ Discovery & Search ]          [ Authoritative Public Portal ]
                             |                   • Authentic Photography Hero
                 [ Client Workspace ]            • 4-Step Professional Pathway
                 (/client/*)                     • COA Verification Rules
                 • /client (Discover)            • 85/15 Fee Model Notice
                 • /client/briefs                • Live Client Opportunities Feed
                 • /client/compare               • Comprehensive FAQ
                 • /client/saved                              |
                 • /client/consultations         [ Authenticated Workspace ]
                 • /client/activity              (/professional/*)
                 • /client/profile               • /professional (Dashboard)
                                                 • /professional/briefs (Feed)
                                                 • /professional/briefs/:id
                                                 • /professional/offers (Pipeline)
                                                 • /professional/consultations
                                                 • /professional/calendar (Matrix)
                                                 • /professional/portfolio (CRUD)
                                                 • /professional/profile (Editor)
                                                 • /professional/verification
                                                 • /professional/settings (KYC)
```

---

## 3. Client Experience Information Hierarchy (`/client/*`)
1. **Discover (`/client`)**: Faceted search by Locality, Discipline (Architecture, Interiors, Vastu), Rating, Duration, and Fees.
2. **Project Hub (`/client/briefs`)**:
   - **Post a Brief**: Modal/drawer allowing homeowners to define plot/built-up area, budget bracket, timeline, and privacy mode (`open`, `selected`, `private`).
   - **Incoming Consultation Offers**: Review proposals dispatched by verified practitioners with personal pitch messages, proposed consultation duration, fee, and one-click accept/decline.
   - **Active Briefs**: Manage posted project parameters and monitor received offer counts.
3. **Compare (`/client/compare`)**: Side-by-side technical evaluation of credentials, verified projects, and consultation fees.
4. **My Consultations (`/client/consultations`)**: Active video consultations held in escrow with simulated encrypted meeting rooms.

---

## 4. Professional Practice Hierarchy (`/professional/*`)
1. **Overview Dashboard (`/professional`)**: Real-time KPI strip (Active Offers, Confirmed Consultations, 85% Net Share ₹84,200), Next Consultation card with video launcher, and dual-column agenda/briefs matrix.
2. **Opportunity Feed (`/professional/briefs`)**: Browsable feed of homeowner briefs with locality pills (Noida, Gurugram, South Delhi, Faridabad) and privacy badges.
3. **Brief Detail & Offer Composer (`/professional/briefs/:id`)**: Technical brief examination paired with interactive offer composer featuring real-time 85/15 fee calculations.
4. **Sent Offers Pipeline (`/professional/offers`)**: Status pipeline tracking (`Draft`, `Sent`, `Accepted`, `Declined`, `Withdrawn`).
5. **Schedule & Calendar (`/professional/consultations`)**: Dual-mode view: chronological agenda list and weekly grid matrix with automatic conflict detection.
6. **Portfolio Management (`/professional/portfolio`)**: Architectural monograph project manager with add, edit, preview, and delete capabilities.
7. **COA Verification Tracker (`/professional/verification`)**: Statutory verification status under the Architects Act, 1972.
8. **Settings & KYC (`/professional/settings`)**: Direct bank payout escrow configuration (HDFC Bank Ltd.) and opportunity notifications.

