import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const assetsDir = resolve(root, 'public', 'assets');

// Helper to wrap in standard SVG
function svgWrap(content, w = 520, h = 360) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" fill="none" stroke="#3C2415" stroke-linecap="round" stroke-linejoin="round">
  <rect width="${w}" height="${h}" fill="#DDD9CE" rx="8" stroke="rgba(60, 36, 21, 0.25)" stroke-width="1"/>
  <!-- Architectural Drafting Grid -->
  <g stroke="rgba(60, 36, 21, 0.06)" stroke-width="0.75">
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

// 1. JOURNEY - UNDERSTAND (Architect Workspace & Practice Setup)
const journeyUnderstand = svgWrap(`
  <!-- Desk Surface -->
  <rect x="70" y="240" width="380" height="70" fill="rgba(60, 36, 21, 0.04)" stroke-width="1.5"/>
  <!-- Drafting Tabletop Angled -->
  <polygon points="120,240 380,240 360,110 140,110" fill="#DDD9CE" stroke-width="1.8"/>
  <line x1="140" y1="110" x2="360" y2="110" stroke-width="1.8"/>
  <!-- Blueprint Sheets on Desk -->
  <rect x="160" y="130" width="180" height="90" fill="rgba(60, 36, 21, 0.05)" stroke-width="1.2" stroke-dasharray="3 3"/>
  <!-- Architectural Floorplan Lines -->
  <rect x="180" y="145" width="65" height="60" stroke-width="1.4"/>
  <rect x="255" y="145" width="65" height="35" stroke-width="1.4"/>
  <rect x="255" y="185" width="45" height="20" stroke-width="1.4"/>
  <line x1="210" y1="145" x2="210" y2="165" stroke-width="1"/>
  <!-- T-Square Ruler -->
  <line x1="100" y1="170" x2="400" y2="170" stroke-width="2.2"/>
  <line x1="100" y1="150" x2="100" y2="210" stroke-width="3"/>
  <!-- Set Square (Triangle) -->
  <polygon points="340,210 390,210 390,140" fill="rgba(60, 36, 21, 0.08)" stroke-width="1.4"/>
  <polygon points="355,200 380,200 380,165" stroke-width="0.8"/>
  <!-- Laptop on side -->
  <rect x="80" y="200" width="60" height="40" fill="#DDD9CE" stroke-width="1.4" rx="2"/>
  <polygon points="75,240 145,240 140,243 80,243" fill="#3C2415"/>
  <line x1="90" y1="212" x2="130" y2="212" stroke-width="1"/>
  <line x1="90" y1="220" x2="120" y2="220" stroke-width="1"/>
  <!-- Coffee Cup / Pen Holder -->
  <rect x="400" y="220" width="22" height="25" fill="#DDD9CE" stroke-width="1.4" rx="3"/>
  <line x1="405" y1="220" x2="408" y2="205" stroke-width="1.2"/>
  <line x1="412" y1="220" x2="416" y2="200" stroke-width="1.2"/>
  <!-- Dimension labels -->
  <text x="250" y="80" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">01 · STUDIO DISCOVERY &amp; SETUP</text>
  <line x1="190" y1="90" x2="310" y2="90" stroke-width="0.8"/>
`);

