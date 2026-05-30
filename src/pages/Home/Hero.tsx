import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TextReveal from '@/components/ui/TextReveal'
import ContactPortal from '@/components/ContactPortal'
import FlowFieldSketch from '@/components/sketches/FlowFieldSketch'
import { envConfig } from '@/config'
import { FiArrowRight, FiChevronDown } from 'react-icons/fi'

const Hero = () => {
  return (
    <section className="relative flex items-center min-h-[100dvh] overflow-hidden">
      <FlowFieldSketch />

      <div className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
                Fullstack Software Engineer
              </p>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <TextReveal text="Kenneth Wong" delay={400} speed={35} />
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-secondary leading-relaxed max-w-lg mx-auto md:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Building elegant digital experiences with code and creativity.
              Passionate about frontend engineering, creative coding, and
              crafting products that people love.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center md:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Link
                to="/works"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent font-medium hover:opacity-90 transition-opacity text-inverted"
              >
                View my work
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl border border-border/15 text-primary font-medium hover:bg-surface/80 transition-colors"
              >
                Get in touch
              </Link>
            </motion.div>

            <motion.div
              className="mt-8 flex justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <ContactPortal />
            </motion.div>
          </div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent/15 to-accent-secondary/15 blur-2xl" />
              <img
                src={`${envConfig.STATIC_FILE_BASE_URL}/images/profile-image.webp`}
                alt="Kenneth Wong"
                className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover ring-2 ring-border/10"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
      >
        <FiChevronDown className="text-tertiary" size={24} />
      </motion.div>
    </section>
  )
}

export default Hero
