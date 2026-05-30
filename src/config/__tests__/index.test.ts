import { envConfig } from '../index'

describe('envConfig', () => {
  it('has all required keys', () => {
    const expectedKeys = [
      'NODE_ENV',
      'VERSION_NO',
      'PORTFOLIO_API_BASE_URL',
      'STATIC_FILE_BASE_URL',
      'CV_URL',
      'GITHUB_RELEASE_URL',
      'GA4_ID',
      'SENTRY_DSN',
    ]
    expectedKeys.forEach(key => {
      expect(envConfig).toHaveProperty(key)
    })
  })
})
