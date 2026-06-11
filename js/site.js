// ═══════════════════════════════════════════════════════════════
//  LAYA HOME — site.js  (plain script, no modules → works anywhere,
//  including file://). Shared behaviours + homepage choreography.
//
//  ROBUSTNESS CONTRACT: nothing in the HTML/CSS is hidden by
//  default. Every "hidden before reveal" state is set HERE, only
//  when GSAP is present AND the user allows motion. If this file
//  or the CDNs fail, the site renders complete and static.
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ANIM = hasGSAP && motionOK;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  // ── Lenis smooth scroll ─────────────────────────────────────
  var lenis = null;
  if (ANIM && typeof window.Lenis !== 'undefined') {
    document.documentElement.classList.add('lenis');
    lenis = new Lenis({ duration: 1.15, syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  function scrollToEl(el) {
    if (lenis) lenis.scrollTo(el, { offset: -20 });
    else el.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto' });
  }

  // ── Header: blur on scroll, hide on scroll-down ─────────────
  var header = document.querySelector('.site-header');
  var lastY = 0;
  function onScrollHeader() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    if (y > 280 && y > lastY + 4) header.classList.add('is-hidden');
    else if (y < lastY - 4) header.classList.remove('is-hidden');
    lastY = y;
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  // in-page anchor links through Lenis
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMenu();
      scrollToEl(target);
    });
  });

  // ── Mobile menu ─────────────────────────────────────────────
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  function closeMenu() {
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Otevřít menu');
    toggle.focus();
  }
  if (toggle && menu) {
    menu.style.display = 'flex'; // enable transitions (display set by JS so no-JS never traps)
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
      if (open) menu.querySelector('a').focus();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
  }

  // ── Live Prague clock (footer + hero meta) ──────────────────
  function tickClock() {
    var els = document.querySelectorAll('[data-clock]');
    if (!els.length) return;
    var t = new Intl.DateTimeFormat('cs-CZ', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague',
    }).format(new Date());
    els.forEach(function (el) { el.textContent = t + ' CET'; });
  }
  tickClock();
  setInterval(tickClock, 15000);

  // ── Footer year ─────────────────────────────────────────────
  var yr = document.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());

  // ── Image fallback: missing asset → drafting placeholder ────
  window.layaImageFallbacks = function (root) {
    (root || document).querySelectorAll('img[data-fallback]').forEach(function (img) {
      img.addEventListener('error', function () {
        var ph = document.createElement('span');
        ph.className = 'img-missing';
        ph.textContent = 'VÝKRES CHYBÍ — ' + (img.getAttribute('src') || '');
        img.replaceWith(ph);
      }, { once: true });
      if (img.complete && img.naturalWidth === 0 && img.src) img.dispatchEvent(new Event('error'));
    });
  };
  layaImageFallbacks();

  // ── Generic reveals: [data-reveal] fades/rises in ───────────
  if (ANIM) {
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.from(el, {
        opacity: 0, y: 28, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      });
    });
    // sheet head rules wipe in (border drawn via scaleX on a real line)
    gsap.utils.toArray('.sheet-head').forEach(function (el) {
      gsap.from(el, {
        opacity: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  }

  // ── Line-mask headline reveal helper ────────────────────────
  function splitLines(el) {
    // wrap each existing line-mask child span for masked rise
    return el.querySelectorAll('.line-mask > span');
  }

  // ════════════════════════════════════════════════════════════
  //  HOMEPAGE
  // ════════════════════════════════════════════════════════════
  var hero = document.querySelector('.hero');
  if (hero) {

    // — Hero headline: masked line rise + dimension line draws —
    if (ANIM) {
      var lines = splitLines(hero);
      var dim = hero.querySelector('.dim-line');
      var meta = hero.querySelector('.hero-meta');
      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(meta, { opacity: 0, y: -14, duration: 0.7 })
        .from(lines, { yPercent: 110, duration: 1.05, stagger: 0.12 }, 0.15);
      if (dim) {
        var dimPath = dim.querySelectorAll('svg line, svg path');
        dimPath.forEach(function (p) {
          var len = p.getTotalLength ? p.getTotalLength() : 200;
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          tl.to(p, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.8);
        });
        tl.from(dim.querySelectorAll('.dim-label'), { opacity: 0, duration: 0.5 }, 1.3);
      }
      // scroll cue tick pulses
      gsap.to('.hero-cue .tick', { scaleY: 0.25, repeat: -1, yoyo: true, duration: 0.9, ease: 'power1.inOut' });
    }

    // — Hero viewport: detail crop expands to full bleed (scrub) —
    var vpWrap = document.querySelector('.hero-viewport-wrap');
    var vp = document.querySelector('.hero-viewport');
    if (ANIM && vpWrap && vp) {
      var vpImg = vp.querySelector('img');
      var cap = document.querySelector('.hero-viewport-caption');
      gsap.timeline({
        scrollTrigger: {
          trigger: vpWrap, start: 'top top', end: 'bottom bottom', scrub: 0.6,
        },
        defaults: { ease: 'none' },
      })
        .to(vp, { width: '100vw', height: '100svh', duration: 1 }, 0)
        .to(vpImg, { scale: 1, duration: 1 }, 0)
        .to(cap, { opacity: 1, duration: 0.2 }, 0.75);
    }

    // — Atlas filmstrip: drag with inertia + slow ambient drift —
    var stripWrap = document.querySelector('.atlas-track-wrap');
    var strip = document.querySelector('.atlas-track');
    if (stripWrap && strip) {
      var x = 0, targetX = 0, dragging = false, startX = 0, startTarget = 0, vel = 0;
      var maxX = 0;
      function measure() { maxX = Math.max(0, strip.scrollWidth - stripWrap.clientWidth); }
      measure();
      window.addEventListener('resize', measure);

      function setX(v) {
        targetX = Math.max(-40, Math.min(maxX + 40, v)); // soft overscroll
      }
      stripWrap.addEventListener('pointerdown', function (e) {
        dragging = true; startX = e.clientX; startTarget = targetX; vel = 0;
        stripWrap.classList.add('dragging');
        stripWrap.setPointerCapture(e.pointerId);
      });
      stripWrap.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var d = startX - e.clientX;
        vel = d - (targetX - startTarget);
        setX(startTarget + d);
      });
      function endDrag() {
        if (!dragging) return;
        dragging = false;
        stripWrap.classList.remove('dragging');
        setX(targetX + vel * 8); // fling
      }
      stripWrap.addEventListener('pointerup', endDrag);
      stripWrap.addEventListener('pointercancel', endDrag);

      // rAF lerp (works without GSAP too)
      (function loop() {
        if (!dragging && motionOK) setX(targetX + 0.25); // ambient drift
        if (targetX < 0) targetX += (0 - targetX) * 0.08;
        if (targetX > maxX) targetX += (maxX - targetX) * 0.08;
        x += (targetX - x) * 0.1;
        strip.style.transform = 'translate3d(' + (-x) + 'px,0,0)';
        requestAnimationFrame(loop);
      })();
    }

    // — Services: expanding rows —
    document.querySelectorAll('.srv-row').forEach(function (row) {
      var btn = row.querySelector('.srv-row-btn');
      var panel = row.querySelector('.srv-panel');
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        if (ANIM) {
          gsap.to(panel, {
            height: open ? 0 : 'auto', duration: 0.55, ease: 'power3.inOut',
            onComplete: function () { ScrollTrigger.refresh(); },
          });
        } else {
          panel.style.height = open ? '0' : 'auto';
        }
      });
    });

    // — Process: pinned horizontal scroll + plan draws itself —
    var pin = document.querySelector('.process-pin');
    var track = document.querySelector('.process-track');
    var planPaths = document.querySelectorAll('.process-plan path, .process-plan line, .process-plan circle, .process-plan rect');
    var isDesktop = window.matchMedia('(min-width: 769px)').matches;

    if (ANIM && pin && track && isDesktop) {
      var getDist = function () { return track.scrollWidth - window.innerWidth; };
      planPaths.forEach(function (p) {
        var len = (p.getTotalLength ? p.getTotalLength() : 300);
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      var ptl = gsap.timeline({
        scrollTrigger: {
          trigger: pin, start: 'top top', pin: '.process-outer',
          end: function () { return '+=' + (getDist() + window.innerHeight * 0.4); },
          scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1,
        },
        defaults: { ease: 'none' },
      });
      ptl.to(track, { x: function () { return -getDist(); }, duration: 1 }, 0)
         .to(planPaths, { strokeDashoffset: 0, duration: 1, stagger: { each: 0.02 } }, 0)
         .to('.process-progress i', { width: '100%', duration: 1 }, 0);
    } else if (pin && track) {
      // mobile / reduced motion: vertical, plan fully drawn
      track.style.flexDirection = 'column';
      track.style.width = 'auto';
      planPaths.forEach(function (p) { p.style.strokeDasharray = 'none'; });
      var prog = document.querySelector('.process-progress');
      if (prog) prog.style.display = 'none';
    }

    // — Works: floating cursor preview —
    var preview = document.querySelector('.work-preview');
    var rows = document.querySelectorAll('.work-row');
    if (ANIM && finePointer && preview && rows.length) {
      var imgs = preview.querySelectorAll('img');
      var qx = gsap.quickTo(preview, 'x', { duration: 0.45, ease: 'power3.out' });
      var qy = gsap.quickTo(preview, 'y', { duration: 0.45, ease: 'power3.out' });
      window.addEventListener('pointermove', function (e) {
        qx(e.clientX + 24); qy(e.clientY - preview.offsetHeight / 2);
      }, { passive: true });
      rows.forEach(function (row, i) {
        row.addEventListener('pointerenter', function () {
          imgs.forEach(function (im, j) { im.classList.toggle('is-active', i === j); });
          gsap.to(preview, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' });
        });
        row.addEventListener('pointerleave', function () {
          gsap.to(preview, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power3.in' });
        });
      });
    }

    // — Big titles rise per row —
    if (ANIM) {
      gsap.utils.toArray('.work-row, .srv-row').forEach(function (el) {
        gsap.from(el, {
          opacity: 0, y: 34, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    }

    // — Magnetic CTA buttons (fine pointers) —
    if (ANIM && finePointer) {
      document.querySelectorAll('.action-link, .submit-btn').forEach(function (btn) {
        var bx = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
        var by = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
        btn.addEventListener('pointermove', function (e) {
          var r = btn.getBoundingClientRect();
          bx((e.clientX - r.left - r.width / 2) * 0.25);
          by((e.clientY - r.top - r.height / 2) * 0.35);
        });
        btn.addEventListener('pointerleave', function () { bx(0); by(0); });
      });
    }
  }

  // ── Contact form (any page that has it) ─────────────────────
  var FORM_ENDPOINT = '';                 // ← wire Formspree/Web3Forms here
  var CONTACT_EMAIL = 'info@layahome.cz'; // ← unverified placeholder
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    function setErr(id, show) {
      var f = form.querySelector('#' + id);
      var e = form.querySelector('#' + id + '-error');
      if (e) e.hidden = !show;
      if (f) f.setAttribute('aria-invalid', String(!!show));
    }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (form.querySelector('.hp input').value) return; // bot
      var fname = form.fname.value.trim();
      var email = form.email.value.trim();
      var msg = form.message.value.trim();
      var ok = true;
      setErr('fname', !fname); if (!fname) ok = false;
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setErr('email', !emailOk); if (!emailOk) ok = false;
      setErr('message', !msg); if (!msg) ok = false;
      if (!ok) {
        status.textContent = 'Zkontrolujte prosím označená pole.';
        status.className = 'form-status err';
        return;
      }
      var body = 'Jméno: ' + fname + ' ' + form.lname.value.trim() +
        '\nE-mail: ' + email + '\nTelefon: ' + form.phone.value.trim() +
        '\n\n' + msg;
      if (FORM_ENDPOINT) {
        status.textContent = 'Odesílám…'; status.className = 'form-status';
        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: fname, email: email, message: body }),
        }).then(function (r) {
          if (!r.ok) throw new Error();
          status.textContent = 'Děkuji, zpráva byla odeslána. Ozvu se Vám co nejdříve.';
          status.className = 'form-status ok';
          form.reset();
        }).catch(function () {
          status.textContent = 'Zprávu se nepodařilo odeslat — napište mi prosím přímo na ' + CONTACT_EMAIL + '.';
          status.className = 'form-status err';
        });
      } else {
        window.location.href = 'mailto:' + CONTACT_EMAIL +
          '?subject=' + encodeURIComponent('Poptávka — LAYA HOME') +
          '&body=' + encodeURIComponent(body);
        status.textContent = 'Otevírám Váš e-mailový program se zprávou…';
        status.className = 'form-status ok';
      }
    });
  }
})();
