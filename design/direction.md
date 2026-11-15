# Taste Engine Direction Card & Mutation Plan

## Direction Card
```
CONCEPT: This site is an architectural monograph and bilateral project ledger that transforms chaotic Indian design hiring into a verified, dignified exchange between cultured homeowners and master practitioners.
WHY IT FITS THE AUDIENCE: It honors the professional stature of licensed architects and designers while eliminating sales ambiguity and commission anxiety for discerning property owners.
FEELING IN 3 SECONDS: Quiet architectural authority, material honesty, and disciplined precision.
SEED: lapa.ninja/post/lars-muller-architectural-monographs (Lars Müller Monographs — architectural publishing archive)
ANCHORS INHERITED:
  1. Motion Language: Deliberate expo-out easing (0.16, 1, 0.3, 1), quiet card elevations, staggered list entrances (0.08s step).
  2. Interaction Mechanics: Direct-manipulation filtering, tab-swapping view matrices, slide-over proposal drawers.
  3. Type Hierarchy: Proportional scale ratio (3.2x / 2.0x / 1.25x / 1.0x / 0.8x) with tight letter-spacing on display headlines and tabular numbers on metrics.
MUTATIONS APPLIED:
  - Concept & Structure: Transformed from a static book catalog into a live two-sided professional marketplace with client briefs, verified booking pipelines, and practitioner dashboard.
  - Background & Palette: Mutated from sterile pure white/black into tactile Pale Oak #DDD9CE canvas with rich Espresso #3C2415 ink.
  - Typography: Replaced generic Swiss grotesque with authoritative Playfair Display headlines anchored by Inter body/tabular numerals.
  - Extra Constraint: Crisp rectilinear boxes with strict 2px–4px radius; zero pill buttons; architectural drafting lines.
SIGNATURE MOVES:
  - Layout: Dual-sided door architecture linking client discovery directly to verified professional tools.
  - Type: High-contrast Playfair serif headers with all-caps tabular micro-labels.
  - Motion / Interaction: Dynamic 85/15 platform fee breakdown counter that recalculates in real-time as consultation durations and fees adjust.
MEMORABLE MOMENTS:
  1. Authentic architect-at-work photography in the professional gateway.
  2. Granular privacy-controlled client brief creation (Private / Selected Pros / Open).
  3. Dual-sided offer management pipeline with instant calendar conflict resolution.
AVOIDING:
  - No purple/blue gradients or glowing neon blobs.
  - No dark-mode gold luxury tropes.
  - No badge-spamming directory cards or fake live visitor counters.
  - No generic stock renders.
  - No pill-shaped rounded buttons.
```

## Section-by-Section Mutation Architecture
1. **Public Professional Portal (`/professionals`)**:
   - Hero: Authentic photography (`professional-door-02-architect-at-work.png`) + concise headline + dual CTA.
   - What Vastoco Offers: 4 architectural capability pillars.
   - 4-Step Professional Journey: Understand -> Verify -> Showcase -> Join.
   - Verified Credentials: Council of Architecture (COA) register check for architects; qualification and portfolio validation for interior designers and Vastu consultants.
   - Consultation Revenue Model: 15/30/45 min video slots with explicit notice: "Practitioners retain 85% of all consultation fees. Vastoco deducts a 15% platform commission to maintain client verification, scheduling infrastructure, and secure payment escrow."
   - Active Client Opportunities Feed: Live preview of real Delhi NCR client briefs.
   - FAQ & Application CTA.
2. **Professional Authenticated Workspace (`/professional/*`)**:
   - `/professional`: Live overview dashboard with next consultation card, today's schedule, new matching briefs widget, and quick actions.
   - `/professional/briefs`: Filterable opportunities board (Noida, Gurugram, South Delhi, Faridabad).
   - `/professional/briefs/:id`: Comprehensive brief inspection + Send Offer Composer.
   - `/professional/offers`: Sent proposals pipeline (Draft, Sent, Accepted, Declined, Withdrawn).
   - `/professional/consultations` & `/professional/calendar`: Dual agenda/calendar view with conflict detection.
   - `/professional/portfolio`: Project manager (add, edit, reorder, delete).
   - `/professional/profile`: Practice profile editor.
   - `/professional/verification`: COA registration tracker.
   - `/professional/settings`: Payout account and notification preferences.

