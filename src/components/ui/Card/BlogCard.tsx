import type { BlogEntity } from '@/types/blog'
import { dayjs } from '@/utils/dayjs'
import { useTranslation } from 'react-i18next'
import { FiArrowUpRight, FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

type BlogCardProps = {
  data: BlogEntity
}

export const Skeleton = () => (
  <div className="rounded-2xl border-ui bg-surface overflow-hidden">
    <div className="animate-pulse">
      <div className="aspect-[16/9] bg-skeleton" />
      <div className="p-5">
        <div className="h-3 w-16 bg-skeleton rounded-full mb-3" />
        <div className="h-5 w-full bg-skeleton rounded-lg mb-2" />
        <div className="h-4 w-8/12 bg-skeleton rounded-lg mb-4" />
        <div className="flex gap-2">
          <div className="h-3 w-20 bg-skeleton rounded" />
          <div className="h-3 w-16 bg-skeleton rounded" />
        </div>
      </div>
    </div>
  </div>
)

export const BlogCard = ({ data }: BlogCardProps) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const title = data.properties.title?.[lang] || data.properties.title?.en
  const description =
    data.properties.description?.[lang] || data.properties.description?.en

  return (
    <Link
      to={`/blogs/${data.slug}`}
      className="group flex flex-col h-full rounded-2xl border-ui-interactive bg-surface overflow-hidden duration-300"
    >
      <div className="aspect-[16/9] overflow-hidden bg-skeleton">
        {data.properties.coverImage && (
          <img
            src={data.properties.coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        {data.properties.category && (
          <span className="inline-block self-start text-xs font-medium text-accent bg-accent/10 rounded-full px-2.5 py-0.5 mb-3">
            {data.properties.category}
          </span>
        )}
        <div className="flex items-start justify-between gap-2 flex-1">
          <div>
            <h3 className="font-display font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-secondary mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>
          <FiArrowUpRight className="text-tertiary group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
        </div>
        <div className="flex items-center gap-3 text-tertiary text-xs mt-3">
          {data.publishedAt && (
            <span>{dayjs(data.publishedAt).format('LL')}</span>
          )}
          {data.properties.readingTime && (
            <span className="inline-flex items-center gap-1">
              <FiClock size={11} />
              {t('blog_reading_time', { count: data.properties.readingTime })}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
