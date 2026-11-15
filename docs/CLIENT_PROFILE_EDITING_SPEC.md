# Vastoco Client Account Profile: View & Edit Specification
**Feature:** Client Profile Management & Local Persistence Engine  
**Route:** `/client/profile`  
**Palette:** Espresso `#3C2415` · Pale Oak `#DDD9CE`  
**Methodology:** Ponytail FULL Mode · Accessibility (WCAG 2.2 AA) · Zero Server Dependencies  

---

## 1. Context & Architectural Overview

Prior to this refinement, the client workspace contained an account destination that lacked end-to-end interactive editing, structured client fields, validation feedback, and safe state handling. Furthermore, public professional monograph pages (`/client/professionals/:id`) were occasionally confused with client account settings.

This specification defines the complete technical, visual, and interaction architecture for the **Client Account Profile** at `/client/profile`, establishing a clear distinction:
- **Public Professional Monograph (`/client/professionals/:id`):** Completely **Read-Only** for clients. Clients view portfolios, inspect credentials, and book consultations.
- **Client Account Area (`/client/profile`):** Fully **Viewable and Editable** by the logged-in client, persisting to browser `sessionStorage` with validation, dirty-state detection, and discard protection.

---

## 2. Client Profile Data Model

The client profile is managed in `src/clientData.js` via the `DEFAULT_CLIENT_PROFILE` constant, accessed and updated using local getters, setters, and validators.

### 2.1 Schema Definition
```javascript
export const DEFAULT_CLIENT_PROFILE = {
  // A. Personal Information (Strictly Private)
  fullName: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98112 34567',
  avatarInitials: 'PS',
  emailVerified: true,
  phoneVerified: true,

  // B. Project Location (Shared for local matching)
  city: 'New Delhi',
  locality: 'Vasant Vihar',

  // C. Project Preferences (Shared with booked professionals)
  categories: ['architects', 'interior-designers'],
  services: ['architecture', 'home-renovation'],
  projectType: 'Residential Villa Renovation & Courtyard Light Well',
  budget: '₹35L – ₹75L',
  timeline: '1–3 months',

  // D. Notification Preferences
  emailNotifications: true,
  bookingNotifications: true,
  whatsappUpdates: true,
  announcements: false,

  // E. Account Metadata
  role: 'Homeowner / Client',
  memberSince: 'October 2026',
  authProvider: 'Email Magic Link (Simulated)',
  isPrototype: true
};
```

### 2.2 Field Privacy Boundaries
To ensure user trust and align with the hackathon's privacy guidelines, every field is explicitly classified:
1. **Strictly Private (`Private` badge):** `fullName`, `email`, `phone`. These details are never visible on public listings or to unbooked professionals. They are shared only after a confirmed consultation booking.
2. **Matching Scope (`Shared for matching` badge):** `city`, `locality`, `categories`, `services`, `budget`, `timeline`. Used by Vastoco algorithms to suggest professionals with relevant local municipal bylaw knowledge and project experience.
3. **Internal Account Alert (`Account Alert` badge):** `emailNotifications`, `bookingNotifications`, `whatsappUpdates`. Controls delivery of video links and calendar invites.

---

## 3. UI Composition & Layout

### 3.1 View Mode (`[data-profile-view-mode]`)
When a user navigates to `/client/profile`, the view mode renders an editorial, organized account overview:

1. **Profile Masthead:**
   - 64px rounded monogram avatar displaying the client's initials (`PS`) in bold Espresso over an opacity-tinted background.
   - Client full name set in *Playfair Display* (28px).
   - Inline verification pills: `Email verified` and `Phone verified`.
   - Subtitle: `Homeowner / Client · Vasant Vihar, New Delhi · Member since October 2026`.
   - Primary Action: `Edit Profile` button styled with `.btn.btn--solid`.

2. **Card 1: Personal & Contact Details (`Private`)**
   - Two-column tabular rows with tabular numerals.
   - Explanatory privacy copy explaining that contact information is only shared after booking confirmation.

3. **Card 2: Project Location (`Shared for matching`)**
   - City and Locality/Sector fields.
   - Details how locality aids in matching professionals with ground-level municipal authority experience (e.g., MCD / DDA bylaws).

4. **Card 3: Project Preferences (`Shared for matching`)**
   - Renders active category pills and service pills.
   - Project type description, budget range, and target timeline.

5. **Card 4: Notification Preferences (`Account Alert`)**
   - Status indicators for Booking Confirmations (Instant Email), Reminders (24h & 1h prior), WhatsApp/SMS, and Product Announcements.

6. **Card 5: Account & Security (`Security`)**
   - Authentication method, session security status, and a `Sign out & Reset prototype` button.

### 3.2 Edit Mode (`[data-profile-edit-mode]`)
Clicking `Edit Profile` toggles the interface into an accessible, high-density form wrapped in `.profile-edit-form`:

