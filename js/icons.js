/**
 * Icon injector — UIkit icon set (MIT, https://getuikit.com), the same
 * 20×20 thin-stroke family used by the reference site.
 * Usage: <span data-icon="search"></span>
 */
(function () {
  'use strict';

  var ICONS = {
    'arrow-left': '<polyline fill="none" stroke="currentColor" points="10 14 5 9.5 10 5"/><line fill="none" stroke="currentColor" x1="16" y1="9.5" x2="5" y2="9.52"/>',
    'arrow-right': '<polyline fill="none" stroke="currentColor" points="10 5 15 9.5 10 14"/><line fill="none" stroke="currentColor" x1="4" y1="9.5" x2="15" y2="9.5"/>',
    'chevron-down': '<polyline fill="none" stroke="currentColor" stroke-width="1.03" points="16 7 10 13 4 7"/>',
    'chevron-left': '<polyline fill="none" stroke="currentColor" stroke-width="1.03" points="13 16 7 10 13 4"/>',
    'chevron-right': '<polyline fill="none" stroke="currentColor" stroke-width="1.03" points="7 4 13 10 7 16"/>',
    'close': '<path fill="none" stroke="currentColor" stroke-width="1.06" d="M16,16 L4,4"/><path fill="none" stroke="currentColor" stroke-width="1.06" d="M16,4 L4,16"/>',
    'download': '<polyline fill="none" stroke="currentColor" points="14,10 9.5,14.5 5,10"/><rect x="3" y="17" width="13" height="1"/><line fill="none" stroke="currentColor" x1="9.5" y1="13.91" x2="9.5" y2="3"/>',
    'link': '<path fill="none" stroke="currentColor" stroke-width="1.1" d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375"/><path fill="none" stroke="currentColor" stroke-width="1.1" d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375"/><path fill="none" stroke="currentColor" stroke-width="1.1" d="M7.925,11.875 L11.925,7.975"/>',
    'linkedin': '<path d="M5.77,17.89 L5.77,7.17 L2.21,7.17 L2.21,17.89 L5.77,17.89 Z M3.99,5.71 C5.23,5.71 6.01,4.89 6.01,3.86 C5.99,2.8 5.24,2 4.02,2 C2.8,2 2,2.8 2,3.85 C2,4.88 2.77,5.7 3.97,5.7 L3.99,5.7 Z"/><path d="M7.75,17.89 L11.31,17.89 L11.31,11.9 C11.31,11.58 11.33,11.26 11.43,11.03 C11.69,10.39 12.27,9.73 13.26,9.73 C14.55,9.73 15.06,10.71 15.06,12.15 L15.06,17.89 L18.62,17.89 L18.62,11.74 C18.62,8.45 16.86,6.92 14.52,6.92 C12.6,6.92 11.75,7.99 11.28,8.73 L11.3,8.73 L11.3,7.17 L7.75,7.17 C7.79,8.17 7.75,17.89 7.75,17.89 Z"/>',
    'location': '<path fill="none" stroke="currentColor" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z"/><circle fill="none" stroke="currentColor" cx="10" cy="6.8" r="2.3"/>',
    'mail': '<polyline fill="none" stroke="currentColor" points="1.4,6.5 10,11 18.6,6.5"/><path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z"/>',
    'menu': '<rect x="2" y="4" width="16" height="1"/><rect x="2" y="9" width="16" height="1"/><rect x="2" y="14" width="16" height="1"/>',
    'receiver': '<path fill="none" stroke="currentColor" stroke-width="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611"/>',
    'search': '<circle fill="none" stroke="currentColor" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="currentColor" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/>',
    'world': '<path fill="none" stroke="currentColor" d="M1,10.5 L19,10.5"/><path fill="none" stroke="currentColor" d="M2.35,15.5 L17.65,15.5"/><path fill="none" stroke="currentColor" d="M2.35,5.5 L17.523,5.5"/><path fill="none" stroke="currentColor" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 Z"/><circle fill="none" stroke="currentColor" cx="10" cy="10.5" r="9"/>'
  };

  function render(root) {
    (root || document).querySelectorAll('[data-icon]:not([data-icon-ready])').forEach(function (el) {
      var paths = ICONS[el.getAttribute('data-icon')];
      if (!paths) return;
      el.classList.add('icon');
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('data-icon-ready', '');
      el.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" focusable="false">' + paths + '</svg>';
    });
  }

  window.LBAIcons = { render: render };
  render();
})();
