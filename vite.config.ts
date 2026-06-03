import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const release = `portfolio@${pkg.version}`

const useSentrySourceMaps =
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT

export default defineConfig({
  plugins: [
    react(),
    ...(useSentrySourceMaps
      ? [
          sentryVitePlugin({
            org: process.env.SENTRY_ORG!,
            project: process.env.SENTRY_PROJECT!,
            authToken: process.env.SENTRY_AUTH_TOKEN!,
            release: { name: release },
          }),
        ]
      : []),
  ],
  define: {
    ...Object.fromEntries(
      Object.entries(process.env)
        .filter(([key]) => key.startsWith('VITE_'))
        .map(([key, val]) => [`import.meta.env.${key}`, JSON.stringify(val)])
    ),
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
    'import.meta.env.VITE_SENTRY_RELEASE': JSON.stringify(release),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: useSentrySourceMaps ? 'hidden' : false,
  },
  server: {
    port: 3001,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['**/*.config.*', '**/test/**', 'src/main.tsx'],
    },
  },
})
