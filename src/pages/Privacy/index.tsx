import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"

const Privacy = () => {
    const { t } = useTranslation()
    usePageTitle(t('privacy_document_title'))

    return (
        <main>
            Privacy Policy
        </main>
    )
}

export default Privacy