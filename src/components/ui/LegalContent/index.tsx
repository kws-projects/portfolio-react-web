import { motion } from 'framer-motion'
import useFadeInView from '@/hooks/useFadeInView'
import type { LegalDocument } from '@/data/legal'

type LegalContentProps = {
  document: LegalDocument
}

const LegalContent = ({ document }: LegalContentProps) => {
  const { ref, motionProps } = useFadeInView({ y: 40 })

  return (
    <motion.div
      ref={ref}
      {...motionProps}
      className="w-full max-w-screen-lg mx-auto px-6 md:px-14 lg:px-28 pt-16 pb-24"
    >
      <h1 className="text-3xl md:text-4xl font-display font-medium text-primary mb-3">
        {document.title}
      </h1>
      <p className="text-sm text-tertiary mb-12">
        Last updated: {document.lastUpdated}
      </p>

      <div className="space-y-10">
        {document.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-display font-medium text-primary mb-4">
              {section.heading}
            </h2>
            <div className="space-y-3">
              {section.blocks.map((block, j) => {
                if (block.type === 'text') {
                  return (
                    <p key={j} className="text-secondary leading-relaxed">
                      {block.content}
                    </p>
                  )
                }
                if (block.type === 'list') {
                  return (
                    <ul key={j} className="space-y-2 ps-5">
                      {block.items.map((item, k) => (
                        <li
                          key={k}
                          className="text-secondary leading-relaxed list-disc"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (block.type === 'link') {
                  return (
                    <p key={j}>
                      <a
                        href={block.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
                      >
                        {block.text}
                      </a>
                    </p>
                  )
                }
                return null
              })}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  )
}

export default LegalContent
