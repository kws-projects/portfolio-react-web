import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"

const Works = () => {
    const { t } = useTranslation()
    usePageTitle(t('works_document_title'))

    return (
        <main>Works</main>
    )
}

export default Works