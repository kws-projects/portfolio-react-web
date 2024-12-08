import { ReactNode, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

type SectionProps = {
  title?: string
  description?: string
  className?: string
  style?: object
  showBreakline?: boolean
  disableAnimation?: boolean
  children?: ReactNode
}

const Section = ({
  title,
  description,
  className,
  style,
  showBreakline = true,
  disableAnimation = false,
  children,
}: SectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const fadeInControl = useAnimation()

  useEffect(() => {
    if (isInView) {
      fadeInControl.start('visible')
    }
  }, [fadeInControl, isInView])

  return (
    <motion.div
      className={`self-center flex flex-col justify-start items-center ${showBreakline && 'border-t border-gray-200'} pt-12 pb-24 mx-0 md:mx-14 lg:mx-28 max-w-screen-lg ${className}`}
      style={{ ...style, width: '-webkit-fill-available' }}
      ref={ref}
      variants={{
        ...(!disableAnimation && {
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }),
      }}
      initial={!disableAnimation && 'hidden'}
      animate={!disableAnimation && fadeInControl}
      transition={{
        ...(!disableAnimation && { duration: 0.4 }),
      }}
    >
      {title ? (
        <p className={`text-2xl select-none ${!description && 'pb-10'}`}>
          {title}
        </p>
      ) : null}
      {description ? (
        <p className="pt-2 pb-10 select-none">{description}</p>
      ) : null}
      {children}
    </motion.div>
  )
}

export default Section
