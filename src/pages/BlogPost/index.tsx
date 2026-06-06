import { TiptapRenderer } from '@/components/blog/TiptapRenderer'
import ErrorState from '@/components/ui/ErrorState'
import PageMeta from '@/components/ui/PageMeta'
import { useBlog } from '@/hooks/useBlogs'
import type { BlogContent } from '@/types/blog'
import { dayjs } from '@/utils/dayjs'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiUser } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'

interface TocItem {
  id: string
  text: string
  level: number
}

function toAnchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractToc(content: Record<string, unknown>): TocItem[] {
  const items: TocItem[] = []
  const docContent = (content as { content?: Array<Record<string, unknown>> })
    .content

  if (!Array.isArray(docContent)) return items

  for (const node of docContent) {
    if (node.type === 'heading' && node.attrs && node.content) {
      const attrs = node.attrs as { level: number }
      const textNodes = node.content as Array<{ text?: string }>
      const text = textNodes.map(t => t.text || '').join('')
      if (text) {
        items.push({
          id: toAnchorId(text),
          text,
          level: attrs.level,
        })
      }
    }
  }

  return items
}

const BlogPost = () => {
  const { t, i18n } = useTranslation()
  const { slug } = useParams()

  const { data: blog, isLoading, isError, refetch } = useBlog(slug)

  const locale = i18n.language
  const blogContent: BlogContent | undefined = useMemo(() => {
    if (!blog?.contents) return undefined
    return (
      blog.contents.find(c => c.locale === locale) ||
      blog.contents.find(c => c.locale === 'en') ||
      blog.contents[0]
    )
  }, [blog, locale])

  const toc = useMemo(() => {
    if (!blogContent?.content) return []
    return extractToc(blogContent.content)
  }, [blogContent])

  const title = blog?.properties?.title?.[locale] || blog?.properties?.title?.en
  const description =
    blog?.properties?.description?.[locale] || blog?.properties?.description?.en

  return (
    <main className="pb-24">
      <PageMeta
        title={
          isLoading ? 'Loading...' : title || t('blog_post_not_found_title')
        }
        description={
          isLoading
            ? 'Loading...'
            : description || t('error_not_found_document_description')
        }
        robots="noindex, nofollow"
      />

      {isError ? (
        <ErrorState
          message={t('error_blog_not_found_message')}
          onRetry={refetch}
        />
      ) : (
        <article className="w-full max-w-screen-lg mx-auto px-6 md:px-10 pt-10 md:pt-16">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <BlogHeader
                title={title}
                description={description}
                author={blog?.properties?.author}
                category={blog?.properties?.category}
                tags={blog?.properties?.tags}
                readingTime={blog?.properties?.readingTime}
                readingTimeLabel={
                  blog?.properties?.readingTime
                    ? t('blog_post_min_read', {
                        count: blog.properties.readingTime,
                      })
                    : undefined
                }
                publishedAt={blog?.publishedAt}
                backLabel={t('blog_title')}
              />

              <div className="flex gap-10 relative">
                {toc.length > 0 && (
                  <TableOfContents items={toc} label={t('blog_post_toc')} />
                )}

                <motion.div
                  className="flex-1 min-w-0 max-w-[720px] mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {blogContent?.content && (
                    <TiptapRenderer content={blogContent.content} />
                  )}
                </motion.div>
              </div>

              <BlogFooter
                author={blog?.properties?.author}
                authorLabel={t('blog_post_author')}
                backLabel={t('blog_title')}
              />
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
  tags,
  readingTime,
  readingTimeLabel,
  publishedAt,
  backLabel,
}: {
  title?: string
  description?: string
  author?: string
  category?: string
  tags?: string[]
  readingTime?: number
  readingTimeLabel?: string
  publishedAt?: string | null
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
        className="transition-transform group-hover:-translate-x-0.5"
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

    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-tertiary mb-4">
      {author && (
        <span className="inline-flex items-center gap-1.5">
          <FiUser size={14} />
          {author}
        </span>
      )}
      {publishedAt && (
        <span className="inline-flex items-center gap-1.5">
          <FiCalendar size={14} />
          {dayjs(publishedAt).format('LL')}
        </span>
      )}
      {readingTime && (
        <span className="inline-flex items-center gap-1.5">
          <FiClock size={14} />
          {readingTimeLabel}
        </span>
      )}
      {category && (
        <span className="inline-flex items-center gap-1.5">
          <FiTag size={14} />
          {category}
        </span>
      )}
    </div>

    {tags && tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    )}

    <div className="border-t border-divider" />
  </motion.header>
)

const TableOfContents = ({
  items,
  label,
}: {
  items: TocItem[]
  label: string
}) => (
  <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
    <nav className="text-sm">
      <h4 className="font-semibold text-primary mb-3 text-xs uppercase tracking-wider">
        {label}
      </h4>
      <ul className="space-y-1.5">
        {items.map(item => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
          >
            <a
              href={`#${item.id}`}
              className="text-tertiary hover:text-primary transition-colors line-clamp-2"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
)

const BlogFooter = ({
  author,
  authorLabel,
  backLabel,
}: {
  author?: string
  authorLabel: string
  backLabel: string
}) => (
  <motion.footer
    className="mt-16 pt-8 border-t border-divider"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    {author && (
      <div className="flex items-center gap-4 mb-8 p-5 rounded-2xl border-ui bg-surface">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-lg">
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-primary">{author}</p>
          <p className="text-sm text-tertiary">{authorLabel}</p>
        </div>
      </div>
    )}

    <Link
      to="/blogs"
      className="group inline-flex items-center gap-1.5 text-sm text-accent hover:opacity-80 transition-opacity"
    >
      <FiArrowLeft
        size={14}
        className="transition-transform group-hover:-translate-x-0.5"
      />
      {backLabel}
    </Link>
  </motion.footer>
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
    <div className="border-t border-divider mb-10" />
    <div className="flex flex-col gap-4">
      <div className="h-4 w-full bg-skeleton rounded" />
      <div className="h-4 w-11/12 bg-skeleton rounded" />
      <div className="h-4 w-4/5 bg-skeleton rounded" />
      <div className="h-40 w-full bg-skeleton rounded-xl mt-4" />
      <div className="h-4 w-full bg-skeleton rounded mt-4" />
      <div className="h-4 w-9/12 bg-skeleton rounded" />
    </div>
  </div>
)

export default BlogPost
