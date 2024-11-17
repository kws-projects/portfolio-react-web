import { useTranslation } from 'react-i18next'
import { envConfig } from 'config'
import ContactPortal from 'components/ContactPortal'

const AboutSelf = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-col justify-start md:items-start ml:-2 md:ml-6 md:mr-16 space-y-7">
        <p className="text-center md:text-left">
          {t('home_banner_about_introduction')}
        </p>
        <ContactPortal />
      </div>

      <img
        src={`${envConfig.STATIC_FILE_BASE_URL}/images/profile-image.webp`}
        alt="Profile"
        className="my-auto bg-cover w-32 h-32 mb-8 md:mb-auto md:w-44 md:h-44 md:mr-6 rounded-full"
      />
    </>
  )
}

export default AboutSelf
