import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"
import PageTitleSketch from '../../components/sketches/PageTitleSketch'
import Section from '../../components/ui/Section'

const Privacy = () => {
    const { t } = useTranslation()
    usePageTitle(t('privacy_document_title'))

    return (
        <main>
            <PageTitleSketch title={t('privacy_title')} />
            

        </main>
    )
}

export default Privacy