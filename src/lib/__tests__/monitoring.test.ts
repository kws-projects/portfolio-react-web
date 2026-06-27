const { mockEnv } = vi.hoisted(() => ({
  mockEnv: {
    isDevelopment: true,
    monitoring: {
      enabled: false,
      sentryDsn: '',
      sentryEnvironment: 'test',
      sentryRelease: '',
      tracesSampleRate: 0.1,
      replaysSampleRate: 0,
      replaysOnErrorSampleRate: 1,
    },
  },
}))

const {
  mockInit,
  mockCaptureException,
  mockCaptureMessage,
  mockWithScope,
  mockSetUser,
  mockAddBreadcrumb,
  mockSetTag,
  mockReactErrorHandler,
} = vi.hoisted(() => ({
  mockInit: vi.fn(),
  mockCaptureException: vi.fn(),
  mockCaptureMessage: vi.fn(),
  mockWithScope: vi.fn(
    (
      cb: (scope: {
        setTag: ReturnType<typeof vi.fn>
        setExtra: ReturnType<typeof vi.fn>
        setLevel: ReturnType<typeof vi.fn>
        setFingerprint: ReturnType<typeof vi.fn>
      }) => void
    ) => {
      cb({
        setTag: vi.fn(),
        setExtra: vi.fn(),
        setLevel: vi.fn(),
        setFingerprint: vi.fn(),
      })
    }
  ),
  mockSetUser: vi.fn(),
  mockAddBreadcrumb: vi.fn(),
  mockSetTag: vi.fn(),
  mockReactErrorHandler: vi.fn((cb?: () => void) => cb ?? vi.fn()),
}))

vi.mock('@/config/env', () => ({
  env: mockEnv,
}))

vi.mock('@sentry/react', () => ({
  init: (...args: unknown[]) => mockInit(...args),
  captureException: (...args: unknown[]) => mockCaptureException(...args),
  captureMessage: (...args: unknown[]) => mockCaptureMessage(...args),
  withScope: (cb: (scope: unknown) => void) => mockWithScope(cb),
  setUser: (...args: unknown[]) => mockSetUser(...args),
  addBreadcrumb: (...args: unknown[]) => mockAddBreadcrumb(...args),
  setTag: (...args: unknown[]) => mockSetTag(...args),
  reactErrorHandler: mockReactErrorHandler,
  reactRouterV7BrowserTracingIntegration: vi.fn(() => ({})),
  replayIntegration: vi.fn(() => ({})),
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
}))

import { monitoring } from '../monitoring'

describe('monitoring', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockEnv.monitoring.enabled = false
    mockEnv.isDevelopment = true
  })

  it('init is a no-op when monitoring is disabled', () => {
    monitoring.init()
    expect(mockInit).not.toHaveBeenCalled()
  })

  it('initialises Sentry when enabled', () => {
    mockEnv.monitoring.enabled = true
    mockEnv.monitoring.sentryDsn = 'https://sentry.example/1'

    monitoring.init()

    expect(mockInit).toHaveBeenCalledWith(
      expect.objectContaining({
        dsn: 'https://sentry.example/1',
      })
    )
  })

  it('logs to console in development when disabled', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const error = new Error('boom')

    monitoring.captureException(error, { tags: { page: 'home' } })

    expect(consoleSpy).toHaveBeenCalledWith('[monitoring]', error, {
      tags: { page: 'home' },
    })
    expect(mockCaptureException).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('captures exceptions via Sentry when enabled', () => {
    mockEnv.monitoring.enabled = true
    mockEnv.monitoring.sentryDsn = 'https://sentry.example/1'
    const error = new Error('boom')

    monitoring.captureException(error)

    expect(mockWithScope).toHaveBeenCalled()
    expect(mockCaptureException).toHaveBeenCalledWith(error)
  })

  it('captures messages via Sentry when enabled', () => {
    mockEnv.monitoring.enabled = true
    mockEnv.monitoring.sentryDsn = 'https://sentry.example/1'

    monitoring.captureMessage('hello', { level: 'warning' })

    expect(mockCaptureMessage).toHaveBeenCalledWith('hello', 'warning')
  })

  it('returns console-based React error handlers when disabled', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const handlers = monitoring.getReactErrorHandlers()

    handlers.onUncaughtError(new Error('x'), { componentStack: 'stack' })

    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('delegates user, breadcrumb, and tag helpers when enabled', () => {
    mockEnv.monitoring.enabled = true
    mockEnv.monitoring.sentryDsn = 'https://sentry.example/1'

    monitoring.setUser({ id: '1' })
    monitoring.clearUser()
    monitoring.addBreadcrumb({ category: 'ui', message: 'click' })
    monitoring.setTag('page', 'home')

    expect(mockSetUser).toHaveBeenCalledWith({ id: '1' })
    expect(mockSetUser).toHaveBeenCalledWith(null)
    expect(mockAddBreadcrumb).toHaveBeenCalled()
    expect(mockSetTag).toHaveBeenCalledWith('page', 'home')
  })
})
