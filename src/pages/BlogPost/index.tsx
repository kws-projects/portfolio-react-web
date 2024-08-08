import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import PageTitleSketch from '../../components/sketches/PageTitleSketch'
import {
  BlogNodeBlock,
  Skeleton,
} from '../../components/ui/Block/BlogNodeBlock'
import { blogsAPI } from '../../services/portfolioSvc/blogsAPI'
import { BlogNode } from '../../types/blog'
import { FaCircleXmark } from 'react-icons/fa6'
import Button from '../../components/ui/Button/Button'

const BlogPost = () => {
  const { t } = useTranslation()

  useScrollToTop()
  usePageTitle(t('blog_post_document_title'))

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

      {isErrorBlog ? (
        <div className="flex flex-col self-center m-12 gap-y-6">
          <FaCircleXmark className="self-center fill-gray-800" size={50} />
          <h1 className="text-2xl text-center">
            {t('error_blog_not_found_message')}
          </h1>
          <Button onClick={refetch}>{t('button_reload')}</Button>
        </div>
      ) : null}

      {!isErrorBlog ? (
        <>
          <PageTitleSketch title={blog?.blog?.titleEn} />
          <div className="self-center w-full max-w-screen-lg mb-24 px-6 md:px-12 xl:px-0">
            {isLoadingBlog ? (
              <Skeleton />
            ) : (
              <>
                {blog.nodes.map((node: BlogNode) => (
                  <BlogNodeBlock key={node.id} data={node} />
                ))}
              </>
            )}
          </div>
        </>
      ) : null}
    </main>
  )
}

export default BlogPost
