import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Redireciona as chamadas /api para o backend (Express + MySQL)
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
