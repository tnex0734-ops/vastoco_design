# Two-colour revision — 10 November 2026

## Approved palette

The only base colours in the live product and generated handover are:

- **Espresso:** `#3C2415`
- **Pale Oak:** `#DDD9CE`

No additional hue is permitted. Opacity variations of Espresso and Pale Oak are used only for shadows, borders, overlays and subtle surface separation.

## Applied changes

- Replaced the expanded CSS palette with the two approved colours and opacity variations of those same colours.
- Recoloured the supplied Vastoco wordmark to monochrome Espresso while preserving its geometry and transparency. The untouched original source file remains in `references/inspiration/` only.
- Converted the house cutaway to a two-colour Espresso/Pale Oak duotone with transparent background.
- Recoloured all runtime SVG illustrations and favicon to the two approved values.
- Updated the machine-readable design tokens, Antigravity instructions, workspace skills, design-system documentation, README, package guide and PDF handover.
- Added source-level palette tests and a pixel-level raster/SVG asset audit.
- Kept the client/professional information architecture, UX flows, copy, typography, spacing, responsive behaviour and frontend-only scope unchanged.

## Validation

Run:

```bash
npm test
npm run build
python scripts/audit_two_colour_assets.py
```

The pixel-level audit requires Pillow and NumPy. The frontend itself has no runtime or build dependencies.

## Source-only references

The untouched teal logo, moodboard screenshots and original video are retained only as user-provided reference material inside `references/inspiration/`. They are not imported by the website or included in the generated illustration assets. This preserves provenance without introducing those colours into the live product.
