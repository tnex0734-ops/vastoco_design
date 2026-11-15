export function resolveRoute(pathname) {
  const path = (pathname || '/').replace(/\/+$/, '') || '/';
  const known = [
    '/', '/clients', '/professionals', '/signup', '/signin',
    '/clients/explore', '/clients/professional', '/clients/booking',
    '/professionals/join',
    '/client', '/client/briefs', '/client/offers', '/client/compare', '/client/saved',
    '/client/consultations', '/client/activity', '/client/profile',
    '/professional', '/professional/briefs', '/professional/offers',
    '/professional/consultations', '/professional/calendar',
    '/professional/portfolio', '/professional/profile',
    '/professional/verification', '/professional/settings'
  ];
  if (known.includes(path)) return path;
  if (/^\/client\/professionals\/[^/]+$/.test(path)) return '/client/professionals/:id';
  if (/^\/client\/book\/[^/]+$/.test(path)) return '/client/book/:id';
  if (/^\/professional\/briefs\/[^/]+$/.test(path)) return '/professional/briefs/:id';
  return '/not-found';
}

export function getRouteParams(pathname = '', search = '') {
  const path = (pathname || '/').replace(/\/+$/, '') || '/';
  const proMatch = path.match(/^\/client\/professionals\/([^/]+)$/);
  if (proMatch) return { id: proMatch[1] };
  const bookMatch = path.match(/^\/client\/book\/([^/]+)$/);
  if (bookMatch) return { id: bookMatch[1] };
  const briefMatch = path.match(/^\/professional\/briefs\/([^/]+)$/);
  if (briefMatch) return { id: briefMatch[1] };
  // Check query params fallback
  const params = new URLSearchParams(search);
  const id = params.get('id') || params.get('pro') || params.get('brief');
  return id ? { id } : {};
}

export function signupRoleFromURL(search = '') {
  const role = new URLSearchParams(search).get('role');
  return role === 'client' || role === 'professional' ? role : null;
}

export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim());
}

export function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

export function clampNumber(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, number));
}
