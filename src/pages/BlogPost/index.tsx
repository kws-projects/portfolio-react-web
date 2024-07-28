import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import PageTitleSketch from '../../components/sketches/PageTitleSketch'
import BlogNodeBlock from '../../components/ui/Block/BlogNodeBlock'
import { blogsAPI } from '../../services/portfolioSvc/blogsAPI'
import { BlogNode } from '../../types/blog'

const BlogPost = () => {
  const { t } = useTranslation()

  useScrollToTop()
  usePageTitle(t('blog_post_document_title'))

  const { blogId } = useParams()

  const {
    data: blog,
    isLoading: isLoadingBlog,
    isError: isErrorBlog,
  } = useQuery({
    queryKey: ['blog'],
    queryFn: () => blogsAPI.getBlogPost(Number(blogId)),
  })

  return (
    <main>
      <Helmet>
        <title>
          {isLoadingBlog
            ? 'Loading...'
            : blog?.blog?.titleEn || t('blog_post_not_found_title')}
        </title>
        <meta
          name="description"
          content={
            isLoadingBlog
              ? 'Loading...'
              : blog?.blog?.titleEn || t('error_not_found_document_description')
          }
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <PageTitleSketch
        title={
          isLoadingBlog
            ? 'Loading...'
            : blog?.blog?.titleEn || t('error_not_found_document_description')
        }
      />

      {isLoadingBlog ? <></> : null}
      {isErrorBlog ? <></> : null}

      {!isLoadingBlog && !isErrorBlog && blog?.nodes.length >= 1 ? (
        <div className="self-center w-full max-w-screen-lg mb-24 px-6 md:px-12 xl:px-0">
          {blog.nodes.map((node: BlogNode) => (
            <BlogNodeBlock key={node.id} data={node} />
          ))}
        </div>
      ) : null}
    </main>
  )
}

export default BlogPost
