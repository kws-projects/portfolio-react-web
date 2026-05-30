import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import PageMeta from '@/components/PageMeta'
import { BlogNode } from '@/types/blog'
import { BlogNodeBlock, Skeleton } from '@/components/ui/Block/BlogNodeBlock'
import ErrorState from '@/components/ui/ErrorState'
import { blogsAPI } from '@/services/portfolioSvc/blogsAPI'

const BlogPost = () => {
  const { t } = useTranslation()
  const { blogId } = useParams()

  const {
    data: blog,
    isLoading: isLoadingBlog,
    isError: isErrorBlog,
    refetch,
  } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => blogsAPI.getBlogPost(Number(blogId)),
  })

  const pageTitle = isLoadingBlog
    ? 'Loading...'
    : blog?.blog?.titleEn || t('blog_post_not_found_title')

  return (
    <main className="pb-24">
      <PageMeta
        title={pageTitle}
        description={
          isLoadingBlog
            ? 'Loading...'
            : blog?.blog?.titleEn || t('error_not_found_document_description')
        }
        robots="noindex, nofollow"
      />

      {isErrorBlog ? (
        <ErrorState
          message={t('error_blog_not_found_message')}
          onRetry={refetch}
          retryLabel={t('button_reload')}
        />
      ) : (
        <section className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 pt-16">
          {isLoadingBlog ? (
            <>
              <div className="h-10 w-2/3 bg-skeleton rounded-lg animate-pulse mb-8" />
              <Skeleton />
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-primary mb-10">
                {blog?.blog?.titleEn}
              </h1>
              {blog.nodes.map((node: BlogNode) => (
                <BlogNodeBlock key={node.id} data={node} />
              ))}
            </>
          )}
        </section>
      )}
    </main>
  )
}

export default BlogPost