// 2. JOURNEY - TRUST (Verification & Credentials Checking)
const journeyTrust = svgWrap(`
  <!-- Central Certificate / Verification Dossier -->
  <rect x="140" y="70" width="240" height="220" fill="#DDD9CE" stroke-width="1.8" rx="4"/>
  <rect x="152" y="82" width="216" height="196" fill="rgba(60, 36, 21, 0.03)" stroke-width="0.8"/>
  <!-- Certificate Header Linework -->
  <line x1="175" y1="105" x2="305" y2="105" stroke-width="2"/>
  <line x1="200" y1="116" x2="280" y2="116" stroke-width="1"/>
  <!-- Stylized Government / Institutional Herald -->
  <circle cx="240" cy="145" r="18" fill="rgba(60, 36, 21, 0.06)" stroke-width="1.4"/>
  <polygon points="240,132 245,142 255,145 247,152 249,162 240,156 231,162 233,152 225,145 235,142" fill="#3C2415" stroke="none"/>
  <!-- Document Lines -->
  <line x1="175" y1="180" x2="305" y2="180" stroke-width="1.2"/>
  <line x1="175" y1="195" x2="285" y2="195" stroke-width="1"/>
  <line x1="175" y1="210" x2="295" y2="210" stroke-width="1"/>
  <!-- Council of Architecture Register Check Seal -->
  <g transform="translate(290, 210)">
    <circle cx="28" cy="28" r="32" fill="#DDD9CE" stroke-width="1.8"/>
    <circle cx="28" cy="28" r="28" stroke-width="0.8" stroke-dasharray="2 2"/>
    <path d="M18 28 L25 35 L38 20" stroke-width="2.4" stroke="#3C2415"/>
    <text x="28" y="50" font-family="Inter, sans-serif" font-size="6" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">VERIFIED</text>
  </g>
  <!-- Architectural Drafting Compass Tool on Side -->
  <g transform="translate(85, 120)">
    <circle cx="20" cy="10" r="4" fill="#3C2415" stroke="none"/>
    <line x1="20" y1="10" x2="8" y2="120" stroke-width="2"/>
    <line x1="20" y1="10" x2="38" y2="105" stroke-width="2"/>
    <line x1="12" y1="65" x2="32" y2="60" stroke-width="1.2"/>
    <!-- Pencil point -->
    <polygon points="6,120 10,120 8,126" fill="#3C2415"/>
  </g>
  <!-- Verified Badge Label -->
  <text x="240" y="45" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">02 · CREDENTIAL AUDIT &amp; REGISTRATION</text>
  <line x1="170" y1="52" x2="310" y2="52" stroke-width="0.8"/>
`);

// 3. JOURNEY - SHOWCASE (Architectural Portfolio Spread)
const journeyShowcase = svgWrap(`
  <!-- Editorial Open Portfolio Book Spread -->
  <!-- Left Page -->
  <polygon points="80,90 255,100 255,280 80,265" fill="#DDD9CE" stroke-width="1.8"/>
  <!-- Right Page -->
  <polygon points="265,100 440,90 440,265 265,280" fill="#DDD9CE" stroke-width="1.8"/>
  <!-- Spine Depth -->
  <line x1="260" y1="100" x2="260" y2="280" stroke-width="2"/>
  <!-- Left Page: Villa Facade Drawing -->
  <rect x="100" y="115" width="135" height="95" fill="rgba(60, 36, 21, 0.05)" stroke-width="1.2"/>
  <!-- Architectural Elevation Lines inside Photo Box -->
  <polygon points="110,195 110,150 160,130 225,130 225,195" stroke-width="1.4"/>
  <line x1="160" y1="130" x2="160" y2="195" stroke-width="1"/>
  <line x1="130" y1="195" x2="130" y2="165" stroke-width="1.2"/>
  <rect x="180" y="150" width="30" height="25" stroke-width="1"/>
  <line x1="195" y1="150" x2="195" y2="175" stroke-width="0.8"/>
  <!-- Caption & Spec Lines -->
  <line x1="100" y1="225" x2="190" y2="225" stroke-width="1.6"/>
  <line x1="100" y1="237" x2="220" y2="237" stroke-width="0.9"/>
  <line x1="100" y1="247" x2="175" y2="247" stroke-width="0.9"/>
  <!-- Right Page: Floor Plan & Consultation Fee -->
  <rect x="285" y="115" width="135" height="85" fill="rgba(60, 36, 21, 0.03)" stroke-width="1.2"/>
  <rect x="300" y="125" width="50" height="40" stroke-width="1.2"/>
  <rect x="355" y="125" width="50" height="65" stroke-width="1.2"/>
  <rect x="300" y="170" width="50" height="20" stroke-width="1.2"/>
  <!-- Rate Card Plate -->
  <rect x="285" y="215" width="135" height="38" fill="rgba(60, 36, 21, 0.08)" stroke-width="1.2" rx="2"/>
  <text x="295" y="232" font-family="Playfair Display, serif" font-size="10" font-weight="700" fill="#3C2415" stroke="none">₹1,400 / 30 min</text>
  <text x="295" y="244" font-family="Inter, sans-serif" font-size="7" font-weight="500" fill="rgba(60, 36, 21, 0.7)" stroke="none">Direct Video Consultation</text>
  <!-- Header Title -->
  <text x="260" y="65" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">03 · EDITORIAL PORTFOLIO PRESENTATION</text>
  <line x1="170" y1="72" x2="350" y2="72" stroke-width="0.8"/>
`);

