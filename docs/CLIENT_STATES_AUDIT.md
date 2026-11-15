# Vastoco Client Experience Refinement — Complete States Audit
**Project:** Vastoco Design Hackathon 2026  
**Application Scope:** Full Client Experience Lifecycle  
**Design Standards:** Strict Two-Colour Palette (Espresso `#3C2415`, Pale Oak `#DDD9CE`)  
**Methodology:** Ponytail FULL Mode · Emil Design Engineering · Defensive UI Engineering  

---

## 1. Executive Summary

A comprehensive state audit was conducted across every user workflow and component within the Vastoco client portal. Modern marketplace applications frequently suffer from unhandled edge cases, abrupt empty states, unvalidated form inputs, and disjointed transitions.

This audit catalogues all verified application states across Discovery, Professional Cards, Profiles, Comparison, Booking, Consultations, and Client Account management, demonstrating how each state handles normal data, loading conditions, empty fallbacks, error handling, and recovery paths.

---

## 2. State Inventory & Verification Matrix

### 2.1 Discovery & Search States (`/clients`)

| State | Trigger / Condition | Visual Presentation & UI Behavior | Recovery / Next Action |
|---|---|---|---|
| **Default Discovery** | Initial page load on `/clients` | Header, search bar, locality dropdown, 4 category chips, 5 service chips, 6-group filter sidebar, and 6 professional cards. | User can type in search, toggle chips, or click cards. |
| **Active Keyword Search** | User inputs query in `[data-discovery-search]` (e.g. "Villa") | Instant client-side filtering updates result count ("Showing 3 verified professionals"). Non-matching cards filter out cleanly. | Clear icon appears in search bar to clear input with one click. |
| **Filtered by Discipline** | Click on `Architects`, `Interior Designers`, or `Vastu Consultants` | Active chip receives solid Espresso fill with Pale Oak typography. Non-matching disciplines removed. Count updates instantly. | Click "All Professionals" or re-click active chip to reset. |
| **Multi-Dimension Filtered** | Combined locality + rating threshold (4.5+) + duration (30 min) | Sidebar badges show selected radio/checkboxes. Active chips rendered in filter toolbar. | "Reset all" button in sidebar and toolbar wipes active filters. |
| **Empty Search State** | Query matches no records (e.g. `xyznonexistent`) | Result grid replaced by `.empty-state` featuring bespoke Pale Oak/Espresso illustration (`empty-search.svg`), friendly copy ("No professionals found matching 'xyznonexistent'"), and prominent CTA. | Clicking "Reset all filters" button clears input and restores full directory. Verified via `client_polish_empty_search_desktop_1440.png`. |
| **Empty Filter Combinations** | Overly restrictive filters produce 0 matches | Clear message: "No professionals match your specific filter criteria in Delhi NCR." Displays suggestion to widen distance or relax rating filters. | Click "Clear filters" to revert to default results. |

---

### 2.2 Professional Card States (`professionalCardV2`)

| State | Trigger / Condition | Visual Presentation & UI Behavior | Accessibility & Interactions |
|---|---|---|---|
| **Default Normal** | Card rendered in directory grid | High-resolution portfolio photo, professional name in Playfair Display, profession with inline verification pill (`COA checked` or `Credentials checked`), compact rating (`★ 4.8 · 36 reviews`), price, and duration tags. | Card has `role="link"` and `tabindex="0"`. Enter or click opens monograph. |
| **Card Hover** | Mouse enters card boundary | Restrained transform (`transform: scale(1.025)`) on portfolio image, subtle card elevation (`box-shadow: 0 10px 24px rgba(60,36,21,0.08)`), native pointer cursor. | Respects `prefers-reduced-motion` (transforms disabled). |
| **Keyboard Focus** | Tab focus moves onto card | Crisp outline (`outline: 2px solid var(--espresso); outline-offset: 2px`). All internal buttons retain independent focus rings. | Pressing `Enter` triggers navigation to `/client/professionals/:id`. |
| **Saved / Bookmarked** | Click on top-right bookmark pin (`.media-save-pin`) | Bookmark icon toggles from outlined to solid fill; header badge count increments. Card navigation is NOT triggered (`e.stopPropagation()`). | Re-clicking unsaves and decrements counter. |
| **Added to Compare** | Click on `.card-action-compare` button | Button turns solid Espresso with checkmark icon (`✓ Added`); comparison dock slides up from viewport bottom. | Re-clicking removes from tray. |
| **Max Comparison Limit (2)** | User attempts to add a 3rd professional | Card shows brief feedback; comparison dock highlights existing 2 professionals; tooltip explains: "Compare up to 2 professionals simultaneously." | User must remove one professional to add another. |

