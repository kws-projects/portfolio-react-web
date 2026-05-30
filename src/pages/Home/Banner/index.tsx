import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import useFadeInView from '@/hooks/useFadeInView'
import HomeBackgroundSketch from '@/components/sketches/HomeBackgroundSketch'
import BannerCard from './BannerCard'

const Banner = () => {
  const { ref, motionProps } = useFadeInView()
  const { t } = useTranslation()

  return (
    <>
      <HomeBackgroundSketch />
      <motion.section
        className="flex flex-col justify-start"
        ref={ref}
        {...motionProps}
      >
        <p
          className="self-center max-w-screen-lg pt-14 md:pt-28 pl-0 md:pl-36 text-2xl md:text-4xl font-medium leading-snug text-center md:text-left select-none"
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
