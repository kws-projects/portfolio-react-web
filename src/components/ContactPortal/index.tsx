import { trackEvent } from '../../services/ga4'
import { GAEventCategory, GAEventAction } from '../../constant/gaEvent'
import { FaLinkedin, FaSquareGithub, FaSquareEnvelope } from 'react-icons/fa6'
import { ExternalUrl, getAriaLabel } from '../../constant/externalUrl'

const ContactPortal = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <a
        href={ExternalUrl.LINKEDIN}
        aria-label={getAriaLabel()[ExternalUrl.LINKEDIN]}
        rel="noreferrer"
        target="_blank"
        onClick={() => {
          trackEvent(
            GAEventCategory.NAVIGATION,
            GAEventAction.NAVIGATE_TO_LINKEDIN
          )
        }}
      >
        <FaLinkedin className="fill-gray-800" size={18} />
      </a>
      <a
        href={ExternalUrl.GITHUB}
        aria-label={getAriaLabel()[ExternalUrl.GITHUB]}
        rel="noreferrer"
        target="_blank"
        onClick={() => {
          trackEvent(
            GAEventCategory.NAVIGATION,
            GAEventAction.NAVIGATE_TO_GITHUB
          )
        }}
      >
        <FaSquareGithub className="fill-gray-800" size={18} />
      </a>
      <a
        href="/contact"
        aria-label="Contact me"
        target="_blank"
        onClick={() => {
          trackEvent(
            GAEventCategory.NAVIGATION,
            GAEventAction.NAVIGATE_TO_CONTACT
          )
        }}
      >
        <FaSquareEnvelope className="fill-gray-800" size={18} />
      </a>
    </div>
  )
}

export default ContactPortal