---

### 2.3 Professional Monograph Detail States (`/client/professionals/:id`)

| State | Trigger / Condition | Visual Presentation & UI Behavior | Truthfulness & Trust Design |
|---|---|---|---|
| **Standard Monograph** | View verified professional (e.g. Naina Kapoor) | 2-column composition: authentic architectural photo on left, credentials, experience (8 years), rating (★ 4.8), and "Book video consultation" CTA on right. | Read-only client experience. No client edit controls exist. |
| **Credential Verification** | Dedicated verification section on profile | Shield icon, Council of Architecture (COA) registration CA/2016/78210 verified status, degrees (B.Arch SPA Delhi), IIA membership. | Discloses: "Demo illustrative check. Verified against public gazette." No live backend claimed. |
| **Upfront Pricing Cards** | 15 min, 30 min, and 45 min cards | 3 cards with matching geometry, price in tabular numerals, description of scope, and "Book session" CTA. | Footnote explicitly clarifies: "85% goes to professional; 15% platform commission deducted from fee." Unsupported "100% Escrow" claims removed. |
| **Genuine Reviews Summary** | Professional with reviews (Naina Kapoor, 36 reviews) | 5-star distribution chart displaying exact calculated percentages (5★: 83%, 4★: 17%, 3★: 0%, 2★: 0%, 1★: 0%), verified consultation badges, client comments. | Math mathematically validated by unit tests (`npm test` PASS). |
| **Zero Reviews Edge Case** | Professional new to platform (Mira Khanna) | Renders "New to Vastoco · No reviews yet" badge instead of fabricated 0.0 rating or blank stars. Reviews section displays gentle onboarding notice. | Complies strictly with rule against fabricated ratings. |
| **Single Review Edge Case** | Professional with 1 review (Kabir Sethi) | Calculates exact 5.0 rating with "(1 verified review)". Rating distribution shows 100% on 5-star bar and 0% on remaining bars. | Mathematically accurate without division errors. |

---

### 2.4 Comparison Matrix States (`/client/compare`)

| State | Trigger / Condition | Visual Presentation & UI Behavior | Recovery / Next Action |
|---|---|---|---|
| **Empty Comparison (0)** | User navigates to `/client/compare` with empty tray | Bespoke comparison illustration (`comparison-empty.svg`), title "No professionals selected for comparison", and description. | "Discover professionals" CTA links directly to `/clients`. |
| **Single Professional (1)** | 1 professional added to comparison | Column 1 renders selected professional; Column 2 displays dashed placeholder card with "+ Add another professional to compare". | User clicks placeholder to return to discovery. |
| **Complete Matrix (2)** | 2 professionals added (e.g. Naina vs Kabir) | Side-by-side comparison table: photos, names, disciplines, verified badges, tabular ratings, experience, consultation rates, and direct booking buttons. | Verified in `client_polish_compare_desktop_1440.png`. Each column has an "✕" button to remove. |
| **Clear All Comparison** | Click "Clear comparison" button in header | Tray empties, dock dismisses, and page transitions smoothly to empty comparison state. | User can start fresh. |

---

### 2.5 Consultations & Booking Studio States (`/client/consultations` & `/client/book/:id`)

