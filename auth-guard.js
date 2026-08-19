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
  // Expose current user globally (portal.html can use window.GIS_USER if needed)
  window.GIS_USER = JSON.parse(session);
  // NOTE: No UI is injected here anymore — portal.html's own header
  // already shows the user badge and Logout button. Injecting a
  // second bar here was causing the duplicate Logout button.
})();

function doLogout() {
  sessionStorage.removeItem('waqar_gis_session');
  window.location.replace('index.html');
}
