import { FiSun, FiMoon } from 'react-icons/fi'
import useTheme from '@/hooks/useTheme'

const ThemeToggle = () => {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-raised transition-all duration-200"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  )
}

export default ThemeToggle
