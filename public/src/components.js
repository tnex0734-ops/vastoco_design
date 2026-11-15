import { icon } from './icons.js';

export function brandLink(extraClass = '') {
  return `<a class="brand ${extraClass}" href="/" aria-label="Vastoco home"><img src="/assets/vastoco-logo.png" width="134" height="32" alt="Vastoco" /></a>`;
}

export function nav({ active = 'home', audience = 'shared' } = {}) {
  const isClient = audience === 'client';
  const isProfessional = audience === 'professional';
  const links = isClient
    ? `<a class="nav-link ${active === 'explore' ? 'is-active' : ''}" href="/clients/explore">Explore professionals</a>
       <a class="nav-link" href="/client/briefs">Post a brief</a>
       <a class="nav-link" href="/clients#how-it-works">How it works</a>
       <a class="nav-link" href="/professionals">For professionals</a>`
    : isProfessional
      ? `<a class="nav-link" href="/professionals#benefits">Benefits</a>
         <a class="nav-link" href="/professionals#verification">Verification</a>
         <a class="nav-link" href="/professionals#how-it-works">How it works</a>
         <a class="nav-link" href="/professional">Practice Workspace</a>
         <a class="nav-link" href="/clients">For clients</a>`
      : `<a class="nav-link" href="/clients">For clients</a>
         <a class="nav-link" href="/professionals">For professionals</a>
         <a class="nav-link" href="/#how-it-works">How it works</a>`;
  const mainHref = isProfessional ? '/professionals/join' : isClient ? '/clients/explore' : '/clients';
  const mainLabel = isProfessional ? 'Join Vastoco' : isClient ? 'Find a professional' : 'Get started';
  return `<header class="site-header">
    <div class="header-inner container">
      ${brandLink()}
      <nav class="desktop-nav" aria-label="Main navigation">${links}</nav>
      <div class="header-actions">
        ${isClient ? `
          <div class="site-header-search" data-header-search-wrap>
            ${icon('search', 'nav-search-icon', 14)}
            <input type="search" class="client-nav-search-input" placeholder="Search... [⌘K]" aria-label="Search professionals" data-nav-search />
          </div>
        ` : ''}
        <a class="sign-in-link" href="/signin">Sign in</a>
        <a class="button button--small button--dark" href="${mainHref}">${mainLabel} ${icon('arrow', 'button-arrow', 16)}</a>
      </div>
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>${icon('menu', '', 22)}</button>
    </div>
    <nav class="mobile-nav" id="mobile-menu" aria-label="Mobile navigation" hidden>
      ${links}
      <a class="nav-link" href="/signin">Sign in</a>
      <a class="button button--dark button--wide" href="${mainHref}">${mainLabel} ${icon('arrow', 'button-arrow', 16)}</a>
    </nav>
  </header>`;
}

export function footer({ compact = false } = {}) {
  return `<footer class="site-footer">
    <div class="container footer-main ${compact ? 'footer-main--compact' : ''}">
      <div class="footer-brand-block">
        ${brandLink('brand--footer')}
        <p>Better spaces begin with the right expertise.</p>
        <span class="footer-location">Starting in Delhi NCR</span>
      </div>
      <div class="footer-column">
        <h3>For Clients</h3>
        <a href="/clients">Client Portal</a>
        <a href="/client">Client Workspace</a>
        <a href="/client/briefs">Post a Project Brief</a>
        <a href="/clients/explore">Find Professionals</a>
      </div>
      <div class="footer-column">
        <h3>For Professionals</h3>
        <a href="/professionals">Professional Portal</a>
        <a href="/professional">Practice Workspace</a>
        <a href="/professional/briefs">Client Opportunities</a>
        <a href="/professionals/join">Join Vastoco</a>
      </div>
      <div class="footer-column">
        <h3>Governance</h3>
        <a href="/professionals#verification">COA Register Check</a>
        <a href="/#how-it-works">85/15 Fee Model</a>
        <a href="/signin">Sign in</a>
      </div>
    </div>
    <div class="container footer-bottom"><span>© 2026 Vastoco. All rights reserved.</span><span>Architecture · Interiors · Vastu</span></div>
  </footer>`;
}

export function pageFrame(content, options = {}) {
  return `<a href="#main" class="skip-link">Skip to main content</a>${nav(options)}<main id="main">${content}</main>${footer(options.footer || {})}`;
}

export function sectionIntro(kicker, title, copy = '', align = 'left') {
  return `<div class="section-intro section-intro--${align}"><p class="eyebrow">${kicker}</p><h2>${title}</h2>${copy ? `<p class="section-copy">${copy}</p>` : ''}</div>`;
}

export function actionLink(href, label, style = 'dark') {
  return `<a class="button button--${style}" href="${href}">${label} ${icon('arrow', 'button-arrow', 17)}</a>`;
}

export function note(text, kind = 'neutral') {
  return `<p class="inline-note inline-note--${kind}">${icon(kind === 'success' ? 'check' : 'info', '', 16)}<span>${text}</span></p>`;
}