// 4. JOURNEY - JOIN (Onboarding, Document Submission & Go-Live)
const journeyJoin = svgWrap(`
  <!-- Stepper Bar at Top -->
  <g transform="translate(110, 80)">
    <line x1="20" y1="12" x2="280" y2="12" stroke-width="1.5" stroke="rgba(60, 36, 21, 0.3)"/>
    <line x1="20" y1="12" x2="210" y2="12" stroke-width="2.2" stroke="#3C2415"/>
    <circle cx="20" cy="12" r="10" fill="#3C2415"/>
    <text x="20" y="16" font-family="Inter, sans-serif" font-size="9" fill="#DDD9CE" stroke="none" text-anchor="middle" font-weight="700">1</text>
    <circle cx="110" cy="12" r="10" fill="#3C2415"/>
    <text x="110" y="16" font-family="Inter, sans-serif" font-size="9" fill="#DDD9CE" stroke="none" text-anchor="middle" font-weight="700">2</text>
    <circle cx="200" cy="12" r="10" fill="#3C2415"/>
    <text x="200" y="16" font-family="Inter, sans-serif" font-size="9" fill="#DDD9CE" stroke="none" text-anchor="middle" font-weight="700">3</text>
    <circle cx="280" cy="12" r="10" fill="#DDD9CE" stroke-width="1.8"/>
    <text x="280" y="16" font-family="Inter, sans-serif" font-size="9" fill="#3C2415" stroke="none" text-anchor="middle" font-weight="700">4</text>
  </g>
  <!-- Form Modal Screen -->
  <rect x="130" y="125" width="260" height="180" fill="#DDD9CE" stroke-width="1.8" rx="6"/>
  <!-- Header of Form -->
  <line x1="130" y1="155" x2="390" y2="155" stroke-width="1"/>
  <rect x="150" y="137" width="90" height="8" fill="#3C2415" stroke="none" rx="2"/>
  <!-- Field 1: COA Reg Number -->
  <rect x="150" y="170" width="105" height="24" fill="rgba(60, 36, 21, 0.04)" stroke-width="1.2" rx="3"/>
  <text x="155" y="185" font-family="monospace" font-size="8" fill="#3C2415" stroke="none">CA/2018/98421</text>
  <!-- Field 2: Practice City -->
  <rect x="265" y="170" width="105" height="24" fill="rgba(60, 36, 21, 0.04)" stroke-width="1.2" rx="3"/>
  <text x="270" y="185" font-family="Inter, sans-serif" font-size="8" fill="#3C2415" stroke="none">Delhi NCR</text>
  <!-- Upload Dropzone -->
  <rect x="150" y="205" width="220" height="50" fill="rgba(60, 36, 21, 0.02)" stroke-width="1.2" stroke-dasharray="4 4" rx="4"/>
  <path d="M260 225 L260 240 M253 232 L260 225 L267 232" stroke-width="1.6"/>
  <text x="260" y="249" font-family="Inter, sans-serif" font-size="7" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Upload COA Certificate (PDF or JPG)</text>
  <!-- Submit Button -->
  <rect x="270" y="268" width="100" height="24" fill="#3C2415" rx="3"/>
  <text x="320" y="283" font-family="Inter, sans-serif" font-size="8.5" font-weight="600" fill="#DDD9CE" stroke="none" text-anchor="middle">Publish Profile →</text>
  <!-- Title -->
  <text x="260" y="45" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">04 · REGISTRATION &amp; PROFILE PUBLISHING</text>
  <line x1="170" y1="52" x2="350" y2="52" stroke-width="0.8"/>
`);

