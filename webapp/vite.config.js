import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Fixed, non-default port so this doesn't collide with other
    // projects (e.g. Reforge) that run on Vite's default 5173.
    port: 5190,
    strictPort: true,
  },
})
