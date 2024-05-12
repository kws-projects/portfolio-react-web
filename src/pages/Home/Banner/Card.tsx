import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Tab from './Tab'
import ContactPortal from '../../../components/ContactPortal'
import HomeBannerSkillsSketch from '../../../components/sketches/HomeBannerSkillsSketch'
import { TimelineList } from '../../../components/ui/Timeline'
import { workExperiences } from '../../../data/workExperience'

const tabOptions = ['About', 'Skills', 'Featured Works', 'Experience']

const Card = () => {
    const { t } = useTranslation()

    const [ currentTab, setCurrentTab ] = useState(tabOptions[0])

    const handleTabSwitch = (tab:string) => {
        setCurrentTab(tab)
    }

    return (
        <div className="self-center flex flex-col justify-start items-center max-w-4xl mt-14 mx-0 sm:mx-12 sm:rounded-lg bg-white/80 backdrop-blur shadow-custom" style={{width: '-webkit-fill-available', minHeight: '400px'}} >
            <nav className="mt-8 px-0 sm:px-8 max-w-screen-sm" style={{width: '-webkit-fill-available'}}>
                <ul className="flex justify-between px-6 sm:px-12 max-w-screen-lg border-b border-b-gray-200">
                    {tabOptions.map(tab => (
                        <li key={tab} 
                            className="border-b border-transparent pb-3 hover:border-b-gray-800 cursor-pointer" 
                            onClick={() => handleTabSwitch(tab)}
                        >{tab}</li>
                    ))}
                </ul>
            </nav>

            {/* About */}
            <Tab tab={tabOptions[0]} currentTab={currentTab} className="flex flex-col-reverse items-center md:flex-row" >
                <div className="flex flex-col justify-start md:items-start ml:-2 md:ml-6 md:mr-16 space-y-7">
                    <p className="text-center md:text-left">{t('home_banner_about_introduction')}</p>
                    <ContactPortal /> 
                </div>
                
                <img src="/assets/images/profile-image.jpeg" alt="Profile" className="my-auto bg-cover w-32 h-32 mb-8 md:mb-auto md:w-44 md:h-44 md:mr-6 rounded-full" />
            </Tab>

            {/* Skills */}
            <Tab tab={tabOptions[1]} currentTab={currentTab} className="w-full p-0" >
                <HomeBannerSkillsSketch />
            </Tab>
                
            {/* Featured Works */}
            <Tab tab={tabOptions[2]} currentTab={currentTab} >
                Featured Works
            </Tab>

            {/* Experience */}
            <Tab tab={tabOptions[3]} currentTab={currentTab} >
                <TimelineList items={workExperiences} />
            </Tab>
        </div>
    )
}

export default Card