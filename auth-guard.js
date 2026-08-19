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

  // NOTE: The floating "gis-user-bar" (top-right corner badge + Logout)
  // has been removed on purpose — portal.html's own header already
  // shows the user name and Logout button. This was the duplicate.
})();

function doLogout() {
  sessionStorage.removeItem('waqar_gis_session');
  window.location.replace('index.html');
}
