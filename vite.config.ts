import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/poly.ts',
      name: 'PolyClick',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'poly.js';
        return 'poly.umd.cjs';
      }
    },
    rollupOptions: {
      output: {
        globals: {}
      }
    }
  }
});