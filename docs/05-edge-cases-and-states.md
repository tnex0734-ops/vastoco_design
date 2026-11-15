# Edge cases and UI states

This is a frontend prototype, so several states are demonstrated locally and others are documented as production requirements.

## Client discovery

| State | Expected behaviour | Prototype treatment |
|---|---|---|
| No matching results | Explain the empty state and allow filter reset | Search/filter empty state with clear action |
| No professional data yet | Do not invent profiles or ratings | Clearly labelled sample profile cards |
| No reviews | Explain that reviews appear only after eligible real consultations | Copy on cards/profile describes the source requirement; no fabricated stars |
| Missing portfolio image | Use a neutral placeholder, not a broken image | Illustration placeholders are labelled sample content |
| Long professional name/specialty | Wrap safely without clipping actions | Card typography and grid allow wrapping |
| User compares more than two profiles | Keep comparison bounded and explain the limit | Maximum two selections; third selection is ignored with guidance |
| Filter has no results | Keep filters visible and offer reset | Empty state stays in flow |
| Location unavailable | Do not silently guess current location | Delhi NCR is the stated launch context; no geolocation is requested |

## Booking

| State | Expected behaviour | Prototype treatment |
|---|---|---|
| User changes session duration | Update summary immediately | 15/30/45 radio options update the side summary, fee display, and total payable dynamically |
| Required project details missing | Show field-level browser validation and a useful status | Required fields and live status message with preserved inputs |
| Consultation fee calculation | Transparent upfront total | Upfront rate breakdown (e.g. ₹1,200, ₹2,000, ₹2,800) with taxes and platform processing included |
| Slot unavailable or booked | Alert homeowner immediately and preserve form state | Interactive unavailable slots (11:30 AM, 05:00 PM) trigger explicit alert banner without deselecting prior inputs |
| Payment declined / gateway failure | Preserve booking selection and provide clear retry path | Interactive simulation checkbox toggles simulated gateway decline (Error 402) with 100% input preservation |
| Booking confirmed | Deliver clear reference, calendar sync, and meeting placeholder | Renders booking pass (Ref: VST-2026-8942), 1-click video link copy, and simulated .ics calendar download |

## Professional onboarding

| State | Expected behaviour | Prototype treatment |
|---|---|---|
| Category not selected | Keep user on current step and explain | Required select field |
| Architect selected | Show COA registration field | Conditional COA field; no live check |
| Interior designer / Vastu consultant selected | Show the current official site's identity + qualification/documented-practice guidance | Dynamic category-specific text; no document upload or verification in the demo |
| Verification pending | Clearly show pending, not verified | Review preview shows “Verification pending” |
| Document needs correction | Alert professional with required remediation | Interactive simulation button triggers explicit alert: “COA Certificate Needs Re-upload” with retry action |
| Missing portfolio projects | Warn user before finishing profile | If no project title or photos are added, displays helpful warning alert before proceeding to review |
| User leaves setup | Preserve only safe draft data and allow resume | Auto-save to `sessionStorage` with top resume banner, “Start fresh” clear action, and manual “Save draft” button |
| Upload network failure | Allow retry without losing state | Interactive simulation button demonstrates network interruption alert and retry handler |
| Too many uploads | Explain limit | Five images maximum in the demo |
| File too large | Keep previous input and show correction | 8 MB per-image demo limit |
| Non-image file | Reject / exclude and explain supported formats | `accept` limits selection to images; client-side file type check |
| Preview object URLs | Revoke when replaced/page leaves | URLs revoked during replacement and pagehide |
| Incomplete portfolio | Allow profile to remain a draft | Final review remains a preview; no publish action |

## Authentication and account identity

- **Intent Preservation**: Role-specific CTAs (e.g. `?role=client` or `?role=professional`) bypass redundant questions, directly presenting the appropriate account setup.
- **Conditional Role Selection**: The role chooser (“How would you like to use Vastoco?”) is only displayed when the user's intent is unknown.
- **Public Exploration First**: Prominent notice confirms that homeowners and professionals can freely explore listings and portfolios without creating an account.
- **Existing Account Simulation**: Entering an existing email (or clicking the simulation trigger) reveals an explicit alert with a 1-click shortcut to sign in instead.
- **Password Recovery Demonstration**: “Forgot password?” reveals a dedicated simulation view allowing users to test recovery link generation with full status feedback.
- **Form State Preservation**: When validation fails or simulated network errors occur, all previously entered form fields are 100% preserved.
- **Terms & Commission Disclosure**: Free to join; paid consultations require a paid plan; the published 15% commission is deducted from the professional’s fee rather than added to the client’s price.

## Accessibility and device edge cases

- Use the skip link and keyboard-accessible mobile menu.
- Do not hide focus indicators.
- Reduced-motion preference freezes the hero stage to its first scene.
- Dialog close control is labelled; the native dialog element provides keyboard escape behaviour.
- Mobile layout stacks the major content groups and preserves the CTA order.
- Do not add bottom navigation to the public marketing pages. A future authenticated mobile product may need it.
