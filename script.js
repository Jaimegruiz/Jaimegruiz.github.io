/**
 * script.js — Talleres El Corcho
 * ============================================================
 * Vanilla JS puro. Sin dependencias externas ni librerías pesadas.
 * Carga ultrarrápida, 100% compatible con GitHub Pages y accesible.
 *
 * Funcionalidades:
 *   1. Menú móvil (hamburguesa accesible): abrir/cerrar
 *   2. Cerrar menú al pulsar un enlace
 *   3. Cerrar menú con tecla Escape
 *   4. Clase "scrolled" en header con detección de scroll pasiva
 *   5. Actualización dinámica del año en el footer
 *   6. Detección automática del periodo de horario de verano (15 jun – 15 sep)
 *   7. Marcado visual del día actual en la tabla de horarios
 *   8. Widget de estado en tiempo real (Abierto / Cerrado ahora)
 *   9. Filtro interactivo de servicios por categoría
 *  10. Navigation Scroll Spy (enlace activo según posición de lectura)
 * ============================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 1. MENÚ MÓVIL
  // ----------------------------------------------------------
  var toggle = document.getElementById('nav-toggle');
  var menuWrapper = document.getElementById('nav-menu-wrapper');
  var menuLinks = document.getElementById('nav-menu');

  if (toggle && menuWrapper) {
    toggle.addEventListener('click', function () {
      var isOpen = menuWrapper.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute(
        'aria-label',
        isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
      );
    });

    // Cerrar menú al pulsar un enlace
    if (menuLinks) {
      var links = menuLinks.querySelectorAll('a');
      links.forEach(function (link) {
        link.addEventListener('click', function () {
          menuWrapper.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Abrir menú de navegación');
        });
      });
    }

    // Cerrar menú con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuWrapper.classList.contains('is-open')) {
        menuWrapper.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú de navegación');
        toggle.focus();
      }
    });
  }


  // ----------------------------------------------------------
  // 2. HEADER SCROLL SHADOW
  // ----------------------------------------------------------
  var header = document.getElementById('site-header');
  if (header) {
    var SCROLL_THRESHOLD = 15;
    function actualizarHeader() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    var hdrTicking = false;
    window.addEventListener('scroll', function () {
      if (!hdrTicking) {
        hdrTicking = true;
        requestAnimationFrame(function () { actualizarHeader(); hdrTicking = false; });
      }
    }, { passive: true });
    actualizarHeader();
  }


  // ----------------------------------------------------------
  // 3. AÑO DEL FOOTER
  // ----------------------------------------------------------
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  // ----------------------------------------------------------
  // 4. DETECCIÓN DE HORARIO DE VERANO ACTIVO (15 Jun – 15 Sep)
  // ----------------------------------------------------------
  var hoy = new Date();
  var mes = hoy.getMonth() + 1; // 1-12
  var dia = hoy.getDate();

  var esVerano = (
    (mes === 6 && dia >= 15) ||
    (mes === 7)              ||
    (mes === 8)              ||
    (mes === 9 && dia <= 15)
  );


  // Solo se muestra el horario vigente; el otro queda como nota tenue
  var slotsHabitual = document.getElementById('slots-habitual');
  var slotsVerano   = document.getElementById('slots-verano');
  var hTitle = document.getElementById('horario-title');
  var hSub   = document.getElementById('horario-sub');
  var hBadge = document.getElementById('horario-badge');
  var hNote  = document.getElementById('horario-note');
  var hIcon  = document.querySelector('#horario-card .horario-icon');

  if (slotsHabitual && slotsVerano) {
    slotsHabitual.hidden = esVerano;
    slotsVerano.hidden   = !esVerano;
    if (esVerano) {
      hTitle.textContent = 'Horario de verano';
      hSub.textContent   = 'Lunes a viernes · Jornada continua';
      hBadge.hidden = false;
      hNote.textContent  = 'Resto del año: jornada partida, de 08:00 a 13:30 y de 15:30 a 18:00 h.';
      if (hIcon) {
        hIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
      }
    }
  }


  // ----------------------------------------------------------
  // 5. MARCADO DEL DÍA ACTUAL EN LA SEMANA
  // ----------------------------------------------------------
  var hoyDia = hoy.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  var todayChip = document.querySelector('.week-day[data-day="' + hoyDia + '"]');
  if (todayChip) {
    todayChip.classList.add('is-today');
    todayChip.setAttribute('aria-label', todayChip.getAttribute('aria-label') + ' (hoy)');
  }

  // ----------------------------------------------------------
  // 6. WIDGET DE ESTADO EN TIEMPO REAL ("Abierto / Cerrado ahora")
  // ----------------------------------------------------------
  var statusWidget = document.getElementById('status-widget');
  var statusTitle  = document.getElementById('status-title');
  var statusDesc   = document.getElementById('status-desc');

  function calcularEstadoTaller() {
    if (!statusWidget || !statusTitle || !statusDesc) return;

    var ahora = new Date();
    var diaSemana = ahora.getDay(); // 0 Dom, 1 Lun, 2 Mar, 3 Mie, 4 Jue, 5 Vie, 6 Sab
    var minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();

    var estaAbierto = false;
    var textoTitulo = '';
    var textoDesc = '';

    // Comprobar si es fin de semana
    if (diaSemana === 0 || diaSemana === 6) {
      estaAbierto = false;
      textoTitulo = 'Cerrado';
      textoDesc = 'Abrimos el lunes a las 08:00 h';
    } else if (esVerano) {
      // HORARIO DE VERANO: 08:00 (480 min) a 15:00 (900 min)
      var aperturaVerano = 8 * 60;   // 08:00
      var cierreVerano   = 15 * 60;  // 15:00

      if (minutosActuales >= aperturaVerano && minutosActuales < cierreVerano) {
        estaAbierto = true;
        textoTitulo = 'Abierto ahora';
        textoDesc = 'Hoy estamos hasta las 15:00 h (horario de verano)';
      } else if (minutosActuales < aperturaVerano) {
        estaAbierto = false;
        textoTitulo = 'Cerrado';
        textoDesc = 'Abrimos hoy a las 08:00 h';
      } else {
        estaAbierto = false;
        if (diaSemana === 5) {
          textoTitulo = 'Cerrado por hoy';
          textoDesc = 'Abrimos el lunes a las 08:00 h';
        } else {
          textoTitulo = 'Cerrado por hoy';
          textoDesc = 'Abrimos mañana a las 08:00 h';
        }
      }
    } else {
      // HORARIO HABITUAL: 08:00 - 13:30 (810 min) y 15:30 (930 min) - 18:00 (1080 min)
      var mMananaApertura = 8 * 60;         // 08:00
      var mMananaCierre   = 13 * 60 + 30;   // 13:30
      var mTardeApertura  = 15 * 60 + 30;   // 15:30
      var mTardeCierre    = 18 * 60;        // 18:00

      if (minutosActuales >= mMananaApertura && minutosActuales < mMananaCierre) {
        estaAbierto = true;
        textoTitulo = 'Abierto ahora';
        textoDesc = 'Mañana hasta las 13:30 h · Tarde de 15:30 a 18:00 h';
      } else if (minutosActuales >= mMananaCierre && minutosActuales < mTardeApertura) {
        estaAbierto = false;
        textoTitulo = 'Cerrado al mediodía';
        textoDesc = 'Volvemos a abrir hoy a las 15:30 h';
      } else if (minutosActuales >= mTardeApertura && minutosActuales < mTardeCierre) {
        estaAbierto = true;
        textoTitulo = 'Abierto ahora';
        textoDesc = 'Estamos abiertos hasta las 18:00 h';
      } else if (minutosActuales < mMananaApertura) {
        estaAbierto = false;
        textoTitulo = 'Cerrado';
        textoDesc = 'Abrimos hoy a las 08:00 h';
      } else {
        estaAbierto = false;
        if (diaSemana === 5) {
          textoTitulo = 'Cerrado';
          textoDesc = 'Abrimos el lunes a las 08:00 h';
        } else {
          textoTitulo = 'Cerrado por hoy';
          textoDesc = 'Abrimos mañana a las 08:00 h';
        }
      }
    }

    if (estaAbierto) {
      statusWidget.classList.add('is-open');
      statusWidget.classList.remove('is-closed');
    } else {
      statusWidget.classList.add('is-closed');
      statusWidget.classList.remove('is-open');
    }

    statusTitle.textContent = textoTitulo;
    statusDesc.textContent  = textoDesc;
  }

  calcularEstadoTaller();


  // ----------------------------------------------------------
  // 7. FILTRADO INTERACTIVO DE SERVICIOS
  // ----------------------------------------------------------
  var filterButtons = document.querySelectorAll('.filter-btn');
  var serviceCards  = document.querySelectorAll('.service-card');

  if (filterButtons.length > 0 && serviceCards.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var selectedFilter = this.getAttribute('data-filter');

        // Actualizar botón activo
        filterButtons.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        this.classList.add('is-active');
        this.setAttribute('aria-selected', 'true');

        // Filtrar tarjetas
        serviceCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          if (selectedFilter === 'all' || category === selectedFilter) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }


  // ----------------------------------------------------------
  // 8. NAVIGATION SCROLL SPY
  // ----------------------------------------------------------
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    var navHeight = header ? header.offsetHeight : 72;

    function updateActiveNavLink() {
      var scrollPosition = window.scrollY || document.documentElement.scrollTop;
      var currentSectionId = '';

      sections.forEach(function (section) {
        var sectionTop = section.offsetTop - navHeight - 30;
        var sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20) {
        currentSectionId = 'contacto';
      }

      if (scrollPosition < 80) {
        currentSectionId = 'inicio';
      }

      navLinks.forEach(function (link) {
        link.classList.remove('nav-link--active');
        if (link.getAttribute('href') === '#' + currentSectionId) {
          link.classList.add('nav-link--active');
        }
      });
    }

    var spyTicking = false;
    window.addEventListener('scroll', function () {
      if (!spyTicking) {
        spyTicking = true;
        requestAnimationFrame(function () { updateActiveNavLink(); spyTicking = false; });
      }
    }, { passive: true });
    updateActiveNavLink();
  }

  // ----------------------------------------------------------
  // 9. ANIMACIONES (reveal, contadores, progreso, spotlight, tilt)
  //    Respetan prefers-reduced-motion.
  // ----------------------------------------------------------
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer  = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 9.1 Reveal al hacer scroll con escalonado
  var revealGroups = [
    ['.section-header', 0],
    ['.servicios-filters', 0],
    ['.service-card', 60],
    ['.servicios-cta-banner', 0],
    ['.nosotros-text > *', 90],
    ['.nos-card', 120],
    ['.valor-item', 70],
    ['.live-status-container', 0],
    ['.horario-card', 120],
    ['.contacto-card', 90],
    ['.hero-stat-card', 100]
  ];
  var revealEls = [];
  revealGroups.forEach(function (g) {
    document.querySelectorAll(g[0]).forEach(function (el, i) {
      el.classList.add('reveal');
      // Escalonado por posición dentro de su grupo (máx. 6 pasos)
      el.style.setProperty('--delay', (Math.min(i % 6, 5) * g[1]) + 'ms');
      revealEls.push(el);
    });
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  // 9.2 Contadores animados en las estadísticas del hero y de "nosotros"
  function animateCount(el) {
    var original = el.textContent.trim();
    var match = original.match(/^(\D*)(\d+)(\D*)$/);
    if (!match || reduceMotion) return;
    var prefix = match[1], target = parseInt(match[2], 10), suffix = match[3];
    var duration = 1400, start = null;
    el.setAttribute('aria-label', original);
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = original;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('.hero-stat-number, .nos-card-number');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  // 9.3 Barra de progreso de scroll
  var progressBar = document.querySelector('.scroll-progress');
  if (progressBar && !reduceMotion) {
    var ticking = false;
    function updateProgress() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progressBar.style.setProperty('--scroll', ratio.toFixed(4));
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
    }, { passive: true });
    updateProgress();
  }

  // 9.4 Spotlight en tarjetas de servicio y contacto (solo puntero fino)
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.service-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    // 9.5 Inclinación 3D suave de la tarjeta del hero
    var heroCard = document.querySelector('.hero-card-featured');
    if (heroCard) {
      heroCard.addEventListener('pointermove', function (e) {
        var r = heroCard.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        heroCard.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg');
        heroCard.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
      });
      heroCard.addEventListener('pointerleave', function () {
        heroCard.style.setProperty('--ry', '0deg');
        heroCard.style.setProperty('--rx', '0deg');
      });
    }
  }

  // 9.6 Animación al filtrar servicios (reaparición escalonada)
  var filterBar = document.querySelector('.servicios-filters');
  if (filterBar && !reduceMotion) {
    filterBar.addEventListener('click', function (e) {
      if (!e.target.closest('.filter-btn')) return;
      var n = 0;
      serviceCards.forEach(function (card) {
        card.classList.remove('is-filtering-in');
        if (!card.classList.contains('is-hidden')) {
          card.style.setProperty('--delay', (n++ * 45) + 'ms');
          void card.offsetWidth; // reinicia la animación
          card.classList.add('is-filtering-in');
        }
      });
    });
  }

  // ----------------------------------------------------------
  // 10. ENGRANAJES DE FONDO DEL HERO
  //     Tres engranajes encajados (SVG generado una vez; giran solo con CSS).
  //     Se pausan cuando el hero no es visible o la pestaña está oculta.
  // ----------------------------------------------------------
  var gearsHost = document.getElementById('hero-gears');
  if (gearsHost) {
    var SCENE_W = 800, SCENE_H = 720, MODULE = 14, NS = 'http://www.w3.org/2000/svg';
    var mod360 = function (v, m) { return ((v % m) + m) % m; };

    function gearPath(n, rp) {
      var outer = rp + MODULE, root = rp - 1.25 * MODULE, pitch = 2 * Math.PI / n;
      var wRoot = pitch * 0.30, wTip = pitch * 0.15, d = '';
      for (var k = 0; k < n; k++) {
        var c = k * pitch;
        var p = [
          [root, c - wRoot], [outer, c - wTip], [outer, c + wTip], [root, c + wRoot]
        ].map(function (q) { return [(q[0] * Math.cos(q[1])).toFixed(2), (q[0] * Math.sin(q[1])).toFixed(2)]; });
        var next = (k + 1) * pitch - wRoot;
        var nx = (root * Math.cos(next)).toFixed(2), ny = (root * Math.sin(next)).toFixed(2);
        d += (k === 0 ? 'M' : 'L') + p[0].join(',') + ' L' + p[1].join(',') + ' L' + p[2].join(',') +
             ' L' + p[3].join(',') + ' A' + root + ',' + root + ' 0 0 1 ' + nx + ',' + ny + ' ';
      }
      return d + 'Z';
    }

    function buildGear(g) {
      var outer = g.rp + MODULE, size = outer * 2, root = g.rp - 1.25 * MODULE;
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', -outer + ' ' + -outer + ' ' + size + ' ' + size);
      svg.setAttribute('class', 'gear');
      svg.style.left   = ((g.cx - outer) / SCENE_W * 100).toFixed(3) + '%';
      svg.style.top    = ((g.cy - outer) / SCENE_H * 100).toFixed(3) + '%';
      svg.style.width  = (size / SCENE_W * 100).toFixed(3) + '%';
      svg.style.setProperty('--a0', g.a0.toFixed(2) + 'deg');
      svg.style.setProperty('--dur', g.dur.toFixed(1) + 's');
      svg.style.setProperty('--dir', g.dir);
      var body = document.createElementNS(NS, 'path');
      body.setAttribute('d', gearPath(g.n, g.rp));
      body.setAttribute('class', 'gear-body');
      svg.appendChild(body);
      var ring = document.createElementNS(NS, 'circle');
      ring.setAttribute('r', (root * 0.72).toFixed(1));
      ring.setAttribute('class', 'gear-soft');
      svg.appendChild(ring);
      var hub = document.createElementNS(NS, 'circle');
      hub.setAttribute('r', (root * 0.2).toFixed(1));
      svg.appendChild(hub);
      for (var i = 0; i < 6; i++) {          // agujeros de aligeramiento
        var hole = document.createElementNS(NS, 'circle'), a = i * Math.PI / 3;
        hole.setAttribute('r', (root * 0.14).toFixed(1));
        hole.setAttribute('cx', (Math.cos(a) * root * 0.46).toFixed(1));
        hole.setAttribute('cy', (Math.sin(a) * root * 0.46).toFixed(1));
        hole.setAttribute('class', 'gear-soft');
        svg.appendChild(hole);
      }
      return svg;
    }

    // Cadena A → B → C con fase de dientes calculada para que encajen.
    var A = { n: 24, cx: 560, cy: 250 }; A.rp = A.n * MODULE / 2;
    var B = { n: 14 }; B.rp = B.n * MODULE / 2;
    var C = { n: 18 }; C.rp = C.n * MODULE / 2;
    var thetaAB = 150, thetaBC = 80, rad = Math.PI / 180;
    B.cx = A.cx + (A.rp + B.rp) * Math.cos(thetaAB * rad);
    B.cy = A.cy + (A.rp + B.rp) * Math.sin(thetaAB * rad);
    C.cx = B.cx + (B.rp + C.rp) * Math.cos(thetaBC * rad);
    C.cy = B.cy + (B.rp + C.rp) * Math.sin(thetaBC * rad);
    var pA = 360 / A.n, pB = 360 / B.n, pC = 360 / C.n;
    A.a0 = thetaAB;                                     // diente de A apunta a B
    var fA = mod360(thetaAB - A.a0, pA) / pA;
    var fB = mod360(0.5 - fA, 1);
    B.a0 = thetaAB + 180 - fB * pB;
    var fB2 = mod360(thetaBC - B.a0, pB) / pB;
    var fC = mod360(0.5 - fB2, 1);
    C.a0 = thetaBC + 180 - fC * pC;
    var baseDur = 110;                                  // segundos por vuelta de A
    A.dur = baseDur;               A.dir = 'normal';
    B.dur = baseDur * B.n / A.n;   B.dir = 'reverse';
    C.dur = baseDur * C.n / A.n;   C.dir = 'normal';
    [A, B, C].forEach(function (g) { gearsHost.appendChild(buildGear(g)); });

    // Pausar fuera de pantalla / pestaña oculta
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        gearsHost.classList.toggle('is-paused', !entries[0].isIntersecting);
      }, { threshold: 0 }).observe(document.getElementById('inicio'));
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) gearsHost.classList.add('is-paused');
      else gearsHost.classList.remove('is-paused');
    });
  }

})();