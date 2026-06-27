import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { usePageTracking } from '../usePageTracking'

const mockPage = vi.fn()

vi.mock('@/lib/analytics', () => ({
  analytics: {
    page: (...args: unknown[]) => mockPage(...args),
  },
}))

const createWrapper =
  (initialEntry: string) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
  )

describe('usePageTracking', () => {
  beforeEach(() => {
    mockPage.mockClear()
  })

  it('sends page view on mount with pathname and search', () => {
    renderHook(() => usePageTracking(), {
      wrapper: createWrapper('/blogs?category=tech'),
    })
    expect(mockPage).toHaveBeenCalledWith('/blogs?category=tech')
  })

  it('updates page view when route changes', () => {
    const { rerender } = renderHook(() => usePageTracking(), {
      wrapper: createWrapper('/'),
    })

    expect(mockPage).toHaveBeenCalledWith('/')

    rerender()
    expect(mockPage).toHaveBeenCalledTimes(1)
  })
})
