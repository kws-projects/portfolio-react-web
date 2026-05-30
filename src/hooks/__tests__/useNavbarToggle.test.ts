import { renderHook, act } from '@testing-library/react'
import useNavbarToggle from '../useNavbarToggle'

describe('useNavbarToggle', () => {
  it('starts collapsed', () => {
    const { result } = renderHook(() => useNavbarToggle())
    expect(result.current.isExpanded).toBe(false)
  })

  it('expands on first toggle', () => {
    const { result } = renderHook(() => useNavbarToggle())
    act(() => result.current.toggle())
    expect(result.current.isExpanded).toBe(true)
  })

  it('collapses on second toggle', () => {
    const { result } = renderHook(() => useNavbarToggle())
    act(() => result.current.toggle())
    act(() => result.current.toggle())
    expect(result.current.isExpanded).toBe(false)
  })
})
