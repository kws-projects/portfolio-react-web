export type MenuItem = {
  id: number
  title?: string
  titleKey?: string
  path?: string
  downloadable?: boolean
  subItems?: MenuItem[]
}
