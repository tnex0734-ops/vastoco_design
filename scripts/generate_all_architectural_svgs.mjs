import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const assetsDir = resolve(root, 'public', 'assets');

function svgWrap(content, w = 480, h = 320) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" fill="none" stroke="#3C2415" stroke-linecap="round" stroke-linejoin="round">
  <rect width="${w}" height="${h}" fill="#DDD9CE" rx="8" stroke="rgba(60, 36, 21, 0.22)" stroke-width="1"/>
  <!-- Architectural Drafting Grid -->
  <g stroke="rgba(60, 36, 21, 0.05)" stroke-width="0.75">
    <line x1="40" y1="0" x2="40" y2="${h}"/>
    <line x1="120" y1="0" x2="120" y2="${h}"/>
    <line x1="200" y1="0" x2="200" y2="${h}"/>
    <line x1="280" y1="0" x2="280" y2="${h}"/>
    <line x1="360" y1="0" x2="360" y2="${h}"/>
    <line x1="440" y1="0" x2="440" y2="${h}"/>
    <line x1="0" y1="40" x2="${w}" y2="40"/>
    <line x1="0" y1="120" x2="${w}" y2="120"/>
    <line x1="0" y1="200" x2="${w}" y2="200"/>
    <line x1="0" y1="280" x2="${w}" y2="280"/>
  </g>
  ${content}
</svg>`;
}

// 1. CLIENT HOW IT WORKS - 01 FIND (Axonometric residential discovery in Delhi NCR)
const clientHowFind = svgWrap(`
  <text x="240" y="45" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">01 · DISCOVERY &amp; LOCALITY SEARCH</text>
  <line x1="160" y1="52" x2="320" y2="52" stroke-width="0.8"/>
  <!-- Ground Plane Isometric Grid -->
  <polygon points="240,110 390,185 240,260 90,185" fill="rgba(60, 36, 21, 0.04)" stroke-width="1.2"/>
  <line x1="165" y1="147" x2="315" y2="222" stroke="rgba(60, 36, 21, 0.2)" stroke-width="0.8" stroke-dasharray="2 2"/>
  <line x1="315" y1="147" x2="165" y2="222" stroke="rgba(60, 36, 21, 0.2)" stroke-width="0.8" stroke-dasharray="2 2"/>
  <!-- Axonometric Villa 1 (South Delhi) -->
  <polygon points="170,170 220,145 220,185 170,210" fill="#DDD9CE" stroke-width="1.6"/>
  <polygon points="220,145 270,170 270,210 220,185" fill="rgba(60, 36, 21, 0.08)" stroke-width="1.6"/>
  <polygon points="170,170 220,145 270,170 220,195" fill="#DDD9CE" stroke-width="1.6"/>
  <!-- Windows & Door -->
  <line x1="185" y1="180" x2="205" y2="170" stroke-width="1.2"/>
  <line x1="185" y1="195" x2="205" y2="185" stroke-width="1.2"/>
  <rect x="238" y="180" width="14" height="24" fill="rgba(60, 36, 21, 0.15)" stroke-width="1.2"/>
  <!-- Discovery Target Pin & Radar Arc -->
  <circle cx="220" cy="115" r="18" fill="rgba(60, 36, 21, 0.06)" stroke-width="1.4"/>
  <circle cx="220" cy="115" r="3" fill="#3C2415"/>
  <path d="M220,133 L220,145" stroke-width="1.5"/>
  <!-- Search Tag Pill -->
  <rect x="280" y="90" width="140" height="34" rx="4" fill="#DDD9CE" stroke-width="1.4"/>
  <circle cx="295" cy="107" r="4" fill="#3C2415"/>
  <text x="306" y="104" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none">DELHI NCR ARCHITECTS</text>
  <text x="306" y="117" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none">Residential Villas · FAR Checks</text>
`, 480, 320);

// 2. CLIENT HOW IT WORKS - 02 COMPARE (Side-by-side architectural elevations)
const clientHowCompare = svgWrap(`
  <text x="240" y="45" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">02 · SIDE-BY-SIDE EVALUATION</text>
  <line x1="160" y1="52" x2="320" y2="52" stroke-width="0.8"/>
  <!-- Drafting Board Base -->
  <rect x="60" y="80" width="360" height="195" fill="rgba(60, 36, 21, 0.03)" stroke-width="1.5" rx="4"/>
  <!-- Center Comparison Divider -->
  <line x1="240" y1="80" x2="240" y2="275" stroke-width="1.4" stroke-dasharray="4 4"/>
  <!-- Profile A Column -->
  <rect x="85" y="100" width="130" height="75" fill="#DDD9CE" stroke-width="1.4"/>
  <!-- House Elevation A (Courtyard Villa) -->
  <polygon points="95,145 150,115 205,145" fill="rgba(60, 36, 21, 0.06)" stroke-width="1.4"/>
  <rect x="105" y="145" width="90" height="30" stroke-width="1.4"/>
  <line x1="130" y1="150" x2="145" y2="150" stroke-width="1"/>
  <line x1="155" y1="150" x2="170" y2="150" stroke-width="1"/>
  <text x="150" y="195" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">Studio Naina Kapoor</text>
  <text x="150" y="210" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">8 yrs exp · ₹1,400 / 30m</text>
  <text x="150" y="224" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">✓ COA CA/2016/78210</text>
  <!-- Profile B Column -->
  <rect x="265" y="100" width="130" height="75" fill="#DDD9CE" stroke-width="1.4"/>
  <!-- House Elevation B (Pavilion Extension) -->
  <rect x="280" y="130" width="100" height="45" fill="rgba(60, 36, 21, 0.06)" stroke-width="1.4"/>
  <line x1="275" y1="130" x2="385" y2="130" stroke-width="1.8"/>
  <rect x="295" y="140" width="25" height="35" stroke-width="1"/>
  <rect x="330" y="140" width="40" height="25" stroke-width="1"/>
  <text x="330" y="195" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">Kabir Sethi Architecture</text>
  <text x="330" y="210" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">6 yrs exp · ₹1,250 / 30m</text>
  <text x="330" y="224" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">✓ COA CA/2018/91440</text>
  <!-- Dimension arrows -->
  <line x1="85" y1="248" x2="395" y2="248" stroke-width="1"/>
  <polygon points="85,246 80,248 85,250" fill="#3C2415"/>
  <polygon points="395,246 400,248 395,250" fill="#3C2415"/>
  <text x="240" y="262" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Direct Spec-to-Spec Comparison</text>
