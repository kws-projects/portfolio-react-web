import { useTranslation } from 'react-i18next'
import PageMeta from '@/components/PageMeta'
import Section from '@/components/ui/Section'
import WorkShowcase from '@/components/WorkShowcase'
import Banner from './Banner'

const Home = () => {
  const { t } = useTranslation()

  return (
    <main>
      <PageMeta
        title={t('home_document_title')}
        description={t('home_document_description')}
      />
      <Banner />
      <Section
        title={t('home_featured_works_title')}
        description={t('home_featured_works_introduction')}
        className="mt-32 md:mt-64"
      >
        <WorkShowcase disableAnimation={true} disableFilter={true} />
      </Section>
    </main>
  )
}

export default Home
