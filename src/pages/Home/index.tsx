import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"
import HomeBackgroundSketch from '../../components/sketches/HomeBackgroundSketch'
import HomeBanner from './HomeBanner'
import WorkShowcase from '../../components/WorkShowcase'

const Home = () => {
    const { t } = useTranslation()
    usePageTitle(t('home_document_title'))

    return (
        <main>
            <HomeBackgroundSketch />
            <HomeBanner />
            <WorkShowcase />
        </main>
    )
}

export default Home