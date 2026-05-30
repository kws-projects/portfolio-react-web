import { useTranslation } from 'react-i18next'
import PageMeta from '@/components/PageMeta'
import Section from '@/components/ui/Section'
import WorkShowcase from '@/components/WorkShowcase'

const Works = () => {
  const { t } = useTranslation()

  return (
    <main>
      <PageMeta
        title={t('works_document_title')}
        description={t('works_document_description')}
        canonicalUrl="https://www.kwwdev.com/works"
      />
      <Section
        style={{ marginTop: '-2rem' }}
        showBreakline={false}
        disableAnimation={true}
      >
        <WorkShowcase />
      </Section>
    </main>
  )
}

export default Works
