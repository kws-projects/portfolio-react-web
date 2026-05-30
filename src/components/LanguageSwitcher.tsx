import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiCheck } from 'react-icons/fi'
import { SUPPORTED_LANGUAGES, type LanguageCode } from '@/utils/i18n'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentLang =
    SUPPORTED_LANGUAGES.find(l => l.code === i18n.language) ??
    SUPPORTED_LANGUAGES[0]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (code: LanguageCode) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-raised transition-all duration-200 text-xs font-medium"
        aria-label="Switch language"
      >
        {currentLang.nativeLabel}
        <FiChevronDown
          size={12}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute right-0 top-full mt-1.5 w-44 rounded-xl border border-border/10 bg-surface shadow-card overflow-hidden z-50 py-1">
          {SUPPORTED_LANGUAGES.map(lang => {
            const isActive = i18n.language === lang.code
            return (
              <li key={lang.code}>
                <button
                  onClick={() => handleChange(lang.code)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors duration-150
                    ${isActive ? 'text-primary font-medium' : 'text-secondary hover:bg-surface-raised hover:text-primary'}`}
                >
                  <span>{lang.nativeLabel}</span>
                  {isActive && <FiCheck size={14} className="text-accent" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default LanguageSwitcher
