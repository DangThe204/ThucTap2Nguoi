// vite.config.js (File cấu hình Vite)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // PHẦN CẦN SỬA
  server: {
    port: 5176,
    proxy: {
      '/api': {
        // CỔNG ĐÚNG CỦA BACKEND LÀ 8080
        target: 'http://localhost:8080', 
        changeOrigin: true,
      },
    }
  }
})