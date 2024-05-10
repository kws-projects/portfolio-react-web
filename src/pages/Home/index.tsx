import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"
import Banner from './Banner'
import Section from '../../components/ui/Section'
import WorkShowcase from '../../components/WorkShowcase'

const Home = () => {
    const { t } = useTranslation()
    usePageTitle(t('home_document_title'))

    return (
        <main>
            <Banner />

            <Section 
                title={t('home_featured_works_title')} 
                description={t('home_featured_works_introduction')} 
                className="mt-32 md:mt-64"
            >
                <WorkShowcase />
            </Section>
        </main>
    )
}

export default Home