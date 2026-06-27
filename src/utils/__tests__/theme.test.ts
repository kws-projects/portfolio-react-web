import { getThemeColor, isDarkTheme } from '../theme'

describe('getThemeColor', () => {
  beforeEach(() => {
    vi.spyOn(performance, 'now').mockReturnValue(0)
    document.documentElement.style.setProperty('--color-accent', '255 128 0')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parses CSS custom property into RGB tuple', () => {
    expect(getThemeColor('--color-accent')).toEqual([255, 128, 0])
  })

  it('returns zeros for missing values', () => {
    document.documentElement.style.removeProperty('--color-missing')
    expect(getThemeColor('--color-missing')).toEqual([0, 0, 0])
  })

  it('caches values within the same time window', () => {
    const first = getThemeColor('--color-accent')
    document.documentElement.style.setProperty('--color-accent', '0 0 0')
    const second = getThemeColor('--color-accent')
    expect(first).toEqual(second)
  })
})

describe('isDarkTheme', () => {
  beforeEach(() => {
    vi.spyOn(performance, 'now').mockReturnValue(1000)
    document.documentElement.removeAttribute('data-theme')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns true when data-theme is dark', () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    expect(isDarkTheme()).toBe(true)
  })

  it('returns false when data-theme is light', () => {
    vi.spyOn(performance, 'now').mockReturnValue(2000)
    document.documentElement.setAttribute('data-theme', 'light')
    expect(isDarkTheme()).toBe(false)
  })
})