// 5. BENEFIT 1 - PAID CONSULTATIONS (15, 30, 45 min video interface)
const benefitConsultations = svgWrap(`
  <!-- Video Interface Mock Frame -->
  <rect x="90" y="80" width="340" height="220" fill="#DDD9CE" stroke-width="1.8" rx="8"/>
  <line x1="90" y1="110" x2="430" y2="110" stroke-width="1"/>
  <!-- Window Dots -->
  <circle cx="106" cy="95" r="3.5" fill="#3C2415"/>
  <circle cx="118" cy="95" r="3.5" fill="rgba(60, 36, 21, 0.4)"/>
  <circle cx="130" cy="95" r="3.5" fill="rgba(60, 36, 21, 0.4)"/>
  <text x="260" y="98" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Vastoco Secure Video Advisory · 30 Min Session</text>
  <!-- Client Video View (Split Left) -->
  <rect x="105" y="125" width="150" height="120" fill="rgba(60, 36, 21, 0.05)" stroke-width="1.2" rx="4"/>
  <circle cx="180" cy="165" r="22" stroke-width="1.4" fill="#DDD9CE"/>
  <path d="M160 215 C160 195, 200 195, 200 215" stroke-width="1.4" fill="#DDD9CE"/>
  <!-- Architect Shared Screen (Split Right) -->
  <rect x="265" y="125" width="150" height="120" fill="#DDD9CE" stroke-width="1.2" rx="4"/>
  <!-- Axonometric Drawing On Shared Screen -->
  <polygon points="340,140 390,160 340,180 290,160" stroke-width="1.4" fill="rgba(60, 36, 21, 0.06)"/>
  <polygon points="290,160 340,180 340,215 290,195" stroke-width="1.4"/>
  <polygon points="340,180 390,160 390,195 340,215" stroke-width="1.4"/>
  <!-- 85% Fee Retention Badge Bottom Overlay -->
  <rect x="160" y="260" width="200" height="30" fill="#3C2415" rx="4"/>
  <text x="260" y="278" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#DDD9CE" stroke="none" text-anchor="middle">85% Earned · 15% Platform Fee Only</text>
  <text x="260" y="55" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">PAID CONSULTATIONS · 15 / 30 / 45 MIN</text>
  <line x1="170" y1="62" x2="350" y2="62" stroke-width="0.8"/>
`);

