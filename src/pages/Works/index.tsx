import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { WorkCategory } from '../../data/works'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import Section from '../../components/ui/Section'
import WorkShowcase from '../../components/WorkShowcase'

const Works = () => {
  const { t } = useTranslation()

  useScrollToTop()
  usePageTitle(t('works_document_title'))

  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategories] =
    useState<WorkCategory | null>(null)

  useEffect(() => {
    const query: unknown = searchParams.get('work')
    if (query) setSelectedCategories(query as WorkCategory)
  }, [searchParams])

  return (
    <main>
      <Helmet>
        <title>{t('works_document_title')}</title>
        <meta name="description" content={t('works_document_description')} />
        <link rel="canonical" href="https://www.kwwdev.com/works" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Section
        style={{ marginTop: '-2rem' }}
        showBreakline={false}
        disableAnimation={true}
      >
        <WorkShowcase
          defaultCategory={selectedCategory ? selectedCategory : undefined}
        />
      </Section>
    </main>
  )
}

export default Works
