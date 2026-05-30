import { IconType } from 'react-icons'
import { FaLinkedin, FaSquareGithub, FaSquareEnvelope } from 'react-icons/fa6'
import { ExternalUrl } from '@/constant/externalUrl'
import { GAEventAction } from '@/constant/gaEvent'

export type SocialLink = {
  id: string
  url: string
  ariaLabel: string
  icon: IconType
  gaAction: GAEventAction
  external: boolean
}

export const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    url: ExternalUrl.LINKEDIN,
    ariaLabel: 'Direct to LinkedIn page',
    icon: FaLinkedin,
    gaAction: GAEventAction.NAVIGATE_TO_LINKEDIN,
    external: true,
  },
  {
    id: 'github',
    url: ExternalUrl.GITHUB,
    ariaLabel: 'Direct to GitHub profile',
    icon: FaSquareGithub,
    gaAction: GAEventAction.NAVIGATE_TO_GITHUB,
    external: true,
  },
  {
    id: 'contact',
    url: '/contact',
    ariaLabel: 'Contact me',
    icon: FaSquareEnvelope,
    gaAction: GAEventAction.NAVIGATE_TO_CONTACT,
    external: false,
  },
]
