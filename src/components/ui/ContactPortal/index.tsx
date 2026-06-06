import { useSocialLinks } from '@/hooks/usePortfolioData'
import { analytics } from '@/lib/analytics'
import { mapSocialLinks } from '@/services/api/mappers'
import type { IconType } from 'react-icons'
import { FaLinkedin, FaSquareEnvelope, FaSquareGithub } from 'react-icons/fa6'

const iconMap: Record<string, IconType> = {
  linkedin: FaLinkedin,
  github: FaSquareGithub,
  mail: FaSquareEnvelope,
  contact: FaSquareEnvelope,
}

const ContactPortal = () => {
  const { data: entities } = useSocialLinks()
  const socialLinks = entities ? mapSocialLinks(entities) : []

  if (!socialLinks.length) return null

  return (
    <div className="flex justify-center items-center gap-3">
      {socialLinks.map(link => {
        const Icon = iconMap[link.id] ?? FaSquareEnvelope
        return (
          <a
            key={link.id}
            href={link.url}
            aria-label={link.label}
            rel="noreferrer"
            target={link.isInternal ? undefined : '_blank'}
            className="p-2 rounded-lg text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-200"
            onClick={() => {
              analytics.track({
                name: 'external_link_click',
                params: { url: link.url, link_text: link.id },
              })
            }}
          >
            <Icon size={18} />
          </a>
        )
      })}
    </div>
  )
}

export default ContactPortal
