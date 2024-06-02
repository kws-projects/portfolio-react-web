import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { WorkCategory } from '../../data/works'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import Section from '../../components/ui/Section'
import WorkShowcase from '../../components/WorkShowcase'

const Works = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategories] =
    useState<WorkCategory | null>(null)

  useScrollToTop()
  usePageTitle(t('works_document_title'))

  useEffect(() => {
    const query: unknown = searchParams.get('work')
    if (query) setSelectedCategories(query as WorkCategory)
  }, [searchParams])

  return (
    <main>
      <Section
        className=""
        style={{ marginTop: '-2rem' }}
        showBreakline={false}
      >
        <WorkShowcase
          defaultCategory={selectedCategory ? selectedCategory : undefined}
        />
      </Section>
    </main>
  )
}

export default Works
