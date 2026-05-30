export type MenuItem = {
  id: number
  title: string
  path?: string
  downloadable?: boolean
  subItems?: MenuItem[]
}
