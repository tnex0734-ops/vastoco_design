# Product architecture and routes

## Experience model

One brand system, two public homepage doors, one shared account entry and two contextual product journeys.

```text
/                         Visual gateway / first orientation
├── /clients               Client homepage (official door 1)
│   ├── /clients/explore   Illustrative discovery and comparison
│   ├── /clients/professional  Illustrative professional profile
│   └── /clients/booking   Consultation setup and summary (demo only)
├── /professionals         Professional homepage (official door 2)
│   └── /professionals/join  Multi-step profile setup (demo only)
├── /signup                Shared account creation / intent selector
└── /signin                Shared sign-in shell (demo only)
```

## Why there is a root gateway

The root route introduces the platform and makes both audiences visible without asking a modal question on arrival. The official two homepage deliverables remain separate and are linked from the gateway and from each other. Visitors can choose a door immediately or continue to the dedicated audience homepage.

## Client journey

1. Arrive at `/clients` or choose the client door from `/`.
2. Understand the value proposition and how verification works.
3. Explore by service category.
4. Compare portfolio, experience, fees and real consultation reviews when live data is available.
5. Review a professional profile.
6. Choose 15, 30 or 45 minutes.
7. Share project type, approximate budget, timeline and consultation scope.
8. Review upfront fee and booking details.
9. Continue to real secure payment and booking only after backend integration.

The prototype stops before a real payment or appointment is created.

## Professional journey

1. Arrive at `/professionals` or choose the professional door from `/`.
2. Understand free joining, the 85% consultation share, profiles, client briefs and verification.
3. Begin `/professionals/join`.
4. Add basic account details.
5. Select professional category and practice location.
6. See category-specific verification guidance. Architects see the COA registration field; no validation is performed in this prototype.
7. Add an introduction and project portfolio images.
8. Preview the profile with verification marked pending.
9. Finish a local preview only. No profile is published.

## Role selection and auth logic

- If a visitor clicks a role-specific CTA, carry that intent into registration. Do not ask the role again.
- If a visitor clicks a generic Create account action with no intent context, show the two-option selector.
- Returning users should sign in rather than create another account.
- Preserve the destination (e.g. a selected professional and booking intent) through auth in production.
- A user may potentially act as both a client and a professional. This is a product capability to validate with Vastoco; do not assume separate accounts or multi-role support without confirmation.

## Shared navigation

- Public marketing pages use a compact top navigation and a mobile menu.
- Public pages do not use a bottom tab bar; they are editorial/marketing experiences.
- A bottom navigation may be appropriate for a future logged-in mobile product area with stable destinations such as Explore, Saved, Bookings and Profile. That product area is not part of this hackathon prototype.
