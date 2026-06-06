import { BlogCard, Skeleton } from '@/components/ui/Card/BlogCard'
import ErrorState from '@/components/ui/ErrorState'
import type { BlogEntity } from '@/types/blog'
import { useTranslation } from 'react-i18next'

type BlogGridProps = {
  data: BlogEntity[] | undefined
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

const BlogGrid = ({ data, isLoading, isError, refetch }: BlogGridProps) => {
  const { t } = useTranslation()
  const blogs = Array.isArray(data) ? data : []

  if (isError) {
    return (
      <ErrorState
        message={t('error_blogs_not_found_message')}
        onRetry={refetch}
        retryLabel={t('button_reload')}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {isLoading
        ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
        : blogs.map(blog => <BlogCard key={blog.id} data={blog} />)}
    </div>
  )
}

export default BlogGrid
