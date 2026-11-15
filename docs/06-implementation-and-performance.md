# Implementation and performance notes

## Stack

- Semantic HTML5.
- CSS with custom properties and responsive media queries.
- Vanilla JavaScript ES modules.
- Native browser APIs for forms, `dialog`, object URLs and session storage.
- Node.js built-in HTTP server and file APIs for local serving and static build.
- No npm runtime/build dependencies.

This is an intentional choice for a frontend-only hackathon prototype. A component framework or animation library would increase setup and bundle cost without providing a necessary capability for the current scope.

## Project modules

| File | Responsibility |
|---|---|
| `index.html` | Document shell, fonts, metadata and app mount |
| `src/main.js` | Route rendering, event listeners and local prototype interactions |
| `src/pages.js` | Route page templates and content hierarchy |
| `src/components.js` | Shared navigation, footer, buttons and section intro |
| `src/icons.js` | Small inline SVG icon map |
| `src/data.js` | Categories, session lengths and illustrative profile placeholders |
| `src/utils.js` | Route resolution, role parsing, validation and HTML escaping |
| `src/styles.css` | Tokens, component styles, responsive and reduced-motion rules |
| `server.mjs` | Dependency-free static development server with route fallback |
| `scripts/build.mjs` | Copies the static site to `dist/` |

## Performance decisions

- No React runtime, UI component library, animation package or router package.
- Hero animation uses CSS `opacity` and `transform` only.
- Reduced motion disables the scene loop.
- The generated house illustration is stored as a WebP with alpha transparency.
- Additional illustration assets are SVGs.
- Below-the-fold images use `loading="lazy"`; lead art uses `fetchpriority="high"`.
- No large background video, WebGL scene or scroll animation.
- Font loading uses preconnect and a local fallback stack. If external font loading is unavailable, the page remains usable.

## Security and privacy boundaries

- No API endpoints or server-side data processing.
- No credentials, payments or uploaded image data are sent to a server.
- The professional setup draft uses `sessionStorage` only for non-password text fields in the active browser session. Uploaded file bytes are not persisted.
- Demo forms clearly state that no account, booking or payment is created.
- User-entered content is not inserted into HTML templates without escaping; profile review values are assigned through `textContent`.
- The dev server restricts path resolution to the project root and serves only GET/HEAD.

## Production upgrade path

Before production, connect a real backend for authentication, role permissions, professional verification, profile publication, booking inventory, secure payment, consultation links, review eligibility and file storage. Add real data contracts and server validation at every trust boundary. None of those services are simulated as live in this project.

## Run and build

```bash
npm run dev
npm test
npm run build
npm run preview
```

Node.js 20+ is required. No `npm install` is needed because `package.json` has no dependencies.
