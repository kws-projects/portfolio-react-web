import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"
import Banner from './Banner'
import WorkShowcase from '../../components/WorkShowcase'

const Home = () => {
    const { t } = useTranslation()
    usePageTitle(t('home_document_title'))

    return (
        <main>
            <Banner />
            <WorkShowcase />
        </main>
    )
}

export default Home