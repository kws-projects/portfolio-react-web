import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { navItems } from '../../data/navItems';

const useNavbarToggle = () => {
    const [ isNavbarExpended, setIsNavbarExpended ] = useState(false)

    const handleNavbarToggle = () => {
        setIsNavbarExpended(prev => !prev)
    }

    return { isNavbarExpended, handleNavbarToggle }
}

const Navbar = () => {
    const { t } = useTranslation();

    const { isNavbarExpended, handleNavbarToggle } = useNavbarToggle()

    return (
        <nav className="flex items-center justify-between w-full h-14 max-w-screen-lg mx-0 border-b border-gray-200 text-sm md:mx-14 lg:mx-28">
            <Link to="/" className="text-lg ml-4 pt-1" >{t('website_name')}</Link>

            <div className="flex pt-1 md:hidden" onClick={handleNavbarToggle}>
                {isNavbarExpended
                    ? <div className="py-4 px-6 cursor-pointer"><AiOutlineClose /></div>
                    : <div className="py-4 px-6 cursor-pointer"><AiOutlineMenu /></div>
                }
            </div>

            <div className={`${isNavbarExpended ? 'flex' : 'hidden'} absolute top-14 w-full md:relative md:top-0 md:flex md:w-fit`}>
                <ul className="w-full md:w-fit">
                    {navItems.map(item => (
                        <li key={item.id} className="group/nav-2-lv relative float-left w-full md:w-fit" >
                            {item.link 
                                ? <Link to={item.link} className="block pt-5 px-5 pb-3.5 w-full border-b border-transparent hover:bg-gray-100 md:hover:border-b-gray-800 md:hover:bg-white" >{item.title}</Link> 
                                : <div className="block pt-5 px-5 pb-3.5 w-full cursor-pointer border-b border-transparent hover:bg-gray-100 md:hover:border-b-gray-800 md:hover:bg-white" >{item.title}</div>
                            }

                            {item.subItems && <ul className="hidden relative left-0 group-hover/nav-2-lv:block w-full bg-white border border-gray-200 md:absolute md:w-44 md:rounded-b-lg">
                                {item.subItems.map((item, i, arr) => (
                                    <li key={item.id} className="group/nav-3-lv relative" >
                                        {item.link 
                                            ? <Link to={item.link} className={`block pt-4 pr-5 pl-10 pb-3.5 hover:bg-gray-100 ${i===arr.length-1&&'md:rounded-b-lg'} md:pl-5`} >{item.title}</Link>
                                            : <div className={`block pt-4 pr-5 pl-10 pb-3.5 cursor-pointer hover:bg-gray-100 ${i===arr.length-1&&'md:rounded-b-lg'} md:pl-5`} >{item.title}</div>
                                        }

                                        {item.subItems && <ul className="hidden relative top-0 left-0 group-hover/nav-3-lv:block w-full bg-white border border-gray-200 md:absolute md:left-44 md:w-44 md:rounded-b-lg md:rounded-tr-lg">
                                            {item.subItems.map((item, i, arr) => (
                                                <li key={item.id} className='relative w-full' >
                                                    {item.link 
                                                        ? <Link to={item.link} className={`block pt-4 pr-5 pl-16 pb-3.5 hover:bg-gray-100 ${i===0&&'md:rounded-tr-lg'} ${i===arr.length-1&&'md:rounded-b-lg'} md:pl-5`} >{item.title}</Link> 
                                                        : <div className={`block pt-4 pr-5 pl-16 pb-3.5 cursor-pointer hover:bg-gray-100 ${i===0&&'md:rounded-tr-lg'} ${i===arr.length-1&&'md:rounded-b-lg'} md:pl-5`} >{item.title}</div>
                                                    }
                                                </li>
                                            ))}
                                        </ul>}
                                    </li>
                                ))}
                            </ul>}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar