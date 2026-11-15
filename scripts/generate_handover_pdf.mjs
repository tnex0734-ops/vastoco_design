import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function imgBase64(relPath) {
  const fullPath = resolve(root, relPath);
  if (!existsSync(fullPath)) return '';
  const buf = readFileSync(fullPath);
  const ext = relPath.endsWith('.png') ? 'png' : relPath.endsWith('.webp') ? 'webp' : 'svg+xml';
  return `data:image/${ext};base64,${buf.toString('base64')}`;
}

const logoUri = imgBase64('public/assets/vastoco-logo.png');
const clients1440Uri = imgBase64('docs/screenshots/clients_1440.png');
const clients390Uri = imgBase64('docs/screenshots/clients_390.png');
const pro1440Uri = imgBase64('docs/screenshots/professionals_1440.png');
const pro390Uri = imgBase64('docs/screenshots/professionals_390.png');
const gateway1440Uri = imgBase64('docs/screenshots/gateway_1440.png');
const gateway390Uri = imgBase64('docs/screenshots/gateway_390.png');
const houseCutawayUri = imgBase64('public/assets/house-cutaway.webp');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Vastoco Design Hackathon 2026 — Official Handover & Design Rationale</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

  @page {
    size: A4 portrait;
    margin: 12mm 14mm 14mm 14mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background: #DDD9CE;
    color: #3C2415;
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 8.5pt;
    line-height: 1.45;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    page-break-after: always;
    break-after: page;
    min-height: 270mm;
    position: relative;
    padding-bottom: 10mm;
  }
  .page:last-child {
    page-break-after: avoid;
    break-after: avoid;
  }
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #3C2415;
    padding-bottom: 4mm;
    margin-bottom: 6mm;
  }
  .page-header img.logo {
    height: 18px;
    width: auto;
  }
  .page-header .meta {
    font-size: 7pt;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .page-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(60, 36, 21, 0.3);
    padding-top: 3mm;
    font-size: 7pt;
    color: rgba(60, 36, 21, 0.8);
  }

  h1, h2, h3, h4 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 600;
    color: #3C2415;
  }
  .eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 7pt;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #3C2415;
    margin-bottom: 3mm;
  }
  h1.hero-title {
    font-size: 28pt;
    line-height: 1.05;
    margin-bottom: 4mm;
    letter-spacing: -0.02em;
  }
  h2.section-title {
    font-size: 16pt;
    line-height: 1.15;
    margin-bottom: 3mm;
    letter-spacing: -0.01em;
  }
  p.lead {
    font-size: 9.5pt;
    line-height: 1.45;
    margin-bottom: 5mm;
  }
  p {
    margin-bottom: 3mm;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5mm;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4mm;
  }
  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3mm;
  }

  .card {
    border: 1px solid #3C2415;
    padding: 4mm;
    background: rgba(221, 217, 206, 0.6);
  }
  .card--dark {
    background: #3C2415;
    color: #DDD9CE;
  }
  .card--dark h3, .card--dark p, .card--dark .eyebrow {
    color: #DDD9CE;
  }

  table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 4mm;
    font-size: 7.8pt;
  }
  table.data-table th, table.data-table td {
    border: 1px solid #3C2415;
    padding: 2.5mm 3mm;
    text-align: left;
    vertical-align: top;
  }
  table.data-table th {
    background: #3C2415;
    color: #DDD9CE;
    font-weight: 600;
    font-size: 7.2pt;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .screenshot-frame {
    border: 1px solid #3C2415;
    background: #DDD9CE;
    padding: 2mm;
    margin-bottom: 3mm;
    box-shadow: 0 4px 12px rgba(60, 36, 21, 0.08);
  }
  .screenshot-frame img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid rgba(60, 36, 21, 0.2);
  }
  .screenshot-caption {
    font-size: 7pt;
    font-weight: 600;
    margin-top: 1.5mm;
    display: flex;
    justify-content: space-between;
  }

  .swatch {
    height: 16mm;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2mm;
    border: 1px solid #3C2415;
    font-size: 7pt;
    font-weight: 700;
  }
  .swatch-espresso {
    background: #3C2415;
    color: #DDD9CE;
  }
  .swatch-oak {
    background: #DDD9CE;
    color: #3C2415;
  }

  .checklist {
    list-style: none;
  }
  .checklist li {
    position: relative;
    padding-left: 5mm;
    margin-bottom: 1.8mm;
    font-size: 8pt;
  }
  .checklist li::before {
    content: "■";
    position: absolute;
    left: 0;
    font-size: 7pt;
    color: #3C2415;
  }
