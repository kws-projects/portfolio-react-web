import { renderHook } from '@testing-library/react'

import useScrollToTop from '../useScrollToTop'

describe('useScrollToTop', () => {
  it('scrolls window to top on mount', () => {
    const scrollTo = vi.fn()
    vi.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

    renderHook(() => useScrollToTop())

    expect(scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