`, 480, 320);

// 3. CLIENT HOW IT WORKS - 03 EVALUATE (Credentials review & register check)
const clientHowEvaluate = svgWrap(`
  <text x="240" y="45" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">03 · VERIFICATION &amp; INTEGRITY AUDIT</text>
  <line x1="160" y1="52" x2="320" y2="52" stroke-width="0.8"/>
  <!-- Certificate / Dossier Sheet -->
  <rect x="130" y="80" width="220" height="190" fill="#DDD9CE" stroke-width="1.8" rx="3"/>
  <rect x="140" y="90" width="200" height="170" fill="rgba(60, 36, 21, 0.03)" stroke-width="0.8"/>
  <!-- Official Header -->
  <text x="240" y="112" font-family="Playfair Display, serif" font-size="12" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">Council of Architecture</text>
  <text x="240" y="125" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">STATUTORY REGISTRY VERIFICATION · ARCHITECTS ACT 1972</text>
  <line x1="155" y1="132" x2="325" y2="132" stroke-width="1"/>
  <!-- Check Items -->
  <circle cx="160" cy="152" r="6" fill="#3C2415"/>
  <polyline points="157,152 159,154 163,150" stroke="#DDD9CE" stroke-width="1.2"/>
  <text x="175" y="155" font-family="Inter, sans-serif" font-size="8.5" font-weight="600" fill="#3C2415" stroke="none">Registration Active on National Register</text>
  
  <circle cx="160" cy="175" r="6" fill="#3C2415"/>
  <polyline points="157,175 159,177 163,173" stroke="#DDD9CE" stroke-width="1.2"/>
  <text x="175" y="178" font-family="Inter, sans-serif" font-size="8.5" font-weight="600" fill="#3C2415" stroke="none">Degree &amp; Accredited Qualifications Verified</text>
  
  <circle cx="160" cy="198" r="6" fill="#3C2415"/>
  <polyline points="157,198 159,200 163,196" stroke="#DDD9CE" stroke-width="1.2"/>
  <text x="175" y="201" font-family="Inter, sans-serif" font-size="8.5" font-weight="600" fill="#3C2415" stroke="none">Delhi NCR Documented Practice History</text>
  
  <circle cx="160" cy="221" r="6" fill="#3C2415"/>
  <polyline points="157,221 159,223 163,219" stroke="#DDD9CE" stroke-width="1.2"/>
  <text x="175" y="224" font-family="Inter, sans-serif" font-size="8.5" font-weight="600" fill="#3C2415" stroke="none">Zero Purchased / Fake Review Policy</text>
  <!-- Verified Seal Stamp -->
  <circle cx="305" cy="225" r="24" fill="rgba(60, 36, 21, 0.08)" stroke-width="1.6" stroke-dasharray="2 2"/>
  <circle cx="305" cy="225" r="20" stroke-width="1.2"/>
  <text x="305" y="224" font-family="Inter, sans-serif" font-size="6.5" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">COA</text>
  <text x="305" y="232" font-family="Inter, sans-serif" font-size="6" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">VERIFIED</text>
