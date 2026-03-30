import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    dts: true,
    outDir: 'dist',
    clean: true,
    sourcemap: true,
  },
  {
    entry: { react: 'src/react.tsx' },
    format: ['esm'],
    dts: true,
    outDir: 'dist',
    clean: false,
    sourcemap: true,
    external: ['react', 'react-dom'],
    esbuildOptions(options) {
      options.jsx = 'automatic';
    },
  },
]);
