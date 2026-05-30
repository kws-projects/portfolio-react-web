import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import english from './en'
import traditionalChinese from './zh-TW'
import japanese from './ja'

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'zh-TW', label: 'Chinese (Traditional)', nativeLabel: '繁體中文' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

const resources = {
  en: { translation: english },
  'zh-TW': { translation: traditionalChinese },
  ja: { translation: japanese },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh-TW', 'ja'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18n-language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  })

export default i18n
