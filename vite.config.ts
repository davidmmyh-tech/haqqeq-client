import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000
  },
  build: {
    // ...existing code...
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    },
    copyPublicDir: true // This ensures .htaccess is copied
  }
});
