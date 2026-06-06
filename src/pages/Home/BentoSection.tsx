import TiltCard from '@/components/ui/TiltCard'
import useFadeInView from '@/hooks/useFadeInView'
import { useExperiences, useSkills } from '@/hooks/usePortfolioData'
import { mapExperiences, mapSkills } from '@/services/api/mappers'
import { getDurationString } from '@/utils/common'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCode,
  FiCpu,
  FiPenTool,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

const cardBase =
  'rounded-2xl border-ui-interactive bg-surface p-6 overflow-hidden duration-300'

const BentoSection = () => {
  const { t, i18n } = useTranslation()
  const { ref, motionProps } = useFadeInView({ y: 60 })

  const { data: skillEntities } = useSkills()
  const { data: expEntities } = useExperiences()

  const skills = skillEntities ? mapSkills(skillEntities) : []
  const experiences = expEntities
    ? mapExperiences(expEntities, i18n.language)
    : []

  const latestExperience = experiences.length
    ? experiences.reduce((latest, exp) => {
        if (!latest.fromDate) return exp
        return new Date(exp.fromDate ?? 0) > new Date(latest.fromDate ?? 0)
          ? exp
          : latest
      }, experiences[0])
    : null

  return (
    <motion.section
      ref={ref}
      {...motionProps}
      className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-20"
    >
      <h2 className="text-3xl font-display font-medium text-primary mb-4">
        {t('home_bento_title')}
      </h2>
      <p className="text-secondary mb-12 max-w-lg">
        {t('home_bento_subtitle')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TiltCard className={`${cardBase} lg:col-span-2`}>
          <div className="flex items-center gap-2 mb-3">
            <FiCode className="text-accent" size={14} />
            <p className="text-xs font-medium tracking-widest uppercase text-accent">
              {t('home_bento_about_me')}
            </p>
          </div>
          <p className="text-secondary leading-relaxed">
            {t('home_bento_about_content')}
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-1 mt-4 text-sm text-accent font-medium hover:underline"
          >
            {t('home_bento_learn_more')}
            <FiArrowUpRight className="text-accent group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </TiltCard>

        <TiltCard className={cardBase}>
          <div className="flex items-center gap-2 mb-3">
            <FiBriefcase className="text-accent" size={14} />
            <p className="text-xs font-medium tracking-widest uppercase text-accent">
              {t('home_bento_currently')}
            </p>
          </div>
          {latestExperience && (
            <>
              <p className="text-lg font-semibold text-primary">
                {latestExperience.subItems?.[
                  latestExperience.subItems.length - 1
                ]?.title ?? latestExperience.title}
              </p>
              <p className="text-secondary mt-1">{latestExperience.title}</p>
              {latestExperience.fromDate && (
                <p className="text-sm text-tertiary mt-2">
                  {getDurationString(
                    latestExperience.fromDate,
                    latestExperience.toDate,
                    { locale: i18n.language, t }
                  )}
                </p>
              )}
            </>
          )}
        </TiltCard>

        <TiltCard className={cardBase}>
          <div className="flex items-center gap-2 mb-4">
            <FiCpu className="text-accent" size={14} />
            <p className="text-xs font-medium tracking-widest uppercase text-accent">
              {t('home_bento_tech_stack')}
            </p>
          </div>
          <div className="grid grid-cols-6 gap-1.5 md:grid-cols-5 md:gap-2">
            {skills.slice(0, 10).map(skill => (
              <img
                key={skill.id}
                src={skill.image}
                alt={skill.title}
                title={skill.title}
                className="w-full aspect-square rounded-md md:rounded-lg bg-white p-1 md:p-1.5 border-ui-interactive"
              />
            ))}
          </div>
          <Link
            to="/about"
            className="group inline-flex items-center gap-1 mt-4 text-sm text-accent font-medium hover:underline"
          >
            {t('home_bento_all_skills')}
            <FiArrowUpRight className="text-accent group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </TiltCard>

        <TiltCard
          className={`${cardBase} lg:col-span-2 flex flex-col justify-between`}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiPenTool className="text-accent" size={14} />
              <p className="text-xs font-medium tracking-widest uppercase text-accent">
                {t('home_bento_creative_coding')}
              </p>
            </div>
            <p className="text-secondary leading-relaxed">
              {t('home_bento_creative_content')}
            </p>
          </div>
          <Link
            to="/works"
            className="group inline-flex items-center gap-1 mt-4 text-sm text-accent font-medium hover:underline"
          >
            {t('home_bento_browse_works')}
            <FiArrowUpRight className="text-accent group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </TiltCard>
      </div>
    </motion.section>
  )
}

export default BentoSection
