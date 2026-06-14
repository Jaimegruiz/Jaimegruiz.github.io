// =============================================================
// src/data/site-data.ts — Fuente de verdad de Talleres El Corcho
// Para modificar datos del negocio edita SOLO este archivo.
// =============================================================

export interface PhoneEntry {
  display: string;
  href: string;
}

export interface WhatsAppEntry {
  display: string;
  href: string;
}

export interface ScheduleRow {
  day: string;
  morning: string | null;
  afternoon: string | null;
  continuous: string | null;
  closed: boolean;
}

export interface Schedule {
  label: string;
  period?: string;
  rows: ScheduleRow[];
}

export interface ServiceEntry {
  name: string;
  description: string;
  svg: string;
}

export interface SiteData {
  name: string;
  tagline: string;
  description: string;
  phone: PhoneEntry;
  mobile: WhatsAppEntry;
  email: string;
  fax: string;
  bookingUrl: string;
  mapsEmbedSrc: string;
  city: string;
  region: string;
  country: string;
  canonicalUrl: string;
  values: string[];
  stats: Array<{ number: string; label: string }>;
  services: ServiceEntry[];
  scheduleRegular: Schedule;
  scheduleSummer: Schedule;
  summerPeriod: { startMonth: number; startDay: number; endMonth: number; endDay: number };
  nav: Array<{ label: string; href: string }>;
}

