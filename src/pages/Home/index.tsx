import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"
import HomeBackgroundSketch from '../../components/sketches/HomeBackgroundSketch'
import Banner from './Banner/'

const Home = () => {
    const { t } = useTranslation()
    usePageTitle(t('home_document_title'))

    return (
        <main>
            <HomeBackgroundSketch />
            <Banner />
        </main>
    )
}

export default Home