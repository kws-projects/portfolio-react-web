import { env } from './env'

export const envConfig = {
  NODE_ENV: env.isProduction ? 'PROD' : 'DEV',
  VERSION_NO: env.appVersion,
  PORTFOLIO_API_BASE_URL: env.portfolioApiBaseUrl,
  STATIC_FILE_BASE_URL: env.staticFileBaseUrl,
  CV_URL: env.cvUrl,
  GITHUB_RELEASE_URL: env.githubReleaseUrl,
  GA4_ID: env.analytics.gaMeasurementId,
  SENTRY_DSN: env.monitoring.sentryDsn,
}

export { env }
