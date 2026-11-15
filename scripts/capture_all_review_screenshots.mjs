import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const reviewDir = 'C:\\Users\\TNEX\\OneDrive\\Desktop\\vastoco\\REVIEW_SCREENSHOTS';
const docsScreenshots = resolve(root, 'docs', 'screenshots');

mkdirSync(reviewDir, { recursive: true });
mkdirSync(docsScreenshots, { recursive: true });

const captures = [
  {
    name: '01_landing_desktop_1440px.png',
    url: 'http://localhost:4173/',
    width: 1440,
    height: 960
  },
  {
    name: '02_landing_mobile_390px.png',
    url: 'http://localhost:4173/',
    width: 390,
    height: 844
  },
  {
    name: '03_client_homepage_desktop_1440px.png',
    url: 'http://localhost:4173/clients',
    width: 1440,
    height: 960
  },
  {
    name: '04_client_homepage_mobile_390px.png',
    url: 'http://localhost:4173/clients',
    width: 390,
    height: 844
  },
  {
    name: '05_professional_homepage_desktop_1440px.png',
    url: 'http://localhost:4173/professionals',
    width: 1440,
    height: 960
  },
  {
    name: '06_professional_homepage_mobile_390px.png',
    url: 'http://localhost:4173/professionals',
    width: 390,
    height: 844
  },
  {
    name: '07_journey_editorial_rows.png',
    url: 'http://localhost:4173/professionals#journey',
    width: 1440,
    height: 1200
  },
  {
    name: '08_benefits_editorial_rows.png',
    url: 'http://localhost:4173/professionals#benefits',
    width: 1440,
    height: 1200
  },
  {
    name: '09_interactive_verification_tabs.png',
    url: 'http://localhost:4173/professionals#verification',
    width: 1440,
    height: 960
  },
  {
    name: '10_comparison_tray_dock.png',
    url: 'http://localhost:4173/clients#directory',
    width: 1440,
    height: 960
  },
  {
    name: '11_comparison_dialog_desktop_1440px.png',
    url: 'http://localhost:4173/clients#directory',
    width: 1440,
    height: 960
  },
  {
    name: '12_comparison_dialog_mobile_390px.png',
    url: 'http://localhost:4173/clients#directory',
    width: 390,
    height: 844
  },
  {
    name: '13_explore_directory_desktop_1440px.png',
    url: 'http://localhost:4173/clients/explore',
    width: 1440,
    height: 960
  },
  {
    name: '14_explore_directory_mobile_390px.png',
    url: 'http://localhost:4173/clients/explore',
    width: 390,
    height: 844
  },
  {
    name: '15_profile_monograph_desktop_1440px.png',
    url: 'http://localhost:4173/clients/professional?id=sample-architect',
    width: 1440,
    height: 960
  },
  {
    name: '16_booking_studio_desktop_1440px.png',
    url: 'http://localhost:4173/clients/booking?pro=sample-architect',
    width: 1440,
    height: 960
  },
  {
    name: '17_onboarding_wizard_desktop_1440px.png',
    url: 'http://localhost:4173/professionals/join',
    width: 1440,
    height: 960
  },
  {
    name: '18_auth_signin_desktop_1440px.png',
    url: 'http://localhost:4173/signin',
    width: 1440,
    height: 960
  },
  {
    name: '19_auth_signup_desktop_1440px.png',
    url: 'http://localhost:4173/signup',
    width: 1440,
    height: 960
  },
  {
    name: '20_error_404_desktop_1440px.png',
    url: 'http://localhost:4173/not-found',
    width: 1440,
    height: 960
  }
];

console.log('Capturing 20 review screenshots using Google Chrome headless...');

for (const c of captures) {
  const outReview = resolve(reviewDir, c.name);
  const outDoc = resolve(docsScreenshots, c.name);
  try {
    execFileSync(chrome, [
      '--headless=new',
      `--screenshot=${outReview}`,
      `--window-size=${c.width},${c.height}`,
      '--hide-scrollbars',
      '--virtual-time-budget=2000',
      c.url
    ]);
    const size = existsSync(outReview) ? statSync(outReview).size : 0;
    console.log(`[PASS] ${c.name} (${(size / 1024).toFixed(1)} KB)`);
    // Copy to docs/screenshots as well
    execFileSync('cmd.exe', ['/c', 'copy', '/Y', outReview, outDoc]);
  } catch (err) {
    console.error(`[FAIL] ${c.name}: ${err.message}`);
  }
}

// Sync primary screenshots for PDF handover
const aliases = [
  ['01_landing_desktop_1440px.png', 'gateway_1440.png'],
  ['02_landing_mobile_390px.png', 'gateway_390.png'],
  ['03_client_homepage_desktop_1440px.png', 'clients_1440.png'],
  ['04_client_homepage_mobile_390px.png', 'clients_390.png'],
  ['05_professional_homepage_desktop_1440px.png', 'professionals_1440.png'],
  ['06_professional_homepage_mobile_390px.png', 'professionals_390.png'],
];
for (const [src, dst] of aliases) {
  const srcFile = resolve(reviewDir, src);
  const dstFile = resolve(docsScreenshots, dst);
  if (existsSync(srcFile)) {
    execFileSync('cmd.exe', ['/c', 'copy', '/Y', srcFile, dstFile]);
  }
}

console.log('Review screenshot capture finished!');

