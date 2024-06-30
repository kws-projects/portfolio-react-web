import { WorkCategory } from './works'

interface IHeaderNavItem {
  id: number
  title: string
  link?: string
  subItems?: IHeaderNavItem[]
}

export const headerNavItems: IHeaderNavItem[] = [
  {
    id: 0,
    title: 'Home',
    link: '/',
  },
  {
    id: 1,
    title: 'About',
    link: '/about',
  },
  {
    id: 2,
    title: 'Works',
    subItems: [
      {
        id: 3,
        title: 'Mobile App',
        link: `/works?work=${WorkCategory.MOBILE}`,
      },
      {
        id: 4,
        title: 'Website',
        link: `/works?work=${WorkCategory.WEBSITE}`,
      },
      {
        id: 5,
        title: 'Graphic',
        link: `/works?work=${WorkCategory.GRAPHIC}`,
      },
      {
        id: 6,
        title: 'Artwork',
        subItems: [
          {
            id: 7,
            title: 'Creative Coding',
            link: `/works?work=${WorkCategory.CREATIVE_CODING}`,
          },
          {
            id: 8,
            title: '3D Modeling',
            link: `/works?work=${WorkCategory.MODELLING}`,
          },
          {
            id: 9,
            title: 'Drawing',
            link: `/works?work=${WorkCategory.DRAWING}`,
          },
          {
            id: 10,
            title: 'Arduino',
            link: `/works?work=${WorkCategory.ARDUINO}`,
          },
        ],
      },
      {
        id: 11,
        title: 'Tool',
        link: `/works?work=${WorkCategory.TOOL}`,
      },
      {
        id: 12,
        title: 'All',
        link: `/works?work=${WorkCategory.ALL}`,
      },
    ],
  },
  {
      id: 13,
      title: 'Blog',
      link: '/blog',
  },
  {
    id: 14,
    title: 'Contact',
    link: '/contact',
  },
]

interface IFooterNavItems {
  id: number
  title: string
  link: string
  downloadable?: boolean
  subItems?: IFooterNavItems[]
}

export const footerNavItems: IFooterNavItems[] = [
  {
    id: 0,
    title: 'About',
    link: '/about',
    subItems: [
      {
        id: 1,
        title: 'CV',
        link: '/about?showCV=true',
        downloadable: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Works',
    link: '/works',
    subItems: [
      {
        id: 3,
        title: 'Mobile',
        link: `/works?work=${WorkCategory.MOBILE}`,
      },
      {
        id: 4,
        title: 'Website',
        link: `/works?work=${WorkCategory.WEBSITE}`,
      },
      {
        id: 6,
        title: 'All',
        link: `/works?work=${WorkCategory.ALL}`,
      },
    ],
  },
  {
    id: 7,
    title: 'Contact',
    link: '/contact',
    subItems: [
      {
        id: 8,
        title: 'Email',
        link: '/contact',
      },
    ],
  },
]
