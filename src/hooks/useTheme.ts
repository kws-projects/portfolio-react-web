import { useState, useEffect, useCallback } from 'react'

export type Theme = 'light' | 'dark'
type ThemePreference = Theme | 'system'

const STORAGE_KEY = 'theme-preference'

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
}

const useTheme = () => {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null
    return stored ?? 'system'
  })

  const resolvedTheme: Theme =
    preference === 'system' ? getSystemTheme() : preference

  useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  useEffect(() => {
    if (preference !== 'system') return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme(getSystemTheme())
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [preference])

  const toggle = useCallback(() => {
    const next: Theme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setPreference(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [resolvedTheme])

  return { theme: resolvedTheme, preference, toggle }
}

export default useTheme
