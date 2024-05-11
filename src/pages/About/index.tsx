import { useTranslation } from 'react-i18next'
import usePageTitle from '../../hooks/usePageTitle'
import useScrollToTop from '../../hooks/useScrollToTop'
import PageTitleSketch from '../../components/sketches/PageTitleSketch'
import Section from '../../components/ui/Section'
import ContactPortal from '../../components/ContactPortal'

const About = () => {
    const { t } = useTranslation()
    useScrollToTop()
    usePageTitle(t('about_document_title'))

    return (
        <main>
            <PageTitleSketch title={t('about_title')} />

            <Section showBreakline={false} >
                <div className="flex flex-col md:flex-row justify-between items-center space-x-0 md:space-x-20 space-y-12 md:space-y-0 px-8 md:px-12">
                    <img className="w-44 h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-lg"
                    src="/assets/images/profile-image.jpeg" alt="Profile" />

                    <div className="flex flex-col justify-start items-center md:items-start space-y-6 px-6 md:px-0">
                        <span className="text-2xl">{t('about_self_intro_heading')}</span>
                        <p className="text-center md:text-left">{t('about_self_intro_content')}</p>
                        <ContactPortal />
                    </div>
                </div>
                
            </Section>

            <Section 
                title={t('about_skills_title')} 
                description={t('about_skills_description')} 
            >
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