| State | Trigger / Condition | Visual Presentation & UI Behavior | Safety & Validation |
|---|---|---|---|
| **Consultation Tabs** | Tab switching between Upcoming, Completed, Cancelled | Instant tab filter updates table rows. Active tab underlined with solid Espresso indicator. | Displays date, time, professional, meeting link, and receipt action. |
| **Booking Step 1: Duration** | Select 15, 30, or 45-minute consultation | Selected card receives solid border; consultation rate updates dynamically. | Radio input ensures single-choice selection. |
| **Booking Step 2: Date & Slot** | Calendar date picker and time slots | Available slots rendered as selectable buttons. Unavailable slots disabled with `cursor: not-allowed` and muted styling. | Prevents double-booking past or taken slots. |
| **Booking Step 3: Scope Details** | Textarea for project notes and floor plan upload | Character counter and file input for drawings/PDFs. | Required input validation before proceeding. |
| **Booking Step 4: Upfront Breakdown**| Review order before payment | Full transparency: Consultation fee (`₹3,000`), 85% pro payout (`₹2,550`), 15% platform commission deduction (`₹450`). | Clarifies that client is NOT charged extra surcharges. |
| **Payment Simulation Failure** | User toggles "Simulate Payment Failure" | Friendly error alert: "Payment authorization could not be completed. Your slot has been held for 15 minutes." | User can re-try without re-typing booking details. |
| **Booking Confirmation** | Successful mock payment | Green-free confirmation screen in Pale Oak/Espresso, booking reference ID, calendar `.ics` download link, video meeting join button. | Direct links to `/client/consultations`. |

---

### 2.6 Client Account Profile States (`/client/profile`)

| State | Trigger / Condition | Visual Presentation & UI Behavior | Data & Persistence Behavior |
|---|---|---|---|
| **View Mode (Pristine)** | Navigating to `/client/profile` | 5 grouped cards (Personal Details, Project Location, Preferences, Notifications, Security) with initials avatar `PS`. | Loads saved data from `sessionStorage` or defaults. |
| **Edit Mode (Clean)** | Click "Edit Profile" button | Form inputs populate with current saved values. Focus moves smoothly to the first input (`#clientFullName`). | `isDirty` flag initialized to `false`. |
| **Edit Mode (Dirty)** | User types into any input or changes a toggle | Form detects value difference, sets `isDirty = true`. | Discard confirmation protection activated. |
| **Validation Error State** | User clears Full Name or enters invalid email/phone | Form submission halted; top `.form-error-summary` banner displays specific bullet points; invalid inputs receive `.has-error`. | Typed input preserved; focus moves to summary. |
| **Discard Modal State** | User clicks "Cancel" with unsaved changes | Modal backdrop obscures screen; modal dialog presents: "You have unsaved edits. Discard changes or keep editing?" | "Keep Editing" returns to form; "Discard" wipes edits and restores View Mode. |
| **Successful Save State** | User clicks "Save Changes" with valid data | Data persisted to `sessionStorage`; UI smoothly toggles back to View Mode; toast alert appears ("Profile updated successfully"). | Toast auto-dismisses after 3.2s. Edits survive refresh. |
| **Sign Out & Reset** | User clicks "Sign out & Reset prototype" | Session storage wiped; profile resets to `DEFAULT_CLIENT_PROFILE`; page reloads cleanly. | Restores clean demonstration state. |

---

## 3. Development vs. Customer-Facing Cleanliness

- **Hidden Mobile Demo Bar:** The prototype state switcher dropdown (`Active / New / Returning Client`) has been hidden from mobile viewports (`display: none` in `@media (max-width: 768px)`), eliminating header congestion on handheld devices.
- **Removed Fake Controls:** Removed the customer-facing "Simulate empty portfolio toggle" from public professional monographs. Test fixtures are kept strictly within automated tests (`tests/client_routes.test.mjs`).
- **Screen Reader Clipping:** All accessibility labels use `.sr-only` with complete clipping styles, ensuring zero visual layout leakage while maintaining full screen-reader compliance.

