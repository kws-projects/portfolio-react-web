import { WorkCategory } from '@/constant/work'
import { envConfig } from '@/config'
import { MenuItem } from '@/types/menu'

export const menuMap: MenuItem[] = [
  {
    id: 0,
    titleKey: 'nav_about',
    path: '/about',
    subItems: [
      {
        id: 1,
        titleKey: 'footer_cv',
        path: `${envConfig.CV_URL}`,
        downloadable: true,
      },
    ],
  },
  {
    id: 2,
    titleKey: 'nav_works',
    path: '/works',
    subItems: [
      {
        id: 3,
        titleKey: 'footer_mobile',
        path: `/works?category[0]=${WorkCategory.MOBILE}`,
      },
      {
        id: 4,
        titleKey: 'footer_website',
        path: `/works?category[0]=${WorkCategory.WEBSITE}`,
      },
      {
        id: 6,
        titleKey: 'footer_all',
        path: `/works?category[0]=${WorkCategory.ALL}`,
      },
    ],
  },
  {
    id: 7,
    titleKey: 'nav_contact',
    path: '/contact',
    subItems: [
      {
        id: 8,
        titleKey: 'footer_email',
        path: '/contact',
      },
    ],
  },
]
