import { useState } from 'react'
import { HomeBannerTab, getHomeBannerTabLabel } from '@/constant/tab'
import SkillShowcase from '@/components/SkillShowcase'
import { TimelineList } from '@/components/ui/Timeline'
import { workExperiences } from '@/data/workExperience'
import Tab from './Tab'
import AboutSelf from './tabs/AboutSelf'
import FeaturedWorks from './tabs/FeaturedWorks'

const BannerCard = () => {
  const [currentTab, setCurrentTab] = useState(HomeBannerTab.ABOUT)

  const handleTabSwitch = (tab: HomeBannerTab) => {
    setCurrentTab(tab)
  }

  const getIndicatorStyle = (tab: HomeBannerTab) =>
    currentTab === tab ? 'border-b-gray-800' : null

  return (
    <div
      className="self-center flex flex-col justify-start items-center max-w-4xl mt-14 mx-0 sm:mx-12 sm:rounded-lg bg-white/80 backdrop-blur shadow-custom"
      style={{ width: '-webkit-fill-available', minHeight: '400px' }}
    >
      <nav
        className="mt-8 px-0 sm:px-8 max-w-screen-sm"
        style={{ width: '-webkit-fill-available' }}
      >
        <ul className="flex justify-between px-6 sm:px-12 max-w-screen-lg border-b border-b-gray-200">
          {Object.values(HomeBannerTab).map(tab => (
            <li
              key={tab}
              className={`border-b border-transparent pb-3 hover:border-b-gray-800 cursor-pointer select-none transition ease-in-out ${getIndicatorStyle(tab)}`}
              onClick={() => handleTabSwitch(tab)}
            >
              {getHomeBannerTabLabel()[tab]}
            </li>
          ))}
        </ul>
      </nav>

      <Tab
        tab={HomeBannerTab.ABOUT}
        currentTab={currentTab}
        className="flex flex-col-reverse items-center md:flex-row"
      >
        <AboutSelf />
      </Tab>

      <Tab
        tab={HomeBannerTab.SKILLS}
        currentTab={currentTab}
        className="w-full p-0"
      >
        <SkillShowcase />
      </Tab>

      <Tab
        tab={HomeBannerTab.FEATURED_WORKS}
        currentTab={currentTab}
        className="w-full"
      >
        <FeaturedWorks />
      </Tab>

      <Tab tab={HomeBannerTab.EXPERIENCE} currentTab={currentTab}>
        <TimelineList items={workExperiences} />
      </Tab>
    </div>
  )
}

export default BannerCard