`, 480, 320);

// 4. CLIENT HOW IT WORKS - 04 BOOK (Video consultation & calendar)
const clientHowBook = svgWrap(`
  <text x="240" y="45" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">04 · UPFRONT CONSULTATION BOOKING</text>
  <line x1="160" y1="52" x2="320" y2="52" stroke-width="0.8"/>
  <!-- Video Meeting Monitor -->
  <rect x="70" y="85" width="200" height="140" rx="6" fill="#DDD9CE" stroke-width="1.8"/>
  <rect x="76" y="91" width="188" height="115" fill="rgba(60, 36, 21, 0.04)" stroke-width="1"/>
  <!-- Video Screen UI -->
  <circle cx="130" cy="140" r="18" fill="rgba(60, 36, 21, 0.1)" stroke-width="1.2"/>
  <path d="M120,165 Q130,155 140,165" stroke-width="1.2"/>
  <circle cx="210" cy="140" r="18" fill="rgba(60, 36, 21, 0.1)" stroke-width="1.2"/>
  <path d="M200,165 Q210,155 220,165" stroke-width="1.2"/>
  <!-- Monitor Base -->
  <polygon points="150,225 190,225 195,245 145,245" fill="#3C2415"/>
  <rect x="135" y="245" width="70" height="6" rx="2" fill="#3C2415"/>
  <!-- Calendar & Duration Selector on Right -->
  <rect x="290" y="85" width="130" height="165" rx="5" fill="#DDD9CE" stroke-width="1.5"/>
  <rect x="290" y="85" width="130" height="28" fill="#3C2415" rx="5 5 0 0"/>
  <text x="355" y="103" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#DDD9CE" stroke="none" text-anchor="middle">UPFRONT SCHEDULE</text>
  <!-- Duration Pills -->
  <rect x="300" y="122" width="110" height="20" rx="3" fill="rgba(60, 36, 21, 0.06)" stroke-width="1"/>
  <text x="355" y="135" font-family="Inter, sans-serif" font-size="8" fill="#3C2415" stroke="none" text-anchor="middle">15 min · ₹750</text>
  
  <rect x="300" y="148" width="110" height="24" rx="3" fill="#3C2415" stroke-width="1"/>
  <text x="355" y="163" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#DDD9CE" stroke="none" text-anchor="middle">30 min · ₹1,400 (Rec)</text>
  
  <rect x="300" y="178" width="110" height="20" rx="3" fill="rgba(60, 36, 21, 0.06)" stroke-width="1"/>
  <text x="355" y="191" font-family="Inter, sans-serif" font-size="8" fill="#3C2415" stroke="none" text-anchor="middle">45 min · ₹1,950</text>
  
  <!-- Escrow Badge -->
  <rect x="300" y="210" width="110" height="26" rx="3" fill="rgba(60, 36, 21, 0.08)" stroke-width="1"/>
  <text x="355" y="222" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">🔒 ESCROW HELD</text>
  <text x="355" y="231" font-family="Inter, sans-serif" font-size="6.5" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">100% Upfront Clarity</text>
`, 480, 320);

// 5. CLIENT PLANNER SCOPE (Spatial layout & budget planning)
const clientPlannerScope = svgWrap(`
  <text x="270" y="45" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">RESIDENTIAL PROJECT SCOPE &amp; BUDGET PLANNING</text>
  <line x1="180" y1="52" x2="360" y2="52" stroke-width="0.8"/>
  <!-- Floorplan Layout Outer Boundary -->
  <rect x="60" y="80" width="420" height="230" fill="rgba(60, 36, 21, 0.03)" stroke-width="2"/>
  <!-- Room Divisions -->
  <line x1="210" y1="80" x2="210" y2="310" stroke-width="2"/>
  <line x1="210" y1="190" x2="480" y2="190" stroke-width="2"/>
  <line x1="340" y1="80" x2="340" y2="190" stroke-width="2"/>
  <!-- Internal Courtyard (Open to Sky) -->
  <rect x="80" y="100" width="110" height="100" fill="rgba(60, 36, 21, 0.06)" stroke-width="1.4" stroke-dasharray="3 3"/>
  <text x="135" y="145" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">COURTYARD</text>
  <text x="135" y="160" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Light &amp; Ventilation Axis</text>
  <text x="135" y="175" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Scope: Passive Cooling</text>
  <!-- Living & Dining Zone -->
  <text x="275" y="125" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">LIVING / DINING</text>
  <text x="275" y="140" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Bespoke Millwork (450 sq.ft)</text>
  <text x="275" y="155" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Budget: ₹15–25 Lakh</text>
  <!-- Kitchen & Services Zone -->
  <text x="410" y="125" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">KITCHEN</text>
  <text x="410" y="140" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Modular &amp; Wet Area</text>
  <text x="410" y="155" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Budget: ₹8–12 Lakh</text>
  <!-- Master Suite Zone -->
  <text x="345" y="235" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">MASTER SUITE &amp; TERRACE EXTENSION</text>
  <text x="345" y="250" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Structural Addition &amp; Sanction Compliance (600 sq.ft)</text>
  <text x="345" y="265" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Timeline: 3–6 Months · Budget: ₹25–40 Lakh</text>
  <!-- Dimension Strings -->
  <line x1="60" y1="70" x2="480" y2="70" stroke-width="1"/>
  <line x1="60" y1="65" x2="60" y2="75" stroke-width="1"/>
  <line x1="480" y1="65" x2="480" y2="75" stroke-width="1"/>
  <text x="270" y="66" font-family="Inter, sans-serif" font-size="8" fill="#3C2415" stroke="none" text-anchor="middle">Total Project Floor Area: 3,200 sq.ft (Delhi NCR)</text>
