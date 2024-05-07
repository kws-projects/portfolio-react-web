import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"

const About = () => {
    const { t } = useTranslation()
    usePageTitle(t('about_document_title'))

    return (
        <main>About</main>
    )
}

export default About