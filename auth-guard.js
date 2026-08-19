/**
 * Waqar GIS Portal — Auth Guard
 * Include this <script> at the TOP of portal.html (before any other JS)
 * It redirects unauthenticated users to index.html
 */
(function () {
  const session = sessionStorage.getItem('waqar_gis_session');
  if (!session) {
    window.location.replace('index.html');
    throw new Error('Not authenticated');
  }
  // Expose current user globally
  window.GIS_USER = JSON.parse(session);

  // Inject a minimal role badge only (no name, no logout button)
  document.addEventListener('DOMContentLoaded', function () {
    const bar = document.createElement('div');
    bar.id = 'gis-user-bar';
    bar.style.cssText = `
      position: fixed; top: 0; right: 0; z-index: 9999;
      background: #111827; border-left: 1px solid #1f2d45; border-bottom: 1px solid #1f2d45;
      padding: 6px 14px; display: flex; align-items: center;
      font-family: Inter, sans-serif; font-size: 0.78rem; color: #8899b0;
      border-bottom-left-radius: 8px;
    `;
    bar.innerHTML = `
      <span>${window.GIS_USER.role === 'admin' ? '👑 Admin' : '🗺 User'}</span>
    `;
    document.body.appendChild(bar);
  });
})();

function doLogout() {
  sessionStorage.removeItem('waqar_gis_session');
  window.location.replace('index.html');
}
