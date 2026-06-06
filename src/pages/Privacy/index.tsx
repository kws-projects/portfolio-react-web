import ErrorState from '@/components/ui/ErrorState'
import LegalContent from '@/components/ui/LegalContent'
import PageMeta from '@/components/ui/PageMeta'
import { useLegal } from '@/hooks/usePortfolioData'
import { mapLegal } from '@/services/api/mappers'
import { useTranslation } from 'react-i18next'

const LegalSkeleton = () => (
  <div className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 pt-16 pb-24 animate-pulse">
    <div className="h-10 w-64 bg-skeleton rounded-lg mb-3" />
    <div className="h-4 w-40 bg-skeleton rounded mb-12" />
    <div className="space-y-10">
      {[1, 2, 3].map(i => (
        <div key={i} className="space-y-3">
          <div className="h-6 w-48 bg-skeleton rounded" />
          <div className="h-4 w-full bg-skeleton rounded" />
          <div className="h-4 w-5/6 bg-skeleton rounded" />
          <div className="h-4 w-4/6 bg-skeleton rounded" />
        </div>
      ))}
    </div>
  </div>
)

const Privacy = () => {
  const { t, i18n } = useTranslation()
  const {
    data: entity,
    isLoading,
    isError,
    refetch,
  } = useLegal('privacy-policy')

  const content = entity ? mapLegal(entity, i18n.language) : null

  return (
    <main className="pb-24">
      <PageMeta
        title={t('privacy_document_title')}
        description={t('privacy_document_description')}
      />
      {isLoading ? (
        <LegalSkeleton />
      ) : isError ? (
        <ErrorState message={t('error_loading_data')} onRetry={refetch} />
      ) : content ? (
        <LegalContent document={content} />
      ) : null}
    </main>
  )
}

export default Privacy
