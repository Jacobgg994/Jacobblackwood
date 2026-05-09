import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { deployPlugin } from './plugins/deployPlugin'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    deployPlugin(),
  ],
})
