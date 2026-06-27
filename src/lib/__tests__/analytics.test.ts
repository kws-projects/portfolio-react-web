const { mockEnv } = vi.hoisted(() => ({
  mockEnv: {
    isDevelopment: false,
    analytics: {
      enabled: true,
      gaMeasurementId: 'G-TEST123',
      debugMode: false,
    },
  },
}))

vi.mock('@/config/env', () => ({
  env: mockEnv,
}))

import { analytics } from '../analytics'

describe('analytics', () => {
  beforeEach(() => {
    analytics.reset()
    mockEnv.analytics.enabled = true
    window.dataLayer = []
  })

  it('init loads gtag script and configures measurement ID', () => {
    analytics.init()

    const script = document.querySelector('script[src*="googletagmanager"]')
    expect(script).toBeTruthy()
    expect(window.dataLayer?.length).toBeGreaterThan(0)
  })

  it('does nothing when analytics is disabled', () => {
    mockEnv.analytics.enabled = false
    const before = window.dataLayer?.length ?? 0

    analytics.init()
    analytics.page('/test')
    analytics.track({ name: 'view_project', params: { project_name: 'x' } })

    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull()
    expect(window.dataLayer?.length ?? 0).toBe(before)
  })

  it('pushes events to dataLayer when tracking pages', () => {
    analytics.init()
    const before = window.dataLayer?.length ?? 0

    analytics.page('/about', 'About')

    expect((window.dataLayer?.length ?? 0) > before).toBe(true)
  })

  it('pushes events to dataLayer when tracking custom events', () => {
    analytics.init()
    const before = window.dataLayer?.length ?? 0

    analytics.track({ name: 'download_cv', params: { source: 'about' } })

    expect((window.dataLayer?.length ?? 0) > before).toBe(true)
  })

  it('updates consent when enabled', () => {
    analytics.init()
    const before = window.dataLayer?.length ?? 0

    analytics.updateConsent({ analytics_storage: 'denied' })

    expect((window.dataLayer?.length ?? 0) > before).toBe(true)
  })

  it('reset removes injected script and clears dataLayer', () => {
    analytics.init()
    analytics.reset()

    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull()
    expect(window.dataLayer).toEqual([])
  })
})
