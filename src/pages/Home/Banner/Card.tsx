import { useState } from 'react'
import Tab from './Tab'

const tabOptions = ['About', 'Skills', 'Featured Works', 'Experience']

const Card = () => {
    const [ currentTab, setCurrentTab ] = useState(tabOptions[0])

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
            <Tab tab={tabOptions[0]} currentTab={currentTab} >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </Tab>

            {/* Skills */}
            <Tab tab={tabOptions[1]} currentTab={currentTab} >
                Skills
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