// 6. BENEFIT 2 - VERIFIED PUBLIC PROFILE (Badge, Portfolio & Credentials)
const benefitProfile = svgWrap(`
  <!-- Public Profile Card Frame -->
  <rect x="110" y="70" width="300" height="235" fill="#DDD9CE" stroke-width="1.8" rx="6"/>
  <!-- Banner Photo placeholder -->
  <rect x="110" y="70" width="300" height="65" fill="rgba(60, 36, 21, 0.06)" rx="6"/>
  <line x1="110" y1="135" x2="410" y2="135" stroke-width="1"/>
  <!-- Profile Avatar / Monogram -->
  <circle cx="160" cy="135" r="26" fill="#DDD9CE" stroke-width="2"/>
  <circle cx="160" cy="135" r="22" fill="#3C2415"/>
  <text x="160" y="141" font-family="Playfair Display, serif" font-size="14" font-weight="700" fill="#DDD9CE" stroke="none" text-anchor="middle">NK</text>
  <!-- Name & Verification Badge -->
  <text x="200" y="150" font-family="Playfair Display, serif" font-size="14" font-weight="700" fill="#3C2415" stroke="none">Naina Kapoor</text>
  <!-- COA Verified Pill -->
  <rect x="200" y="157" width="105" height="16" fill="rgba(60, 36, 21, 0.08)" stroke-width="1" rx="8"/>
  <circle cx="208" cy="165" r="4" fill="#3C2415"/>
  <text x="216" y="169" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">COA Reg. Verified</text>
  <!-- Discipline & Location -->
  <text x="135" y="192" font-family="Inter, sans-serif" font-size="8.5" fill="rgba(60, 36, 21, 0.8)" stroke="none">Architect · 8 Years Practice · Delhi NCR</text>
  <!-- 3 Portfolio Thumbnails -->
  <rect x="135" y="205" width="75" height="50" fill="rgba(60, 36, 21, 0.05)" stroke-width="1" rx="2"/>
  <rect x="220" y="205" width="75" height="50" fill="rgba(60, 36, 21, 0.05)" stroke-width="1" rx="2"/>
  <rect x="305" y="205" width="75" height="50" fill="rgba(60, 36, 21, 0.05)" stroke-width="1" rx="2"/>
  <!-- Rate Tag Bottom -->
  <rect x="135" y="265" width="245" height="26" fill="#3C2415" rx="3"/>
  <text x="257" y="281" font-family="Inter, sans-serif" font-size="8.5" font-weight="600" fill="#DDD9CE" stroke="none" text-anchor="middle">Book Advisory Session · From ₹750</text>
  <text x="260" y="45" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">VERIFIED PUBLIC IDENTITY &amp; PORTFOLIO</text>
  <line x1="160" y1="52" x2="360" y2="52" stroke-width="0.8"/>
`);

// 7. BENEFIT 3 - CLIENT BRIEFS (Scope, Budget & Timeline)
const benefitBriefs = svgWrap(`
  <!-- Document Clipboard / Project Brief Folder -->
  <rect x="120" y="75" width="280" height="230" fill="#DDD9CE" stroke-width="1.8" rx="4"/>
  <!-- Clip at Top -->
  <rect x="220" y="65" width="80" height="20" fill="#3C2415" rx="3"/>
  <circle cx="260" cy="75" r="4" fill="#DDD9CE"/>
  <!-- Brief Header -->
  <text x="145" y="112" font-family="Playfair Display, serif" font-size="12" font-weight="700" fill="#3C2415" stroke="none">Residential Project Brief</text>
  <text x="145" y="125" font-family="Inter, sans-serif" font-size="7.5" fill="rgba(60, 36, 21, 0.7)" stroke="none">Client: Vasant Vihar Villa Addition · Upfront Context</text>
  <line x1="145" y1="135" x2="375" y2="135" stroke-width="0.8"/>
  <!-- Three Clear Spec Blocks -->
  <!-- Block 1: Budget -->
  <rect x="145" y="148" width="65" height="42" fill="rgba(60, 36, 21, 0.05)" stroke-width="1" rx="3"/>
  <text x="152" y="162" font-family="Inter, sans-serif" font-size="6.5" font-weight="700" fill="rgba(60, 36, 21, 0.6)" stroke="none">BUDGET</text>
  <text x="152" y="178" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none">₹45L – 65L</text>
  <!-- Block 2: Scope -->
  <rect x="220" y="148" width="85" height="42" fill="rgba(60, 36, 21, 0.05)" stroke-width="1" rx="3"/>
  <text x="227" y="162" font-family="Inter, sans-serif" font-size="6.5" font-weight="700" fill="rgba(60, 36, 21, 0.6)" stroke="none">SCOPE</text>
  <text x="227" y="178" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none">G+2 Renovation</text>
  <!-- Block 3: Timeline -->
  <rect x="315" y="148" width="60" height="42" fill="rgba(60, 36, 21, 0.05)" stroke-width="1" rx="3"/>
  <text x="322" y="162" font-family="Inter, sans-serif" font-size="6.5" font-weight="700" fill="rgba(60, 36, 21, 0.6)" stroke="none">TIMELINE</text>
  <text x="322" y="178" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#3C2415" stroke="none">3–6 Months</text>
  <!-- Site Plan Sketch Outline -->
  <rect x="145" y="202" width="230" height="58" fill="rgba(60, 36, 21, 0.03)" stroke-width="1" rx="3"/>
  <polygon points="160,245 160,220 220,210 270,210 270,245" stroke-width="1.2"/>
  <line x1="220" y1="210" x2="220" y2="245" stroke-width="0.8"/>
  <text x="285" y="225" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">Existing Plot 350 sq.yd</text>
  <text x="285" y="238" font-family="Inter, sans-serif" font-size="7" fill="rgba(60, 36, 21, 0.7)" stroke="none">Floor drawings attached</text>
  <!-- Pre-call badge -->
  <rect x="145" y="270" width="230" height="22" fill="#3C2415" rx="3"/>
  <text x="260" y="284" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#DDD9CE" stroke="none" text-anchor="middle">Context Verified Prior to Paid Call</text>
  <text x="260" y="45" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">QUALIFIED CLIENT BRIEFS &amp; SCOPE</text>
  <line x1="170" y1="52" x2="350" y2="52" stroke-width="0.8"/>
`);

