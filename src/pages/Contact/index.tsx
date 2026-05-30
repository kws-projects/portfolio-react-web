import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageMeta from '@/components/PageMeta'
import TerminalSketch from '@/components/sketches/TerminalSketch'
import RandomBackgroundSketch from '@/components/sketches/RandomBackgroundSketch'
import ContactPortal from '@/components/ContactPortal'

const Contact = () => {
  const { t } = useTranslation()

  return (
    <main className="flex-1 pb-24 relative">
      <RandomBackgroundSketch />
      <PageMeta
        title={t('contact_document_title')}
        description={t('contact_document_description')}
      />

      <div className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-2">
            {t('contact_get_in_touch')}
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-medium text-primary mb-4">
            {t('contact_title')}
          </h1>
          <p className="text-secondary mb-10 max-w-lg">
            {t('contact_description')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Terminal sketch */}
          <div className="lg:col-span-3 h-72 sm:h-80 rounded-2xl border-ui overflow-hidden">
            <TerminalSketch />
          </div>

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a
              href={`mailto:${t('contact_email')}`}
              className="flex flex-col gap-1 p-5 rounded-2xl border-ui-interactive bg-surface"
            >
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                {t('contact_label_email')}
              </span>
              <span className="text-primary font-medium">
                {t('contact_email')}
              </span>
            </a>

            <a
              href={`tel:${t('contact_tel')}`}
              className="flex flex-col gap-1 p-5 rounded-2xl border-ui-interactive bg-surface"
            >
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                {t('contact_label_phone')}
              </span>
              <span className="text-primary font-medium">
                {t('contact_tel')}
              </span>
            </a>

            <div className="flex flex-col gap-2 p-5 rounded-2xl border-ui bg-surface">
              <span className="text-xs font-medium tracking-widest uppercase text-accent mb-1">
                {t('contact_label_socials')}
              </span>
              <ContactPortal />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default Contact
