import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"

const Contact = () => {
    const { t } = useTranslation()
    usePageTitle(t('contact_document_title'))

    return (
        <main>Contact</main>
    )
}

export default Contact