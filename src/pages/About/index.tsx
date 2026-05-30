import { useTranslation } from 'react-i18next'
import PageMeta from '@/components/PageMeta'
import PageTitleSketch from '@/components/sketches/PageTitleSketch'
import Section from '@/components/ui/Section'
import SkillShowcase from '@/components/SkillShowcase'
import { TimelineList } from '@/components/ui/Timeline'
import { workExperiences } from '@/data/workExperience'
import { certifications } from '@/data/certifications'
import { education } from '@/data/education'
import SelfIntro from './SelfIntro'

const About = () => {
  const { t } = useTranslation()

  return (
    <main>
      <PageMeta
        title={t('about_document_title')}
        description={t('about_document_description')}
      />
      <PageTitleSketch title={t('about_title')} />
      <Section showBreakline={false} disableAnimation={true}>
        <SelfIntro />
      </Section>
      <Section
        title={t('about_skills_title')}
        description={t('about_skills_description')}
      >
        <SkillShowcase />
      </Section>
      <Section title={t('about_cv_work_experience_title')}>
        <TimelineList items={workExperiences} className="px-8 sm:px-24" />
      </Section>
      <Section title={t('about_cv_certifications_title')}>
        <TimelineList items={certifications} className="px-8 sm:px-24" />
      </Section>
      <Section title={t('about_cv_education_title')}>
        <TimelineList items={education} className="px-8 sm:px-24" />
      </Section>
    </main>
  )
}

export default About
