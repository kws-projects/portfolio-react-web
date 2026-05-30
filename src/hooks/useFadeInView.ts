import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'

type UseFadeInViewOptions = {
  disabled?: boolean
  y?: number
  duration?: number
}

const useFadeInView = ({
  disabled = false,
  y = 0,
  duration = 0.5,
}: UseFadeInViewOptions = {}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (!disabled && isInView) {
      controls.start('visible')
    }
  }, [controls, isInView, disabled])

  const motionProps = disabled
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, ...(y && { y }) },
          visible: { opacity: 1, ...(y && { y: 0 }) },
        },
        initial: 'hidden' as const,
        animate: controls,
        transition: { duration },
      }

  return { ref, motionProps }
}

export default useFadeInView
