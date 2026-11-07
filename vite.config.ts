import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // caminhos relativos: o site funciona em leonorpinto4.github.io/Portofolio/
  base: './',
})
