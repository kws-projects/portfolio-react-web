import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useFadeInView from '@/hooks/useFadeInView'
import TiltCard from '@/components/ui/TiltCard'
import { skills } from '@/data/skills'
import { workExperiences } from '@/data/workExperience'
import { getDurationString } from '@/utils/common'
import {
  FiArrowUpRight,
  FiCode,
  FiBriefcase,
  FiCpu,
  FiPenTool,
} from 'react-icons/fi'

const cardBase =
  'rounded-2xl border border-border/8 bg-surface p-6 overflow-hidden hover:border-accent/20 transition-all duration-300'

const latestExperience = workExperiences.reduce((latest, exp) => {
  if (!latest.fromDate) return exp
  return new Date(exp.fromDate ?? 0) > new Date(latest.fromDate ?? 0)
    ? exp
    : latest
}, workExperiences[0])

const BentoSection = () => {
  const { ref, motionProps } = useFadeInView({ y: 60 })

  return (
    <motion.section
      ref={ref}
      {...motionProps}
      className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 py-20"
    >
      <h2 className="text-3xl font-display font-bold text-primary mb-4">
        At a Glance
      </h2>
      <p className="text-secondary mb-12 max-w-lg">
        A quick overview of who I am, what I do, and the tools I work with.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* About card - spans 2 cols on lg */}
        <TiltCard className={`${cardBase} lg:col-span-2`}>
          <div className="flex items-center gap-2 mb-3">
            <FiCode className="text-accent" size={14} />
            <p className="text-xs font-medium tracking-widest uppercase text-accent">
              About
            </p>
          </div>
          <p className="text-secondary leading-relaxed">
            I'm a fullstack software engineer based in Hong Kong, dedicated to
            building high-quality web applications. I have experience working at
            enterprise companies like Deloitte and Lalamove, where I contributed
            to products used by millions.
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-1 mt-4 text-sm text-accent font-medium hover:underline"
          >
            Learn more
            <FiArrowUpRight className="text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </TiltCard>

        {/* Experience card */}
        <TiltCard className={cardBase}>
          <div className="flex items-center gap-2 mb-3">
            <FiBriefcase className="text-accent" size={14} />
            <p className="text-xs font-medium tracking-widest uppercase text-accent">
              Currently
            </p>
          </div>
          {latestExperience && (
            <>
              <p className="text-lg font-semibold text-primary">
                {latestExperience.subItems?.[
                  latestExperience.subItems.length - 1
                ]?.title ?? latestExperience.title}
              </p>
              <p className="text-secondary mt-1">{latestExperience.title}</p>
              {latestExperience.fromDate && (
                <p className="text-sm text-tertiary mt-2">
                  {getDurationString(
                    latestExperience.fromDate,
                    latestExperience.toDate
                  )}
                </p>
              )}
            </>
          )}
        </TiltCard>

        {/* Skills card */}
        <TiltCard className={cardBase}>
          <div className="flex items-center gap-2 mb-4">
            <FiCpu className="text-accent" size={14} />
            <p className="text-xs font-medium tracking-widest uppercase text-accent">
              Tech Stack
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {skills.slice(0, 10).map(skill => (
              <img
                key={skill.id}
                src={skill.image}
                alt={skill.title}
                title={skill.title}
                className="w-full aspect-square rounded-lg bg-surface-raised p-1.5 border border-border/6 hover:border-accent/20 transition-colors"
              />
            ))}
          </div>
          <Link
            to="/about"
            className="group inline-flex items-center gap-1 mt-4 text-sm text-accent font-medium hover:underline"
          >
            All skills
            <FiArrowUpRight className="text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </TiltCard>

        {/* Creative coding card - spans 2 cols on lg */}
        <TiltCard
          className={`${cardBase} lg:col-span-2 flex flex-col justify-between`}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiPenTool className="text-accent" size={14} />
              <p className="text-xs font-medium tracking-widest uppercase text-accent">
                Creative Coding & Art
              </p>
            </div>
            <p className="text-secondary leading-relaxed">
              Beyond engineering, I explore the intersection of technology and
              art through creative coding with p5.js, generative art, digital
              drawing, and interactive installations.
            </p>
          </div>
          <Link
            to="/works"
            className="group inline-flex items-center gap-1 mt-4 text-sm text-accent font-medium hover:underline"
          >
            Browse works
            <FiArrowUpRight className="text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </TiltCard>
      </div>
    </motion.section>
  )
}

export default BentoSection
