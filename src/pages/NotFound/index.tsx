import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import usePageTitle from 'hooks/usePageTitle'
import NotFoundSketch from 'components/sketches/NotFoundSketch'

const NotFound = () => {
  const { t } = useTranslation()

  usePageTitle(t('error_not_found_document_title'))

  return (
    <main>
      <Helmet>
        <title>{t('error_not_found_document_title')}</title>
        <meta
          name="description"
          content={t('error_not_found_document_description')}
        />
      </Helmet>
      <NotFoundSketch />
    </main>
  )
}

export default NotFound
