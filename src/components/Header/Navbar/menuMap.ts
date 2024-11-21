type MenuMap = {
  id: number
  title: string
  path?: string
  subItems?: MenuMap[]
}

export const menuMap: MenuMap[] = [
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
