/**
 * Marcela & Carlos — Conexión del formulario RSVP con Google Sheets
 * ------------------------------------------------------------------
 * Pega TODO este código en el editor de Apps Script de tu Google Sheet
 * (Extensiones → Apps Script). Luego sigue GUIA-GOOGLE-SHEETS.md para
 * publicarlo y obtener la URL que va en js/script.js.
 */

const SHEET_NAME = 'Respuestas';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Crea la hoja con encabezados la primera vez
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Fecha', '¿Asiste?', 'Acompañantes', 'Nombre', 'Correo', 'WhatsApp', 'Mensaje']);
    }

    const d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      d.fecha || '',
      d.asiste || '',
      d.acompanantes || '',
      d.nombre || '',
      d.correo || '',
      d.whatsapp || '',
      d.mensaje || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite abrir la URL en el navegador para comprobar que está viva.
function doGet() {
  return ContentService
    .createTextOutput('Formulario de Marcela & Carlos activo ✦')
    .setMimeType(ContentService.MimeType.TEXT);
}
