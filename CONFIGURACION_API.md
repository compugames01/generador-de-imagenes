# 🔑 Configuración de API Key - Gemini

## ¿Dónde poner la API Key?

La clave API de Gemini debe colocarse en el archivo `.env.local` en la raíz del proyecto.

### Pasos detallados:

1. **Obtener la API Key:**
   - Ve a [Google AI Studio](https://ai.google.dev/)
   - Crea una cuenta o inicia sesión
   - Genera una nueva API Key

2. **Configurar en el proyecto:**
   - Copia el archivo `.env.local.example` como `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```
   - Abre el archivo `.env.local` en tu editor
   - Reemplaza `demo_key_placeholder` con tu API Key real:
     ```
     GEMINI_API_KEY=tu_clave_api_real_aqui
     ```

3. **Ejemplo del archivo `.env.local`:**
   ```
   # Configuración de API Key para Gemini
   # IMPORTANTE: Coloca aquí tu clave API real de Gemini
   
   # Obtén tu clave API de Gemini desde: https://ai.google.dev/
   GEMINI_API_KEY=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI
   ```

### ⚠️ Importante:
- El archivo `.env.local` no se sube a Git (está en `.gitignore`)
- Nunca compartas tu API Key públicamente
- La aplicación no funcionará sin una API Key válida

### 🚀 Después de configurar:
```bash
npm run dev
```

¡Tu aplicación estará lista para usar con la API de Gemini!