`, 540, 360);

// 6. CLIENT PAYMENT ESCROW (Payment security and upfront clarity)
const clientPaymentEscrow = svgWrap(`
  <text x="240" y="45" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">ESCROW TRANSACTION SECURITY &amp; TRUST</text>
  <line x1="150" y1="52" x2="330" y2="52" stroke-width="0.8"/>
  <!-- Central Shield -->
  <path d="M240,80 L320,110 L320,180 Q320,240 240,270 Q160,240 160,180 L160,110 Z" fill="rgba(60, 36, 21, 0.05)" stroke-width="2"/>
  <path d="M240,95 L305,120 L305,175 Q305,225 240,250 Q175,225 175,175 L175,120 Z" fill="#DDD9CE" stroke-width="1.2"/>
  <!-- Lock Symbol Inside Shield -->
  <rect x="220" y="160" width="40" height="32" rx="4" fill="#3C2415"/>
  <path d="M228,160 L228,144 Q228,132 240,132 Q252,132 252,144 L252,160" stroke-width="3" fill="none"/>
  <circle cx="240" cy="173" r="3" fill="#DDD9CE"/>
  <line x1="240" y1="176" x2="240" y2="183" stroke="#DDD9CE" stroke-width="2"/>
  <!-- Escrow Flow Nodes -->
  <!-- Left Node: Client Payment -->
  <rect x="50" y="140" width="85" height="45" rx="4" fill="#DDD9CE" stroke-width="1.4"/>
  <text x="92" y="158" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">CLIENT</text>
  <text x="92" y="172" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Upfront Fee Paid</text>
  <line x1="135" y1="162" x2="160" y2="162" stroke-width="1.4" marker-end="url(#arrow)"/>
  <!-- Right Node: Practitioner Payout -->
  <rect x="345" y="140" width="95" height="45" rx="4" fill="#DDD9CE" stroke-width="1.4"/>
  <text x="392" y="158" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">PRACTITIONER</text>
  <text x="392" y="172" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">85% Net Payout</text>
  <line x1="320" y1="162" x2="345" y2="162" stroke-width="1.4"/>
  <!-- Assurance Ribbon Below -->
  <rect x="120" y="280" width="240" height="24" rx="4" fill="#3C2415"/>
  <text x="240" y="295" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#DDD9CE" stroke="none" text-anchor="middle">FUNDS HELD UNTIL CONSULTATION COMPLETES</text>
`, 480, 320);

// 7. EMPTY SEARCH (No matching search criteria)
const emptySearch = svgWrap(`
  <!-- Drafting Board & Search Loupe -->
  <rect x="80" y="60" width="240" height="140" fill="rgba(60, 36, 21, 0.04)" stroke-width="1.5" rx="4"/>
  <!-- Blueprint Grid Inside -->
  <line x1="80" y1="100" x2="320" y2="100" stroke="rgba(60, 36, 21, 0.1)" stroke-width="1"/>
  <line x1="80" y1="140" x2="320" y2="140" stroke="rgba(60, 36, 21, 0.1)" stroke-width="1"/>
  <line x1="160" y1="60" x2="160" y2="200" stroke="rgba(60, 36, 21, 0.1)" stroke-width="1"/>
  <line x1="240" y1="60" x2="240" y2="200" stroke="rgba(60, 36, 21, 0.1)" stroke-width="1"/>
  <!-- Magnifying Loupe -->
  <circle cx="190" cy="120" r="36" fill="#DDD9CE" stroke-width="2"/>
  <circle cx="190" cy="120" r="30" fill="none" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="215" y1="145" x2="250" y2="180" stroke-width="4"/>
  <!-- Question Mark / Cross -->
  <line x1="180" y1="110" x2="200" y2="130" stroke-width="2"/>
  <line x1="200" y1="110" x2="180" y2="130" stroke-width="2"/>
  <text x="200" y="225" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">NO MATCHING SAMPLE PROFILES</text>
  <text x="200" y="240" font-family="Inter, sans-serif" font-size="8.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Try clearing discipline filters or searching a broader Delhi NCR locality</text>
`, 400, 260);

// 8. DISCOVERY AERIAL (Delhi NCR Neighborhood Zoning Map)
const discoveryAerial = svgWrap(`
  <text x="240" y="35" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">DELHI NCR ARCHITECTURAL DISTRICTS</text>
  <!-- Zoning Quadrants -->
  <!-- Quadrant 1: South Delhi -->
  <polygon points="120,60 220,95 180,185 80,150" fill="rgba(60, 36, 21, 0.05)" stroke-width="1.4"/>
  <text x="145" y="130" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">SOUTH DELHI</text>
  <text x="145" y="142" font-family="Inter, sans-serif" font-size="7" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Villas · Courtyards</text>
  <!-- Quadrant 2: Gurgaon / DLF -->
  <polygon points="240,102 360,65 400,150 280,188" fill="rgba(60, 36, 21, 0.08)" stroke-width="1.4"/>
  <text x="325" y="125" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">GURGAON / DLF</text>
  <text x="325" y="137" font-family="Inter, sans-serif" font-size="7" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">High-Rise · Modern Penthouses</text>
  <!-- Quadrant 3: Noida & Expressway -->
  <polygon points="190,195 290,198 250,250 150,245" fill="rgba(60, 36, 21, 0.05)" stroke-width="1.4"/>
  <text x="220" y="222" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">NOIDA / CENTRAL</text>
  <text x="220" y="234" font-family="Inter, sans-serif" font-size="7" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Apartment Remodels · Vastu</text>
  <!-- Compass Rose -->
  <circle cx="430" cy="70" r="16" fill="#DDD9CE" stroke-width="1.2"/>
  <polygon points="430,58 433,70 430,68 427,70" fill="#3C2415"/>
  <polygon points="430,82 433,70 430,72 427,70" fill="rgba(60, 36, 21, 0.4)"/>
  <text x="430" y="55" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">N</text>