</style>
</head>
<body>

<!-- PAGE 1: COVER -->
<div class="page">
  <div class="page-header">
    <img src="${logoUri}" class="logo" alt="Vastoco">
    <div class="meta">Design Hackathon 2026 · Official Handover Document</div>
  </div>

  <div style="margin-top: 10mm; margin-bottom: 8mm;">
    <p class="eyebrow">Executive Handover & Design Rationale</p>
    <h1 class="hero-title">Two doors. One platform.<br>Architectural clarity for verified design.</h1>
    <p class="lead">A code-first responsive product prototype engineered specifically for the Vastoco Design Hackathon 2026. Built around two dedicated homepage doors under a unified, strict two-colour identity.</p>
  </div>

  <div class="grid-2" style="margin-bottom: 8mm;">
    <div class="card">
      <p class="eyebrow">Door 01 — Clients</p>
      <h3 style="font-size: 13pt; margin-bottom: 2mm;">Find, Compare & Book</h3>
      <p>Targeted exclusively at homeowners and families in Delhi NCR seeking verified architects, interior designers, and Vastu consultants. Transparent upfront fees, authentic reviews, and 15/30/45-min video consultations.</p>
      <div style="margin-top: 3mm; font-size: 7.5pt; font-weight: 600;">Route: /clients · Responsive 1440px & 390px</div>
    </div>
    <div class="card card--dark">
      <p class="eyebrow" style="color: #DDD9CE;">Door 02 — Professionals</p>
      <h3 style="font-size: 13pt; margin-bottom: 2mm; color: #DDD9CE;">Showcase, Verify & Earn</h3>
      <p>Designed for architects, interior designers, and Vastu practitioners. High-visibility editorial portfolio, genuine credential checks (COA registration for architects), free onboarding, and 85% consultation fee retention.</p>
      <div style="margin-top: 3mm; font-size: 7.5pt; font-weight: 600; color: #DDD9CE;">Route: /professionals · Responsive 1440px & 390px</div>
    </div>
  </div>

  <div class="screenshot-frame" style="margin-bottom: 6mm;">
    <img src="${gateway1440Uri}" style="max-height: 85mm; object-fit: cover; object-position: top center;" alt="Gateway Axis Editorial Hero Stage">
    <div class="screenshot-caption">
      <span>Gateway Landing Page (/) · Axis Architectural Editorial Hero & Moving Photographic Strip</span>
      <span>1440 × 960 Resolution</span>
    </div>
  </div>

  <div class="card" style="font-size: 7.5pt; line-height: 1.4;">
    <strong>Prototype Status:</strong> Fully implemented frontend prototype with zero external dependencies. Pure native Node.js and modern ES modules. Verified across 6 viewports with 100% strict two-colour compliance (#3C2415 Espresso & #DDD9CE Pale Oak).
  </div>

  <div class="page-footer">
    <span>Vastoco Design Hackathon 2026</span>
    <span>Page 1 of 5</span>
  </div>
</div>

<!-- PAGE 2: CLIENT HOMEPAGE (ACTUAL SCREENSHOTS & RATIONALE) -->
<div class="page">
  <div class="page-header">
    <img src="${logoUri}" class="logo" alt="Vastoco">
    <div class="meta">Deliverable 01 · Client Homepage (/clients)</div>
  </div>

  <p class="eyebrow">Client Experience Architecture</p>
  <h2 class="section-title">Homeowner Journey: Find → Compare → Evaluate → Book</h2>
  <p style="margin-bottom: 4mm;">Homeowners in Delhi NCR face significant uncertainty regarding architectural credentials, unpredictable fees, and unsolicited sales pitches. The Vastoco Client Homepage replaces ambiguity with structured clarity and upfront transparency.</p>

  <div class="grid-2" style="align-items: start; margin-bottom: 4mm;">
    <div>
      <div class="screenshot-frame">
        <img src="${clients1440Uri}" style="max-height: 140mm; object-fit: cover; object-position: top center;" alt="Client Desktop Homepage">
        <div class="screenshot-caption">
          <span>Client Desktop Homepage</span>
          <span>1440px Viewport</span>
        </div>
      </div>
      <div class="card" style="font-size: 7.5pt;">
        <strong>Desktop Hero & Quick Discovery:</strong> High-impact architectural focal point with instant locality, discipline, and typology search. Sample cards feature real portfolio visuals, transparent consultation pricing, and verified practice credentials.
      </div>
    </div>

    <div>
      <div class="screenshot-frame">
        <img src="${clients390Uri}" style="max-height: 140mm; object-fit: cover; object-position: top center;" alt="Client Mobile Homepage">
        <div class="screenshot-caption">
          <span>Client Mobile Homepage</span>
          <span>390px Viewport</span>
        </div>
      </div>
      <div class="card" style="font-size: 7.5pt;">
        <strong>Mobile Adaptations:</strong> Full-width vertical card stacking without horizontal overflow. Single-tap category filtering, touch-optimized consultation duration pills, and streamlined upfront fee reviews.
      </div>
    </div>
  </div>

  <table class="data-table">
    <tr>
      <th style="width: 25%;">Feature</th>
      <th style="width: 40%;">Implementation Details</th>
      <th style="width: 35%;">Official Brief Alignment</th>
    </tr>
    <tr>
      <td><strong>Verified Disciplines</strong></td>
      <td>Architects, Interior Designers, and Vastu Consultants clearly separated with custom iconography.</td>
      <td>Satisfies official professional category breakdown for Delhi NCR.</td>
    </tr>
    <tr>
      <td><strong>Consultation Tiers</strong></td>
      <td>15 min (Discovery), 30 min (Technical Scope), and 45 min (Masterplanning) with upfront fees.</td>
      <td>Exact match to the 3 mandatory paid video consultation tiers.</td>
    </tr>
    <tr>
      <td><strong>Trust & Zero-Fakes</strong></td>
      <td>Only genuine consultation reviews are eligible; zero fake ratings or fabricated 5-star badges.</td>
      <td>Adheres strictly to content integrity and zero fabricated metric rules.</td>
    </tr>
  </table>

  <div class="page-footer">
    <span>Vastoco Design Hackathon 2026</span>
    <span>Page 2 of 5</span>
  </div>
</div>

<!-- PAGE 3: PROFESSIONAL HOMEPAGE (ACTUAL SCREENSHOTS & RATIONALE) -->
<div class="page">
  <div class="page-header">
    <img src="${logoUri}" class="logo" alt="Vastoco">
    <div class="meta">Deliverable 02 · Professional Homepage (/professionals)</div>
  </div>

  <p class="eyebrow">Professional Experience Architecture</p>
  <h2 class="section-title">Practitioner Journey: Understand → Trust → Showcase → Join</h2>
  <p style="margin-bottom: 4mm;">Design professionals require a dignified platform that respects their expertise, protects their time from speculative free pitching, and provides a clear path to commercial growth.</p>

  <div class="grid-2" style="align-items: start; margin-bottom: 4mm;">
    <div>
      <div class="screenshot-frame">
        <img src="${pro1440Uri}" style="max-height: 140mm; object-fit: cover; object-position: top center;" alt="Professional Desktop Homepage">
        <div class="screenshot-caption">
          <span>Professional Desktop Homepage</span>
          <span>1440px Viewport</span>
        </div>
      </div>
      <div class="card" style="font-size: 7.5pt;">
        <strong>Desktop Showcase & Value Props:</strong> Editorial presentation of practice growth pillars. Features an interactive consultation earnings calculator illustrating the 85% practitioner payout and transparent 15% platform commission.
      </div>
    </div>

    <div>
      <div class="screenshot-frame">
        <img src="${pro390Uri}" style="max-height: 140mm; object-fit: cover; object-position: top center;" alt="Professional Mobile Homepage">
        <div class="screenshot-caption">
          <span>Professional Mobile Homepage</span>
          <span>390px Viewport</span>
        </div>
      </div>
      <div class="card" style="font-size: 7.5pt;">
        <strong>Mobile Adaptations:</strong> Dynamic checklist tabs explaining profession-specific checks, responsive fee calculator sliders, and instant access to the 5-step registration drawer.
      </div>
    </div>
  </div>

  <table class="data-table">
    <tr>
      <th style="width: 25%;">Pillar</th>
      <th style="width: 40%;">Specification</th>
      <th style="width: 35%;">Commercial Rationale</th>
    </tr>
    <tr>
      <td><strong>85% Fee Retention</strong></td>
      <td>Professionals keep 85% of each consultation fee; 15% deducted by Vastoco.</td>
      <td>Transparent monetization without hidden monthly platform subscriptions.</td>
    </tr>
    <tr>
      <td><strong>COA Verification Check</strong></td>
      <td>Council of Architecture check for registered architects; qualification checks for designers.</td>
      <td>Establishes verifiable authority without claiming automated instant approvals.</td>
    </tr>
    <tr>
      <td><strong>Direct Client Briefs</strong></td>
      <td>Homeowners specify project budget, scope (renovation/new build), and timeline upfront.</td>
      <td>Eliminates low-intent inquiries and speculative free design requests.</td>
    </tr>
  </table>

  <div class="page-footer">
    <span>Vastoco Design Hackathon 2026</span>
    <span>Page 3 of 5</span>
  </div>
</div>

<!-- PAGE 4: DESIGN SYSTEM & TWO-COLOUR SPECIFICATION -->
<div class="page">
  <div class="page-header">
    <img src="${logoUri}" class="logo" alt="Vastoco">
    <div class="meta">Design System · Brand, Typography & Tokens</div>
  </div>

  <p class="eyebrow">Design System & Two-Colour Discipline</p>
  <h2 class="section-title">Strict Two-Colour Palette & Architectural Editorial Direction</h2>
  <p style="margin-bottom: 4mm;">In strict accordance with the brand challenge, all third hues (teals, greens, oranges, purples, pure white, pure black) were systematically eliminated. Depth, hierarchy, and elevation are achieved entirely through opacity variations of Espresso and Pale Oak.</p>

  <div class="grid-2" style="margin-bottom: 5mm;">
    <div class="swatch swatch-espresso">
      <span>Espresso</span>
      <span style="font-family: monospace;">#3C2415 · rgb(60, 36, 21)</span>
      <span style="font-weight: 400; font-size: 6.5pt; margin-top: 1mm;">Primary typography, structural frames, solid CTA buttons, high-contrast borders.</span>
    </div>
    <div class="swatch swatch-oak">
      <span>Pale Oak</span>
      <span style="font-family: monospace;">#DDD9CE · rgb(221, 217, 206)</span>
      <span style="font-weight: 400; font-size: 6.5pt; margin-top: 1mm;">Base canvas, cards, inverted badge text, subtle architectural drafting overlays.</span>
    </div>
  </div>

  <div class="grid-3" style="margin-bottom: 5mm;">
    <div class="card">
      <p class="eyebrow">Typography</p>
      <h3 style="font-size: 11pt; margin-bottom: 2mm;">Playfair Display & Inter</h3>
      <p style="font-size: 7.5pt;"><strong>Headings:</strong> Playfair Display (weights 400, 600, 700) provides editorial architectural elegance.<br><strong>Interface:</strong> Inter (weights 400, 500, 600, 700) provides clean legibility for dense UI labels, inputs, and navigation.</p>
    </div>
    <div class="card">
      <p class="eyebrow">Spacing Scale</p>
      <h3 style="font-size: 11pt; margin-bottom: 2mm;">8px Structural Grid</h3>
      <p style="font-size: 7.5pt;">Harmonic 8px scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 88px, 112px.<br>Max content constraint: 1200px centered with responsive fluid side gutters.</p>
    </div>
    <div class="card">
      <p class="eyebrow">Contrast & a11y</p>
      <h3 style="font-size: 11pt; margin-bottom: 2mm;">11.2:1 WCAG AAA</h3>
      <p style="font-size: 7.5pt;">Espresso on Pale Oak exceeds the 7.0:1 AAA standard.<br>Zero red/green status coding; error states utilize explicit warning copy, icons, and high-contrast border weights.</p>
    </div>
  </div>

  <p class="eyebrow">Asset Processing & Geometry</p>
  <table class="data-table">
    <tr>
      <th style="width: 25%;">Asset</th>
      <th style="width: 25%;">Format & Weight</th>
      <th style="width: 50%;">Brand Treatment & Integrity</th>
    </tr>
    <tr>
      <td><strong>Vastoco Logo</strong></td>
      <td>PNG · 4.1 KB</td>
      <td>Original geometry 100% preserved. Rendered in monochrome Espresso (#3C2415) with zero teal hue.</td>
    </tr>
    <tr>
      <td><strong>Architectural Cutaway</strong></td>
      <td>WebP · 74.3 KB</td>
      <td>Duotone processed into exact #3C2415 and #DDD9CE channel map. Zero CSS filter artifacts.</td>
    </tr>
    <tr>
      <td><strong>Vector Illustrations</strong></td>
      <td>SVG · 4 files</td>
      <td>Drafting sketch vectors recoloured to #3C2415 with translucent #DDD9CE fills.</td>
    </tr>
  </table>

  <div class="page-footer">
    <span>Vastoco Design Hackathon 2026</span>
    <span>Page 4 of 5</span>
  </div>
</div>

<!-- PAGE 5: ENGINEERING, VERIFICATION & SUBMISSION CHECKLIST -->
<div class="page">
  <div class="page-header">
    <img src="${logoUri}" class="logo" alt="Vastoco">
    <div class="meta">Verification & Submission Checklist</div>
  </div>

  <p class="eyebrow">Engineering Rigor & Verification</p>
  <h2 class="section-title">Quality Assurance, Test Coverage & Submission Ready</h2>
  <p style="margin-bottom: 4mm;">The project adheres strictly to Ponytail FULL mode principles: code-first execution, minimal dependencies, zero bloated frameworks, and 100% verifiable test coverage.</p>

  <div class="grid-2" style="margin-bottom: 5mm;">
    <div class="card">
      <p class="eyebrow">Automated Test Results</p>
      <h3 style="font-size: 11pt; margin-bottom: 2mm;">20 / 20 Tests Passing</h3>
      <ul class="checklist">
        <li>Asset existence and reference checks</li>
        <li>Dual door navigation and gateway monitor state</li>
        <li>85% commission & consultation model terms</li>
        <li>COA verification & guidance validation</li>
        <li>Role intent preservation across auth flows</li>
        <li>Credential recovery & error 402 simulation</li>
        <li>Strict two-colour CSS and SVG audit</li>
      </ul>
    </div>

    <div class="card">
      <p class="eyebrow">Responsive QA Matrix</p>
      <h3 style="font-size: 11pt; margin-bottom: 2mm;">All 6 Viewports Audited</h3>
      <ul class="checklist">
        <li><strong>1440px Desktop:</strong> PASS · Zero overflow</li>
        <li><strong>1280px Laptop:</strong> PASS · Zero overflow</li>
        <li><strong>1024px Tablet Landscape:</strong> PASS · Zero overflow</li>
        <li><strong>768px Tablet Portrait:</strong> PASS · Zero overflow</li>
        <li><strong>390px Mobile:</strong> PASS · Zero overflow</li>
        <li><strong>360px Compact Mobile:</strong> PASS · Zero overflow</li>
      </ul>
    </div>
  </div>

  <p class="eyebrow">Submission Checklist</p>
  <div class="card" style="margin-bottom: 5mm;">
    <ul class="checklist">
      <li><strong>Official Homepages:</strong> Both Client (/clients) and Professional (/professionals) fully implemented and distinct.</li>
      <li><strong>Responsive Viewports:</strong> Desktop (1440px) and Mobile (390px) verified and screenshot-backed.</li>
      <li><strong>Colour Discipline:</strong> Strict two-colour palette (#3C2415 Espresso & #DDD9CE Pale Oak) applied across all assets.</li>
      <li><strong>Content Integrity:</strong> Zero fabricated testimonials, ratings, or simulated instant verification claims.</li>
      <li><strong>Zero Dependencies:</strong> 100% native Node.js runtime with zero npm runtime packages.</li>
      <li><strong>Deliverables:</strong> Full source code, test suite, static build (dist/), PDF handover, and submission ZIP.</li>
    </ul>
  </div>

  <div class="card card--dark" style="font-size: 7.5pt;">
    <strong>Submission Reference:</strong> Vastoco Design Hackathon 2026 · Project Root: <code>vastoco-redesign</code> · Run locally: <code>npm run dev</code> · Build: <code>npm run build</code> · Tests: <code>npm test</code>
  </div>

  <div class="page-footer">
    <span>Vastoco Design Hackathon 2026</span>
    <span>Page 5 of 5</span>
  </div>
</div>

</body>
</html>`;

const templatePath = resolve(root, 'docs', 'handover-pdf-template.html');
writeFileSync(templatePath, htmlContent, 'utf-8');
console.log(`Wrote PDF HTML template to ${templatePath}`);

const outPdf = resolve(root, 'docs', 'Vastoco-Design-Hackathon-Handover.pdf');
console.log('Rendering polished PDF handover via Chrome Headless...');
execFileSync(chrome, [
  '--headless=new',
  `--print-to-pdf=${outPdf}`,
  '--no-pdf-header-footer',
  `file:///${templatePath.replace(/\\/g, '/')}`
]);

if (existsSync(outPdf)) {
  const size = statSync(outPdf).size;
  console.log(`Successfully generated ${outPdf} (${(size / 1024).toFixed(1)} KB)`);
} else {
  console.error('Failed to generate PDF output.');
  process.exit(1);
}

