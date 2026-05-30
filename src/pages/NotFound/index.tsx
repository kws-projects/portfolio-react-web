import { useTranslation } from 'react-i18next'
import PageMeta from '@/components/PageMeta'
import NotFoundSketch from '@/components/sketches/NotFoundSketch'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <main>
      <PageMeta
        title={t('error_not_found_document_title')}
        description={t('error_not_found_document_description')}
        robots="noindex, nofollow"
      />
      <NotFoundSketch />
    </main>
  )
}

export default NotFound
