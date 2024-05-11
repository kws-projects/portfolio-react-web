import { useTranslation } from 'react-i18next'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import PageTitleSketch from '../../components/sketches/PageTitleSketch'
import Section from '../../components/ui/Section'

const About = () => {
    const { t } = useTranslation()
    useScrollToTop()
    usePageTitle(t('about_document_title'))

    return (
        <main>
            <PageTitleSketch title={t('about_title')} />

            <Section 
                title={t('about_skills_title')} 
                description={t('about_skills_description')} 
                className=""
            ></Section>

            <Section 
                title={t('about_cv_work_experience_title')} 
                className=""
            ></Section>

            <Section 
                title={t('about_cv_certifications_title')} 
                className=""
            ></Section>

            <Section 
                title={t('about_cv_education_title')} 
                className=""
            ></Section>

        </main>
    )
}

export default About