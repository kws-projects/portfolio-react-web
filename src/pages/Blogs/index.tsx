import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import usePageTitle from 'hooks/usePageTitle'
import useScrollToTop from 'hooks/useScrollToTop'
import PageTitleSketch from 'components/sketches/PageTitleSketch'
import BlogGrid from 'components/ui/Grid/BlogGrid'
import { blogsAPI } from 'services/portfolioSvc/blogsAPI'

const Blogs = () => {
  const { t } = useTranslation()

  useScrollToTop()
  usePageTitle(t('blog_document_title'))

  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
    refetch: refetchBlogs,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogsAPI.getBlogs,
  })

  return (
    <main className="pb-32">
      <Helmet>
        <title>{t('blog_document_title')}</title>
        <meta name="description" content={t('blog_document_description')} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {!isErrorBlogs ? <PageTitleSketch title={t('blog_title')} /> : null}
      <BlogGrid
        data={blogs}
        isLoading={isLoadingBlogs}
        isError={isErrorBlogs}
        refetch={refetchBlogs}
      />
    </main>
  )
}

export default Blogs
