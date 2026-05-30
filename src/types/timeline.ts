import { ReactNode } from 'react'

export type Localized<T> = Record<string, T>

export type TimelineItem = {
  id: number
  image?: string
  title: string
  subTitle?: string
  description?: string | ReactNode
  tasks?: string[]
  subItems?: TimelineItem[]
  fromDate?: string
  toDate?: string
  customDate?: string
  showDateTimeDifference?: boolean
}
