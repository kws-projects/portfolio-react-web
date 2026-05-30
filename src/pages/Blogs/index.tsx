import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import PageMeta from '@/components/PageMeta'
import BlogGrid from '@/components/ui/Grid/BlogGrid'
import RandomBackgroundSketch from '@/components/sketches/RandomBackgroundSketch'
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
    <main className="pb-24 relative">
      <RandomBackgroundSketch />
      <PageMeta
        title={t('blog_document_title')}
        description={t('blog_document_description')}
      />

      <section className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 pt-16">
        <h1 className="text-3xl md:text-4xl font-display font-medium text-primary mb-3">
          {t('blog_title')}
        </h1>
        <p className="text-secondary mb-10">{t('blog_description')}</p>

        <BlogGrid
          data={blogs}
          isLoading={isLoadingBlogs}
          isError={isErrorBlogs}
          refetch={refetchBlogs}
        />
      </section>
    </main>
  )
}

export default Blogs
