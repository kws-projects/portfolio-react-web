import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import usePageTitle from '@/hooks/usePageTitle'
import useScrollToTop from '@/hooks/useScrollToTop'
import Section from '@/components/ui/Section'
import WorkShowcase from '@/components/WorkShowcase'

const Works = () => {
  const { t } = useTranslation()

  useScrollToTop()
  usePageTitle(t('works_document_title'))

  return (
    <main>
      <Helmet>
        <title>{t('works_document_title')}</title>
        <meta name="description" content={t('works_document_description')} />
        <link rel="canonical" href="https://www.kwwdev.com/works" />
        <meta name="robots" content="index, follow" />
      </Helmet>
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