// 8. VERIFICATION TAB 1 - ARCHITECTS (COA Register & Qualification)
const verifyArchitect = svgWrap(`
  <!-- Architectural Building Elevation Sketch -->
  <g transform="translate(60, 90)">
    <polygon points="40,190 40,90 120,40 200,90 200,190" fill="rgba(60, 36, 21, 0.04)" stroke-width="1.8"/>
    <line x1="120" y1="40" x2="120" y2="190" stroke-width="1.2"/>
    <!-- Windows & Louvers -->
    <rect x="60" y="105" width="40" height="30" stroke-width="1.2"/>
    <line x1="80" y1="105" x2="80" y2="135" stroke-width="0.8"/>
    <rect x="140" y="105" width="40" height="30" stroke-width="1.2"/>
    <line x1="160" y1="105" x2="160" y2="135" stroke-width="0.8"/>
    <rect x="60" y="150" width="40" height="40" stroke-width="1.2"/>
    <rect x="140" y="150" width="40" height="40" stroke-width="1.2"/>
    <!-- Overhang detail -->
    <line x1="30" y1="90" x2="210" y2="90" stroke-width="2"/>
  </g>
  <!-- COA Registration Dossier Overlay -->
  <g transform="translate(260, 95)">
    <rect x="0" y="0" width="190" height="185" fill="#DDD9CE" stroke-width="1.8" rx="4"/>
    <rect x="12" y="12" width="166" height="30" fill="rgba(60, 36, 21, 0.08)" rx="2"/>
    <text x="95" y="27" font-family="Inter, sans-serif" font-size="7.5" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">COUNCIL OF ARCHITECTURE</text>
    <text x="95" y="37" font-family="Inter, sans-serif" font-size="6.5" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Architects Act 1972 Statutory Check</text>
    <line x1="12" y1="52" x2="178" y2="52" stroke-width="0.8"/>
    <!-- Document checklist ticks -->
    <path d="M20 70 L24 74 L32 66" stroke-width="1.6"/>
    <text x="40" y="72" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">COA License / Reg. No.</text>
    <path d="M20 95 L24 99 L32 91" stroke-width="1.6"/>
    <text x="40" y="97" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">College Degree Certificate</text>
    <path d="M20 120 L24 124 L32 116" stroke-width="1.6"/>
    <text x="40" y="122" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">Identity &amp; Practice Address</text>
    <!-- Verified Stamp -->
    <rect x="25" y="142" width="140" height="26" fill="#3C2415" rx="3"/>
    <text x="95" y="158" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#DDD9CE" stroke="none" text-anchor="middle">OFFICIAL REGISTER CHECK</text>
  </g>
  <text x="260" y="55" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">ARCHITECT VERIFICATION SPECIFICATION</text>
  <line x1="160" y1="62" x2="360" y2="62" stroke-width="0.8"/>
`);

