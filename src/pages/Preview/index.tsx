import ErrorState from '@/components/ui/ErrorState'
import PageMeta from '@/components/ui/PageMeta'
import { usePreview } from '@/hooks/usePortfolioData'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiEye } from 'react-icons/fi'
import { useParams } from 'react-router-dom'

const Preview = () => {
  const { token } = useParams<{ token: string }>()
  const { t } = useTranslation()

  const { data: entity, isLoading, isError, refetch } = usePreview(token ?? '')

  return (
    <main className="pb-24">
      <PageMeta
        title="Preview"
        description="Content preview"
        robots="noindex, nofollow"
      />

      {/* Preview banner */}
      <div className="sticky top-0 z-50 bg-amber-500/90 backdrop-blur-sm text-amber-950 px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2">
        <FiEye size={14} />
        Preview Mode
      </div>

      <div className="w-full max-w-screen-md mx-auto px-6 md:px-10 pt-10 md:pt-16">
        {isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <ErrorState message={t('error_loading_data')} onRetry={refetch} />
        ) : entity ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 text-xs text-tertiary space-y-1">
              <p>Entity ID: {entity.id}</p>
              <p>Slug: {entity.slug}</p>
              <p>Status: {entity.status}</p>
            </div>

            {entity.contents?.map(content => (
              <div key={content.id} className="mb-8">
                <p className="text-xs uppercase tracking-widest text-accent mb-3">
                  {content.locale}
                </p>
                <pre className="bg-surface rounded-xl border-ui p-6 text-sm text-secondary overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(content.content, null, 2)}
                </pre>
              </div>
            ))}

            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest text-accent mb-3">
                Properties
              </p>
              <pre className="bg-surface rounded-xl border-ui p-6 text-sm text-secondary overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(entity.properties, null, 2)}
              </pre>
            </div>
          </motion.div>
        ) : null}
      </div>
    </main>
  )
}

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 w-32 bg-skeleton rounded" />
    <div className="h-4 w-48 bg-skeleton rounded" />
    <div className="h-64 w-full bg-skeleton rounded-xl mt-6" />
  </div>
)

export default Preview