`, 480, 260);

// 9. COMPARISON EMPTY (Dual parallel drafting guides)
const comparisonEmpty = svgWrap(`
  <!-- Dual Dashed Comparison Slots -->
  <rect x="30" y="30" width="135" height="110" rx="4" fill="rgba(60, 36, 21, 0.03)" stroke-width="1.2" stroke-dasharray="3 3"/>
  <text x="97" y="80" font-family="Inter, sans-serif" font-size="8.5" font-weight="600" fill="rgba(60, 36, 21, 0.6)" stroke="none" text-anchor="middle">+ Profile 1</text>
  <text x="97" y="95" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.5)" stroke="none" text-anchor="middle">Select from directory</text>
  
  <rect x="195" y="30" width="135" height="110" rx="4" fill="rgba(60, 36, 21, 0.03)" stroke-width="1.2" stroke-dasharray="3 3"/>
  <text x="262" y="80" font-family="Inter, sans-serif" font-size="8.5" font-weight="600" fill="rgba(60, 36, 21, 0.6)" stroke="none" text-anchor="middle">+ Profile 2</text>
  <text x="262" y="95" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.5)" stroke="none" text-anchor="middle">Select from directory</text>
  
  <!-- Central Compass Divider -->
  <line x1="180" y1="40" x2="180" y2="130" stroke-width="1" stroke-dasharray="2 2"/>
  <circle cx="180" cy="85" r="8" fill="#DDD9CE" stroke-width="1.2"/>
  <text x="180" y="88" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">VS</text>
  <text x="180" y="160" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">SELECT UP TO 2 PROFESSIONALS TO COMPARE</text>
`, 360, 180);

// 10. COMPARISON MISSING (Specification sheet pending)
const comparisonMissing = svgWrap(`
  <rect x="50" y="30" width="260" height="150" rx="4" fill="#DDD9CE" stroke-width="1.5"/>
  <line x1="50" y1="65" x2="310" y2="65" stroke-width="1.2"/>
  <text x="65" y="52" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none">ARCHITECTURAL SPECIFICATION COMPARISON</text>
  <!-- Table Mockup Lines -->
  <line x1="160" y1="65" x2="160" y2="180" stroke-width="1"/>
  <line x1="235" y1="65" x2="235" y2="180" stroke-width="1"/>
  <text x="105" y="88" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.7)" stroke="none">Practice Years</text>
  <text x="195" y="88" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">8 Years</text>
  <text x="272" y="88" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">6 Years</text>
  
  <text x="105" y="115" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.7)" stroke="none">COA Registry</text>
  <text x="195" y="115" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Verified</text>
  <text x="272" y="115" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Verified</text>
  
  <text x="105" y="142" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.7)" stroke="none">30 Min Fee</text>
  <text x="195" y="142" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">₹1,400</text>
  <text x="272" y="142" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">₹1,250</text>
  <text x="180" y="202" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Side-by-side specifications confirmed upfront</text>
`, 360, 220);

// 11. PROFILE PROCESS DIAGRAM (3-Stage design lifecycle)
const profileProcessDiagram = svgWrap(`
  <text x="270" y="35" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">PRACTICE CONSULTATION &amp; DESIGN LIFECYCLE</text>
  <!-- Step 1: Brief & Zoning -->
  <rect x="40" y="55" width="130" height="95" rx="4" fill="#DDD9CE" stroke-width="1.4"/>
  <text x="105" y="78" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">01 · BRIEF &amp; ZONING</text>
  <line x1="55" y1="85" x2="155" y2="85" stroke-width="0.8"/>
  <text x="105" y="102" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">15/30m Video Session</text>
  <text x="105" y="116" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">FAR &amp; Bylaw Check</text>
  <text x="105" y="130" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Upfront Fee Clear</text>
  <!-- Connector Arrow 1 -->
  <line x1="175" y1="102" x2="195" y2="102" stroke-width="1.5"/>
  <polygon points="195,99 202,102 195,105" fill="#3C2415"/>
  <!-- Step 2: Concept & Layout -->
  <rect x="205" y="55" width="130" height="95" rx="4" fill="rgba(60, 36, 21, 0.05)" stroke-width="1.4"/>
  <text x="270" y="78" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">02 · CONCEPT &amp; PLANS</text>
  <line x1="220" y1="85" x2="320" y2="85" stroke-width="0.8"/>
  <text x="270" y="102" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Spatial Floor Plans</text>
  <text x="270" y="116" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Material Selection</text>
  <text x="270" y="130" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Client Feedback Loop</text>
  <!-- Connector Arrow 2 -->
  <line x1="340" y1="102" x2="360" y2="102" stroke-width="1.5"/>
  <polygon points="360,99 367,102 360,105" fill="#3C2415"/>
  <!-- Step 3: Sanction & Build -->
  <rect x="370" y="55" width="130" height="95" rx="4" fill="#DDD9CE" stroke-width="1.4"/>
  <text x="435" y="78" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">03 · SANCTION &amp; SITE</text>
  <line x1="385" y1="85" x2="485" y2="85" stroke-width="0.8"/>
  <text x="435" y="102" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">MCD Sanction Set</text>
  <text x="435" y="116" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Structural Coordination</text>
  <text x="435" y="130" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Site Advisory</text>
