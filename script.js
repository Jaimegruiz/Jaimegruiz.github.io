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
    window.addEventListener('scroll', actualizarHeader, { passive: true });
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

  var veranoBanner = document.getElementById('verano-activo');
  if (veranoBanner && esVerano) {
    veranoBanner.removeAttribute('hidden');
  }


  // ----------------------------------------------------------
  // 5. MARCADO DEL DÍA ACTUAL EN LAS TABLAS DE HORARIOS
  // ----------------------------------------------------------
  var hoyDia = hoy.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  var activeCardSelector = esVerano ? '#card-horario-verano' : '#card-horario-habitual';
  var activeCard = document.querySelector(activeCardSelector);

  if (activeCard) {
    var row = activeCard.querySelector('tr[data-day="' + hoyDia + '"]');
    if (row) {
      row.classList.add('is-today');
    }
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
      textoTitulo = 'Cerrado en este momento';
      textoDesc = 'Abrimos el lunes a las 08:00 h';
    } else if (esVerano) {
      // HORARIO DE VERANO: 08:00 (480 min) a 15:00 (900 min)
      var aperturaVerano = 8 * 60;   // 08:00
      var cierreVerano   = 15 * 60;  // 15:00

      if (minutosActuales >= aperturaVerano && minutosActuales < cierreVerano) {
        estaAbierto = true;
        textoTitulo = 'Abierto ahora';
        textoDesc = 'Horario de verano continuo hasta las 15:00 h';
      } else if (minutosActuales < aperturaVerano) {
        estaAbierto = false;
        textoTitulo = 'Cerrado en este momento';
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
        textoDesc = 'Turno de mañana hasta las 13:30 (Tarde de 15:30 a 18:00)';
      } else if (minutosActuales >= mMananaCierre && minutosActuales < mTardeApertura) {
        estaAbierto = false;
        textoTitulo = 'Cerrado al mediodía';
        textoDesc = 'Reanudamos atención hoy a las 15:30 h';
      } else if (minutosActuales >= mTardeApertura && minutosActuales < mTardeCierre) {
        estaAbierto = true;
        textoTitulo = 'Abierto ahora';
        textoDesc = 'Turno de tarde hasta las 18:00 h';
      } else if (minutosActuales < mMananaApertura) {
        estaAbierto = false;
        textoTitulo = 'Cerrado en este momento';
        textoDesc = 'Abrimos hoy a las 08:00 h';
      } else {
        estaAbierto = false;
        if (diaSemana === 5) {
          textoTitulo = 'Cerrado por el fin de semana';
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

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();
  }

})();
