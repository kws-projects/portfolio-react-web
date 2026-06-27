import { dayjs } from '@/utils/dayjs'
import { renderHook } from '@testing-library/react'

import useDirection from '../useDirection'

const { mockLanguage } = vi.hoisted(() => ({
  mockLanguage: { current: 'en' },
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: mockLanguage.current },
  }),
}))

vi.mock('@/utils/i18n', () => ({
  SUPPORTED_LANGUAGES: [
    { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr' },
    { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
  ],
}))

describe('useDirection', () => {
  beforeEach(() => {
    mockLanguage.current = 'en'
    document.documentElement.removeAttribute('dir')
    document.documentElement.removeAttribute('lang')
    dayjs.locale('en')
  })

  it('sets document dir and lang for LTR languages', () => {
    renderHook(() => useDirection())
    expect(document.documentElement.dir).toBe('ltr')
    expect(document.documentElement.lang).toBe('en')
  })

  it('sets RTL direction for Arabic', () => {
    mockLanguage.current = 'ar'
    renderHook(() => useDirection())
    expect(document.documentElement.dir).toBe('rtl')
    expect(document.documentElement.lang).toBe('ar')
  })

  it('maps zh-TW to dayjs zh-tw locale', () => {
    mockLanguage.current = 'zh-TW'
    renderHook(() => useDirection())
    expect(dayjs.locale()).toBe('zh-tw')
  })

  it('falls back to en dayjs locale for unknown languages', () => {
    mockLanguage.current = 'fr'
    renderHook(() => useDirection())
    expect(dayjs.locale()).toBe('en')
  })
})
