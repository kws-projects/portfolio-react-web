import { dayjs } from '@/utils/dayjs'
import { SUPPORTED_LANGUAGES } from '@/utils/i18n'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const DAYJS_LOCALE_MAP: Record<string, string> = {
  en: 'en',
  'zh-TW': 'zh-tw',
  ja: 'ja',
  ar: 'ar',
}

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
    dayjs.locale(DAYJS_LOCALE_MAP[i18n.language] ?? 'en')
  }, [i18n.language])
}

export default useDirection