export const site: SiteData = {
  name: 'Talleres El Corcho',
  tagline: 'Tu taller de confianza en Sanlúcar de Barrameda',
  description:
    'Taller mecánico familiar en Sanlúcar de Barrameda con más de 25 años de experiencia. Reparación, mantenimiento, ITV, neumáticos, frenos y mucho más.',

  phone:  { display: '956 36 00 75', href: 'tel:+34956360075' },
  mobile: { display: '667 40 24 26', href: 'https://wa.me/34667402426' },
  email:  'tallereselcorcho@gmail.com',
  fax:    '856 92 60 49',

  // URL de cita online — actualizar xcode si cambia
  bookingUrl: 'https://es.eurorepar.site/booking?xcode=X382601',

  // iframe de Google Maps — NO modificar sin verificar con el cliente
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.3128773937483!2d-6.346938683872299!3d36.76306097995634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0dde40165eac3b%3A0x4807934d1dcd0b76!2sTalleres%20El%20Corcho%2C%20C.B.%20EURO%20REPAR%20CAR%20SERVICE!5e0!3m2!1ses!2ses!4v1598527780466!5m2!1ses!2ses',

  city:         'Sanlúcar de Barrameda',
  region:       'Cádiz',
  country:      'ES',
  canonicalUrl: 'https://tallereselcorcho.es',

  values: ['Confianza', 'Rapidez', 'Calidad', 'Cercanía', 'Profesionalidad'],

  stats: [
    { number: '+25', label: 'Años de\nexperiencia' },
    { number: '12',  label: 'Servicios\nespecializados' },
    { number: '2ª',  label: 'Generación\nfamiliar' },
  ],

  // ─── Servicios ────────────────────────────────────────────
  // Para añadir un servicio: duplica una entrada y edita name, description y svg.
  // svg: contenido interno del elemento <svg> (paths, lines, circles, etc.)
  services: [
    {
      name: 'Baterías',
      description: 'Revisión y sustitución de baterías para asegurar un arranque fiable.',
      svg: `<rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="11" x2="6" y2="13"/><line x1="10" y1="11" x2="10" y2="13"/>`,
    },
    {
      name: 'Cambio de aceite',
      description: 'Mantenimiento periódico para proteger el motor y alargar su vida útil.',
      svg: `<path d="M12 2c0 0-6 6-6 12a6 6 0 0 0 12 0c0-6-6-12-6-12z"/><path d="M12 12c0 0-3 3-3 5a3 3 0 0 0 6 0c0-2-3-5-3-5z" fill="currentColor" stroke="none" opacity="0.25"/>`,
    },
    {
      name: 'Climatización',
      description: 'Revisión y recarga del aire acondicionado para un habitáculo confortable.',
      svg: `<line x1="12" y1="2" x2="12" y2="22"/><path d="M12 7l-3-3M12 7l3-3"/><path d="M12 17l-3 3M12 17l3 3"/><path d="M5.2 9.8L2 8M5.2 9.8l-.7-3.5"/><path d="M18.8 9.8L22 8M18.8 9.8l.7-3.5"/><path d="M5.2 14.2L2 16M5.2 14.2l-.7 3.5"/><path d="M18.8 14.2L22 16M18.8 14.2l.7 3.5"/>`,
    },
    {
      name: 'Distribución',
      description: 'Revisión y sustitución de la correa de distribución según especificaciones del fabricante.',
      svg: `<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><circle cx="12" cy="12" r="7" stroke-dasharray="3 3"/>`,
    },
    {
      name: 'Escapes',
      description: 'Reparación y sustitución de componentes del sistema de escape del vehículo.',
      svg: `<path d="M3 12h12"/><rect x="14" y="9" width="4" height="6" rx="1"/><path d="M18 11c1.5 0 3 .5 3 2s-1.5 2-3 2"/><path d="M18 11V9a2 2 0 0 0-2-2H9"/><path d="M16 19c0-1-1-2-1-3"/><path d="M19 17c0-1 1-2 1-3"/>`,
    },
    {
      name: 'Frenos',
      description: 'Revisión del sistema de frenado para una conducción segura y de confianza.',
      svg: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2a10 10 0 0 1 7.07 17.07"/><path d="M12 2a10 10 0 0 0-7.07 17.07"/>`,
    },
    {
      name: 'Mecánica',
      description: 'Diagnóstico y reparación de averías mecánicas en todo tipo de vehículos.',
      svg: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`,
    },
    {
      name: 'Neumáticos',
      description: 'Montaje, equilibrado y venta de neumáticos para todos los vehículos.',
      svg: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/>`,
    },
    {
      name: 'Pre-ITV',
      description: 'Revisión previa a la ITV para evitar suspensos y garantizar la homologación del vehículo.',
      svg: `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`,
    },
    {
      name: 'Revisión',
      description: 'Revisión periódica integral para mantener tu vehículo en perfecto estado.',
      svg: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
    },
    {
      name: 'Suspensión',
      description: 'Diagnóstico y reparación de la suspensión para una conducción cómoda y segura.',
      svg: `<line x1="12" y1="2" x2="12" y2="5"/><path d="M9 5h6"/><path d="M9 5c0 2 6 2 6 4s-6 2-6 4 6 2 6 4"/><path d="M9 17h6"/><line x1="12" y1="17" x2="12" y2="22"/>`,
    },
    {
      name: 'Visibilidad',
      description: 'Revisión de luces, limpiaparabrisas y todos los elementos de visibilidad del vehículo.',
      svg: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
    },
  ],

  // ─── Horarios ─────────────────────────────────────────────
  // Confirmado por el cliente: horario habitual 08:00-13:30 / 15:30-18:00
  scheduleRegular: {
    label: 'Horario habitual',
    rows: [
      { day: 'Lunes',      morning: '08:00–13:30', afternoon: '15:30–18:00', continuous: null, closed: false },
      { day: 'Martes',     morning: '08:00–13:30', afternoon: '15:30–18:00', continuous: null, closed: false },
      { day: 'Miércoles',  morning: '08:00–13:30', afternoon: '15:30–18:00', continuous: null, closed: false },
      { day: 'Jueves',     morning: '08:00–13:30', afternoon: '15:30–18:00', continuous: null, closed: false },
      { day: 'Viernes',    morning: '08:00–13:30', afternoon: '15:30–18:00', continuous: null, closed: false },
      { day: 'Sábado',     morning: null, afternoon: null, continuous: null, closed: true },
      { day: 'Domingo',    morning: null, afternoon: null, continuous: null, closed: true },
    ],
  },

  scheduleSummer: {
    label: 'Horario de verano',
    period: '15 Jun — 15 Sep',
    rows: [
      { day: 'Lunes',      morning: null, afternoon: null, continuous: '08:00–15:00', closed: false },
      { day: 'Martes',     morning: null, afternoon: null, continuous: '08:00–15:00', closed: false },
      { day: 'Miércoles',  morning: null, afternoon: null, continuous: '08:00–15:00', closed: false },
      { day: 'Jueves',     morning: null, afternoon: null, continuous: '08:00–15:00', closed: false },
      { day: 'Viernes',    morning: null, afternoon: null, continuous: '08:00–15:00', closed: false },
      { day: 'Sábado',     morning: null, afternoon: null, continuous: null, closed: true },
      { day: 'Domingo',    morning: null, afternoon: null, continuous: null, closed: true },
    ],
  },

  summerPeriod: {
    startMonth: 6, startDay: 15,
    endMonth:   9, endDay:   15,
  },

  nav: [
    { label: 'Inicio',          href: '#inicio' },
    { label: 'Servicios',       href: '#servicios' },
    { label: 'Sobre nosotros',  href: '#nosotros' },
    { label: 'Horarios',        href: '#horarios' },
    { label: 'Contacto',        href: '#contacto' },
  ],
};
