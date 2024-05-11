import { useTranslation } from 'react-i18next'
import usePageTitle from "../../hooks/usePageTitle"
import WalkerBackgroundSketch from '../../components/sketches/WalkerBackgroundSketch'
import Section from '../../components/ui/Section'
import ContactPortal from '../../components/ContactPortal'

const Contact = () => {
    const { t } = useTranslation()
    usePageTitle(t('contact_document_title'))

    return (
        <main style={{ height: '-webkit-fill-available' }}>
            <WalkerBackgroundSketch />

            <Section
                className="justify-center items-center"
                style={{ marginTop: '-2rem', height: '-webkit-fill-available' }}
                showBreakline={false}
            >
                <div className="flex flex-col justify-between items-center w-full h-full mt-20 sm:mt-0 py-16 max-w-screen-md max-h-96 rounded-none sm:rounded-lg bg-white/80 shadow-custom">
                    <span className="text-3xl">{t('contact_title')}</span>

                    <div className="flex flex-col justify-center items-center space-y-2">
                        <p>{t('contact_tel')}</p>
                        <p>{t('contact_email')}</p>
                    </div>

                    <ContactPortal />
                </div>
            </Section>
        </main>
    )
}

export default Contact