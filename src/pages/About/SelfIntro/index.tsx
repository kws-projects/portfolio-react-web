import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { envConfig } from '@/config'
import ContactPortal from '@/components/ContactPortal'

const SelfIntro = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const fadeInControl = useAnimation()

  useEffect(() => {
    if (isInView) {
      fadeInControl.start('visible')
    }
  }, [fadeInControl, isInView])

  const { t } = useTranslation()

  return (
    <motion.div
      className="flex flex-col md:flex-row justify-between items-center space-x-0 md:space-x-20 space-y-12 md:space-y-0 px-4 md:px-12"
      ref={ref}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate={fadeInControl}
      transition={{ duration: 0.5 }}
    >
      <img
        className="w-44 h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-lg"
        src={`${envConfig.STATIC_FILE_BASE_URL}/images/profile-image.webp`}
        alt="Profile"
      />

      <div className="flex flex-col justify-start items-center md:items-start space-y-6 px-6 md:px-0">
        <span className="text-2xl text-center md:text-left">
          {t('about_self_intro_heading')}
        </span>
        <p className="text-center md:text-left">
          {t('about_self_intro_content')}
        </p>
        <ContactPortal />
      </div>
    </motion.div>
  )
}

export default SelfIntro
