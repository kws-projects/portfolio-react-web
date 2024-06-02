import { useTranslation } from 'react-i18next'
import usePageTitle from '../../hooks/usePageTitle'

const NotFound = () => {
  const { t } = useTranslation()
  usePageTitle(t('error_not_found_document_title'))

  return <main>NotFound</main>
}

export default NotFound