`, 540, 180);

// 12. ONBOARDING STEP 1 - ACCOUNT (Architect registration desk)
const onboardingAccount = svgWrap(`
  <text x="180" y="35" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1">STEP 01 · PRACTITIONER ACCOUNT</text>
  <!-- Architect Drafting Table & Ledger -->
  <rect x="60" y="60" width="240" height="100" fill="rgba(60, 36, 21, 0.04)" stroke-width="1.4" rx="3"/>
  <rect x="90" y="80" width="80" height="60" fill="#DDD9CE" stroke-width="1.2"/>
  <line x1="100" y1="95" x2="160" y2="95" stroke-width="1"/>
  <line x1="100" y1="108" x2="150" y2="108" stroke-width="1"/>
  <line x1="100" y1="121" x2="140" y2="121" stroke-width="1"/>
  <!-- Pen & Drafting Compass -->
  <line x1="200" y1="80" x2="225" y2="135" stroke-width="1.8"/>
  <line x1="200" y1="80" x2="205" y2="140" stroke-width="1.8"/>
  <circle cx="200" cy="80" r="3" fill="#3C2415"/>
  <text x="180" y="180" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Personal credentials &amp; contact verification</text>
`, 360, 200);

// 13. ONBOARDING STEP 2 - PRACTICE (Studio profile & specializations)
const onboardingPractice = svgWrap(`
  <text x="180" y="35" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1">STEP 02 · STUDIO &amp; PRACTICE</text>
  <!-- Studio Facade & Discipline Plaque -->
  <polygon points="180,60 270,95 90,95" fill="rgba(60, 36, 21, 0.08)" stroke-width="1.4"/>
  <rect x="100" y="95" width="160" height="65" fill="#DDD9CE" stroke-width="1.4"/>
  <rect x="120" y="110" width="120" height="30" fill="rgba(60, 36, 21, 0.06)" stroke-width="1"/>
  <text x="180" y="125" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">DELHI NCR PRACTICE</text>
  <text x="180" y="134" font-family="Inter, sans-serif" font-size="7" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Residential · Interiors · Vastu</text>
  <text x="180" y="180" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Years in practice &amp; typology focus</text>
`, 360, 200);

// 14. ONBOARDING STEP 3 - CREDENTIALS (COA upload)
const onboardingCredentials = svgWrap(`
  <text x="180" y="35" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1">STEP 03 · CREDENTIAL VERIFICATION</text>
  <rect x="90" y="60" width="180" height="100" fill="#DDD9CE" stroke-width="1.5" rx="3"/>
  <text x="180" y="80" font-family="Playfair Display, serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">Council of Architecture</text>
  <line x1="110" y1="88" x2="250" y2="88" stroke-width="0.8"/>
  <text x="180" y="105" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Reg. CA/2026/XXXXX</text>
  <circle cx="180" cy="132" r="14" fill="rgba(60, 36, 21, 0.08)" stroke-width="1.2"/>
  <path d="M174,132 L178,136 L187,128" stroke-width="1.5"/>
  <text x="180" y="180" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Architects Act 1972 statutory registry check</text>
`, 360, 200);

// 15. ONBOARDING STEP 4 - PORTFOLIO (Drawing board & photo frames)
const onboardingPortfolio = svgWrap(`
  <text x="180" y="35" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1">STEP 04 · PORTFOLIO SETUP</text>
  <rect x="70" y="60" width="105" height="75" fill="rgba(60, 36, 21, 0.05)" stroke-width="1.2" rx="3"/>
  <polygon points="85,115 120,80 155,115" fill="#DDD9CE" stroke-width="1"/>
  <circle cx="100" cy="85" r="5" fill="#3C2415"/>
  <rect x="185" y="60" width="105" height="75" fill="#DDD9CE" stroke-width="1.2" rx="3"/>
  <line x1="195" y1="80" x2="275" y2="80" stroke-width="1" stroke-dasharray="2 2"/>
  <line x1="195" y1="100" x2="275" y2="100" stroke-width="1" stroke-dasharray="2 2"/>
  <rect x="210" y="88" width="55" height="35" stroke-width="1"/>
  <text x="180" y="160" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Drawings, elevations &amp; built photography</text>
  <text x="180" y="175" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Monograph presentation for real projects</text>
