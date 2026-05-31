import { useTranslation } from 'react-i18next'
import PageMeta from '@/components/ui/PageMeta'
import LegalContent from '@/components/ui/LegalContent'
import { getPrivacyContent } from '@/data/legal'

const Privacy = () => {
  const { t, i18n } = useTranslation()
  const content = getPrivacyContent(i18n.language)

  return (
    <main className="pb-24">
      <PageMeta
        title={t('privacy_document_title')}
        description={t('privacy_document_description')}
      />
      <LegalContent document={content} />
    </main>
  )
}

export default Privacy
