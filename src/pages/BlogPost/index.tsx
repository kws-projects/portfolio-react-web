import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import PageMeta from '@/components/PageMeta'
import { BlogNode } from '@/types/blog'
import PageTitleSketch from '@/components/sketches/PageTitleSketch'
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
    <main>
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
        <>
          <PageTitleSketch title={blog?.blog?.titleEn} />
          <div className="self-center w-full max-w-screen-lg mb-24 px-6 md:px-12 xl:px-0">
            {isLoadingBlog ? (
              <Skeleton />
            ) : (
              blog.nodes.map((node: BlogNode) => (
                <BlogNodeBlock key={node.id} data={node} />
              ))
            )}
          </div>
        </>
      )}
    </main>
  )
}

export default BlogPost
