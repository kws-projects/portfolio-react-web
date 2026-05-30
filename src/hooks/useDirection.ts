import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '@/utils/i18n'

const getDirection = (lang: string): 'ltr' | 'rtl' => {
  const entry = SUPPORTED_LANGUAGES.find(l => l.code === lang)
  return entry?.dir ?? 'ltr'
}

const useDirection = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    const dir = getDirection(i18n.language)
    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
  }, [i18n.language])
}

export default useDirection
