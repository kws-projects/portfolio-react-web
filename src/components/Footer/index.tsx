import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ContactPortal from '@/components/ContactPortal'
import Version from './Version'
import { menuMap } from './menuMap'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="flex justify-center mt-auto border-t border-border/8 bg-surface/40">
      <div className="flex justify-center items-start w-full max-w-screen-lg mx-0 px-6 pt-8 pb-10 md:mx-14 lg:mx-28 md:justify-between">
        <section className="flex flex-col text-sm max-w-auto items-center md:items-start md:max-w-sm">
          <div className="flex justify-start items-center space-x-4">
            <Link
              to="/"
              className="text-lg font-display font-semibold text-primary select-none hover:text-accent transition-colors duration-200"
            >
              {t('website_name')}
            </Link>
            <div className="flex mt-1 md:hidden">
              <ContactPortal />
            </div>
          </div>

          <p className="mt-3 text-secondary text-center md:text-left text-sm leading-relaxed">
            {t('website_attribution')}
          </p>

          <div className="flex mt-3 space-x-2 select-none text-sm">
            <Link
              to="/contact"
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {t('contact_title')}
            </Link>
            <span className="text-tertiary">|</span>
            <Link
              to="/terms-and-conditions"
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {t('terms_title_short')}
            </Link>
            <span className="text-tertiary">|</span>
            <Link
              to="/privacy-policy"
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              {t('privacy_title')}
            </Link>
          </div>

          <div className="hidden mt-5 md:flex">
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
                {item.path && (
                  <Link
                    to={item.path}
                    className="font-display font-medium text-primary hover:text-accent transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                )}

                <ul className="mt-2">
                  {item.subItems?.map(subItem => (
                    <li className="text-sm mt-1.5" key={subItem.id}>
                      {subItem.downloadable && subItem.path ? (
                        <a
                          href={subItem.path}
                          target="_blank"
                          rel="noreferrer"
                          className="text-secondary hover:text-accent transition-colors duration-200"
                          download
                        >
                          {subItem.title}
                        </a>
                      ) : (
                        subItem.path && (
                          <Link
                            to={subItem.path}
                            className="text-secondary hover:text-accent transition-colors duration-200"
                          >
                            {subItem.title}
                          </Link>
                        )
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
