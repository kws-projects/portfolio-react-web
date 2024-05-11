import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"
import useScrollToTop from '../../hooks/useScrollToTop'
import Section from '../../components/ui/Section'
import WorkShowcase from '../../components/WorkShowcase'

const Works = () => {
    const { t } = useTranslation()
    useScrollToTop()
    usePageTitle(t('works_document_title'))

    return (
        <main>

            <Section 
                className=""
                style={{ marginTop: '-2rem' }}
                showBreakline={false}
            >
                <WorkShowcase />
            </Section>
        </main>
    )
}

export default Works