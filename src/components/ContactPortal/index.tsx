import { trackEvent } from '@/services/ga4'
import { GAEventCategory } from '@/constant/gaEvent'
import { socialLinks } from '@/data/socialLinks'

const ContactPortal = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      {socialLinks.map(link => {
        const Icon = link.icon
        return (
          <a
            key={link.id}
            href={link.url}
            aria-label={link.ariaLabel}
            rel="noreferrer"
            target={link.external ? '_blank' : undefined}
            className="p-2 rounded-lg text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-200"
            onClick={() => {
              trackEvent(GAEventCategory.NAVIGATION, link.gaAction)
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
