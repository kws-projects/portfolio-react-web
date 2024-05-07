import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"

const Home = () => {
    const { t } = useTranslation()
    usePageTitle(t('home_document_title'))

    return (
        <main></main>
    )
}

export default Home