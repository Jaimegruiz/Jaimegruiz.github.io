/**
 * script.js — Talleres El Corcho
 * ============================================================
 * Vanilla JS puro. Sin dependencias externas.
 * La web funciona correctamente aunque este script esté desactivado.
 *
 * Funcionalidades:
 *   1. Menú móvil (hamburguesa): abrir/cerrar
 *   2. Cerrar menú al pulsar un enlace
 *   3. Cerrar menú al pulsar la tecla Escape
 *   4. Añadir clase "scrolled" al header al hacer scroll
 *   5. Actualizar el año del copyright en el footer
 *   6. Detección automática del horario de verano activo
 *      (15 de junio – 15 de septiembre)
 * ============================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 1. MENÚ MÓVIL
  // ----------------------------------------------------------
  var toggle = document.getElementById('nav-toggle');
  var menu   = document.getElementById('nav-menu');

  if (toggle && menu) {

    /**
     * Abre o cierra el menú móvil y actualiza los atributos aria.
     */
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute(
        'aria-label',
        isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
      );
    });

    // --------------------------------------------------------
    // 2. CERRAR MENÚ AL PULSAR UN ENLACE
    // Mejora la experiencia en móvil al navegar a una sección.
    // --------------------------------------------------------
    var navLinks = menu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú de navegación');
      });
    });

    // --------------------------------------------------------
    // 3. CERRAR MENÚ CON LA TECLA ESCAPE
    // --------------------------------------------------------
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú de navegación');
        // Devolver el foco al botón hamburguesa
        toggle.focus();
      }
    });
  }


  // ----------------------------------------------------------
  // 4. CLASE "SCROLLED" EN EL HEADER
  // Añade sombra al header cuando el usuario hace scroll.
  // ----------------------------------------------------------
  var header = document.getElementById('site-header');

  if (header) {
    var SCROLL_THRESHOLD = 10; // píxeles de scroll antes de añadir la clase

    function actualizarHeader() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // passive: true mejora el rendimiento del scroll en móvil
    window.addEventListener('scroll', actualizarHeader, { passive: true });

    // Ejecutar al cargar por si la página ya está scrolleada
    actualizarHeader();
  }


  // ----------------------------------------------------------
  // 5. AÑO DEL FOOTER
  // Actualiza el año dinámicamente para no tener que editarlo manualmente.
  // ----------------------------------------------------------
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  // ----------------------------------------------------------
  // 6. DETECCIÓN DE HORARIO DE VERANO ACTIVO
  //
  // Periodo de verano: 15 de junio al 15 de septiembre (inclusive).
  // Si la fecha actual está en ese rango, muestra el banner de aviso.
  // El banner tiene el atributo [hidden] por defecto (HTML semántico).
  // Este script elimina dicho atributo si corresponde.
  //
  // Para cambiar el periodo: modifica las condiciones de la variable esVerano.
  // ----------------------------------------------------------
  var veranoBanner = document.getElementById('verano-activo');

  if (veranoBanner) {
    var hoy   = new Date();
    var mes   = hoy.getMonth() + 1; // getMonth() devuelve 0-11; sumamos 1
    var dia   = hoy.getDate();

    /*
     * Rango de verano:
     *   - Desde el 15 de junio (mes 6, día >= 15)
     *   - Todo julio (mes 7)
     *   - Todo agosto (mes 8)
     *   - Hasta el 15 de septiembre (mes 9, día <= 15)
     */
    var esVerano = (
      (mes === 6 && dia >= 15) ||
      (mes === 7)              ||
      (mes === 8)              ||
      (mes === 9 && dia <= 15)
    );

    if (esVerano) {
      // Quitar el atributo hidden para mostrar el banner
      veranoBanner.removeAttribute('hidden');
    }
  }


  // ----------------------------------------------------------
  // 7. INDICADOR "ABIERTO HOY" EN LOS HORARIOS
  // ----------------------------------------------------------
  var hoyDia = new Date().getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  
  // Buscar la tarjeta de horario activa
  var hoy = new Date();
  var mes = hoy.getMonth() + 1;
  var dia = hoy.getDate();
  var esVeranoActivo = (
    (mes === 6 && dia >= 15) ||
    (mes === 7)              ||
    (mes === 8)              ||
    (mes === 9 && dia <= 15)
  );

  var activeCardSelector = esVeranoActivo ? '.horario-card--verano' : '.horario-card:not(.horario-card--verano)';
  var activeCard = document.querySelector(activeCardSelector);
  
  if (activeCard) {
    // Buscar la fila correspondiente al día actual
    var row = activeCard.querySelector('tr[data-day="' + hoyDia + '"]');
    if (row) {
      row.classList.add('is-today');
    }
  }


  // ----------------------------------------------------------
  // 8. NAVIGATION SCROLL SPY
  // ----------------------------------------------------------
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

  if (sections.length > 0 && navLinks.length > 0) {
    var headerHeight = header ? header.offsetHeight : 72;

    function updateActiveNavLink() {
      var scrollPosition = window.scrollY || document.documentElement.scrollTop;
      var currentSectionId = '';

      // Determinar qué sección está actualmente en vista
      sections.forEach(function (section) {
        var sectionTop = section.offsetTop - headerHeight - 20; // offset de 20px para mejorar la activación
        var sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      // Si el scroll está casi al final, forzar activación de "contacto"
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10) {
        currentSectionId = 'contacto';
      }

      // Si está arriba del todo, forzar "inicio"
      if (scrollPosition < 50) {
        currentSectionId = 'inicio';
      }

      // Asignar clase active
      navLinks.forEach(function (link) {
        link.classList.remove('nav-link--active');
        if (link.getAttribute('href') === '#' + currentSectionId) {
          link.classList.add('nav-link--active');
        }
      });
    }

    // Escuchar scroll (passive: true mejora el rendimiento)
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    
    // Ejecutar al cargar la página
    updateActiveNavLink();
  }

})();
