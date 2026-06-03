/**
 * Typed access to environment variables.
 *
 * Only variables prefixed with `VITE_` are exposed to the client by Vite.
 * Add new variables here (and to `.env.example`) so usage stays type-safe and
 * discoverable across the app.
 */
const truthy = (value: string | undefined) => value === 'true' || value === '1'

export const env = {
  appName: import.meta.env.VITE_APP_NAME ?? 'Portfolio',
  appVersion: import.meta.env.VITE_APP_VERSION ?? '',
  mode: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,

  portfolioApiBaseUrl: import.meta.env.VITE_PORTFOLIO_API_BASE_URL ?? '',
  staticFileBaseUrl: import.meta.env.VITE_STATIC_FILE_BASE_URL ?? '',
  cvUrl: import.meta.env.VITE_CV_URL ?? '',
  githubReleaseUrl: import.meta.env.VITE_GITHUB_RELEASE_URL ?? '',

  analytics: {
    enabled: truthy(import.meta.env.VITE_ANALYTICS_ENABLED),
    gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID ?? '',
    debugMode: truthy(import.meta.env.VITE_GA_DEBUG_MODE),
  },

  monitoring: {
    enabled: truthy(import.meta.env.VITE_SENTRY_ENABLED),
    sentryDsn: import.meta.env.VITE_SENTRY_DSN ?? '',
    sentryEnvironment:
      import.meta.env.VITE_SENTRY_ENVIRONMENT ?? import.meta.env.MODE,
    sentryRelease: import.meta.env.VITE_SENTRY_RELEASE ?? '',
    tracesSampleRate: Number(
      import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE ?? '0.1'
    ),
    replaysSampleRate: Number(
      import.meta.env.VITE_SENTRY_REPLAYS_SAMPLE_RATE ?? '0'
    ),
    replaysOnErrorSampleRate: Number(
      import.meta.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE ?? '1'
    ),
  },
} as const
