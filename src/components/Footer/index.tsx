import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ContactPortal from 'components/ContactPortal'
import Version from './Version'
import { menuMap } from './menuMap'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="flex justify-center mt-auto bg-gray-50">
      <div className="flex justify-center items-start w-full max-w-screen-lg border-t mx-0 px-4 pt-6 pb-7 md:mx-14 lg:mx-28 border-t-gray-200 md:justify-between">
        <section className="flex flex-col text-sm max-w-auto items-center md:items-start md:max-w-sm">
          <div className="flex justify-start items-center space-x-4">
            <Link
              to="/"
              className="text-lg pt-1 text-gray-800 select-none"
              style={{ fontFamily: 'Jost' }}
            >
              {t('website_name')}
            </Link>
            <div className="flex mt-1 md:hidden">
              <ContactPortal />
            </div>
          </div>

          <p className="mt-2 text-center md:text-left">
            {t('website_attribution')}
          </p>

          <div className="flex mt-2 space-x-2 select-none">
            <Link to="/contact">{t('contact_title')}</Link>
            <span>|</span>
            <Link to="/terms-and-conditions">{t('terms_title_short')}</Link>
            <span>|</span>
            <Link to="/privacy-policy">{t('privacy_title')}</Link>
          </div>

          <div className="hidden mt-4 md:flex">
            <ContactPortal />
          </div>

          <div className="flex mt-6 md:hidden">
            <Version />
          </div>
        </section>

        <div className="hidden md:flex flex-col justify-between items-end h-full select-none">
          <ul className="flex justify-center">
            {menuMap.map(item => (
              <li className="ml-12" key={item.id}>
                <Link to={item.path}>{item.title}</Link>

                <ul className="mt-1">
                  {item.subItems?.map(item => (
                    <li className="text-sm mt-1" key={item.id}>
                      {item.downloadable ? (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link to={item.path}>{item.title}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Version />
        </div>
      </div>
    </footer>
  )
}

export default Footer