1. **Edit Masthead:**
   - Pre-heading: `ACCOUNT SETTINGS`.
   - Heading: `Edit Client Profile`.
   - Informative note: `Update your personal details, project scope, and consultation preferences. Edits persist locally in your browser session.`

2. **Grouped Accessible Fieldsets:**
   - `<fieldset class="form-fieldset">` with semantic `<legend>` tags:
     - `1. Personal & Contact Information`
     - `2. Project Location & Locality`
     - `3. Project Scope & Preferences`
     - `4. Communication & Notifications`
     - `5. Account Security (Read Only)`

3. **Responsive Input Grids:**
   - Desktop: `.form-row--2col` (2 columns) and `.form-row--3col` (3 columns).
   - Mobile (≤768px): Stacks into single-column inputs with 44px minimum control heights.

4. **Custom Checkbox Pills:**
   - Checkbox options for categories (`Architects`, `Interior Designers`, `Vastu Consultants`) and services (`Architecture`, `Interior design`, `Home renovation and space planning`, `Vastu consultation`).
   - Interactive facade with checkmark indicator on `:checked`.

5. **Accessible Toggle Switches:**
   - High-contrast toggle switches for notification channels, featuring custom facade pill and slider dot with 180ms ease transitions.

6. **Actions Bar:**
   - `Save Changes` (`.button--dark` primary CTA).
   - `Cancel` (`.button--outline` secondary action).
   - Reverts on cancel if clean; displays Discard Modal if dirty.

---

## 4. Validation Engine & Error Handling

Validation is handled client-side before write execution using `validateClientProfile(data)`:

| Field | Validation Rule | Error Message |
|---|---|---|
| `fullName` | Non-empty string, min 2 chars | "Full name is required (at least 2 characters)." |
| `email` | Standard RFC 5322 regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$` | "Please enter a valid email address (e.g. name@example.com)." |
| `phone` | Min 8 digits, valid international/domestic characters `^[\d\s+\-()]{8,20}$` | "Please enter a valid phone number (minimum 8 digits)." |
| `city` | Non-empty string | "City is required for localized professional matching." |

### 4.1 Error Presentation
- **Error Summary Box:** A top banner (`.form-error-summary`) lists all failed fields with direct links to each input.
- **Inline Field Error:** Red/Espresso text (`.field-error-msg`) renders directly beneath the invalid input.
- **Input Border Highlight:** Input element receives `.has-error` class, setting a distinct Espresso active outline.
- **Input Preservation:** The user's typed values are strictly preserved upon validation failure; no fields are wiped.

---

## 5. Interaction State Machine & Transitions

```
[View Mode] 
     │ (Click 'Edit Profile')
     ▼
[Edit Mode (Pristine)] 
     │ (User edits input)
     ▼
[Edit Mode (Dirty: isDirty = true)]
     ├── (Click 'Save Changes') 
     │         │
     │         ├── [Invalid] ──> Displays Error Summary & Inline Errors
     │         └── [Valid]   ──> Saves to sessionStorage 
     │                           Toggles to [View Mode]
     │                           Fires Toast Alert ("Profile updated successfully")
     │
     └── (Click 'Cancel')
               │
               ├── [Clean] ──> Toggles immediately to [View Mode]
               └── [Dirty] ──> Triggers [Discard Changes Modal]
                                   ├── "Keep Editing" ──> Returns to form
                                   └── "Discard Changes" ──> Reverts & returns to [View Mode]
```

### 5.1 Discard Unsaved Changes Modal
- Accessible modal dialog (`role="dialog"`, `aria-modal="true"`).
- Background backdrop with `rgba(60, 36, 21, 0.65)` blur.
- Focus is trapped within modal actions.
- `Escape` key closes modal and returns focus to the form.

### 5.2 Toast Feedback Notification
- Minimalist fixed toast (`.profile-toast`) slides up from bottom-right.
- Styled in solid Espresso background with Pale Oak typography.
- Automatically dismisses after 3200ms.

---

## 6. Local Persistence Model

All updates persist via browser `sessionStorage` under the key:
`sessionStorage.setItem('vastoco_client_profile_v2', JSON.stringify(profileData))`

- **Survives Refresh:** Edits remain active across page navigations, tab switches, and refreshes.
- **Zero Mock Server:** Operates 100% frontend-only with zero backend server dependencies.
- **Sign-Out Reset:** Clicking `Sign out & Reset prototype` calls `resetClientProfile()`, wiping the session store and restoring `DEFAULT_CLIENT_PROFILE`.
- **Truth in Advertising:** An explanatory caption states: `Edits persist locally in your browser session`, preventing false claims of live cloud database synchronization.

---

## 7. Automated Testing Coverage

The specification is verified by unit tests in `tests/client_routes.test.mjs`:
- `validateClientProfile validates required fields, email format, and phone number` (PASS)
- `clientAccountPage renders both view mode and editable form with discard modal` (PASS)
- `Runtime CSS uses only Espresso and Pale Oak as colour values` (PASS)

