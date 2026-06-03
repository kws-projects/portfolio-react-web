import { ExternalUrl } from '@/constant/externalUrl'
import { IconType } from 'react-icons'
import { FaLinkedin, FaSquareEnvelope, FaSquareGithub } from 'react-icons/fa6'

export type SocialLink = {
  id: string
  url: string
  ariaLabel: string
  icon: IconType
  external: boolean
}

export const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    url: ExternalUrl.LINKEDIN,
    ariaLabel: 'Direct to LinkedIn page',
    icon: FaLinkedin,
    external: true,
  },
  {
    id: 'github',
    url: ExternalUrl.GITHUB,
    ariaLabel: 'Direct to GitHub profile',
    icon: FaSquareGithub,
    external: true,
  },
  {
    id: 'contact',
    url: '/contact',
    ariaLabel: 'Contact me',
    icon: FaSquareEnvelope,
    external: false,
  },
]
