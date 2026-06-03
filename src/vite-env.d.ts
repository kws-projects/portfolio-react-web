/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string
  readonly VITE_APP_VERSION?: string

  // API
  readonly VITE_PORTFOLIO_API_BASE_URL?: string
  readonly VITE_STATIC_FILE_BASE_URL?: string
  readonly VITE_CV_URL?: string
  readonly VITE_GITHUB_RELEASE_URL?: string

  // Analytics (GA4)
  readonly VITE_ANALYTICS_ENABLED?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_GA_DEBUG_MODE?: string

  // Error monitoring (Sentry)
  readonly VITE_SENTRY_ENABLED?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_SENTRY_ENVIRONMENT?: string
  readonly VITE_SENTRY_RELEASE?: string
  readonly VITE_SENTRY_TRACES_SAMPLE_RATE?: string
  readonly VITE_SENTRY_REPLAYS_SAMPLE_RATE?: string
  readonly VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
