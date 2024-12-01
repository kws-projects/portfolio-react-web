export enum WorkCategory {
  ALL = 'All',
  MOBILE = 'MOBILE_APP',
  WEBSITE = 'WEBSITE',
  GRAPHIC = 'GRAPHIC',
  CREATIVE_CODING = 'CREATIVE_CODING',
  MODELLING = '3D_MODELING',
  DRAWING = 'DRAWING',
  ARDUINO = 'ARDUINO',
  TOOL = 'TOOL',
}

export const getWorkCategoryLabel = (): {
  [key: string]: string
} => ({
  [WorkCategory.ALL]: 'All',
  [WorkCategory.MOBILE]: 'Mobile App',
  [WorkCategory.WEBSITE]: 'Website',
  [WorkCategory.GRAPHIC]: 'Graphic',
  [WorkCategory.CREATIVE_CODING]: 'Creative Coding',
  [WorkCategory.MODELLING]: '3D Modelling',
  [WorkCategory.DRAWING]: 'Drawing',
  [WorkCategory.ARDUINO]: 'Arduino',
  [WorkCategory.TOOL]: 'Tool',
})

export type Work = {
  id: number
  title: string
  subTitle: string
  description?: string
  image: string[]
  category: WorkCategory[]
  stacks?: string[]
  featured?: boolean
  url: string
  date: {
    year: number
    month: number
  }
}
