<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1oe8KdXL3mRhiVCEPmhRyEoA8rsEp_V3p

## Run Locally

**Prerequisites:**  Node.js

### Pasos para ejecutar la aplicación:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar tu API Key de Gemini:**
   - Copia el archivo `.env.local.example` como `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```
   - Edita el archivo `.env.local` y coloca tu clave API real de Gemini
   - Obtén tu clave API desde: https://ai.google.dev/

3. **Ejecutar la aplicación:**
   ```bash
   npm run dev
   ```

### ¿Dónde poner la API Key?

La clave API debe ir en el archivo `.env.local` en la raíz del proyecto:

```
GEMINI_API_KEY=tu_clave_api_real_aqui
```
