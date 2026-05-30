export const envConfig = {
  NODE_ENV: process.env.MODE!,
  VERSION_NO: __APP_VERSION__,
  PORTFOLIO_API_BASE_URL: process.env.PORTFOLIO_API_BASE_URL,
  STATIC_FILE_BASE_URL: process.env.STATIC_FILE_BASE_URL,
  CV_URL: process.env.CV_URL,
  GITHUB_RELEASE_URL: process.env.GITHUB_RELEASE_URL,
  GA4_ID: process.env.GA_MEASUREMENT_ID,
  SENTRY_DSN: process.env.SENTRY_DSN,
}
