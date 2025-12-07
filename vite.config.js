import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'COS224-FinalTermProject',
  build: {
    outDir: 'docs', 
    emptyOutDir: true
  }
})
