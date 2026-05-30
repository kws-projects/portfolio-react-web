import { dayjs } from '@/utils/dayjs'
import { Link } from 'react-router-dom'
import { envConfig } from '@/config'
import { Blog } from '@/types/blog'
import { FiArrowUpRight } from 'react-icons/fi'

type BlogCardProps = {
  data: Blog
}

export const Skeleton = () => (
  <div className="rounded-2xl border border-border/8 bg-surface overflow-hidden">
    <div className="animate-pulse">
      <div className="aspect-[4/3] bg-skeleton" />
      <div className="p-5">
        <div className="h-5 w-full bg-skeleton rounded-lg mb-2" />
        <div className="h-4 w-8/12 bg-skeleton rounded-lg" />
      </div>
    </div>
  </div>
)

export const BlogCard = ({ data }: BlogCardProps) => {
  return (
    <Link
      to={`/blogs/${data.id}`}
      className="group block rounded-2xl border border-border/8 bg-surface overflow-hidden hover:border-border/20 transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden bg-skeleton">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url(${envConfig.PORTFOLIO_API_BASE_URL}/v1/blogs/${data.id}/thumbnail)`,
          }}
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-semibold text-primary group-hover:text-accent transition-colors">
              {data.titleEn}
            </h3>
            <p className="text-sm text-secondary mt-1 line-clamp-2">
              {data.descriptionEn}
            </p>
          </div>
          <FiArrowUpRight className="text-tertiary group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
        </div>
        <span className="text-tertiary text-xs mt-3 block">
          {dayjs(data.createdAt).format('LL')}
        </span>
      </div>
    </Link>
  )
}
