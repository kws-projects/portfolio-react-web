import { renderHook } from '@testing-library/react'

import usePageTitle from '../usePageTitle'

describe('usePageTitle', () => {
  const originalTitle = document.title

  afterEach(() => {
    document.title = originalTitle
  })

  it('sets document.title on mount', () => {
    renderHook(() => usePageTitle('About | Portfolio'))
    expect(document.title).toBe('About | Portfolio')
  })

  it('updates document.title when title changes', () => {
    const { rerender } = renderHook(({ title }) => usePageTitle(title), {
      initialProps: { title: 'Home' },
    })

    expect(document.title).toBe('Home')

    rerender({ title: 'Works' })
    expect(document.title).toBe('Works')
  })
})
