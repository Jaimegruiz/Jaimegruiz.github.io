# Talleres El Corcho — Sitio web oficial

Sitio web del taller mecánico **Talleres El Corcho**, en Sanlúcar de Barrameda (Cádiz).
Construido con **Astro** + **Tailwind CSS**.

---

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| [Astro](https://astro.build) | ^4 | Framework web estático |
| [Tailwind CSS](https://tailwindcss.com) | ^3 | Framework de estilos |
| JavaScript vanilla | — | Menú, mapa y detección de verano |

---

## Estructura del proyecto

```
src/
  components/
    Header.astro       — Navegación fija con menú hamburguesa
    Hero.astro         — Sección hero con CTAs
    Services.astro     — Grid de 12 tarjetas de servicio
    About.astro        — Sobre nosotros y valores
    Hours.astro        — Horarios + banner de verano
    Contact.astro      — Datos de contacto y botones
    MapConsent.astro   — Google Maps carga bajo demanda
    Footer.astro       — Footer con copyright dinámico
  layouts/
    BaseLayout.astro   — HTML shell, SEO, Open Graph, JSON-LD
  pages/
    index.astro        — Página principal
    aviso-legal.astro  — Aviso legal (pendiente de completar)
    privacidad.astro   — Política de privacidad (pendiente)
    cookies.astro      — Política de cookies (pendiente)
  data/
    site-data.ts       — ⭐ Fuente de verdad de todos los datos
  styles/
    global.css         — Directivas Tailwind + estilos base

public/
  images/              — Logos (header, mobile, footer)
  favicon.svg
  CNAME                — tallereselcorcho.es
  .nojekyll            — Deshabilita Jekyll en GitHub Pages
```

---

## Instalación y comandos

> **Requisito:** Node.js ≥ 18. En este equipo, la versión del sistema (v12) es demasiado antigua.
> Se descargó Node 20 LTS portable en `C:\Users\U351759\AppData\Local\node20\node-v20.19.3-win-x64\`.
>
> Si nvm funciona en un terminal con permisos de admin, ejecuta primero:
> ```
> nvm install 20
> nvm use 20
> ```
> Si no, usa el Node portable con el prefijo de ruta indicado abajo.

```bash
# Instalar dependencias (con Node 20 portable si el sistema tiene Node < 18)
$env:PATH = "C:\Users\U351759\AppData\Local\node20\node-v20.19.3-win-x64;$env:PATH"
npm install

# Servidor de desarrollo (http://localhost:4321)
npm run dev

# Generar build de producción → dist/
npm run build

# Previsualizar el build localmente
npm run preview
```

---

## Cómo modificar datos del negocio

**Edita SOLO el fichero `src/data/site-data.ts`.**
No necesitas tocar ningún componente.

### Cambiar teléfono

```ts
phone: { display: '956 36 00 75', href: 'tel:+34956360075' },
```

### Cambiar móvil / WhatsApp

```ts
mobile: { display: '667 40 24 26', href: 'https://wa.me/34667402426' },
```

### Cambiar email

```ts
email: 'tallereselcorcho@gmail.com',
```

### Cambiar URL de cita online

```ts
bookingUrl: 'https://es.eurorepar.site/booking?xcode=X382601',
```
Busca `xcode=` en `site-data.ts` y actualiza el valor.

### Cambiar Google Maps

```ts
mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=...',
```
Obtén la URL del iframe desde Google Maps → "Compartir" → "Insertar mapa" → copia la `src`.

### Añadir o quitar servicios

En el array `services` de `site-data.ts`, duplica una entrada y edita `name`, `description` y `svg` (el SVG interno del icono).

### Cambiar horarios

En `scheduleRegular.rows` y `scheduleSummer.rows` edita los valores de `morning`, `afternoon` y `continuous`.
El periodo de verano se define en `summerPeriod` (meses y días de inicio/fin).

---

## Publicar en GitHub Pages

1. El branch `astro` debe tener GitHub Actions configurado para construir y desplegar.
2. Ejecutar `npm run build` genera `dist/`.
3. El archivo `dist/CNAME` contiene `tallereselcorcho.es` (se copia automáticamente desde `public/`).
4. El archivo `dist/.nojekyll` deshabilita Jekyll (también copiado desde `public/`).
5. En la configuración del repositorio GitHub → Pages → seleccionar el branch y directorio correctos.

Workflow de ejemplo (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [astro]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v4
        with:
          folder: dist
```

---

## Fuentes de datos

- Fuente principal de datos del negocio: `src/data/site-data.ts`
- Fuente documental original (no versionada): `sample-web-convertido-actualizado.md`
- El horario habitual (L-V 08:00–13:30 / 15:30–18:00) fue confirmado directamente por el cliente en junio de 2026.

---

## Notas para futuros agentes IA

- **No inventar datos**: usa exclusivamente `src/data/site-data.ts` como fuente.
- **No modificar la URL del mapa** de Google Maps sin verificar con el cliente.
- **No modificar la URL de cita online** (`bookingUrl`) sin verificar el `xcode`.
- Las páginas legales (`aviso-legal`, `privacidad`, `cookies`) están estructuradas con `<!-- TODO -->` para que un abogado complete el texto.
- El mapa de Google Maps se carga solo tras interacción del usuario (componente `MapConsent.astro`). No cambiar este comportamiento.
- La detección del horario de verano se hace en el cliente (JavaScript), no en build-time, porque el sitio es estático en GitHub Pages.
- El breakpoint `desk` (960px) es un custom breakpoint de Tailwind donde el menú de navegación cambia de hamburguesa a horizontal.