`, 360, 200);

// 16. ONBOARDING STEP 5 - REVIEW (Profile inspection desk)
const onboardingReview = svgWrap(`
  <text x="180" y="35" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1">STEP 05 · PROFILE PREVIEW</text>
  <rect x="80" y="55" width="200" height="110" fill="#DDD9CE" stroke-width="1.5" rx="4"/>
  <rect x="90" y="65" width="30" height="30" fill="rgba(60, 36, 21, 0.1)" stroke-width="1"/>
  <text x="130" y="78" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none">Studio Aakar</text>
  <text x="130" y="90" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.7)" stroke="none">Architect · Delhi NCR</text>
  <rect x="90" y="105" width="180" height="20" fill="#3C2415" rx="3"/>
  <text x="180" y="118" font-family="Inter, sans-serif" font-size="7.5" font-weight="700" fill="#DDD9CE" stroke="none" text-anchor="middle">STATUS: VERIFICATION PENDING</text>
  <text x="180" y="145" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">You keep 85% of each consultation fee</text>
  <text x="180" y="180" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Review entries before formal submission</text>
`, 360, 200);

// 17. ONBOARDING SUCCESS (Application submitted confirmation)
const onboardingSuccess = svgWrap(`
  <circle cx="180" cy="85" r="32" fill="rgba(60, 36, 21, 0.08)" stroke-width="2"/>
  <circle cx="180" cy="85" r="26" fill="#DDD9CE" stroke-width="1.2"/>
  <path d="M170,85 L177,92 L192,77" stroke-width="2.5"/>
  <text x="180" y="140" font-family="Playfair Display, serif" font-size="13" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">Application Received</text>
  <text x="180" y="160" font-family="Inter, sans-serif" font-size="8.5" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">COA Registry Verification In Progress</text>
  <text x="180" y="175" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Profiles are reviewed privately against statutory records.</text>
  <text x="180" y="188" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">You will be notified once your monograph is ready.</text>
`, 360, 220);

// 18. PORTFOLIO EMPTY (Clean blueprint drafting board)
const portfolioEmpty = svgWrap(`
  <rect x="70" y="50" width="260" height="150" fill="rgba(60, 36, 21, 0.04)" stroke-width="1.4" rx="4"/>
  <rect x="90" y="70" width="220" height="110" fill="none" stroke-width="1.2" stroke-dasharray="3 3"/>
  <text x="200" y="115" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">NO PORTFOLIO PROJECTS ADDED YET</text>
  <text x="200" y="132" font-family="Inter, sans-serif" font-size="8.5" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Showcase your completed residential projects, drawings and elevations.</text>
  <circle cx="200" cy="155" r="12" fill="#3C2415"/>
  <text x="200" y="159" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#DDD9CE" stroke="none" text-anchor="middle">+</text>
  <text x="200" y="225" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.6)" stroke="none" text-anchor="middle">Add at least one project to make your profile visible</text>
`, 400, 260);

// 19. AUTH GATEWAY (Two-Door Classical Architectural Portal)
const authGateway = svgWrap(`
  <text x="240" y="45" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">TWO DOORS · ONE PLATFORM</text>
  <line x1="160" y1="52" x2="320" y2="52" stroke-width="0.8"/>
  <!-- Classical Architectural Archway Portal -->
  <path d="M120,290 L120,150 Q240,70 360,150 L360,290" fill="rgba(60, 36, 21, 0.05)" stroke-width="2"/>
  <path d="M140,290 L140,160 Q240,95 340,160 L340,290" fill="#DDD9CE" stroke-width="1.4"/>
  <!-- Door 1: Clients -->
  <rect x="155" y="170" width="75" height="120" fill="rgba(60, 36, 21, 0.06)" stroke-width="1.4"/>
  <text x="192" y="220" font-family="Playfair Display, serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">DOOR 01</text>
  <text x="192" y="235" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">For Clients</text>
  <circle cx="218" cy="230" r="2.5" fill="#3C2415"/>
  <!-- Door 2: Professionals -->
  <rect x="250" y="170" width="75" height="120" fill="rgba(60, 36, 21, 0.06)" stroke-width="1.4"/>
  <text x="287" y="220" font-family="Playfair Display, serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">DOOR 02</text>
  <text x="287" y="235" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">For Professionals</text>
  <circle cx="262" cy="230" r="2.5" fill="#3C2415"/>
  <!-- Foundation Line -->
  <line x1="100" y1="290" x2="380" y2="290" stroke-width="2.5"/>
  <line x1="80" y1="296" x2="400" y2="296" stroke-width="1"/>
  <text x="240" y="318" font-family="Inter, sans-serif" font-size="8" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Architecture · Interior Design · Vastu Consultation</text>
`, 480, 340);

// 20. STATE - UPLOAD ERROR (Drawing file interrupted)
const stateUploadError = svgWrap(`
  <rect x="80" y="40" width="160" height="110" fill="#DDD9CE" stroke-width="1.5" rx="4"/>
  <line x1="80" y1="70" x2="240" y2="70" stroke-width="1"/>
  <!-- Alert Triangle -->
  <polygon points="160,85 175,115 145,115" fill="none" stroke-width="1.8"/>
  <line x1="160" y1="95" x2="160" y2="105" stroke-width="1.8"/>
  <circle cx="160" cy="110" r="1" fill="#3C2415"/>
  <text x="160" y="135" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">UPLOAD INTERRUPTED</text>
  <text x="160" y="170" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Connection dropped · Retry upload</text>
