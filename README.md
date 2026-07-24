# Marcela & Carlos — Invitación de boda

Sitio web de invitación de boda. Estático, **mobile-first** y **100% responsivo**
(celular, tablet y computadora). Cada pantalla es una página independiente, con
transiciones suaves de *fade* al navegar, aparición de elementos al hacer scroll
y una animación de escritura en la portada.

· **7 de noviembre 2026 · Aguascalientes, AGS** ·

---

## Estructura

```
.
├── index.html                 # Portada (Save the date)
├── nos-casamos.html
├── la-boda.html
├── hospedaje.html
├── mesa-de-regalos.html
├── confirma-asistencia.html   # Formulario RSVP
├── gracias.html              # Gracias (flujo "Sí asisto")
├── gracias-no.html           # Gracias (flujo "No asisto")
├── css/styles.css             # Estilos, colores y tipografías
├── js/script.js               # Menú móvil, transiciones y envío del formulario
├── fonts/                     # Tipografías incluidas (Luxurious Script + Judson)
├── assets/                    # Imágenes (foto, fondos, logo, acuarelas…)
├── apps-script/Code.gs        # Backend del formulario (Google Apps Script)
├── GUIA-EDITAR.md             # Cómo cambiar textos e imágenes
└── GUIA-GOOGLE-SHEETS.md      # Cómo conectar el formulario a Google Sheets
```

## Ver el sitio en tu computadora

Abre `index.html` con doble clic; se abre en el navegador. No requiere
instalar nada.

> Para una vista idéntica a producción puedes servirlo localmente:
> `python3 -m http.server` y abrir <http://localhost:8000>.

---

## Subirlo a GitHub y publicarlo en Vercel

### 1. Subir a GitHub
1. Crea un repositorio nuevo en <https://github.com/new> (por ejemplo
   `boda-marcela-carlos`).
2. Sube esta carpeta completa. Desde la terminal:
   ```bash
   git init
   git add .
   git commit -m "Sitio de boda Marcela & Carlos"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/boda-marcela-carlos.git
   git push -u origin main
   ```
   (O usa la app **GitHub Desktop** si prefieres no usar la terminal.)

### 2. Publicar en Vercel
1. Entra a <https://vercel.com> y crea una cuenta (puedes usar tu GitHub).
2. **Add New → Project** y elige el repositorio que acabas de subir.
3. Vercel detecta que es un sitio estático automáticamente. Deja todo por
   defecto (sin *build command*, sin *framework*).
4. Da clic en **Deploy**. En segundos tendrás una URL pública, p. ej.
   `https://boda-marcela-carlos.vercel.app`.
5. De ahí en adelante, **cada vez que subas un cambio a GitHub, Vercel publica
   la nueva versión solo.**

> ¿Quieres un dominio propio tipo `marcelaycarlos.com`? En Vercel:
> **Project → Settings → Domains** y sigue las indicaciones.

---

## Personalizar

- **Textos e imágenes:** ver **`GUIA-EDITAR.md`** (incluye qué imagen es cada una).
- **Colores y tipografías:** variables hasta arriba de `css/styles.css`.
- **Recibir las confirmaciones en Google Sheets:** ver **`GUIA-GOOGLE-SHEETS.md`**.

## Notas técnicas

- Sin dependencias ni *build*: HTML, CSS y JS puros.
- Tipografías y todas las imágenes van incluidas (funciona sin conexión a
  servicios externos).
- Se respeta `prefers-reduced-motion` (accesibilidad): si el sistema del
  visitante pide menos animación, las transiciones se desactivan.
