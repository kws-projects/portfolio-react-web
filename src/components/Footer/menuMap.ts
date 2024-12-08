import { WorkCategory } from '@/constant/work'
import { envConfig } from '@/config'

interface IMenuMap {
  id: number
  title: string
  path: string
  downloadable?: boolean
  subItems?: IMenuMap[]
}

export const menuMap: IMenuMap[] = [
  {
    id: 0,
    title: 'About',
    path: '/about',
    subItems: [
      {
        id: 1,
        title: 'CV',
        path: `${envConfig.STATIC_FILE_BASE_URL}/documents/cv/Wong_Kai_Fung_CV.pdf`,
        downloadable: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Works',
    path: '/works',
    subItems: [
      {
        id: 3,
        title: 'Mobile',
        path: `/works?category[0]=${WorkCategory.MOBILE}`,
      },
      {
        id: 4,
        title: 'Website',
        path: `/works?category[0]=${WorkCategory.WEBSITE}`,
      },
      {
        id: 6,
        title: 'All',
        path: `/works?category[0]=${WorkCategory.ALL}`,
      },
    ],
  },
  {
    id: 7,
    title: 'Contact',
    path: '/contact',
    subItems: [
      {
        id: 8,
        title: 'Email',
        path: '/contact',
      },
    ],
  },
]
