import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { Link } from 'react-router-dom'
import { envConfig } from '@/config'
import { Blog } from '@/types/blog'

type BlogCardProps = {
  data: Blog
}

export const Skeleton = () => (
  <div
    className={
      'aspect-square rounded-lg shadow-custom-neu-sm md:shadow-custom-neu bg-cover bg-no-repeat bg-center'
    }
  >
    <div className="h-full rounded-lg animate-pulse">
      <div className="h-1/2 bg-cover bg-center rounded-t-lg bg-gray-200" />
      <div className="flex flex-col justify-between h-1/2 p-4 md:p-6">
        <div>
          <div className="h-8 w-full bg-gray-200 rounded-sm mb-1"></div>
          <div className="hidden md:flex h-4 w-8/12 bg-gray-200 rounded-sm"></div>
        </div>
        <div className="h-4 w-3/6 bg-gray-200 hidden md:flex"></div>
      </div>
    </div>
  </div>
)

export const BlogCard = ({ data }: BlogCardProps) => {
  dayjs.extend(localizedFormat)

  return (
    <Link
      to={`/blogs/${data.id}`}
      className={
        'aspect-square rounded-lg shadow-custom-neu-sm md:shadow-custom-neu bg-cover bg-no-repeat bg-center'
      }
    >
      <div className="h-full rounded-lg hover:bg-gray-50 hover:shadow-custom-neu-sm-hover md:hover:shadow-custom-neu-hover">
        <div
          className="h-1/2 bg-cover bg-center rounded-t-lg bg-gray-200"
          style={{
            backgroundImage: `url(${envConfig.PORTFOLIO_API_BASE_URL}/v1/blogs/${data.id}/thumbnail)`,
          }}
        />
        <div className="flex flex-col justify-between h-1/2 p-4 md:p-6">
          <div>
            <h1 className="text-base md:text-xl pb-1">{data.titleEn}</h1>
            <p className="hidden md:flex text-sm text-gray-500">
              {data.descriptionEn}
            </p>
          </div>

          <span className="text-gray-500 hidden md:flex text-sm">
            {dayjs(data.createdAt).format('LL')}
          </span>
        </div>
      </div>
    </Link>
  )
}
