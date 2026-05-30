import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import useFadeInView from '@/hooks/useFadeInView'
import TiltCard from '@/components/ui/TiltCard'
import { getWorks } from '@/data/works'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'

const FeaturedSection = () => {
  const { t, i18n } = useTranslation()
  const featuredWorks = getWorks(i18n.language)
    .filter(w => w.featured)
    .slice(0, 3)
  const { ref, motionProps } = useFadeInView({ y: 60 })

  return (
    <motion.section
      ref={ref}
      {...motionProps}
      className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-20"
    >
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl font-display font-bold text-primary mb-2">
            {t('home_featured_works_title')}
          </h2>
          <p className="text-secondary">{t('home_featured_subtitle')}</p>
        </div>
        <Link
          to="/works"
          className="group hidden md:flex items-center gap-2 text-sm text-accent font-medium hover:underline"
        >
          {t('home_featured_view_all')}
          <FiArrowRight className="text-accent group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredWorks.map((work, i) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <TiltCard>
              <Link
                to={work.url}
                className="group block rounded-2xl overflow-hidden border border-border/8 bg-surface hover:border-accent/20 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={work.image[0]}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                        {work.title}
                      </h3>
                      <p className="text-sm text-secondary mt-1">
                        {work.subTitle}
                      </p>
                    </div>
                    <FiArrowUpRight className="text-tertiary group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
                  </div>
                  {work.stacks && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {work.stacks.map((stack, j) => (
                        <span
                          key={j}
                          className="text-xs px-2.5 py-1 rounded-lg bg-surface-raised text-secondary border border-border/6"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <div className="flex md:hidden justify-center mt-8">
        <Link
          to="/works"
          className="group flex items-center gap-2 text-sm text-accent font-medium hover:underline"
        >
          {t('home_featured_view_all_works')}
          <FiArrowRight className="text-accent group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.section>
  )
}

export default FeaturedSection
