import { trackEvent } from '@/services/ga4'
import { GAEventCategory } from '@/constant/gaEvent'
import { socialLinks } from '@/data/socialLinks'

const ContactPortal = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      {socialLinks.map(link => {
        const Icon = link.icon
        return (
          <a
            key={link.id}
            href={link.url}
            aria-label={link.ariaLabel}
            rel="noreferrer"
            target={link.external ? '_blank' : undefined}
            onClick={() => {
              trackEvent(GAEventCategory.NAVIGATION, link.gaAction)
            }}
          >
            <Icon className="fill-gray-800" size={18} />
          </a>
        )
      })}
    </div>
  )
}

export default ContactPortal
