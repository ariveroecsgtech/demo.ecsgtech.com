# Animal Health Clinic — Sitio Web

Sitio estático (HTML/CSS/JS puro, sin build step) para el negocio de grooming + servicios médicos veterinarios.

## Antes de publicar — pendientes

1. **Formspree**: reemplaza `YOUR_FORM_ID` en `index.html` (hay dos formularios: grooming y médico) por el ID real de tu formulario en https://formspree.io. Puedes usar el mismo form o crear dos separados si quieres bandejas distintas.
2. **Teléfono / email / dirección**: están como placeholders `(203) 555-0100`, `info@animalhealthclinic.com`, `123 Main Street, Norwalk, CT` — búscalos y reemplázalos (aparecen en el header, hero, booking y footer).
3. **Logo**: actualmente es un ícono SVG inline en el header. Si tienes logo propio, se puede sustituir por `<img>`.
4. **Fotos del equipo**: los `.team-photo` son bloques de color placeholder — reemplázalos con fotos reales del equipo (agrega `background-image` o `<img>`).
5. **Redes sociales**: los enlaces IG / FB / WA en el footer están vacíos (`href="#"`).

## Estructura

```
animal-health-clinic/
├── index.html
├── styles.css
├── script.js
├── staticwebapp.config.json   ← config de Azure Static Web Apps
└── README.md
```

No requiere build (no hay React/npm) — es HTML estático, así que el despliegue es directo.

## Desplegar en Azure Static Web Apps (producción)

### Opción A — Portal de Azure + GitHub (recomendada, con CI/CD automático)

1. Sube esta carpeta a un repo de GitHub (puede ser privado).
2. En el [Azure Portal](https://portal.azure.com), crea un recurso **Static Web App**.
3. Configura:
   - **Deployment source**: GitHub → autoriza y selecciona tu repo/branch.
   - **Build presets**: `Custom`
   - **App location**: `/` (o `/animal-health-clinic` si el repo tiene más carpetas)
   - **Output location**: *(vacío, no hay build)*
4. Azure crea automáticamente un workflow de **GitHub Actions** en tu repo (`.github/workflows/azure-static-web-apps-*.yml`) que despliega en cada push a la rama principal.
5. En unos minutos tendrás una URL tipo `https://<nombre-random>.azurestaticapps.net`.

### Opción B — Azure CLI (deploy manual, sin GitHub)

```bash
# Instala la extensión si no la tienes
az extension add --name staticwebapp

# Crea el recurso
az staticwebapp create \
  --name animal-health-clinic \
  --resource-group <tu-resource-group> \
  --location "eastus2" \
  --sku Free

# Despliega el contenido con SWA CLI
npm install -g @azure/static-web-apps-cli
swa deploy ./animal-health-clinic --deployment-token <token-del-portal>
```

## Dominio personalizado

Una vez desplegado, en el portal: **Static Web App → Custom domains → Add** y sigue las instrucciones para apuntar tu dominio (ej. `www.animalhealthclinic.com`) vía registro CNAME o alias de DNS.

## Notas técnicas

- El toggle de "Ficha de Grooming / Ficha Médica" en la sección de reservas es puro JS (`script.js`), sin dependencias externas.
- Ambos formularios envían por POST a Formspree — no hay backend propio en este MVP (consistente con lo que pediste: reservas simples por email/WhatsApp).
- Si más adelante quieres calendario real con disponibilidad y base de datos, se puede evolucionar agregando **Azure Functions** (API integrada de Static Web Apps) + Azure SQL, siguiendo el mismo patrón que ya usaste en el sistema escolar.
