# Vastoco Professional Workspace — Analytics & Platform Economics Spec
**Document ID:** `DOC-PRO-AN-03`  
**Revision:** `2.0.0` (Native SVG Graphics & Escrow Ledger Mechanics)  
**Status:** Approved Specification  
**Component Reference:** `vastoco-redesign/src/proPages.js` (`proOverviewDashboardPage`)

---

## 1. Analytics Architecture Overview

The Vastoco analytics layer is designed to provide actionable practice insights without third-party chart bloating (Chart.js, D3, or Recharts). All data visualizations are generated as **lightweight, accessible, mathematical SVGs and semantic HTML progress bars** styled strictly within the `#3C2415` and `#DDD9CE` two-colour discipline.

Key engineering requirements:
1. **Zero External Dependencies**: Fast render path under 5ms, zero network payload.
2. **Screen Reader Accessibility**: Every chart element includes `role="img"`, `aria-label`, and an accessible data description table.
3. **Responsive Vector Scaling**: All SVGs use `viewBox` coordinates that scale smoothly across mobile, tablet, and 4K displays.

---

## 2. Component A: Responsive Consultation Activity Bar Chart

The Consultation Activity Chart tracks practice utilization across a 4-week rolling window.

```
Consultations Completed (Last 4 Weeks):
Week 42: 18 sessions
Week 43: 22 sessions
Week 44: 24 sessions
Week 45: 20 sessions (Current Week)
```

### 2.1 SVG Construction & Mathematical Model

The SVG chart is mapped onto a coordinate space of $480 \times 160$ pixels:
- **Baseline Y-Axis**: $Y = 130\text{px}$ (Zero line)
- **Top Guideline**: $Y = 25\text{px}$ (Target ceiling: 25 consultations)
- **Bar Dimensions**: Width = $48\text{px}$, Corner Radius = $3\text{px}$
- **Horizontal Bar Offsets**:
  - Week 42 ($X = 60\text{px}$): Height = $74.88\text{px}$, Fill = `rgba(60, 36, 21, 0.40)`
  - Week 43 ($X = 160\text{px}$): Height = $91.52\text{px}$, Fill = `rgba(60, 36, 21, 0.60)`
  - Week 44 ($X = 260\text{px}$): Height = $99.84\text{px}$, Fill = `rgba(60, 36, 21, 0.85)` (Peak week)
  - Week 45 ($X = 360\text{px}$): Height = $83.20\text{px}$, Fill = `#3C2415` (Current active week)

```html
<svg viewBox="0 0 480 160" class="pro-svg-chart" role="img" aria-label="Consultations bar chart showing 18, 22, 24, and 20 sessions over the past 4 weeks">
  <!-- Gridlines at 25, 15, 5 sessions -->
  <line x1="40" y1="25" x2="440" y2="25" stroke="rgba(60, 36, 21, 0.12)" stroke-dasharray="3,3" />
  <line x1="40" y1="67" x2="440" y2="67" stroke="rgba(60, 36, 21, 0.08)" stroke-dasharray="3,3" />
  <line x1="40" y1="109" x2="440" y2="109" stroke="rgba(60, 36, 21, 0.08)" stroke-dasharray="3,3" />
  <!-- Dynamic Bars with concentric top-radius -->
  <rect x="60" y="55.12" width="48" height="74.88" rx="3" fill="rgba(60, 36, 21, 0.40)" />
  <rect x="160" y="38.48" width="48" height="91.52" rx="3" fill="rgba(60, 36, 21, 0.60)" />
  <rect x="260" y="30.16" width="48" height="99.84" rx="3" fill="rgba(60, 36, 21, 0.85)" />
  <rect x="360" y="46.80" width="48" height="83.20" rx="3" fill="#3c2415" />
</svg>
```

---

## 3. Component B: Proposal Conversion Funnel

The Offer Pipeline Funnel visualizes client proposal conversion through a 3-stage visual progression:

```
[ Sent: 2 ]  ──►  [ Viewed by Client: 1 ]  ──►  [ Confirmed / Booked: 1 ]
```

### 3.1 Funnel Mechanics & Metrics

- **Total Proposals Dispatched**: 3 active pipeline offers
- **Awaiting Client Review**: 2 offers (`₹3,910` net potential payout)
- **Accepted & Booked Consultations**: 1 confirmed booking
- **Overall Conversion Rate**:
  $$\text{Conversion Rate} = \frac{\text{Accepted Offers}}{\text{Total Dispatched}} = \frac{1}{3} \approx 33.3\%$$

### 3.2 Visual Construction
Rather than a confusing 3D funnel, Vastoco uses an **ergonomic segmented track** (`.pro-funnel-track`):
- Stage 1 (Sent): 100% width allocation (Base)
- Stage 2 (Viewed): 66.6% proportional fill
- Stage 3 (Booked): 33.3% solid `#3C2415` bar fill
- Micro-tags indicate status transitions and prompt the practitioner if a proposal has gone unread for over 48 hours.

---

## 4. Platform Economics: 85 / 15 Split Formula

The Vastoco marketplace eliminates opaque commissions and hidden lead fees. Practicing architects and consultants retain **85% of all client gross consultation bookings**.

### 4.1 Mathematical Formulation

$$\text{Gross Fee} = G$$
$$\text{Professional Payout} = P = \text{round}(G \times 0.85)$$
$$\text{Vastoco Platform Fee} = V = G - P \equiv \text{round}(G \times 0.15)$$

### 4.2 Standard Tier Calculation Matrix

| Session Category | Typical Duration | Gross Client Charge ($G$) | Vastoco 15% Share ($V$) | Net Professional Payout ($P$) |
|:---|:---|:---|:---|:---|
| Initial Spatial Feasibility | 45 min | ₹2,500 | ₹375 | **₹2,125** |
| Comprehensive Vastu Audit | 60 min | ₹3,500 | ₹525 | **₹2,975** |
| Detailed Monograph Review | 90 min | ₹5,000 | ₹750 | **₹4,250** |
| Bespoke Villa Masterplanning | 120 min | ₹8,000 | ₹1,200 | **₹6,800** |

### 4.3 Production Earnings Summary Breakdown

In the practitioner's active dashboard (`.pro-earnings-card`):
- **Gross Monthly Consultations**: ₹84,200 (28 completed sessions)
- **Platform Maintenance & Escrow (15%)**: -₹12,630
- **Net Practitioner Settlement (85%)**: **₹71,570**
- **Disbursement Schedule**: Every Tuesday via automated NEFT / IMPS direct to verified bank accounts (`HDFC Bank, Connaught Place`).

---

## 5. Escrow Protection & Dispute Safeguards

All consultation transactions are secured under the **Vastoco Client Escrow Protocol**:
1. **Pre-Session Authorization**: When a client books a slot, the full gross fee is authorized and captured into an independent escrow holding account.
2. **Video Room Verification**: Once both practitioner and client spend at least 15 minutes in the WebRTC meeting room, escrow release is automatically triggered.
3. **Dispute Window**: If a technical interruption or no-show occurs, funds are paused in escrow for 24 hours while practice support mediates.
4. **Guaranteed Payout**: The practitioner is protected against client payment default, chargebacks, or non-settlement once the consultation time is delivered.

