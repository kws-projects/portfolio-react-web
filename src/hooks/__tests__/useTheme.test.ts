import { renderHook, act } from '@testing-library/react'
import useTheme from '../useTheme'

const mockMatchMedia = (prefersDark: boolean) => {
  const listeners: Array<(e: { matches: boolean }) => void> = []
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockReturnValue({
      matches: prefersDark,
      addEventListener: (_: string, cb: (e: { matches: boolean }) => void) =>
        listeners.push(cb),
      removeEventListener: (_: string, cb: (e: { matches: boolean }) => void) =>
        listeners.splice(listeners.indexOf(cb), 1),
    }),
  })
  return listeners
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    mockMatchMedia(false)
  })

  it('defaults to system theme when no preference is stored', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(result.current.preference).toBe('system')
  })

  it('uses stored preference from localStorage', () => {
    localStorage.setItem('theme-preference', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(result.current.preference).toBe('dark')
  })

  it('toggles from light to dark', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')

    act(() => result.current.toggle())
    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme-preference')).toBe('dark')
  })

  it('toggles from dark to light', () => {
    localStorage.setItem('theme-preference', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')

    act(() => result.current.toggle())
    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem('theme-preference')).toBe('light')
  })

  it('applies data-theme attribute to document', () => {
    mockMatchMedia(true)
    renderHook(() => useTheme())
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
