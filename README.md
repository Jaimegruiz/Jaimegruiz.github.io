# Talleres El Corcho — Web estática one pager

Web corporativa moderna, responsive y de alto rendimiento para el taller mecánico familiar **Talleres El Corcho** (Euro Repar Car Service), ubicado en Sanlúcar de Barrameda (Cádiz).

Construida con HTML5, CSS3 y JavaScript vanilla puro. Sin frameworks ni dependencias externas.

---

## Descripción del proyecto

One pager estático diseñado para transmitir confianza, cercanía, experiencia y profesionalidad técnica. Pensado para ser fácil de mantener tanto por personas como por agentes IA.


## Estructura de archivos

```
/
├── index.html                           # Página principal (one pager completo)
├── styles.css                           # Estilos CSS (mobile first)
├── script.js                            # JavaScript vanilla (menú, año, horario verano)
├── README.md                            # Este fichero
```

---

## Cómo abrir la web

Abre `index.html` directamente en cualquier navegador moderno. No requiere servidor.

---

## Cómo modificar servicios

Los servicios se encuentran en `index.html`, dentro de `<section id="servicios">`.

Cada servicio es un `<article class="service-card">` con tres partes:

```html
<article class="service-card">
  <div class="service-card-icon" aria-hidden="true">
    <!-- SVG inline del icono -->
  </div>
  <h3 class="service-card-title">Nombre del servicio</h3>
  <p class="service-card-desc">Descripción breve del servicio.</p>
</article>
```

- **Añadir servicio:** duplica un bloque `<article class="service-card">` y edita icono, título y descripción.
- **Eliminar servicio:** borra el bloque `<article class="service-card">` completo.
- **Cambiar descripción:** edita el texto del `<p class="service-card-desc">`.

---

## Cómo modificar horarios

Los horarios están en `index.html`, dentro de `<section id="horarios">`.

**Horario habitual:** tabla en la primera `.horario-card` (sin clase `--verano`).
**Horario de verano:** tabla en la segunda `.horario-card--verano`.

Edita los valores `<td>` directamente en cada fila de la tabla.

La detección automática del periodo de verano activo está en `script.js`, sección 6. Para cambiar las fechas del periodo (actualmente 15 jun – 15 sep), modifica las condiciones de la variable `esVerano`:

```js
var esVerano = (
  (mes === 6 && dia >= 15) || // ← cambiar 15 por otro día de inicio
  (mes === 7)              ||
  (mes === 8)              ||
  (mes === 9 && dia <= 15)    // ← cambiar 15 por otro día de fin
);
```

---

## Cómo modificar datos de contacto

Los datos de contacto aparecen en múltiples puntos de `index.html`. Usa **Buscar y reemplazar** para actualizarlos todos a la vez.

| Dato | Buscar en el archivo |
|------|---------------------|
| Teléfono principal | `tel:+34956360075` y `956 36 00 75` |
| Móvil / WhatsApp   | `wa.me/34667402426` y `667 40 24 26` |
| Email              | `tallereselcorcho@gmail.com` |
| Fax                | `856 92 60 49` |

Los comentarios en el HTML indican exactamente qué actualizar:
- `<!-- Teléfono principal: actualizar... -->`
- `<!-- Móvil/WhatsApp: actualizar... -->`
- `<!-- Email: actualizar... -->`

---

## Cómo cambiar la URL de cita online

La URL de reserva online actual es:

```
https://es.eurorepar.site/booking?xcode=X382601
```

Aparece en **5 lugares** de `index.html`: navegación, hero, sección contacto (botón), sección contacto (botón "Solicitar una cita") y footer.

Para actualizar todas las instancias a la vez, usa **Buscar y reemplazar**:
- Busca: `https://es.eurorepar.site/booking?xcode=X382601`
- Reemplaza por: la nueva URL completa

También aparece el comentario `<!-- URL de cita: actualizar xcode si cambia -->` en cada instancia.

---

## Cómo cambiar el iframe de Google Maps

El iframe está en `index.html`, dentro de `<section id="contacto">`, en el elemento `<div class="map-responsive">`.

Sustituye únicamente el atributo `src` del `<iframe>` por la nueva URL de embed de Google Maps. Mantén el resto de atributos:

```html
<iframe
  src="NUEVA_URL_DE_GOOGLE_MAPS"
  width="100%"
  height="100%"
  frameborder="0"
  style="border: 0;"
  allowfullscreen
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Ubicación de Talleres El Corcho en Google Maps"
  aria-label="Mapa de Google Maps mostrando la ubicación..."
></iframe>
```

Para obtener una nueva URL de embed: Google Maps → compartir → incorporar mapa → copiar src del iframe.

---

## Cómo publicar en GitHub Pages

1. Crea un repositorio público en [github.com](https://github.com).
2. Sube los archivos `index.html`, `styles.css` y `script.js` a la rama `main`.
3. Ve a **Settings → Pages** del repositorio.
4. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
5. Guarda. La web estará disponible en:
   ```
   https://<tu-usuario>.github.io/<nombre-del-repositorio>/
   ```

El archivo `README.md` no es necesario subirlos para el funcionamiento de la web, pero pueden incluirse para mantener el contexto del proyecto.

---

## Estructura del CSS (para búsqueda rápida)

El fichero `styles.css` está organizado en secciones numeradas. Busca el número para ir directamente:

| Sección | Contenido |
|---------|-----------|
| `1.` | Variables CSS (`:root`) |
| `2.` | Reset y base |
| `3.` | Utilidades globales (contenedor, sección, títulos) |
| `4.` | Botones |
| `5.` | Header / navegación |
| `6.` | Hero |
| `7.` | Servicios |
| `8.` | Sobre nosotros |
| `9.` | Horarios |
| `10.` | Contacto |
| `11.` | Footer |
| `12.` | Media queries — Tablet (≥ 640px) |
| `13.` | Media queries — Desktop (≥ 960px) |
| `14.` | Media queries — Desktop grande (≥ 1200px) |
| `15.` | Accesibilidad |

Para cambiar colores: edita las variables en `:root` (sección 1 de `styles.css`).
Para cambiar el color de acento rojo: busca `--color-accent`.

---

## Notas para futuros agentes IA

- **No inventar** datos de contacto, horarios, servicios ni ubicación no presentes en el Markdown.
- La URL real de cita online es `https://es.eurorepar.site/booking?xcode=X382601`. No modificar sin confirmación.
- El iframe de Google Maps es el proporcionado en el Markdown. No sustituir por otro sin verificar.
- El código **no está minificado** deliberadamente para facilitar el mantenimiento por agentes IA y humanos.
- `script.js` está completamente comentado. Leerlo antes de modificarlo.
- `styles.css` usa comentarios de sección numerados. Útiles para localización rápida.
- Los comentarios en `index.html` indican exactamente qué campos hay que actualizar si cambian los datos del negocio.
- El diseño es **mobile first**. Breakpoints: 640px (tablet), 960px (desktop), 1200px (desktop XL).
- No añadir librerías externas sin justificación clara. El proyecto funciona sin dependencias.
- La web funciona correctamente **aunque JavaScript esté desactivado** (el JS solo añade mejoras no críticas).
