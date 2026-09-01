# Recursos pendientes

La landing usa únicamente el *TutoGo Sales Book 2026*. Estos recursos oficiales todavía no están en el proyecto:

| Recurso | Estado | Dónde incorporarlo |
| --- | --- | --- |
| Logo / imagen oficial de TutoGo | No encontrado como archivo independiente en el workspace. Se usa el wordmark tipográfico del Sales Book. | `src/content/assets.js` → `officialLogo` |
| Nombre de contacto | Vacío (`[Completar]` en el PDF) | `src/content/contact.js` |
| Correo electrónico | Vacío | `src/content/contact.js` |
| Teléfono / WhatsApp | Vacío | `src/content/contact.js` |
| Usuario TikTok | Vacío | `src/content/contact.js` |
| Instagram | Vacío | `src/content/contact.js` |
| Fotografías o videos oficiales | No disponibles | No se muestran personas, clientes ni marcas inventadas. |
| Still lifes de categorías (galería) | Imágenes editoriales generadas, sin logos ni personas, como recurso temporal | `src/assets/categories/` — reemplazar cuando existan fotos oficiales |

Mientras `contactInfo` esté vacío, la UI no muestra enlaces, botones a `#` ni direcciones inventadas.
