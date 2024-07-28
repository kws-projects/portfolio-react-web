import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import usePageTitle from '../../hooks/usePageTitle'

const NotFound = () => {
  const { t } = useTranslation()

  usePageTitle(t('error_not_found_document_title'))

  return (
    <main>
      <Helmet>
        <title>{t('error_not_found_document_title')}</title>
        <meta name="description" content={t('error_not_found_document_description')} />
      </Helmet>
      NotFound
    </main>
  )
}

export default NotFound
