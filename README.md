# Belleza Natural - Sitio web con reservas

Este sitio está pensado para publicar en GitHub Pages y tomar reservas sin login. La idea es guardar cada turno en una planilla (Google Sheets) para que la puedas abrir como Excel cuando quieras.

## Cómo funciona la automatización

1. **Formulario en la web**: la persona elige servicio, fecha/hora y completa sus datos.
2. **Google Apps Script**: recibe el POST y agrega una fila en una planilla de Google Sheets.
3. **Planilla como Excel**: podés descargar la planilla en formato `.xlsx` cuando necesites.
4. **Confirmación**: podés usar WhatsApp o correo (opcional) para confirmar manualmente.

## Configurar Google Sheets + Apps Script

1. Creá una planilla en Google Sheets llamada `Reservas` y en la fila 1 agregá estas columnas:
   - Fecha
   - Hora
   - Servicio
   - Profesional
   - Duración
   - Nombre
   - Apellido
   - Teléfono
   - Email
   - Notas
   - Fecha de envío
2. En la planilla, abrí **Extensiones → Apps Script**.
3. Pegá este script y guardalo:

```javascript
const SHEET_NAME = "Reservas";

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.date || "",
    data.time || "",
    data.service || "",
    data.professional || "",
    data.duration || "",
    data.firstName || "",
    data.lastName || "",
    data.phone || "",
    data.email || "",
    data.notes || "",
    new Date(),
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

4. Publicá el script en **Implementar → Nueva implementación** y elegí **Aplicación web**.
5. En **Quién tiene acceso**, seleccioná *Cualquiera*.
6. Copiá la URL y reemplazá `YOUR_APPS_SCRIPT_URL` en `script.js`.

## Publicar en GitHub Pages

1. Subí el repo a GitHub.
2. En **Settings → Pages**, seleccioná la rama `main` y carpeta `/root`.
3. Tu sitio quedará publicado en `https://tuusuario.github.io/tu-repo/`.

## Tips extra

- Podés duplicar la planilla para tener un backup mensual.
- Si querés pagos online, se puede sumar un link de Mercado Pago en el formulario.
- También se puede automatizar un email con Apps Script si lo necesitás.
