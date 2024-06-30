import { useTranslation } from 'react-i18next'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import PageTitleSketch from '../../components/sketches/PageTitleSketch'
import Grid from '../../components/ui/Grid'

const Blogs = () => {
  const { t } = useTranslation()
  useScrollToTop()
  usePageTitle(t('blog_document_title'))

  return (
    <main>
      <PageTitleSketch title={t('blog_title')} />

      <Grid />
    </main>
  )
}

export default Blogs
