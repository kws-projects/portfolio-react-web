import { ReactNode } from 'react'

export type TimelineItem = {
  id: number
  image?: string
  title: string
  subTitle?: string
  description?: string | ReactNode
  subItems?: TimelineItem[]
  fromDate?: string
  toDate?: string
  customDate?: string
  showDateTimeDifference?: boolean
}
