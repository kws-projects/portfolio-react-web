import { socialLinks } from '@/data/socialLinks'
import { analytics } from '@/lib/analytics'

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
