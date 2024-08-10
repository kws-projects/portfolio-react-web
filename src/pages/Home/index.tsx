import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import Banner from './Banner'
import Section from '../../components/ui/Section'
import WorkShowcase from '../../components/WorkShowcase'

const Home = () => {
  const { t } = useTranslation()

  useScrollToTop()
  usePageTitle(t('home_document_title'))

  return (
    <main>
      <Helmet>
        <title>{t('home_document_title')}</title>
        <meta name="description" content={t('home_document_description')} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Banner />
      <Section
        title={t('home_featured_works_title')}
        description={t('home_featured_works_introduction')}
        className="mt-32 md:mt-64"
      >
        <WorkShowcase disableAnimation={true} />
      </Section>
    </main>
  )
}

export default Home
