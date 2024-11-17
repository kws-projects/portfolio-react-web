import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView, useAnimation } from 'framer-motion'
import HomeBackgroundSketch from 'components/sketches/HomeBackgroundSketch'
import BannerCard from './BannerCard'

const Banner = () => {
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
    <>
      <HomeBackgroundSketch />
      <motion.section
        className="flex flex-col justify-start"
        ref={ref}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate={fadeInControl}
        transition={{ duration: 0.5 }}
      >
        <p
          className="self-center max-w-screen-lg pt-14 md:pt-28 pl-0 md:pl-36 text-2xl md:text-4xl font-medium leading-snug text-center md:text-left"
          style={{ width: '-webkit-fill-available' }}
        >
          {t('home_banner_greetings')}
        </p>
        <BannerCard />
      </motion.section>
    </>
  )
}

export default Banner
