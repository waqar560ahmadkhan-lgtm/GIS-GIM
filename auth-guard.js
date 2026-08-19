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

  // Inject user bar into the portal header after DOM loads
  document.addEventListener('DOMContentLoaded', function () {
    const bar = document.createElement('div');
    bar.id = 'gis-user-bar';
    bar.style.cssText = `
      position: fixed; top: 0; right: 0; z-index: 9999;
      background: #111827; border-left: 1px solid #1f2d45; border-bottom: 1px solid #1f2d45;
      padding: 6px 14px; display: flex; align-items: center; gap: 14px;
      font-family: Inter, sans-serif; font-size: 0.78rem; color: #8899b0;
      border-bottom-left-radius: 8px;
    `;
    bar.innerHTML = `
      <span style="color:#2ecc8f; font-weight:600;">${window.GIS_USER.name}</span>
      <span>${window.GIS_USER.role === 'admin' ? '👑 Admin' : '🗺 User'}</span>
      <button onclick="doLogout()" style="
        background:#ff6b6b22; color:#ff6b6b; border:1px solid #ff6b6b44;
        padding:3px 10px; border-radius:5px; cursor:pointer;
        font-size:0.75rem; font-family:inherit;
      ">Logout</button>
    `;
    document.body.appendChild(bar);
  });
})();

function doLogout() {
  sessionStorage.removeItem('waqar_gis_session');
  window.location.replace('index.html');
}
