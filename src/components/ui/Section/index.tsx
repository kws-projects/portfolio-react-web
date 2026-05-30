import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import useFadeInView from '@/hooks/useFadeInView'

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
  const { ref, motionProps } = useFadeInView({
    disabled: disableAnimation,
    y: 75,
    duration: 0.4,
  })

  return (
    <motion.div
      className={`self-center flex flex-col justify-start items-center ${showBreakline && 'border-t border-gray-200'} pt-12 pb-24 mx-0 md:mx-14 lg:mx-28 max-w-screen-lg ${className}`}
      style={{ ...style, width: '-webkit-fill-available' }}
      ref={ref}
      {...motionProps}
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
