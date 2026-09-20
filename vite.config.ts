import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves project sites from /<repo-name>/, so the base path
  // must match the repo name. Overridden by the GH Actions workflow via env.
  base: process.env.VITE_BASE_PATH ?? "/",
})
