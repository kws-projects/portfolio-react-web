import { useTranslation } from 'react-i18next'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import PageTitleSketch from '../../components/sketches/PageTitleSketch'
import Section from '../../components/ui/Section'
import SelfIntro from './SelfIntro'
import { TimelineList, TimelineItem } from '../../components/ui/Timeline'
import CV from './CV'

const About = () => {
    const { t } = useTranslation()
    useScrollToTop()
    usePageTitle(t('about_document_title'))

    return (
        <main>
            {/* <CV /> */}

            <PageTitleSketch title={t('about_title')} />

            <Section showBreakline={false} >
                <SelfIntro />
            </Section>

            <Section 
                title={t('about_skills_title')} 
                description={t('about_skills_description')} 
            >
                <TimelineList >
                    <TimelineItem />
                </TimelineList>
            </Section>

            <Section title={t('about_cv_work_experience_title')} >

            </Section>

            <Section title={t('about_cv_certifications_title')} >

            </Section>

            <Section title={t('about_cv_education_title')} >   

            </Section>
        </main>
    )
}

export default About