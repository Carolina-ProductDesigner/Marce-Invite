# Conectar el formulario con Google Sheets

El formulario de **Confirma tu asistencia** puede mandar cada respuesta a una
hoja de Google Sheets tuya, sin necesidad de servidores. Se hace con una
herramienta gratuita de Google llamada **Apps Script**. Toma unos 5 minutos.

> Mientras no lo conectes, el formulario igual funciona: al enviar, lleva a la
> página de "Gracias". Solo que las respuestas no se guardan en ningún lado
> hasta que termines estos pasos.

## Paso 1 — Crea la hoja de cálculo

1. Entra a <https://sheets.google.com> y crea una hoja nueva.
2. Ponle un nombre, por ejemplo **"Confirmaciones boda"**.
   (No necesitas crear columnas ni nada; el script las crea solo.)

## Paso 2 — Abre el editor de Apps Script

1. Dentro de la hoja, ve al menú **Extensiones → Apps Script**.
2. Se abre una pestaña nueva con un editor de código.
3. Borra lo que venga por defecto (`function myFunction() {}`).
4. Abre el archivo **`apps-script/Code.gs`** de este repositorio, copia TODO su
   contenido y pégalo en el editor.
5. Da clic en el ícono de **guardar** (💾).

## Paso 3 — Publica el script como "aplicación web"

1. Arriba a la derecha da clic en **Implementar → Nueva implementación**.
2. En el engrane ⚙️ (junto a "Seleccionar tipo") elige **Aplicación web**.
3. Configura así:
   - **Descripción:** lo que quieras (ej. "RSVP boda")
   - **Ejecutar como:** *Yo* (tu correo)
   - **Quién tiene acceso:** **Cualquier usuario**
4. Da clic en **Implementar**.
5. Google te pedirá **autorizar permisos**: acepta con tu cuenta. Si aparece
   "Google no verificó esta app", entra en *Configuración avanzada → Ir a
   (nombre) (no seguro)* y continúa. Es tu propio script, es seguro.
6. Al terminar te muestra una **URL de la aplicación web** que termina en
   `/exec`. **Cópiala.**

## Paso 4 — Pega la URL en el sitio

1. Abre el archivo **`js/script.js`**.
2. Hasta arriba verás esta línea:

   ```js
   const GOOGLE_SHEETS_URL = "";
   ```

3. Pega tu URL entre las comillas:

   ```js
   const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfy.../exec";
   ```

4. Guarda. Si ya tienes el sitio en Vercel/GitHub, sube el cambio (commit) y
   Vercel lo actualiza solo.

## Paso 5 — Pruébalo

1. Abre el sitio, ve a **Confirma tu asistencia**, llena el formulario y envía.
2. Revisa tu Google Sheet: debe aparecer una fila nueva en la pestaña
   **"Respuestas"** con los datos. 🎉

## Columnas que se guardan

| Fecha | ¿Asiste? | Acompañantes | Nombre | Correo | WhatsApp | Mensaje |
|-------|----------|--------------|--------|--------|----------|---------|

## Si cambias el código del script después

Cada vez que edites `Code.gs` debes **volver a implementar**:
**Implementar → Gestionar implementaciones → (lápiz ✏️) → Versión: Nueva →
Implementar**. La URL `/exec` se mantiene igual, no tienes que cambiarla en el
sitio.
