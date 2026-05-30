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

export const workCategoryLabelKeys: Record<WorkCategory, string> = {
  [WorkCategory.ALL]: 'works_cat_all',
  [WorkCategory.MOBILE]: 'works_cat_mobile',
  [WorkCategory.WEBSITE]: 'works_cat_website',
  [WorkCategory.GRAPHIC]: 'works_cat_graphic',
  [WorkCategory.CREATIVE_CODING]: 'works_cat_creative_coding',
  [WorkCategory.MODELLING]: 'works_cat_modelling',
  [WorkCategory.DRAWING]: 'works_cat_drawing',
  [WorkCategory.ARDUINO]: 'works_cat_arduino',
  [WorkCategory.TOOL]: 'works_cat_tool',
}

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
