import { useState } from 'react'
import Tab from './Tab'
import { TimelineList } from '../../../components/ui/Timeline'
import { workExperiences } from '../../../data/workExperience'
import AboutSelf from './tabs/AboutSelf'
import SkillShowcase from '../../../components/SkillShowcase'
import FeaturedWorks from './tabs/FeaturedWorks'

const tabOptions = ['About', 'Skills', 'Featured Works', 'Experience']

const Card = () => {
    const [ currentTab, setCurrentTab ] = useState(tabOptions[0])

    const handleTabSwitch = (tab:string) => {
        setCurrentTab(tab)
    }

    return (
        <div className="self-center flex flex-col justify-start items-center max-w-4xl mt-14 mx-0 sm:mx-12 sm:rounded-lg bg-white/80 backdrop-blur shadow-custom" style={{width: '-webkit-fill-available', minHeight: '400px'}} >
            {/* Tab selector */}
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

            {/* Tab - about */}
            <Tab tab={tabOptions[0]} currentTab={currentTab} className="flex flex-col-reverse items-center md:flex-row" >
                <AboutSelf />
            </Tab>

            {/* Tab - skills */}
            <Tab tab={tabOptions[1]} currentTab={currentTab} className="w-full p-0" >
                <SkillShowcase />
            </Tab>
                
            {/* Tab - featured Works */}
            <Tab tab={tabOptions[2]} currentTab={currentTab} className="w-full" style={{ height: '-webkit-fill-available' }} >
                <FeaturedWorks />
            </Tab>

            {/* Tab - experience */}
            <Tab tab={tabOptions[3]} currentTab={currentTab} >
                <TimelineList items={workExperiences} />
            </Tab>
        </div>
    )
}

export default Card