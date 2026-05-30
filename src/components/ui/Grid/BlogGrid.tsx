import { useTranslation } from 'react-i18next'
import { Blog } from '@/types/blog'
import { BlogCard, Skeleton } from '@/components/ui/Card/BlogCard'
import ErrorState from '@/components/ui/ErrorState'

type BlogGridProps = {
  data: Blog[]
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

const BlogGrid = ({ data, isLoading, isError, refetch }: BlogGridProps) => {
  const { t } = useTranslation()

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
    <div className="self-center max-w-screen-xl w-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 lg-12 mt-8 sm:mt-12 px-4 md:px-8">
      {isLoading
        ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
        : data.map(blog => <BlogCard key={blog.id} data={blog} />)}
    </div>
  )
}

export default BlogGrid
