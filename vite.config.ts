/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import pkg from './package.json' with { type: 'json' }

const EXPOSED_ENV_KEYS = [
  'MODE',
  'PORTFOLIO_API_BASE_URL',
  'STATIC_FILE_BASE_URL',
  'CV_URL',
  'GITHUB_RELEASE_URL',
  'GA_MEASUREMENT_ID',
  'SENTRY_DSN',
] as const

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const processEnv = Object.fromEntries(
    EXPOSED_ENV_KEYS.map(key => [key, env[key] ?? ''])
  )

  return {
    define: {
      'process.env': JSON.stringify(processEnv),
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  }
})
