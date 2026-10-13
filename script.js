// Taimoor Riaz — portfolio interactions
(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav__toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });
  }

  // Showreel: load the YouTube player only when someone presses play
  var reel = document.querySelector('.reel');
  if (reel) {
    reel.addEventListener('click', function () {
      var id = reel.getAttribute('data-video');
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      frame.title = 'Taimoor Riaz game development showreel';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      reel.replaceWith(frame);
    });
  }

  // Project category filters
  var filters = document.querySelectorAll('.filter');
  var grid = document.querySelector('.projects');
  if (filters.length && grid) {
    var cards = grid.querySelectorAll('.project');
    filters.forEach(function (btn) {
      var f = btn.getAttribute('data-filter');
      var count = 0;
      cards.forEach(function (card) {
        var cats = (card.getAttribute('data-cat') || '').split(' ');
        if (f === 'all' || cats.indexOf(f) > -1) count++;
      });
      var badge = document.createElement('span');
      badge.textContent = count;
      btn.appendChild(badge);
      btn.addEventListener('click', function () {
        filters.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        cards.forEach(function (card) {
          var cats = (card.getAttribute('data-cat') || '').split(' ');
          card.hidden = !(f === 'all' || cats.indexOf(f) > -1);
        });
        grid.classList.toggle('is-filtered', f !== 'all');
      });
    });
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
