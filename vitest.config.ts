import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', '**/*.d.ts', '**/*.spec.ts'],
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      '@common': resolve(__dirname, './src/common'),
      '@traditional': resolve(__dirname, './src/traditional-layered'),
      '@clean': resolve(__dirname, './src/clean-architecture'),
      '@onion': resolve(__dirname, './src/onion-architecture'),
      '@hexagonal': resolve(__dirname, './src/hexagonal-architecture'),
    },
  },
});
