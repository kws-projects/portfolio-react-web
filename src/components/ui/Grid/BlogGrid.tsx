import { BlogCard, Skeleton } from '../Card/BlogCard'
import { Blog } from '../../../types/blog'
import { FaCircleXmark } from 'react-icons/fa6'
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'

type BlogGridProps = {
  data: Blog[]
  isLoading: boolean
  isError: boolean
  refetch: any
}

const BlogGrid = ({ data, isLoading, isError, refetch }: BlogGridProps) => {
  const { t } = useTranslation()

  return (
    <>
      {isError ? (
        <div className="flex flex-col self-center m-12 gap-y-6">
          <FaCircleXmark className="self-center fill-gray-800" size={50} />
          <h1 className="text-2xl text-center">
            {t('error_blogs_not_found_message')}
          </h1>
          <Button onClick={refetch}>{t('button_reload')}</Button>
        </div>
      ) : null}

      {!isError && (
        <div className="self-center max-w-screen-xl w-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 lg-12 mt-8 sm:mt-12 px-4 md:px-8">
          {isLoading ? (
            <>
              {[...Array(6)].map(() => (
                <Skeleton />
              ))}
            </>
          ) : null}

          {!isLoading && !isError ? (
            <>
              {data.map(blog => (
                <BlogCard key={blog.id} data={blog} />
              ))}
            </>
          ) : null}
        </div>
      )}
    </>
  )
}

export default BlogGrid
