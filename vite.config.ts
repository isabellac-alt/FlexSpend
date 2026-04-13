import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    /** Needed for Cursor / LAN previews; matches `npm run dev` */
    host: true,
    port: 5173,
    /** If 5173 is taken, try the next port instead of failing silently */
    strictPort: false,
  },
})
