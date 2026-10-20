/* ==========================================================
   CHROMAFIT · Interacciones
   - Navbar sticky con blur al hacer scroll
   - Menú hamburguesa (móvil)
   - Sistema de 50 partículas en el hero
   - Flip cards: hover en escritorio, tap en móvil, Enter con teclado
   - Scroll reveal con Intersection Observer (stagger de 0.1 s)
   - Contadores animados
   - Parallax suave del brillo del hero
   - Formulario de demostración (sin envío real)
   ========================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Utilidad: debounce ---------- */
  function debounce(fn, wait) {
    var t;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  /* ---------- Año del footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Navbar sticky ---------- */
  var navbar = document.getElementById('navbar');
  var glowBg = document.querySelector('.hero-bg-glow');
  function onScroll() {
    var y = window.scrollY || 0;
    if (navbar) navbar.classList.toggle('scrolled', y > 40);
    // Parallax suave (0.3x) del brillo de fondo del hero
    if (glowBg && !reduceMotion && y < window.innerHeight * 1.2) {
      glowBg.style.transform = 'translateY(' + (y * 0.3) + 'px)';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById('menu-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      if (open && navbar) navbar.classList.add('scrolled');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
      }
    });
  }

  /* ---------- Partículas (50) ---------- */
  var particlesContainer = document.getElementById('particles');
  if (particlesContainer && !reduceMotion) {
    var particleCount = 50;
    for (var i = 0; i < particleCount; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = (Math.random() * -20) + 's';
      p.style.animationDuration = (15 + Math.random() * 10) + 's';
      var s = 1.5 + Math.random() * 2.5;
      p.style.width = p.style.height = s + 'px';
      particlesContainer.appendChild(p);
    }
  }

  /* ---------- Flip cards ---------- */
  var cards = document.querySelectorAll('.service-card-flip');
  var canHover = window.matchMedia('(hover: hover)').matches;
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      if (!canHover) card.classList.toggle('flipped');
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

  /* ---------- Contador animado ---------- */
  function formatNum(n) { return Math.round(n).toLocaleString('es-CL'); }
  function animateCounter(el, target, duration) {
    duration = duration || 2000;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = prefix + formatNum(target) + suffix; return; }
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var k = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = prefix + formatNum(target * eased) + suffix;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  // Valor final visible desde el inicio (por si el JS u observer no corren)
  counters.forEach(function (el) {
    el.textContent = (el.getAttribute('data-prefix') || '') + formatNum(+el.getAttribute('data-count')) + (el.getAttribute('data-suffix') || '');
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !reduceMotion) {
    var vh = window.innerHeight;
    // Solo se ocultan los que están bajo el pliegue al cargar
    reveals.forEach(function (el) {
      if (el.getBoundingClientRect().top > vh) el.classList.add('pre');
    });

    var observer = new IntersectionObserver(function (entries) {
      // Stagger de 0.1 s entre elementos que entran juntos
      var batch = entries.filter(function (e) { return e.isIntersecting; });
      batch.forEach(function (entry, index) {
        var el = entry.target;
        observer.unobserve(el);
        if (!el.classList.contains('pre')) return;
        setTimeout(function () {
          el.classList.remove('pre');
          el.classList.add('in');
          el.addEventListener('animationend', function done() {
            el.classList.remove('in');   // libera transform para los hover
            el.removeEventListener('animationend', done);
          });
        }, index * 100);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target, +entry.target.getAttribute('data-count'));
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  window.addEventListener('resize', debounce(function () {
    canHover = window.matchMedia('(hover: hover)').matches;
  }, 200));

  /* ---------- Formulario (demostración) ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#f-name');
      var email = form.querySelector('#f-email');
      var okName = name.value.trim().length > 1;
      var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      name.setAttribute('aria-invalid', okName ? 'false' : 'true');
      email.setAttribute('aria-invalid', okEmail ? 'false' : 'true');
      status.className = 'form-status';
      if (!okName || !okEmail) {
        status.textContent = !okName ? 'Escribe tu nombre para continuar.' : 'Revisa el correo: debe tener el formato nombre@dominio.cl.';
        status.classList.add('err');
        (!okName ? name : email).focus();
        return;
      }
      status.textContent = 'Gracias, ' + name.value.trim().split(' ')[0] + '. Este formulario es de demostración: los datos no se envían a ningún servidor.';
      status.classList.add('ok');
      form.reset();
    });
  }
})();
