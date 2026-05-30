import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PageMeta from '@/components/PageMeta'
import NotFoundSketch from '@/components/sketches/NotFoundSketch'
import { FiArrowLeft } from 'react-icons/fi'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <main
      className="relative"
      style={{ height: 'calc(100vh - 160px)', minHeight: '400px' }}
    >
      <PageMeta
        title={t('error_not_found_document_title')}
        description={t('error_not_found_document_description')}
        robots="noindex, nofollow"
      />

      <div className="absolute inset-0">
        <NotFoundSketch />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-6xl md:text-8xl font-display font-bold text-primary mb-4">
          404
        </h1>
        <p className="text-lg text-secondary mb-8 max-w-md">
          {t('error_not_found_document_description')}
        </p>
        <Link
          to="/"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent font-medium hover:opacity-90 transition-opacity text-inverted"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>
      </div>
    </main>
  )
}

export default NotFound
