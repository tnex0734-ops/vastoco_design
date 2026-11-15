# Vastoco Consultation Offer Lifecycle Specification

## 1. Overview & Core Economics
In the Vastoco marketplace, consultations are structured, paid preliminary engagements designed to protect both the professional's billable time and the client's capital.

### The 85/15 Fee Model
```
[ Client Pays Gross Fee ] (Upfront into Escrow)
          |
    +-----+-----+
    |           |
[ 85% Net ]   [ 15% Platform ]
Paid to Pro   Vastoco Commission
(Direct Bank) (Escrow, COA Audit & Video)
```
- **Gross Consultation Fee**: Autonomously configured by the professional (default standard tiers: ₹1,400 for 15 min, ₹2,500 for 30 min, ₹3,500 for 45 min).
- **Professional Payout (85%)**: Released directly to the practitioner's verified bank account upon session conclusion.
- **Platform Commission (15%)**: Deducted from the professional's fee, not marked up on the client. Covers payment processing, statutory COA registry verification, and secure video infrastructure.

---

## 2. State Machine Diagram
```
                     +------------------+
                     |  Draft Proposal  |
                     +------------------+
                               |
                        [ Dispatch Offer ]
                               |
                               v
                     +------------------+
                     |  Sent / Pending  | <-----+
                     +------------------+       |
                         /     |     \          |
           [ Client Accept ]   |  [ Withdraw ]  |
                   /           |       \        |
                  v            |        v       |
        +-------------------+  |   +-----------+|
        | Accepted & Booked |  |   | Withdrawn ||
        +-------------------+  |   +-----------+|
                  |            |                |
        [ Consultation Done ]  | [ Decline ]    |
                  |            |       |        |
                  v            v       v        |
           +-------------+   +-----------+      |
           | Escrow Paid |   | Declined  |------+ (Optional Re-pitch)
           +-------------+   +-----------+
```

---

## 3. State Definitions & Transitions

### 1. `draft`
- **Definition**: The professional is composing the proposal inside the Offer Composer (`/professional/briefs/:id`).
- **Data captured**: Proposed duration (15, 30, or 45 min), consultation fee, dynamic 85/15 calculations, and consultation pitch text.

### 2. `sent`
- **Definition**: The offer has been transmitted to the client's Project Hub (`/client/briefs`).
- **Visibility**: Appears in the professional's Sent Offers Pipeline (`/professional/offers`) with badge "Sent — Awaiting Client Review" and in the client's Incoming Offers grid.
- **Available Actions**: Professional may withdraw the offer; client may accept or decline.

### 3. `accepted`
- **Definition**: The client has confirmed the consultation slot.
- **Side Effects**:
  - The offer status updates to `accepted`.
  - A confirmed consultation session is automatically instantiated in the professional's schedule and calendar (`getProSchedule()`).
  - An encrypted video meeting room URL is generated (`https://vastoco.internal/meet/vst-[offerId]`).
  - Escrow deposit is logged and secured.

### 4. `declined`
- **Definition**: The client chose an alternate practitioner or rejected the proposal terms.
- **Visibility**: Remains in the archive for record keeping.

### 5. `withdrawn`
- **Definition**: The professional revoked the proposal prior to client acceptance due to calendar conflicts or schedule constraints.

---

## 4. Privacy & Anti-Disintermediation Governance
1. **Masked Contact Details**: Phone numbers, emails, and exact plot coordinates remain confidential during the offer phase.
2. **Escrow Guarantee**: No fees are released until the video consultation occurs. If a session fails to take place, the client receives an immediate refund.

