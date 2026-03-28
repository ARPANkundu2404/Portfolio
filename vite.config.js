import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks':      path.resolve(__dirname, './src/hooks'),
      '@context':    path.resolve(__dirname, './src/context'),
      '@data':       path.resolve(__dirname, './src/data'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir:         'dist',
    sourcemap:      true,
    rollupOptions: {
      output: {
        manualChunks: {
          react:         ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
});