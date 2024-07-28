import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import PageTitleSketch from '../../components/sketches/PageTitleSketch'
import BlogGrid from '../../components/ui/Grid/BlogGrid'
import { useQuery } from '@tanstack/react-query'
import { blogsAPI } from '../../services/portfolioSvc/blogsAPI'

const Blogs = () => {
  const { t } = useTranslation()

  useScrollToTop()
  usePageTitle(t('blog_document_title'))

  const { data: blogs, isLoading: isLoadingBlogs, isError: isErrorBlogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogsAPI.getBlogs,
  })

  return (
    <main className='pb-12'>
      <Helmet>
        <title>{t('blog_document_title')}</title>
        <meta name="description" content={t('blog_document_description')} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <PageTitleSketch title={t('blog_title')} />
      <BlogGrid
        data={blogs}
        isLoading={isLoadingBlogs}
        isError={isErrorBlogs}
      />
    </main>
  )
}

export default Blogs
