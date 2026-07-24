# Cómo editar el sitio por tu cuenta

Todo el sitio son archivos de texto y imágenes. No necesitas programar: solo
abrir los archivos con cualquier editor (incluso el Bloc de notas, aunque te
recomiendo **Visual Studio Code**, gratis) y cambiar lo que diga.

---

## 1. Cambiar TEXTOS

Cada pantalla es un archivo `.html`. Abre el que quieras y busca el texto que
ves en la página; cámbialo y guarda. **No toques** las etiquetas con `<` y `>`,
solo el texto que está entre ellas.

| Página del sitio        | Archivo a editar             | Qué puedes cambiar ahí |
|-------------------------|------------------------------|------------------------|
| Inicio / portada        | `index.html`                 | El menú. El título es una imagen (ver abajo). |
| Nos casamos             | `nos-casamos.html`           | Frases y **nombres de los papás** |
| La boda                 | `la-boda.html`               | Misa, horarios, **direcciones**, dresscode, paleta de colores |
| Hospedaje               | `hospedaje.html`             | Nombre/dirección de hoteles y **código de descuento** |
| Mesa de regalos         | `mesa-de-regalos.html`       | Texto y **enlaces** de las tiendas |
| Confirma tu asistencia  | `confirma-asistencia.html`   | Preguntas del formulario |
| Gracias                 | `gracias.html`               | Mensaje final |

### Ejemplo: cambiar el nombre de los papás
En `nos-casamos.html` busca:
```html
<div>Papá Carlos<br>Mamá Carlos</div>
```
y déjalo, por ejemplo, así:
```html
<div>José Pérez<br>Ana López</div>
```
(`<br>` es un salto de línea, déjalo donde quieras separar renglones.)

### Ejemplo: poner una dirección o un horario
En `la-boda.html` busca la palabra `dirección` o `12:00 pm` y reemplázala por la
real.

### Ejemplo: poner los enlaces (links) de los botones
Los botones que aún no llevan a ningún lado tienen `href="#"`. Cambia el `#` por
la dirección web real. Por ejemplo, en `mesa-de-regalos.html`:
```html
<a class="btn" href="#">Mesa de regalos Amazon</a>
```
→
```html
<a class="btn" href="https://www.amazon.com.mx/wedding/...">Mesa de regalos Amazon</a>
```
Lo mismo aplica a los botones **Ubicación** (pon el link de Google Maps) y a
**Ver inspiración** del dresscode.

---

## 2. Cambiar IMÁGENES

Todas las imágenes están en la carpeta **`assets/`**. La forma más fácil de
cambiar una es: **deja el mismo nombre de archivo** y reemplázala por la tuya.
Así no tienes que tocar nada de código.

> Truco: si tu imagen nueva tiene otro nombre, súbela a `assets/` y luego, en el
> `.html` correspondiente, cambia el nombre dentro de `src="assets/...."`.

### Mapa de imágenes — qué es cada una y dónde aparece

| Archivo en `assets/`      | Qué es                                   | Dónde se usa |
|---------------------------|------------------------------------------|--------------|
| `FotoNovios.png`          | Acuarela de los novios en el jardín      | Fondo de la **portada** (pantalla completa) |
| `intro.jpg`               | Textura de acuarela clara                 | Fondo de la **cortinilla de intro** |
| `Fondofooter.svg`         | Degradado cálido suave                    | Fondo del **footer** (degradado bajo el conteo y el texto) |
| `titulo.svg`              | Bloque del título: *Save the date · Marcela & Carlos · fecha · lugar* | **Portada** (tiene la animación de escritura) |
| `LogoAcuarela.png`          | Monograma **MC** en acuarela                         | Encabezado de **todas** las páginas y en el footer |
| `FondoDesktop.png`        | Textura de papel (pantallas grandes)     | Fondo de todas las páginas en computadora/tablet |
| `FondoMobile.png`         | Textura de papel (celular)               | Fondo de todas las páginas en celular |
| `iglesia.png`             | Acuarela de la iglesia                    | **La boda → La misa** |
| `jardin.png`              | Acuarela del jardín                       | **La boda → Cóctail** |
| `hacienda.png`            | Acuarela de la hacienda                   | **La boda → Recepción** |
| `hotel.png`               | Acuarela del hotel                        | **Hospedaje** (se usa en las dos tarjetas) |
| `copa.png`                | Copa de cóctel (decoración)               | **Nos casamos** y **Mesa de regalos** |
| `martini-empanadas.png`   | Copa + empanadas (decoración)             | **Gracias** |
| `hojas.png`               | Ramita de hojas (decoración de esquinas)  | Varias páginas |

### Cambiar la FOTO DE LA PORTADA (la de los novios)

Es la que se ve a pantalla completa en el inicio. Tienes dos formas:

**Forma fácil (recomendada):** reemplaza el archivo `assets/FotoNovios.png` por
tu nueva foto, **conservando exactamente el mismo nombre** (`FotoNovios.png`).
Listo: el sitio la toma automáticamente. Así puedes ir probando distintas fotos
sin tocar nada de código.

**Forma alterna (si quieres dejar varios nombres):** sube tu foto a `assets/`
con el nombre que quieras (por ejemplo `portada2.png`) y abre `css/styles.css`.
Hasta arriba, en `:root`, cambia esta línea:
```css
--landing-photo:url('../assets/FotoNovios.png');
```
por el nombre de tu archivo:
```css
--landing-photo:url('../assets/portada2.png');
```
Guarda y recarga. Para probar otra, solo cambias el nombre ahí.

> Consejo: para que se vea bien en celular y compu, usa una foto horizontal de
> buena resolución (mínimo ~1600 px de ancho). En celular la foto se acomoda
> mostrando la parte de abajo (los novios) y el texto va sobre el cielo.

### Cambiar el título de la portada
El título es la imagen `titulo.svg`. Si quieres cambiar la fecha o el lugar que
aparecen ahí, lo más sencillo es pedir un nuevo `titulo.svg` con el texto nuevo
(es un diseño vectorial) y reemplazar el archivo conservando el mismo nombre.

---


### Pantallas de agradecimiento (dos flujos)

El formulario tiene dos respuestas distintas según el invitado:
- Si responde **"Sí"** a *¿Nos acompañas a la boda?* → al enviar ve **`gracias.html`** ("Gracias por confirmar").
- Si responde **"No"** → al enviar ve **`gracias-no.html`** ("Gracias por tu respuesta").

Si quieres cambiar esos mensajes, edita el texto dentro de cada uno de esos
archivos (la frase está entre las etiquetas `<p>...</p>`).

## 3. Cambiar COLORES y TIPOGRAFÍAS

Abre **`css/styles.css`**. Hasta arriba está esto:
```css
:root{
  --olive:#66691A;        /* color de títulos y texto */
  --terracotta:#B64949;   /* color de botones */
  ...
}
```
Cambia los códigos de color (los `#......`) y se actualiza en todo el sitio.

Las tipografías son **Luxurious Script** (títulos) y **Judson** (texto), y ya
vienen incluidas en la carpeta `fonts/`. No necesitas instalar nada.

---

## 4. Ver tus cambios

- **En tu compu:** solo abre `index.html` con doble clic (se abre en el
  navegador). Cada vez que guardes un archivo, recarga la página (F5).
- **En internet:** si ya está en Vercel, sube los cambios a GitHub y Vercel
  publica la nueva versión solo (ver `README.md`).
