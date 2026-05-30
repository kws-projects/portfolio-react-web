import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import PageMeta from '@/components/PageMeta'
import PageTitleSketch from '@/components/sketches/PageTitleSketch'
import BlogGrid from '@/components/ui/Grid/BlogGrid'
import { blogsAPI } from '@/services/portfolioSvc/blogsAPI'

const Blogs = () => {
  const { t } = useTranslation()

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
      <PageMeta
        title={t('blog_document_title')}
        description={t('blog_document_description')}
      />
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
