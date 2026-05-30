import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageMeta from '@/components/PageMeta'
import useFadeInView from '@/hooks/useFadeInView'
import { envConfig } from '@/config'
import ContactPortal from '@/components/ContactPortal'
import { skills } from '@/data/skills'
import { TimelineList } from '@/components/ui/Timeline'
import { getWorkExperiences } from '@/data/workExperience'
import { getCertifications } from '@/data/certifications'
import { getEducation } from '@/data/education'
import { FiLayers, FiServer, FiTool } from 'react-icons/fi'

const skillCategories = [
  { key: 'Frontend', icon: FiLayers, labelKey: 'about_label_frontend' },
  { key: 'Backend', icon: FiServer, labelKey: 'about_label_backend' },
  { key: 'Others', icon: FiTool, labelKey: 'about_label_others' },
] as const

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-display font-medium text-primary mb-8">
    {children}
  </h2>
)

const About = () => {
  const { t, i18n } = useTranslation()
  const { ref: introRef, motionProps: introProps } = useFadeInView({ y: 40 })
  const { ref: skillsRef, motionProps: skillsProps } = useFadeInView({ y: 40 })
  const { ref: expRef, motionProps: expProps } = useFadeInView({ y: 40 })
  const { ref: certRef, motionProps: certProps } = useFadeInView({ y: 40 })
  const { ref: eduRef, motionProps: eduProps } = useFadeInView({ y: 40 })

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
              src={`${envConfig.STATIC_FILE_BASE_URL}/images/profile-image.webp`}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map(cat => {
            const Icon = cat.icon
            const catSkills = skills.filter(s => s.category === cat.key)
            return (
              <div
                key={cat.key}
                className="rounded-2xl border-ui bg-surface p-4 md:p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Icon className="text-accent" size={16} />
                  <span className="text-sm font-medium text-accent tracking-wide uppercase">
                    {t(cat.labelKey)}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-4 md:gap-3">
                  {catSkills.map(skill => (
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
            )
          })}
        </div>
      </motion.section>

      <hr className="border-t border-divider" />

      {/* Work Experience */}
      <motion.section
        ref={expRef}
        {...expProps}
        className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-16"
      >
        <SectionHeading>{t('about_cv_work_experience_title')}</SectionHeading>
        <TimelineList items={getWorkExperiences(i18n.language)} />
      </motion.section>

      <hr className="border-t border-divider" />

      {/* Certifications */}
      <motion.section
        ref={certRef}
        {...certProps}
        className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-16"
      >
        <SectionHeading>{t('about_cv_certifications_title')}</SectionHeading>
        <TimelineList items={getCertifications(i18n.language)} />
      </motion.section>

      <hr className="border-t border-divider" />

      {/* Education */}
      <motion.section
        ref={eduRef}
        {...eduProps}
        className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-16"
      >
        <SectionHeading>{t('about_cv_education_title')}</SectionHeading>
        <TimelineList items={getEducation(i18n.language)} />
      </motion.section>
    </main>
  )
}

export default About
