import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageMeta from '@/components/PageMeta'
import useFadeInView from '@/hooks/useFadeInView'
import useWorkFilter from '@/hooks/useWorkFilter'
import TiltCard from '@/components/ui/TiltCard'
import { workCategoryLabelKeys } from '@/constant/work'
import RandomBackgroundSketch from '@/components/sketches/RandomBackgroundSketch'
import { FiArrowUpRight } from 'react-icons/fi'

const Works = () => {
  const { t } = useTranslation()
  const { ref, motionProps } = useFadeInView({ y: 40 })

  const {
    selectedCategories,
    filteredWorks,
    workCategories,
    handleCategoryChange,
  } = useWorkFilter({ disableFilter: false })

  return (
    <main className="pb-24 relative">
      <RandomBackgroundSketch />
      <PageMeta
        title={t('works_document_title')}
        description={t('works_document_description')}
        canonicalUrl="https://www.kwwdev.com/works"
      />

      <section className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 pt-16">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-3">
          {t('works_title')}
        </h1>
        <p className="text-secondary mb-10 max-w-lg">
          {t('works_description')}
        </p>

        <nav className="mb-10">
          <ul className="flex flex-wrap gap-2">
            {workCategories.map(cat => (
              <li
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm cursor-pointer border transition-all duration-200
                  ${selectedCategories.includes(cat) ? 'bg-accent/15 border-accent/40 text-primary font-medium' : 'bg-surface border-border/8 text-secondary hover:border-border/20 hover:text-primary'}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {t(workCategoryLabelKeys[cat])}
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <motion.section
        ref={ref}
        {...motionProps}
        className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorks.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex"
            >
              <TiltCard tiltDeg={4} className="flex w-full">
                <Link
                  to={work.url}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-border/8 bg-surface hover:border-accent/20 transition-all duration-300 w-full"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-skeleton">
                    <img
                      src={work.image[0]}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-primary group-hover:text-accent transition-colors truncate">
                          {work.title}
                        </h3>
                        <p className="text-sm text-secondary mt-1 line-clamp-2">
                          {work.subTitle}
                        </p>
                      </div>
                      <FiArrowUpRight className="text-tertiary group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  )
}

export default Works
