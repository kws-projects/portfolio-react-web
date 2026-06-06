import Button from '@/components/ui/Button/Button'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

type ErrorStateProps = {
  message?: string
  subtitle?: string
  onRetry?: () => void
}

const ErrorState = ({ message, subtitle, onRetry }: ErrorStateProps) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-tertiary mb-4"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
      <p className="text-base text-primary font-medium text-center">
        {message ?? t('error_loading_data')}
      </p>
      <p className="text-sm text-tertiary text-center mt-1.5 mb-6 max-w-xs">
        {subtitle ?? t('error_loading_data_subtitle')}
      </p>
      {onRetry && <Button onClick={onRetry}>{t('button_reload')}</Button>}
    </motion.div>
  )
}

export default ErrorState
