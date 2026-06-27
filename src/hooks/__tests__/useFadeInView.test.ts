import { renderHook } from '@testing-library/react'

import useFadeInView from '../useFadeInView'

const mockStart = vi.fn()
const mockUseInView = vi.fn(() => false)

vi.mock('framer-motion', () => ({
  useInView: () => mockUseInView(),
  useAnimation: () => ({ start: mockStart }),
}))

describe('useFadeInView', () => {
  beforeEach(() => {
    mockStart.mockClear()
    mockUseInView.mockReturnValue(false)
  })

  it('returns empty motionProps when disabled', () => {
    const { result } = renderHook(() => useFadeInView({ disabled: true }))
    expect(result.current.motionProps).toEqual({})
    expect(result.current.ref).toBeDefined()
  })

  it('returns motion variants when enabled', () => {
    const { result } = renderHook(() => useFadeInView({ y: 40, duration: 0.8 }))
    expect(result.current.motionProps).toMatchObject({
      initial: 'hidden',
      transition: { duration: 0.8 },
      variants: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      },
    })
  })

  it('starts visible animation when element enters view', () => {
    mockUseInView.mockReturnValue(true)
    renderHook(() => useFadeInView())
    expect(mockStart).toHaveBeenCalledWith('visible')
  })

  it('does not start animation when disabled even if in view', () => {
    mockUseInView.mockReturnValue(true)
    renderHook(() => useFadeInView({ disabled: true }))
    expect(mockStart).not.toHaveBeenCalled()
  })
})
