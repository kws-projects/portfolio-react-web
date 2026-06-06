import ContactPortal from '@/components/ui/ContactPortal'
import ErrorState from '@/components/ui/ErrorState'
import PageMeta from '@/components/ui/PageMeta'
import { TimelineList } from '@/components/ui/Timeline'
import useFadeInView from '@/hooks/useFadeInView'
import {
  useCertifications,
  useEducations,
  useExperiences,
  useSiteConfig,
  useSkills,
} from '@/hooks/usePortfolioData'
import type { MappedSkill } from '@/services/api/mappers'
import {
  mapCertifications,
  mapEducations,
  mapExperiences,
  mapSkills,
} from '@/services/api/mappers'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const SKILL_CATEGORY_LABEL_KEYS: Record<string, string> = {
  Frontend: 'about_label_frontend',
  Backend: 'about_label_backend',
  Others: 'about_label_others',
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-display font-medium text-primary mb-8">
    {children}
  </h2>
)

const SkillsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[1, 2, 3].map(i => (
      <div
        key={i}
        className="rounded-2xl border-ui bg-surface p-4 md:p-6 animate-pulse"
      >
        <div className="h-4 w-24 bg-skeleton rounded mb-5" />
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-4 md:gap-3">
          {Array.from({ length: 6 }).map((_, j) => (
            <div
              key={j}
              className="w-full aspect-square rounded-lg bg-skeleton"
            />
          ))}
        </div>
      </div>
    ))}
  </div>
)

const TimelineSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {[1, 2].map(i => (
      <div key={i} className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-skeleton flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-48 bg-skeleton rounded" />
          <div className="h-4 w-32 bg-skeleton rounded" />
          <div className="h-3 w-full bg-skeleton rounded" />
        </div>
      </div>
    ))}
  </div>
)

const About = () => {
  const { t, i18n } = useTranslation()
  const { ref: introRef, motionProps: introProps } = useFadeInView({ y: 40 })
  const { ref: skillsRef, motionProps: skillsProps } = useFadeInView({ y: 40 })
  const { ref: expRef, motionProps: expProps } = useFadeInView({ y: 40 })
  const { ref: certRef, motionProps: certProps } = useFadeInView({ y: 40 })
  const { ref: eduRef, motionProps: eduProps } = useFadeInView({ y: 40 })

  const {
    data: skillEntities,
    isLoading: skillsLoading,
    isError: skillsError,
    refetch: refetchSkills,
  } = useSkills()
  const {
    data: expEntities,
    isLoading: expLoading,
    isError: expError,
    refetch: refetchExp,
  } = useExperiences()
  const {
    data: eduEntities,
    isLoading: eduLoading,
    isError: eduError,
    refetch: refetchEdu,
  } = useEducations()
  const {
    data: certEntities,
    isLoading: certLoading,
    isError: certError,
    refetch: refetchCert,
  } = useCertifications()

  const { data: siteConfig } = useSiteConfig()
  const profileImage = siteConfig?.profileImage as string | undefined

  const skillCategories = useMemo(() => {
    const skills = skillEntities ? mapSkills(skillEntities) : []
    const categoryMap = new Map<string, MappedSkill[]>()
    for (const skill of skills) {
      const existing = categoryMap.get(skill.category) ?? []
      existing.push(skill)
      categoryMap.set(skill.category, existing)
    }
    return Array.from(categoryMap.entries()).map(([category, items]) => ({
      key: category,
      skills: items,
    }))
  }, [skillEntities])
  const experiences = expEntities
    ? mapExperiences(expEntities, i18n.language)
    : []
  const certifications = certEntities
    ? mapCertifications(certEntities, i18n.language)
    : []
  const educations = eduEntities
    ? mapEducations(eduEntities, i18n.language)
    : []

  return (
    <main className="pb-24">
      <PageMeta
        title={t('about_document_title')}
        description={t('about_document_description')}
      />

      {/* Intro section */}
      <motion.section
        ref={introRef}
        {...introProps}
        className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 pt-16 pb-20"
      >
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 blur-xl" />
            <img
              className="relative w-44 h-44 md:w-56 md:h-56 rounded-2xl object-cover"
              src={profileImage}
              alt="Profile"
            />
          </div>

          <div className="flex flex-col items-center md:items-start gap-5 text-center md:text-start">
            <p className="text-sm font-medium tracking-widest uppercase text-accent">
              {t('home_bento_about_me')}
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-primary">
              {t('about_self_intro_heading')}
            </h1>
            <p className="text-secondary leading-relaxed max-w-xl">
              {t('about_self_intro_content')}
            </p>
            <ContactPortal />
          </div>
        </div>
      </motion.section>

      <hr className="border-t border-divider" />

      {/* Skills section */}
      <motion.section
        ref={skillsRef}
        {...skillsProps}
        className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-16"
      >
        <SectionHeading>{t('about_skills_title')}</SectionHeading>
        {skillsLoading ? (
          <SkillsSkeleton />
        ) : skillsError ? (
          <ErrorState
            message={t('error_loading_data')}
            onRetry={refetchSkills}
          />
        ) : (
          <div
            className={`grid grid-cols-1 gap-6 ${skillCategories.length === 2 ? 'md:grid-cols-2' : skillCategories.length >= 3 ? 'md:grid-cols-3' : ''}`}
          >
            {skillCategories.map(cat => (
              <div
                key={cat.key}
                className="rounded-2xl border-ui bg-surface p-4 md:p-6"
              >
                <span className="text-sm font-medium text-accent tracking-wide uppercase mb-5 block">
                  {SKILL_CATEGORY_LABEL_KEYS[cat.key]
                    ? t(SKILL_CATEGORY_LABEL_KEYS[cat.key])
                    : cat.key}
                </span>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-4 md:gap-3">
                  {cat.skills.map(skill => (
                    <div key={skill.id} className="group relative">
                      <img
                        src={skill.image}
                        alt={skill.title}
                        title={skill.title}
                        className="w-full aspect-square rounded-lg md:rounded-xl bg-white p-1 md:p-1.5 border-ui group-hover:border-border/25 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      <hr className="border-t border-divider" />

      {/* Work Experience */}
      <motion.section
        ref={expRef}
        {...expProps}
        className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-16"
      >
        <SectionHeading>{t('about_cv_work_experience_title')}</SectionHeading>
        {expLoading ? (
          <TimelineSkeleton />
        ) : expError ? (
          <ErrorState message={t('error_loading_data')} onRetry={refetchExp} />
        ) : (
          <TimelineList items={experiences} />
        )}
      </motion.section>

      <hr className="border-t border-divider" />

      {/* Certifications */}
      <motion.section
        ref={certRef}
        {...certProps}
        className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-16"
      >
        <SectionHeading>{t('about_cv_certifications_title')}</SectionHeading>
        {certLoading ? (
          <TimelineSkeleton />
        ) : certError ? (
          <ErrorState message={t('error_loading_data')} onRetry={refetchCert} />
        ) : (
          <TimelineList items={certifications} />
        )}
      </motion.section>

      <hr className="border-t border-divider" />

      {/* Education */}
      <motion.section
        ref={eduRef}
        {...eduProps}
        className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-16"
      >
        <SectionHeading>{t('about_cv_education_title')}</SectionHeading>
        {eduLoading ? (
          <TimelineSkeleton />
        ) : eduError ? (
          <ErrorState message={t('error_loading_data')} onRetry={refetchEdu} />
        ) : (
          <TimelineList items={educations} />
        )}
      </motion.section>
    </main>
  )
}

export default About
