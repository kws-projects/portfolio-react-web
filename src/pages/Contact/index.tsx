import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"
import WalkerBackgroundSketch from '../../components/sketches/WalkerBackgroundSketch'

const Contact = () => {
    const { t } = useTranslation()
    usePageTitle(t('contact_document_title'))

    return (
        <main>
            <WalkerBackgroundSketch />

            Contact
        </main>
    )
}

export default Contact