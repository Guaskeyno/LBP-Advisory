/**
 * Landing hero video (logo animation)
 * Plays once and holds its last frame. A pause/play button is shown while it runs
 * (and to replay it). With prefers-reduced-motion it does not autoplay: it shows the
 * final frame and the button offers to play it.
 */
(function () {
  'use strict';

  var video = document.querySelector('[data-hero-video]');
  if (!video) return;
  var toggle = document.querySelector('[data-hero-toggle]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setButton(playing) {
    if (!toggle) return;
    toggle.hidden = false;
    toggle.setAttribute('aria-label', playing ? 'Metti in pausa l\u2019animazione' : 'Riproduci l\u2019animazione');
    var span = toggle.querySelector('[data-icon]');
    if (!span) return;
    span.setAttribute('data-icon', playing ? 'pause' : 'play');
    span.removeAttribute('data-icon-ready');
    if (window.LBAIcons) window.LBAIcons.render(toggle);
  }

  video.addEventListener('play', function () { setButton(true); });
  video.addEventListener('pause', function () { setButton(false); });
  video.addEventListener('ended', function () { setButton(false); });

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (video.paused) {
        if (video.ended) video.currentTime = 0;
        video.play();
      } else {
        video.pause();
      }
    });
  }

  if (reduce) {
    // Show the closing frame without motion
    video.addEventListener('loadedmetadata', function () {
      video.currentTime = Math.max(0, video.duration - 0.05);
    }, { once: true });
    setButton(false);
  } else {
    var p = video.play();
    if (p && p.catch) p.catch(function () { setButton(false); });
  }
})();
