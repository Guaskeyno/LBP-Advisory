/**
 * List filters (Track Record, Professionisti)
 * Items are rendered in the HTML; each carries data-* attributes. Every
 * <select data-filter="key"> is filled with the distinct values found on the
 * items, so adding content only means adding markup.
 *
 * Markup: [data-filter-list] container with [data-filter-item] children,
 *         [data-filter-count] (optional), [data-filter-empty] (optional),
 *         input[data-filter-search] (optional, full-text).
 */
(function () {
  'use strict';

  var list = document.querySelector('[data-filter-list]');
  if (!list) return;

  var items = Array.prototype.slice.call(list.querySelectorAll('[data-filter-item]'));
  var selects = Array.prototype.slice.call(document.querySelectorAll('select[data-filter]'));
  var search = document.querySelector('[data-filter-search]');
  var count = document.querySelector('[data-filter-count]');
  var empty = document.querySelector('[data-filter-empty]');
  var noun = count ? count.getAttribute('data-noun') || '' : '';

  function values(item, key) {
    var raw = item.getAttribute('data-' + key) || '';
    return raw.split('|').map(function (v) { return v.trim(); }).filter(Boolean);
  }

  function normalise(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  // Populate selects
  selects.forEach(function (select) {
    var key = select.getAttribute('data-filter');
    var seen = {};
    items.forEach(function (item) {
      values(item, key).forEach(function (v) { seen[v] = true; });
    });
    Object.keys(seen).sort(function (a, b) { return a.localeCompare(b, 'it', { numeric: true }); })
      .forEach(function (v) {
        var opt = document.createElement('option');
        opt.value = v;
        opt.textContent = v;
        select.appendChild(opt);
      });
    select.addEventListener('change', apply);
  });

  if (search) search.addEventListener('input', apply);

  function apply() {
    var query = search ? normalise(search.value.trim()) : '';
    var visible = 0;

    items.forEach(function (item) {
      var ok = selects.every(function (select) {
        return !select.value || values(item, select.getAttribute('data-filter')).indexOf(select.value) !== -1;
      });
      if (ok && query) ok = normalise(item.textContent).indexOf(query) !== -1;
      item.hidden = !ok;
      if (ok) visible++;
    });

    if (count) count.textContent = visible + (noun ? ' ' + noun : '');
    if (empty) empty.hidden = visible !== 0;
  }

  apply();
})();
