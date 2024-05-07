import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { footerNavItems } from '../../data/navItems'
import ContactPortal from '../ContactPortal'

const Footer = () => {
    const { t } = useTranslation()

    return (
        <footer className="flex justify-center mt-auto">
            <div className="flex justify-center items-start w-full max-w-screen-lg border-t mx-0 px-4 pt-6 pb-7 md:mx-14 lg:mx-28 border-t-gray-200 md:justify-between">
                <section className="flex flex-col text-sm max-w-auto items-center md:items-start md:max-w-sm">
                    <div className="flex justify-start items-center space-x-4">
                        <Link to="/" className="text-lg pt-1" >{t('website_name')}</Link>
                        <div className="flex mt-1 md:hidden"><ContactPortal /></div>
                    </div>
                    
                    <p className="mt-2 text-center whitespace-pre-line md:text-left">{t('website_attribution')}</p>

                    <div className="flex mt-2 space-x-2">
                        <Link to="/contact">Contact</Link><span>|</span>
                        <Link to="/terms-and-conditions">Terms</Link><span>|</span>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </div>

                    <div className="hidden mt-4 md:flex"><ContactPortal /></div>
                </section>

                <ul className="hidden justify-center md:flex">
                    {footerNavItems.map(item => (
                        <li className="ml-12" key={item.id}>
                            <Link to={item.link} >{item.title}</Link>

                            <ul className="mt-1">
                                {item.subItems?.map(item => (
                                    <li className="text-sm mt-1" key={item.id}>
                                        {item.downloadable
                                            ? <a href={item.link} target="_blank" rel="noreferrer" download>{item.title}</a>
                                            : <Link to={item.link} >{item.title}</Link>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}

export default Footer