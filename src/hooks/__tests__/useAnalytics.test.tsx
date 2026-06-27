import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { useAnalytics } from '../useAnalytics'

const mockPage = vi.fn()
const mockTrack = vi.fn()
const mockUpdateConsent = vi.fn()

vi.mock('@/lib/analytics', () => ({
  analytics: {
    page: (...args: unknown[]) => mockPage(...args),
    track: (...args: unknown[]) => mockTrack(...args),
    updateConsent: (...args: unknown[]) => mockUpdateConsent(...args),
  },
}))

const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter initialEntries={['/works']}>{children}</MemoryRouter>
)

describe('useAnalytics', () => {
  it('calls analytics.page with current pathname', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper })
    result.current.page('Works')
    expect(mockPage).toHaveBeenCalledWith('/works', 'Works')
  })

  it('calls analytics.track with the event', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper })
    const event = {
      name: 'view_project' as const,
      params: { project_name: 'App' },
    }
    result.current.track(event)
    expect(mockTrack).toHaveBeenCalledWith(event)
  })

  it('calls analytics.updateConsent', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper })
    const consent = { analytics_storage: 'granted' as const }
    result.current.updateConsent(consent)
    expect(mockUpdateConsent).toHaveBeenCalledWith(consent)
  })
})
