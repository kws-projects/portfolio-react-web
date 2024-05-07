import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"

const Terms = () => {
    const { t } = useTranslation()
    usePageTitle(t('terms_document_title'))

    return (
        <main>
            Terms and Conditions
        </main>
    )
}

export default Terms