`, 320, 200);

// 21. STATE - CORRECTION NEEDED (COA renewal document check)
const stateCorrectionNeeded = svgWrap(`
  <rect x="70" y="35" width="180" height="120" fill="#DDD9CE" stroke-width="1.5" rx="4"/>
  <text x="160" y="60" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">COA DOCUMENT AUDIT</text>
  <line x1="90" y1="70" x2="230" y2="70" stroke-width="0.8"/>
  <!-- Annotation flag -->
  <rect x="95" y="80" width="130" height="25" fill="rgba(60, 36, 21, 0.08)" stroke-width="1"/>
  <text x="160" y="93" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">RENEWAL RECEIPT REQUIRED</text>
  <text x="160" y="101" font-family="Inter, sans-serif" font-size="6.5" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">2026 Endorsement missing</text>
  <text x="160" y="130" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Please re-upload current COA certificate</text>
  <text x="160" y="175" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Input preserved in current session</text>
`, 320, 200);

// 22. STATE - SLOT UNAVAILABLE (Consultation timeslot reserved)
const stateSlotUnavailable = svgWrap(`
  <rect x="70" y="35" width="180" height="120" fill="#DDD9CE" stroke-width="1.5" rx="4"/>
  <text x="160" y="60" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">CONSULTATION SCHEDULE</text>
  <line x1="90" y1="70" x2="230" y2="70" stroke-width="0.8"/>
  <!-- Crossed Slot Box -->
  <rect x="95" y="85" width="130" height="30" fill="rgba(60, 36, 21, 0.08)" stroke-width="1.2"/>
  <line x1="95" y1="85" x2="225" y2="115" stroke="rgba(60, 36, 21, 0.3)" stroke-width="1"/>
  <text x="160" y="103" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">11:30 AM · RESERVED</text>
  <text x="160" y="140" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Please choose an available slot</text>
  <text x="160" y="175" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">Alternative slots available: 02:00 PM</text>
`, 320, 200);

// 23. STATE - NOT FOUND 404 (Isometric perspective architectural void)
const stateNotFound = svgWrap(`
  <text x="210" y="45" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">ERROR 404 · ELEVATION NOT FOUND</text>
  <line x1="130" y1="52" x2="290" y2="52" stroke-width="0.8"/>
  <!-- Isometric Staircase Leading to Architectural Opening -->
  <!-- Step 1 -->
  <polygon points="120,230 170,205 210,225 160,250" fill="#DDD9CE" stroke-width="1.5"/>
  <polygon points="160,250 210,225 210,240 160,265" fill="#3C2415" stroke-width="1.5"/>
  <!-- Step 2 -->
  <polygon points="150,195 200,170 240,190 190,215" fill="#DDD9CE" stroke-width="1.5"/>
  <polygon points="190,215 240,190 240,205 190,230" fill="#3C2415" stroke-width="1.5"/>
  <!-- Step 3 -->
  <polygon points="180,160 230,135 270,155 220,180" fill="#DDD9CE" stroke-width="1.5"/>
  <polygon points="220,180 270,155 270,170 220,195" fill="#3C2415" stroke-width="1.5"/>
  <!-- Open Portal Archway into Sky -->
  <path d="M250,190 L250,90 Q290,60 330,90 L330,190" fill="rgba(60, 36, 21, 0.05)" stroke-width="2"/>
  <line x1="240" y1="190" x2="340" y2="190" stroke-width="2"/>
  <text x="210" y="240" font-family="Playfair Display, serif" font-size="28" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">404</text>
  <text x="210" y="260" font-family="Inter, sans-serif" font-size="8.5" fill="rgba(60, 36, 21, 0.75)" stroke="none" text-anchor="middle">The requested path does not exist. Choose either door to continue.</text>
`, 420, 280);

const files = {
  'client-how-find.svg': clientHowFind,
  'client-how-compare.svg': clientHowCompare,
  'client-how-evaluate.svg': clientHowEvaluate,
  'client-how-book.svg': clientHowBook,
  'client-planner-scope.svg': clientPlannerScope,
  'client-payment-escrow.svg': clientPaymentEscrow,
  'empty-search.svg': emptySearch,
  'discovery-aerial.svg': discoveryAerial,
  'comparison-empty.svg': comparisonEmpty,
  'comparison-missing.svg': comparisonMissing,
  'profile-process-diagram.svg': profileProcessDiagram,
  'onboarding-account.svg': onboardingAccount,
  'onboarding-practice.svg': onboardingPractice,
  'onboarding-credentials.svg': onboardingCredentials,
  'onboarding-portfolio.svg': onboardingPortfolio,
  'onboarding-review.svg': onboardingReview,
  'onboarding-success.svg': onboardingSuccess,
  'portfolio-empty.svg': portfolioEmpty,
  'auth-gateway.svg': authGateway,
  'state-upload-error.svg': stateUploadError,
  'state-correction-needed.svg': stateCorrectionNeeded,
  'state-slot-unavailable.svg': stateSlotUnavailable,
  'state-not-found.svg': stateNotFound
};

console.log(`Generating ${Object.keys(files).length} architectural SVG illustrations into public/assets/...`);
for (const [name, content] of Object.entries(files)) {
  writeFileSync(resolve(assetsDir, name), content.trim() + '\n', 'utf8');
  console.log(`✓ Generated ${name}`);
}
console.log('SVG generation complete!');

