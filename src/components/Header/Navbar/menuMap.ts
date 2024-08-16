import { WorkCategory } from '../../../data/works'

interface IMenuMap {
  id: number
  title: string
  path?: string
  subItems?: IMenuMap[]
}

export const menuMap: IMenuMap[] = [
  {
    id: 0,
    title: 'Home',
    path: '/',
  },
  {
    id: 1,
    title: 'About',
    path: '/about',
  },
  {
    id: 2,
    title: 'Works',
    path: '/works',
    subItems: [
      {
        id: 3,
        title: 'Mobile App',
        path: `/works?work=${WorkCategory.MOBILE}`,
      },
      {
        id: 4,
        title: 'Website',
        path: `/works?work=${WorkCategory.WEBSITE}`,
      },
      {
        id: 5,
        title: 'Graphic',
        path: `/works?work=${WorkCategory.GRAPHIC}`,
      },
      {
        id: 6,
        title: 'Artwork',
        subItems: [
          {
            id: 7,
            title: 'Creative Coding',
            path: `/works?work=${WorkCategory.CREATIVE_CODING}`,
          },
          {
            id: 8,
            title: '3D Modeling',
            path: `/works?work=${WorkCategory.MODELLING}`,
          },
          {
            id: 9,
            title: 'Drawing',
            path: `/works?work=${WorkCategory.DRAWING}`,
          },
          {
            id: 10,
            title: 'Arduino',
            path: `/works?work=${WorkCategory.ARDUINO}`,
          },
        ],
      },
      {
        id: 11,
        title: 'Tool',
        path: `/works?work=${WorkCategory.TOOL}`,
      },
      {
        id: 12,
        title: 'All',
        path: `/works?work=${WorkCategory.ALL}`,
      },
    ],
  },
  {
    id: 13,
    title: 'Blogs',
    path: '/blogs',
  },
  {
    id: 14,
    title: 'Contact',
    path: '/contact',
  },
]
