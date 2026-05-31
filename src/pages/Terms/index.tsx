import { useTranslation } from 'react-i18next'
import PageMeta from '@/components/ui/PageMeta'
import LegalContent from '@/components/ui/LegalContent'
import { getTermsContent } from '@/data/legal'

const Terms = () => {
  const { t, i18n } = useTranslation()
  const content = getTermsContent(i18n.language)

  return (
    <main className="pb-24">
      <PageMeta
        title={t('terms_document_title')}
        description={t('terms_document_description')}
      />
      <LegalContent document={content} />
    </main>
  )
}

export default Terms
