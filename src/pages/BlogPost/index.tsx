import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCalendar, FiUser, FiTag } from 'react-icons/fi'
import PageMeta from '@/components/PageMeta'
import { BlogNode } from '@/types/blog'
import { BlogNodeBlock, Skeleton } from '@/components/ui/Block/BlogNodeBlock'
import ErrorState from '@/components/ui/ErrorState'
import { blogsAPI } from '@/services/portfolioSvc/blogsAPI'
import { dayjs } from '@/utils/dayjs'

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

  const blogData = blog?.blog

  return (
    <main className="pb-24">
      <PageMeta
        title={pageTitle}
        description={
          isLoadingBlog
            ? 'Loading...'
            : blogData?.titleEn || t('error_not_found_document_description')
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
        <article className="w-full max-w-screen-md mx-auto px-6 md:px-10 pt-10 md:pt-16">
          {isLoadingBlog ? (
            <LoadingSkeleton />
          ) : (
            <>
              <BlogHeader
                title={blogData?.titleEn}
                description={blogData?.descriptionEn}
                author={blogData?.author}
                category={blogData?.category}
                createdAt={blogData?.createdAt}
                backLabel={t('blog_title')}
              />

              <motion.div
                className="blog-content space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {blog.nodes.map((node: BlogNode) => (
                  <BlogNodeBlock key={node.id} data={node} />
                ))}
              </motion.div>
            </>
          )}
        </article>
      )}
    </main>
  )
}

const BlogHeader = ({
  title,
  description,
  author,
  category,
  createdAt,
  backLabel,
}: {
  title?: string
  description?: string
  author?: string
  category?: string
  createdAt?: Date
  backLabel: string
}) => (
  <motion.header
    className="mb-10 md:mb-14"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Link
      to="/blogs"
      className="group inline-flex items-center gap-1.5 text-sm text-tertiary hover:text-primary transition-colors mb-8"
    >
      <FiArrowLeft
        size={14}
        className="rtl:rotate-180 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"
      />
      {backLabel}
    </Link>

    <h1 className="text-3xl md:text-4xl font-display font-medium text-primary leading-tight mb-4">
      {title}
    </h1>

    {description && (
      <p className="text-lg text-secondary leading-relaxed mb-6">
        {description}
      </p>
    )}

    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-tertiary">
      {author && (
        <span className="inline-flex items-center gap-1.5">
          <FiUser size={14} />
          {author}
        </span>
      )}
      {createdAt && (
        <span className="inline-flex items-center gap-1.5">
          <FiCalendar size={14} />
          {dayjs(createdAt).format('LL')}
        </span>
      )}
      {category && (
        <span className="inline-flex items-center gap-1.5">
          <FiTag size={14} />
          {category}
        </span>
      )}
    </div>

    <div className="mt-8 border-t border-border/10" />
  </motion.header>
)

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 w-20 bg-skeleton rounded mb-8" />
    <div className="h-10 w-4/5 bg-skeleton rounded-lg mb-4" />
    <div className="h-5 w-3/5 bg-skeleton rounded mb-6" />
    <div className="flex gap-4 mb-8">
      <div className="h-4 w-24 bg-skeleton rounded" />
      <div className="h-4 w-28 bg-skeleton rounded" />
      <div className="h-4 w-20 bg-skeleton rounded" />
    </div>
    <div className="border-t border-border/10 mb-10" />
    <Skeleton />
  </div>
)

export default BlogPost
