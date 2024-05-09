import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Tab from './Tab'
import ContactPortal from '../../../components/ContactPortal'
import HomeBannerSkillsSketch from '../../../components/sketches/HomeBannerSkillsSketch'

const tabOptions = ['About', 'Skills', 'Featured Works', 'Experience']

const Card = () => {
    const { t } = useTranslation()

    const [ currentTab, setCurrentTab ] = useState(tabOptions[1])

    const handleTabSwitch = (tab:string) => {
        setCurrentTab(tab)
    }

    return (
        <div className="self-center flex flex-col justify-start items-center max-w-4xl mt-14 mx-12 rounded-lg bg-white/80 backdrop-blur shadow-custom" style={{width: '-webkit-fill-available', minHeight: '400px'}} >
            <nav className="mt-8 px-8 max-w-screen-sm" style={{width: '-webkit-fill-available'}}>
                <ul className="flex justify-between px-12 max-w-screen-lg border-b border-b-gray-300">
                    {tabOptions.map(tab => (
                        <li key={tab} 
                            className="border-b border-transparent pb-4 hover:border-b-gray-800 cursor-pointer" 
                            onClick={() => handleTabSwitch(tab)}
                        >{tab}</li>
                    ))}
                </ul>
            </nav>

            {/* About */}
            <Tab tab={tabOptions[0]} currentTab={currentTab} className="flex items-center" >
                <div className="flex flex-col justify-start items-start ml-6 space-y-7">
                    <p className="">{t('home_banner_about_introduction')}</p>
                    <ContactPortal /> 
                </div>
                
                <img src="/assets/images/profile-image.jpeg" alt="Profile" className="bg-cover w-44 h-44 ml-16 mr-4 rounded-full" />
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
                Experience
            </Tab>
        </div>
    )
}

export default Card