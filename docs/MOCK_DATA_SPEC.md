# Vastoco — Mock Data Specification (V2)
**Project:** Vastoco Design Hackathon 2026  
**Module:** `src/clientData.js`  
**Purpose:** Normalized Mock Data Schemas, Invariants & Client State Management  
**Environment:** Frontend-Only · Zero Real Backend / Payments / Database  

---

## 1. Schema Specifications

### 1.1 Professional Schema (`RAW_PROFESSIONALS`)
```typescript
interface Professional {
  id: string;                     // Unique identifier (slug, e.g. "naina-kapoor")
  name: string;                   // Full name
  profession: string;             // Display profession ("Architect", "Interior Designer", "Vastu Consultant")
  roleKey: 'architect' | 'interior' | 'vastu';
  location: string;               // Delhi NCR sub-region ("South Delhi", "Gurgaon", "Noida")
  experienceYears: number;        // Years in professional practice
  specializations: string[];      // Core typologies & focus areas
  services: string[];             // Discipline taxonomy tags
  consultationFees: {             // Upfront rates in Indian Rupees (INR)
    15: number;
    30: number;
    45: number;
  };
  image: string;                  // Primary portfolio card photograph (/assets/...)
  imageAlt: string;               // Accessible descriptive alt text
  portfolio: Array<{              // Real project showcase
    title: string;
    meta?: string;
    image: string;
    source: string;
  }>;
  verificationStatus: string;     // Internal status ("coa-verified", "portfolio-audited", "certification-reviewed")
  verificationLabel: string;      // Human-readable badge text
  verificationDoc: string;        // Audit description for monograph
  coaRegistration?: string;       // Statutory registration number
  bio: string;                    // Professional introduction
  qualifications: string[];       // Educational & statutory credentials
  availableSlots: Array<{         // Illustrative video consultation calendar slots
    id: string;
    date: string;
    time: string;
    duration: number;
    available: boolean;           // True or false (for unavailable slot testing)
  }>;
  statusLabel: string;            // Invariant: "Illustrative demo profile"
}
```

### 1.2 Review Record Schema (`RAW_REVIEWS`)
```typescript
interface ReviewRecord {
  id: string;                     // Unique review ID ("rev-nk-5-1")
  professionalId: string;         // Foreign key referencing Professional.id
  consultationId: string;         // Foreign key referencing completed consultation session
  clientDisplayName: string;      // Client name or privacy label ("Arjun M.", "Anonymous Client")
  rating: number;                 // Integer score from 1 to 5
  reviewText: string;             // Detailed client feedback
  publishedAt: string;            // ISO date string ("2026-02-14")
  status: 'published' | 'pending' | 'hidden'; // Moderation pipeline status
  consultationContext: string;    // Context label (e.g. "30-min Villa Consultation")
  isDemo: true;                   // Invariant flag: illustrative sample data
}
```

### 1.3 Booking Record Schema (`ClientState.bookings`)
```typescript
interface BookingRecord {
  id: string;                     // Booking record ID ("bk-101")
  bookingReference: string;       // Public tracking reference ("VST-2026-8841")
  professionalId: string;         // Foreign key referencing Professional.id
  duration: 15 | 30 | 45;         // Selected duration in minutes
  date: string;                   // Date of consultation
  time: string;                   // Time slot
  fee: number;                    // Total upfront consultation fee (INR)
  professionalFee: number;        // 85% professional payout
  platformCommission: number;     // 15% platform commission
  escrowProtected: true;          // Invariant flag
  projectBudget: string;          // Selected budget tier
  scope: string;                  // Client project description
  timeline: string;               // Target project timeline
  status: 'upcoming' | 'completed' | 'cancelled';
  paymentStatus: 'simulated_escrow_held' | 'released_to_professional' | 'cancelled_refunded';
}
```

### 1.4 Client Activity Schema (`ClientState.activities`)
```typescript
interface ActivityEvent {
  id: string;
  type: 'saved' | 'compared' | 'booking_confirmed' | 'booking_cancelled' | 'consultation_completed' | 'review_submitted';
  title: string;
  description: string;
  timestamp: string;
  link: string;
}
```

---

## 2. In-Memory & Session Storage Management

State is persisted across page navigations in the current browser session using `sessionStorage` under the key:
`vastoco_client_v2_store`

### State Transitions:
1. **Save / Unsave**: Adding or removing a professional updates `savedIds` and automatically prepends an activity record to `activities`.
2. **Comparison**: Checkbox toggles add to `comparedIds` up to a strict limit of 2. Attempting a 3rd item yields `{ limitExceeded: true }`.
3. **Booking**: Completing Step 5 in the booking wizard prepends a new record to `bookings` and updates `activities`.
4. **Cancellation**: Clicking *“Cancel booking”* in `/client/consultations` transitions the record to `status: 'cancelled'` and `paymentStatus: 'cancelled_refunded'`.
5. **Mode Switching**: Toggling between `Active Client`, `New Client`, and `Returning Client` changes `activeMode` and allows reviewers to evaluate empty-state onboarding.

