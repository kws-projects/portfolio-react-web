import RandomBackgroundSketch from '@/components/sketches/RandomBackgroundSketch'
import { BlogCard, Skeleton } from '@/components/ui/Card/BlogCard'
import ErrorState from '@/components/ui/ErrorState'
import PageMeta from '@/components/ui/PageMeta'
import type { BlogSortOption } from '@/hooks/useBlogFilter'
import { useBlogFilter } from '@/hooks/useBlogFilter'
import useFadeInView from '@/hooks/useFadeInView'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const BlogsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton key={i} />
    ))}
  </div>
)

const Blogs = () => {
  const { t } = useTranslation()
  const { ref, motionProps } = useFadeInView({ y: 40 })

  const {
    blogs,
    pagination,
    selectedCategory,
    selectedSort,
    currentPage,
    availableCategories,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
    isLoading,
    isError,
    refetch,
  } = useBlogFilter()

  const allCategories = ['all', ...availableCategories]

  return (
    <main className="pb-24 relative">
      <RandomBackgroundSketch />
      <PageMeta
        title={t('blog_document_title')}
        description={t('blog_document_description')}
      />

      <section className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 pt-16">
        <h1 className="text-3xl md:text-4xl font-display font-medium text-primary mb-3">
          {t('blog_title')}
        </h1>
        <p className="text-secondary mb-10">{t('blog_description')}</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          {availableCategories.length > 0 && (
            <nav>
              <ul className="flex flex-wrap gap-2">
                {allCategories.map(cat => (
                  <li
                    key={cat}
                    className={`px-4 py-2 rounded-xl text-sm cursor-pointer border transition-all duration-200
                      ${
                        selectedCategory === cat
                          ? 'bg-accent/15 border-accent/40 text-primary font-medium'
                          : 'bg-surface border-ui text-secondary hover:border-border/25 hover:text-primary'
                      }`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat === 'all' ? t('blog_cat_all') : cat}
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="relative inline-flex items-center self-start sm:self-auto shrink-0">
            <select
              value={selectedSort}
              onChange={e => handleSortChange(e.target.value as BlogSortOption)}
              className="appearance-none w-full bg-surface border border-ui rounded-xl pl-4 pr-9 py-2 text-sm text-secondary hover:text-primary hover:border-border/25 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
            >
              <option value="newest">{t('blog_sort_newest')}</option>
              <option value="oldest">{t('blog_sort_oldest')}</option>
            </select>
            <FiChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none"
              size={14}
            />
          </div>
        </div>
      </section>

      <motion.section
        ref={ref}
        {...motionProps}
        className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28"
      >
        {isLoading ? (
          <BlogsSkeleton />
        ) : isError ? (
          <ErrorState
            message={t('error_blogs_not_found_message')}
            onRetry={refetch}
          />
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg font-medium text-primary mb-2">
              {t('blog_no_posts')}
            </p>
            <p className="text-secondary text-sm">
              {t('blog_no_posts_description')}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {blogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="h-full"
                >
                  <BlogCard data={blog} />
                </motion.div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <nav className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm border border-ui bg-surface text-secondary hover:text-primary hover:border-border/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <FiChevronLeft size={16} />
                  {t('blog_page_prev')}
                </button>

                <span className="text-sm text-tertiary">
                  {t('blog_page_info', {
                    page: currentPage,
                    total: pagination.totalPages,
                  })}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= pagination.totalPages}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm border border-ui bg-surface text-secondary hover:text-primary hover:border-border/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {t('blog_page_next')}
                  <FiChevronRight size={16} />
                </button>
              </nav>
            )}
          </>
        )}
      </motion.section>
    </main>
  )
}

export default Blogs
