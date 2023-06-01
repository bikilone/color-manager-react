import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylelint from 'vite-plugin-stylelint';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylelint({ fix: true})],
  base:  process.env.NODE_ENV === 'production' ? '/color-manager-react/' : '/',
})
