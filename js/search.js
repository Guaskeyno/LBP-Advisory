/**
 * Site search (cerca.html) — matches ?q= against js/data/search-index.js.
 */
(function () {
  'use strict';

  var out = document.querySelector('[data-search-results]');
  if (!out || !window.LBA_SEARCH_INDEX) return;

  var params = new URLSearchParams(window.location.search);
  var q = (params.get('q') || '').trim();
  var input = document.querySelector('[data-search-input]');
  var summary = document.querySelector('[data-search-summary]');
  if (input) input.value = q;

  function normalise(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  if (!q) {
    summary.textContent = 'Inserisci un termine di ricerca.';
    return;
  }

  var terms = normalise(q).split(/\s+/).filter(Boolean);
  var results = window.LBA_SEARCH_INDEX
    .map(function (page) {
      var title = normalise(page.title);
      var hay = title + ' ' + normalise(page.excerpt + ' ' + page.text);
      var score = 0;
      var all = terms.every(function (t) {
        if (hay.indexOf(t) === -1) return false;
        score += title.indexOf(t) !== -1 ? 3 : 1;
        return true;
      });
      return all ? { page: page, score: score } : null;
    })
    .filter(Boolean)
    .sort(function (a, b) { return b.score - a.score; });

  summary.textContent = results.length
    ? results.length + (results.length === 1 ? ' risultato' : ' risultati') + ' per “' + q + '”'
    : 'Nessun risultato per “' + q + '”.';

  out.innerHTML = results.map(function (r) {
    return '<li><a href="' + r.page.url + '">' +
      '<span class="card__title">' + escapeHtml(r.page.title) + '</span>' +
      '<p>' + escapeHtml(r.page.excerpt) + '</p></a></li>';
  }).join('');
})();
