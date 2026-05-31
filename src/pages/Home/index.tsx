import { useTranslation } from 'react-i18next'
import PageMeta from '@/components/ui/PageMeta'
import Hero from './Hero'
import BentoSection from './BentoSection'
import FeaturedSection from './FeaturedSection'

const Home = () => {
  const { t } = useTranslation()

  return (
    <main>
      <PageMeta
        title={t('home_document_title')}
        description={t('home_document_description')}
      />
      <Hero />
      <BentoSection />
      <FeaturedSection />
    </main>
  )
}

export default Home
