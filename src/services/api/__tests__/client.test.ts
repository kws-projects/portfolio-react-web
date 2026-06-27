vi.mock('@/config', () => ({
  envConfig: {
    PORTFOLIO_API_BASE_URL: 'https://api.example.com',
  },
}))

import { apiClient } from '../client'

describe('apiClient', () => {
  it('is configured with the portfolio API base URL', () => {
    expect(apiClient.defaults.baseURL).toBe('https://api.example.com')
  })

  it('sends JSON content type by default', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })
})
