import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import usePageTitle from '@/hooks/usePageTitle'
import useScrollToTop from '@/hooks/useScrollToTop'
import WalkerBackgroundSketch from '@/components/sketches/WalkerBackgroundSketch'
import Section from '@/components/ui/Section'
import ContactPortal from '@/components/ContactPortal'

const Contact = () => {
  const { t } = useTranslation()

  useScrollToTop()
  usePageTitle(t('contact_document_title'))

  return (
    <main style={{ height: '-webkit-fill-available' }}>
      <Helmet>
        <title>{t('contact_document_title')}</title>
        <meta name="description" content={t('contact_document_description')} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <WalkerBackgroundSketch />
      <Section
        className="justify-center items-center"
        style={{ marginTop: '-2rem', height: '-webkit-fill-available' }}
        showBreakline={false}
      >
        <div className="flex flex-col justify-between items-center w-full h-full mt-20 sm:mt-0 py-16 min-h-80 max-w-screen-md max-h-96 rounded-none sm:rounded-lg bg-white/80 shadow-custom">
          <span className="text-3xl select-none">{t('contact_title')}</span>
          <div className="flex flex-col justify-center items-center space-y-2">
            <div>
              <span className="pr-1 select-none">{t('contact_tel_label')}</span>
              <span>{t('contact_tel')}</span>
            </div>
            <div>
              <span className="pr-1 select-none">
                {t('contact_email_label')}
              </span>
              <span>{t('contact_email')}</span>
            </div>
          </div>
          <ContactPortal />
        </div>
      </Section>
    </main>
  )
}

export default Contact
