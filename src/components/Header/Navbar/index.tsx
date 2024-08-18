import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { menuMap } from './menuMap'

const useNavbarToggle = () => {
  const [isNavbarExpended, setIsNavbarExpended] = useState(false)

  const handleNavbarToggle = () => {
    setIsNavbarExpended(prev => !prev)
  }

  return { isNavbarExpended, handleNavbarToggle }
}

const Navbar = () => {
  const { t } = useTranslation()

  const path = useLocation().pathname.toString()

  const { isNavbarExpended, handleNavbarToggle } = useNavbarToggle()

  const getIndicatorStyle = (pathname: string) => {
    return path === pathname ? 'md:border-b-gray-800' : null
  }

  return (
    <nav className="flex items-center justify-between w-full h-14 max-w-screen-lg mx-0 border-b border-gray-200 text-sm md:mx-14 lg:mx-28">
      <Link
        to="/"
        className="text-lg ml-8 pt-1 text-gray-800 md:ml-4"
        style={{ fontFamily: 'Jost' }}
      >
        {t('website_name')}
      </Link>

      <div className="flex pt-1 md:hidden" onClick={handleNavbarToggle}>
        {isNavbarExpended ? (
          <div className="py-4 px-7 cursor-pointer">
            <AiOutlineClose />
          </div>
        ) : (
          <div className="py-4 px-7 cursor-pointer">
            <AiOutlineMenu />
          </div>
        )}
      </div>

      <div
        className={`${isNavbarExpended ? 'flex' : 'hidden'} absolute top-14 w-full md:relative md:top-0 md:flex md:w-fit`}
      >
        <ul className="w-full md:w-fit">
          {menuMap.map(item => (
            <li
              key={item.id}
              className="group/nav-2-lv relative float-left w-full md:w-fit"
            >
              {item.path ? (
                <Link
                  to={item.path}
                  className={`block pt-5 px-5 pb-3.5 w-full border-b border-transparent hover:bg-gray-100 bg-gray-50 md:group-hover/nav-2-lv:border-b-gray-800 md:bg-transparent md:hover:border-b-gray-800 md:hover:bg-transparent transition ease-in-out ${getIndicatorStyle(item.path)}`}
                  onClick={handleNavbarToggle}
                >
                  {item.title}
                </Link>
              ) : (
                <div className="block pt-5 px-5 pb-3.5 w-full cursor-pointer border-b border-transparent hover:bg-gray-100 bg-gray-50 md:bg-transparent md:hover:border-b-gray-800 md:hover:bg-transparent">
                  {item.title}
                </div>
              )}

              {item.subItems && (
                <ul className="hidden relative left-0 group-hover/nav-2-lv:block w-full bg-gray-50 border border-gray-200 md:absolute md:w-44 md:rounded-b-lg">
                  {item.subItems.map((item, i, arr) => (
                    <li key={item.id} className="group/nav-3-lv relative">
                      {item.path ? (
                        <Link
                          to={item.path}
                          className={`block pt-4 pr-5 pl-10 pb-3.5 hover:bg-gray-100 ${i === arr.length - 1 && 'md:rounded-b-lg'} md:pl-5`}
                          onClick={handleNavbarToggle}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <div
                          className={`block pt-4 pr-5 pl-10 pb-3.5 cursor-pointer hover:bg-gray-100 ${i === arr.length - 1 && 'md:rounded-b-lg'} md:pl-5`}
                        >
                          {item.title}
                        </div>
                      )}

                      {item.subItems && (
                        <ul className="hidden relative top-0 left-0 group-hover/nav-3-lv:block w-full bg-gray-50 border border-gray-200 md:absolute md:left-44 md:w-44 md:rounded-b-lg md:rounded-tr-lg">
                          {item.subItems.map((item, i, arr) => (
                            <li key={item.id} className="relative w-full">
                              {item.path ? (
                                <Link
                                  to={item.path}
                                  className={`block pt-4 pr-5 pl-16 pb-3.5 hover:bg-gray-100 ${i === 0 && 'md:rounded-tr-lg'} ${i === arr.length - 1 && 'md:rounded-b-lg'} md:pl-5`}
                                  onClick={handleNavbarToggle}
                                >
                                  {item.title}
                                </Link>
                              ) : (
                                <div
                                  className={`block pt-4 pr-5 pl-16 pb-3.5 cursor-pointer hover:bg-gray-100 ${i === 0 && 'md:rounded-tr-lg'} ${i === arr.length - 1 && 'md:rounded-b-lg'} md:pl-5`}
                                >
                                  {item.title}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
