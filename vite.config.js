import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'   // ✅ import react plugin
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),          // ✅ correct usage
    tailwindcss(),
  ],
})
