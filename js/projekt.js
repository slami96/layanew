// ═══════════════════════════════════════════════════════════════
//  LAYA HOME — projekt.js
//  One template → 21+ deep-linkable detail routes:
//  projekt.html?p=<slug>. Adding a project = one object in data.js.
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var L = window.LAYA;
  if (!L) return;

  var hasGSAP = typeof window.gsap !== 'undefined';
  var motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var main = document.getElementById('main');

  var slug = new URLSearchParams(window.location.search).get('p');
  var p = L.bySlug(slug);

  if (!p) {
    document.title = 'Projekt nenalezen — LAYA HOME';
    main.innerHTML =
      '<div class="sheet-head mono"><span class="sheet-name">Projekt nenalezen</span><span class="sheet-no">List P-??</span></div>' +
      '<h1 class="detail-title display">Tento výkres <span class="voice">chybí.</span></h1>' +
      '<p class="detail-desc">Možná byl odkaz zkrácen nebo přejmenován. Všech ' + L.TOTAL + ' projektů najdete v rejstříku.</p>' +
      '<nav class="detail-nav"><a href="portfolio.html">← Zpět do rejstříku</a></nav>';
    return;
  }

  var no = 'P-' + String(p.id).padStart(2, '0');
  document.title = p.title + ' — LAYA HOME';
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', p.desc);

  var n = L.neighbours(p.slug);
  var cameFromPortfolio = document.referrer.indexOf('portfolio.html') !== -1 && window.history.length > 1;
  var backHref = cameFromPortfolio ? null : 'portfolio.html#kategorie=' + p.category;

  main.innerHTML =
    '<div class="sheet-head mono">' +
      '<span class="sheet-name">' + p.categoryLabel + '</span>' +
      '<span class="sheet-no">List ' + no + ' / ' + L.TOTAL + '</span>' +
    '</div>' +
    '<nav class="detail-breadcrumb mono" aria-label="Drobečková navigace">' +
      '<a href="index.html">Úvod</a><span aria-hidden="true">/</span>' +
      '<a href="portfolio.html">Rejstřík</a><span aria-hidden="true">/</span>' +
      '<span aria-current="page">' + p.title + '</span>' +
    '</nav>' +
    '<h1 class="detail-title display">' + p.title + '</h1>' +
    '<p class="detail-desc">' + p.desc + '</p>' +
    '<div class="detail-figure">' +
      '<figure class="cropped"><span class="cm" aria-hidden="true"></span>' +
        '<img src="' + p.image + '" alt="' + p.alt + '" decoding="async" fetchpriority="high" data-fallback>' +
      '</figure>' +
    '</div>' +
    '<nav class="detail-nav" aria-label="Další projekty">' +
      '<a href="' + (backHref || '#') + '" id="back-link">← Zpět do rejstříku</a>' +
      '<span>' +
        (n.prev ? '<a href="' + L.detailUrl(n.prev) + '" rel="prev" style="margin-right:24px">← ' + n.prev.title + '</a>' : '') +
        (n.next ? '<a href="' + L.detailUrl(n.next) + '" rel="next">' + n.next.title + ' →</a>' : '') +
      '</span>' +
    '</nav>' +
    '<dl class="title-block mono">' +
      '<div><dt>Výkres</dt><dd>' + no + '</dd></div>' +
      '<div><dt>Kategorie</dt><dd>' + p.categoryLabel + '</dd></div>' +
      '<div><dt>Autorka</dt><dd>LAYA HOME</dd></div>' +
      '<div><dt>Stav</dt><dd>Realizováno</dd></div>' +
    '</dl>';

  if (cameFromPortfolio) {
    document.getElementById('back-link').addEventListener('click', function (e) {
      e.preventDefault(); window.history.back();
    });
  }
  if (window.layaImageFallbacks) layaImageFallbacks(main);

  if (hasGSAP && motionOK) {
    gsap.from('#main > *', { opacity: 0, y: 26, duration: 0.75, ease: 'power3.out', stagger: 0.08 });
  }
})();
