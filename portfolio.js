// ═══════════════════════════════════════════════════════════════
//  LAYA HOME — portfolio.js  (Rejstřík)
//  Grid, filter tabs and counts derive from window.LAYA.
//  Filter state syncs to the URL hash (#kategorie=interier).
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var L = window.LAYA;
  if (!L) return;

  var hasGSAP = typeof window.gsap !== 'undefined';
  var motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ANIM = hasGSAP && motionOK;

  var grid = document.querySelector('.reg-grid');
  var bar = document.querySelector('.filter-inner');
  var live = document.getElementById('filter-live');

  function plural(n) {
    if (n === 1) return 'projekt';
    if (n >= 2 && n <= 4) return 'projekty';
    return 'projektů';
  }

  // counts in hero + title block — derived, never hardcoded
  var sub = document.querySelector('[data-count]');
  if (sub) sub.textContent = L.TOTAL + ' realizovaných ' + plural(L.TOTAL) + ' — P-01 až P-' + String(L.TOTAL).padStart(2, '0');
  var tdd = document.querySelector('[data-total-dd]');
  if (tdd) tdd.textContent = L.TOTAL + ' ' + plural(L.TOTAL);

  // ── grid ──
  grid.innerHTML = L.PROJECTS.map(function (p) {
    return '' +
      '<article class="reg-card" data-category="' + p.category + '">' +
        '<a href="' + L.detailUrl(p) + '">' +
          '<figure class="cropped"><span class="cm" aria-hidden="true"></span>' +
            '<img src="' + p.image + '" alt="' + p.alt + '" loading="lazy" decoding="async" width="800" height="600" data-fallback>' +
          '</figure>' +
          '<div class="reg-meta mono">' +
            '<span>P-' + String(p.id).padStart(2, '0') + '</span>' +
            '<span>' + p.categoryLabel + '</span>' +
          '</div>' +
          '<h2 class="reg-title">' + p.title + '</h2>' +
        '</a>' +
      '</article>';
  }).join('');
  if (window.layaImageFallbacks) layaImageFallbacks(grid);

  // ── filter tabs ──
  var counts = L.countByCategory();
  var tabs = [{ key: 'all', label: 'Vše' }];
  Object.keys(L.CATEGORIES).forEach(function (key) {
    if (counts[key]) tabs.push({ key: key, label: L.CATEGORIES[key].split(' ')[0].replace('Interiérový', 'Interiér') });
  });
  bar.innerHTML = tabs.map(function (t) {
    return '<button type="button" class="filter-btn" data-filter="' + t.key + '" aria-pressed="' + (t.key === 'all') + '">' +
      t.label + ' <span class="c">' + (counts[t.key] || counts.all) + '</span></button>';
  }).join('');

  function currentHash() {
    var m = window.location.hash.match(/kategorie=([a-z]+)/);
    return m && (m[1] === 'all' || L.CATEGORIES[m[1]]) ? m[1] : 'all';
  }

  function apply(filter, opts) {
    opts = opts || {};
    bar.querySelectorAll('.filter-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.filter === filter));
    });
    if (opts.push !== false) {
      history.replaceState(null, '', filter === 'all' ? window.location.pathname : '#kategorie=' + filter);
    }
    var show = [], hide = [];
    grid.querySelectorAll('.reg-card').forEach(function (c) {
      (filter === 'all' || c.dataset.category === filter ? show : hide).push(c);
    });
    if (live) live.textContent = 'Zobrazeno ' + show.length + ' ' + plural(show.length) + '.';

    hide.forEach(function (c) { c.classList.add('is-hidden'); });
    show.forEach(function (c) { c.classList.remove('is-hidden'); });
    if (ANIM && opts.animate !== false) {
      gsap.fromTo(show, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05, overwrite: true,
      });
    }
  }

  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (btn) apply(btn.dataset.filter);
  });
  window.addEventListener('hashchange', function () { apply(currentHash(), { push: false }); });

  apply(currentHash(), { animate: false, push: false });

  // entrance reveal
  if (ANIM && typeof ScrollTrigger !== 'undefined') {
    var cards = grid.querySelectorAll('.reg-card:not(.is-hidden)');
    gsap.set(cards, { opacity: 0, y: 30 });
    ScrollTrigger.batch(cards, {
      start: 'top 90%', once: true,
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true });
      },
    });
    gsap.from('.page-hero-title, .page-hero-sub', {
      opacity: 0, y: 26, duration: 0.9, ease: 'power3.out', stagger: 0.1,
    });
  }
})();
