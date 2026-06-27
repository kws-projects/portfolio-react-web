import { renderHook } from '@testing-library/react'

import { useMonitoring } from '../useMonitoring'

const mockCaptureException = vi.fn()
const mockCaptureMessage = vi.fn()
const mockSetUser = vi.fn()
const mockClearUser = vi.fn()
const mockAddBreadcrumb = vi.fn()
const mockSetTag = vi.fn()

vi.mock('@/lib/monitoring', () => ({
  monitoring: {
    captureException: (...args: unknown[]) => mockCaptureException(...args),
    captureMessage: (...args: unknown[]) => mockCaptureMessage(...args),
    setUser: (...args: unknown[]) => mockSetUser(...args),
    clearUser: (...args: unknown[]) => mockClearUser(...args),
    addBreadcrumb: (...args: unknown[]) => mockAddBreadcrumb(...args),
    setTag: (...args: unknown[]) => mockSetTag(...args),
  },
}))

describe('useMonitoring', () => {
  it('delegates captureException to monitoring adapter', () => {
    const { result } = renderHook(() => useMonitoring())
    const error = new Error('test')
    const context = { tags: { page: 'home' } }
    result.current.captureException(error, context)
    expect(mockCaptureException).toHaveBeenCalledWith(error, context)
  })

  it('delegates captureMessage to monitoring adapter', () => {
    const { result } = renderHook(() => useMonitoring())
    result.current.captureMessage('hello', { level: 'info' })
    expect(mockCaptureMessage).toHaveBeenCalledWith('hello', { level: 'info' })
  })

  it('delegates user and breadcrumb helpers', () => {
    const { result } = renderHook(() => useMonitoring())
    result.current.setUser({ id: '1' })
    result.current.clearUser()
    result.current.addBreadcrumb({ category: 'nav', message: 'click' })
    result.current.setTag('feature', 'blog')

    expect(mockSetUser).toHaveBeenCalledWith({ id: '1' })
    expect(mockClearUser).toHaveBeenCalled()
    expect(mockAddBreadcrumb).toHaveBeenCalledWith({
      category: 'nav',
      message: 'click',
    })
    expect(mockSetTag).toHaveBeenCalledWith('feature', 'blog')
  })
})
