import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navItems } from '../../data';

const Navbar = () => {
    const { t } = useTranslation();

    return (
        <nav className="flex items-center justify-between w-full max-w-screen-lg mx-28 border-b border-gray-200 text-sm">
            <Link to="/" className="text-lg" >{t('website_name')}</Link>

            {/* navbar toggle */}
            <div className="hidden">=</div>

            <div>
                <ul>
                    {navItems.map(item => (
                        <li key={item.id} className="group/nav-2-lv relative float-left" >
                            {item.link 
                                ? <Link to={item.link} className="block pt-4 px-5 pb-3.5 border-b border-transparent hover:border-b-gray-800" >{item.title}</Link> 
                                : <div className="block pt-4 px-5 pb-3.5 cursor-pointer border-b border-transparent hover:border-b-gray-800" >{item.title}</div>
                            }

                            {item.subItems && <ul className="hidden absolute left-0 group-hover/nav-2-lv:block w-44 bg-white rounded-b-lg border border-gray-200">
                                {item.subItems.map((item, i, arr) => (
                                    <li key={item.id} className="group/nav-3-lv relative" >
                                        {item.link 
                                            ? <Link to={item.link} className={`block pt-4 px-5 pb-3.5 hover:bg-gray-100 ${i===arr.length-1&&'rounded-b-lg'}`} >{item.title}</Link> 
                                            : <div className={`block pt-4 px-5 pb-3.5 cursor-pointer hover:bg-gray-100 ${i===arr.length-1&&'rounded-b-lg'}`} >{item.title}</div>
                                        }

                                        {item.subItems && <ul className="hidden absolute top-0 left-44 group-hover/nav-3-lv:block w-44 bg-white rounded-b-lg rounded-tr-lg border border-gray-200">
                                            {item.subItems.map((item, i, arr) => (
                                                <li key={item.id} className='relative' >
                                                    {item.link 
                                                        ? <Link to={item.link} className={`block pt-4 px-5 pb-3.5 hover:bg-gray-100 ${i===0&&'rounded-tr-lg'} ${i===arr.length-1&&'rounded-b-lg'}`} >{item.title}</Link> 
                                                        : <div className={`block pt-4 px-5 pb-3.5 cursor-pointer hover:bg-gray-100 ${i===0&&'rounded-tr-lg'} ${i===arr.length-1&&'rounded-b-lg'}`} >{item.title}</div>
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