// 9. VERIFICATION TAB 2 - INTERIOR DESIGNERS (Portfolio Audit & Certifications)
const verifyInterior = svgWrap(`
  <!-- Interior Perspective Sketch (Living room / Joinery) -->
  <g transform="translate(70, 90)">
    <!-- Room perspective lines -->
    <rect x="0" y="0" width="180" height="180" fill="rgba(60, 36, 21, 0.03)" stroke-width="1.8"/>
    <polygon points="30,30 150,30 150,150 30,150" fill="rgba(60, 36, 21, 0.05)" stroke-width="1"/>
    <line x1="0" y1="0" x2="30" y2="30" stroke-width="1.2"/>
    <line x1="180" y1="0" x2="150" y2="30" stroke-width="1.2"/>
    <line x1="0" y1="180" x2="30" y2="150" stroke-width="1.2"/>
    <line x1="180" y1="180" x2="150" y2="150" stroke-width="1.2"/>
    <!-- Bespoke Credenza / Joinery -->
    <rect x="45" y="95" width="90" height="45" fill="#DDD9CE" stroke-width="1.4"/>
    <line x1="90" y1="95" x2="90" y2="140" stroke-width="1"/>
    <!-- Pendant Lamp -->
    <line x1="90" y1="30" x2="90" y2="65" stroke-width="1"/>
    <polygon points="75,65 105,65 112,78 68,78" fill="#3C2415"/>
  </g>
  <!-- Material Palette & Certification Check Board -->
  <g transform="translate(270, 90)">
    <rect x="0" y="0" width="180" height="180" fill="#DDD9CE" stroke-width="1.8" rx="4"/>
    <text x="90" y="24" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">INTERIOR CREDENTIAL AUDIT</text>
    <line x1="15" y1="34" x2="165" y2="34" stroke-width="0.8"/>
    <!-- Checklist -->
    <path d="M20 52 L24 56 L32 48" stroke-width="1.6"/>
    <text x="40" y="54" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">Government Photo ID</text>
    <path d="M20 77 L24 81 L32 73" stroke-width="1.6"/>
    <text x="40" y="79" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">Interior Design Degree/Diploma</text>
    <path d="M20 102 L24 106 L32 98" stroke-width="1.6"/>
    <text x="40" y="104" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">Documented Portfolio Audit</text>
    <!-- Material Swatches Palette -->
    <rect x="20" y="125" width="40" height="35" fill="rgba(60, 36, 21, 0.15)" stroke-width="1" rx="2"/>
    <text x="40" y="145" font-family="Inter, sans-serif" font-size="6" fill="#3C2415" stroke="none" text-anchor="middle">Timber</text>
    <rect x="70" y="125" width="40" height="35" fill="rgba(60, 36, 21, 0.08)" stroke-width="1" rx="2"/>
    <text x="90" y="145" font-family="Inter, sans-serif" font-size="6" fill="#3C2415" stroke="none" text-anchor="middle">Stone</text>
    <rect x="120" y="125" width="40" height="35" fill="rgba(60, 36, 21, 0.04)" stroke-width="1" rx="2"/>
    <text x="140" y="145" font-family="Inter, sans-serif" font-size="6" fill="#3C2415" stroke="none" text-anchor="middle">Linen</text>
  </g>
  <text x="260" y="55" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">INTERIOR DESIGNER VERIFICATION</text>
  <line x1="160" y1="62" x2="360" y2="62" stroke-width="0.8"/>
`);

// 10. VERIFICATION TAB 3 - VASTU CONSULTANTS (Orientation Mandala & Spatial Alignments)
const verifyVastu = svgWrap(`
  <!-- Vastu Purusha / Cardinal Orientation Compass Mandala -->
  <g transform="translate(60, 85)">
    <!-- 9-Square Vastu Mandala -->
    <rect x="0" y="0" width="180" height="180" fill="rgba(60, 36, 21, 0.03)" stroke-width="1.8"/>
    <!-- Grid 3x3 -->
    <line x1="60" y1="0" x2="60" y2="180" stroke-width="1.2"/>
    <line x1="120" y1="0" x2="120" y2="180" stroke-width="1.2"/>
    <line x1="0" y1="60" x2="180" y2="60" stroke-width="1.2"/>
    <line x1="0" y1="120" x2="180" y2="120" stroke-width="1.2"/>
    <!-- Brahmasthan (Center) Highlight -->
    <rect x="60" y="60" width="60" height="60" fill="rgba(60, 36, 21, 0.08)" stroke-width="1"/>
    <circle cx="90" cy="90" r="18" fill="#DDD9CE" stroke-width="1.2"/>
    <text x="90" y="93" font-family="Inter, sans-serif" font-size="6.5" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">CENTER</text>
    <!-- Cardinal Directions -->
    <text x="90" y="16" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">N</text>
    <text x="150" y="16" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">NE (Water)</text>
    <text x="170" y="94" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">E</text>
    <text x="90" y="172" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">S</text>
    <text x="10" y="94" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">W</text>
  </g>
  <!-- Vastu Verification Checklist Panel -->
  <g transform="translate(265, 85)">
    <rect x="0" y="0" width="190" height="180" fill="#DDD9CE" stroke-width="1.8" rx="4"/>
    <text x="95" y="24" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#3C2415" stroke="none" text-anchor="middle">VASTU CONSULTANCY REVIEW</text>
    <line x1="15" y1="34" x2="175" y2="34" stroke-width="0.8"/>
    <!-- Checklist -->
    <path d="M20 55 L24 59 L32 51" stroke-width="1.6"/>
    <text x="40" y="57" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">Government Photo ID</text>
    <path d="M20 85 L24 89 L32 81" stroke-width="1.6"/>
    <text x="40" y="87" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">Vastu Shastra Certificate(s)</text>
    <path d="M20 115 L24 119 L32 111" stroke-width="1.6"/>
    <text x="40" y="117" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#3C2415" stroke="none">Degree or Diploma in Spatial Design</text>
    <!-- Privacy Notice Badge -->
    <rect x="15" y="138" width="160" height="28" fill="rgba(60, 36, 21, 0.06)" stroke-width="1" rx="3"/>
    <text x="95" y="150" font-family="Inter, sans-serif" font-size="6.5" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle">Credentials Private to Review Team</text>
    <text x="95" y="160" font-family="Inter, sans-serif" font-size="6" fill="rgba(60, 36, 21, 0.7)" stroke="none" text-anchor="middle">Self-declared details clearly labelled</text>
  </g>
  <text x="260" y="55" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#3C2415" stroke="none" text-anchor="middle" letter-spacing="1.5">VASTU CONSULTANT VERIFICATION</text>
  <line x1="160" y1="62" x2="360" y2="62" stroke-width="0.8"/>
`);

const files = [
  ['journey-understand.svg', journeyUnderstand],
  ['journey-trust.svg', journeyTrust],
  ['journey-showcase.svg', journeyShowcase],
  ['journey-join.svg', journeyJoin],
  ['benefit-consultations.svg', benefitConsultations],
  ['benefit-profile.svg', benefitProfile],
  ['benefit-briefs.svg', benefitBriefs],
  ['verify-architect.svg', verifyArchitect],
  ['verify-interior.svg', verifyInterior],
  ['verify-vastu.svg', verifyVastu]
];

for (const [name, content] of files) {
  const p = resolve(assetsDir, name);
  writeFileSync(p, content, 'utf-8');
  console.log(`Wrote ${name}`);
}

