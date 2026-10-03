/**
 * Slider — scroll-snap track with prev/next buttons.
 * Markup: [data-slider] > .slider__track, buttons [data-slider-prev|next="id"]
 */
(function () {
  'use strict';

  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var id = slider.id;
    var track = slider.querySelector('.slider__track');
    var prev = document.querySelector('[data-slider-prev="' + id + '"]');
    var next = document.querySelector('[data-slider-next="' + id + '"]');
    if (!track) return;

    function step() {
      var item = track.firstElementChild;
      if (!item) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return item.getBoundingClientRect().width + gap;
    }

    function update() {
      var max = track.scrollWidth - track.clientWidth - 1;
      if (prev) prev.disabled = track.scrollLeft <= 0;
      if (next) next.disabled = track.scrollLeft >= max;
      // Hide the arrows when every item already fits
      var arrows = prev && prev.parentElement;
      if (arrows) arrows.hidden = max <= 0;
    }

    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });

    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
