import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import PageTitleSketch from '../../components/sketches/PageTitleSketch'
import Section from '../../components/ui/Section'
import SelfIntro from './SelfIntro'
import SkillShowcase from '../../components/SkillShowcase'
import { TimelineList } from '../../components/ui/Timeline'
import { workExperiences } from '../../data/workExperience'
import { certifications } from '../../data/certifications'
import { education } from '../../data/education'

const About = () => {
  const { t } = useTranslation()

  useScrollToTop()
  usePageTitle(t('about_document_title'))

  return (
    <main>
      <Helmet>
        <title>{t('about_document_title')}</title>
        <meta name="description" content={t('about_document_description')} />
        <meta name="robots" content="index, follow" />
      </Helmet>
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
