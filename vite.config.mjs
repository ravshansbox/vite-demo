import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [viteReact()],
  test: {
    css: true,
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/vitest-setup.ts'],
  },
});
