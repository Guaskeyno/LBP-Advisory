/**
 * Header navigation
 * - Dropdowns open on hover (desktop) or click/keyboard, inside a full-width
 *   dropbar that grows to fit — same pattern as the reference navbar.
 * - Search opens on click in the same dropbar.
 * - Off-canvas menu below 1200px with focus trap and Escape to close.
 */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  if (!header) return;

  var inner = header.querySelector('.site-header__inner');
  var dropbar = header.querySelector('.dropbar');
  var HIDE_DELAY = 200;
  var current = null;      // { trigger, panel }
  var hideTimer = null;

  function canHover() {
    return window.matchMedia('(hover: hover) and (min-width: 1200px)').matches;
  }

  function positionPanel(trigger, panel) {
    if (panel.classList.contains('search-drop')) return; // right-aligned in CSS
    var innerRect = inner.getBoundingClientRect();
    var triggerRect = trigger.getBoundingClientRect();
    var left = triggerRect.left - innerRect.left;
    var maxLeft = inner.clientWidth - panel.offsetWidth;
    panel.style.left = Math.max(0, Math.min(left, maxLeft)) + 'px';
  }

  function open(trigger, panel) {
    clearTimeout(hideTimer);
    if (current && current.panel === panel) return;
    if (current) close(false);

    current = { trigger: trigger, panel: panel };
    trigger.setAttribute('aria-expanded', 'true');
    panel.classList.add('is-open');
    positionPanel(trigger, panel);
    dropbar.style.height = panel.offsetHeight + 'px';

    if (panel.classList.contains('search-drop')) {
      var input = panel.querySelector('input');
      if (input) setTimeout(function () { input.focus(); }, 50);
    }
  }

  function close(returnFocus) {
    clearTimeout(hideTimer);
    if (!current) return;
    current.trigger.setAttribute('aria-expanded', 'false');
    current.panel.classList.remove('is-open');
    dropbar.style.height = '0px';
    if (returnFocus) current.trigger.focus();
    current = null;
  }

  function scheduleClose() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () { close(false); }, HIDE_DELAY);
  }

  header.querySelectorAll('[data-dropdown]').forEach(function (trigger) {
    var panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;
    var isSearch = panel.classList.contains('search-drop');
    var item = trigger.closest('li') || trigger.parentElement;

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (current && current.panel === panel) close(false);
      else open(trigger, panel);
    });

    if (!isSearch) {
      item.addEventListener('mouseenter', function () { if (canHover()) open(trigger, panel); });
      item.addEventListener('mouseleave', function () { if (canHover()) scheduleClose(); });
    }

    // Arrow down from the trigger moves into the panel
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        open(trigger, panel);
        var first = panel.querySelector('a, input');
        if (first) first.focus();
      }
    });
  });

  dropbar.addEventListener('mouseenter', function () {
    if (current && !current.panel.classList.contains('search-drop')) clearTimeout(hideTimer);
  });
  dropbar.addEventListener('mouseleave', function () {
    if (current && !current.panel.classList.contains('search-drop') && canHover()) scheduleClose();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && current) close(true);
  });

  document.addEventListener('click', function (e) {
    if (current && !header.contains(e.target)) close(false);
  });

  // Close when focus leaves the open panel and its trigger
  header.addEventListener('focusout', function (e) {
    if (!current) return;
    var next = e.relatedTarget;
    if (next && (current.panel.contains(next) || current.trigger === next)) return;
    if (next && header.contains(next)) close(false);
  });

  window.addEventListener('resize', function () {
    if (current) {
      positionPanel(current.trigger, current.panel);
      dropbar.style.height = current.panel.offsetHeight + 'px';
    }
  });

  /* --- Off-canvas ------------------------------------------------------- */

  var offcanvas = document.getElementById('offcanvas');
  var toggle = document.querySelector('.nav-toggle');
  if (!offcanvas || !toggle) return;

  var bar = offcanvas.querySelector('.offcanvas__bar');
  var lastFocus = null;

  function setInert(on) {
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === offcanvas || el.tagName === 'SCRIPT') return;
      if (on) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }

  function openCanvas() {
    lastFocus = document.activeElement;
    offcanvas.classList.add('is-open');
    offcanvas.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
    setInert(true);
    var first = bar.querySelector('a[href], button');
    if (first) setTimeout(function () { first.focus(); }, 50);
  }

  function closeCanvas() {
    offcanvas.classList.remove('is-open');
    offcanvas.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
    setInert(false);
    if (lastFocus) lastFocus.focus();
  }

  toggle.addEventListener('click', openCanvas);
  offcanvas.querySelectorAll('[data-offcanvas-close]').forEach(function (el) {
    el.addEventListener('click', closeCanvas);
  });

  offcanvas.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCanvas(); return; }
    if (e.key !== 'Tab') return;
    var focusable = bar.querySelectorAll('a[href], button:not([disabled]), input');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  window.matchMedia('(min-width: 1200px)').addEventListener('change', function (mq) {
    if (mq.matches && offcanvas.classList.contains('is-open')) closeCanvas();
  });
})();
