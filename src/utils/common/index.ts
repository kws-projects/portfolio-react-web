import { dayjs, Dayjs } from '@/utils/dayjs'

export const compareDate = (
  dateA: string | undefined,
  dateB: string | undefined
) => {
  if (dateA && dateB) {
    const dateTimeA = new Date(dateA).getTime()
    const dateTimeB = new Date(dateB).getTime()
    return dateTimeB - dateTimeA
  }
  return 0
}

type TranslateFn = (key: string, options?: Record<string, unknown>) => string

export const getDateTimeDifference = (
  fromDateTime: Dayjs,
  {
    toDateTime = dayjs(),
    t,
  }: {
    toDateTime?: Dayjs
    t: TranslateFn
  }
) => {
  const totalMonths = toDateTime.diff(fromDateTime, 'month')
  const yearDiff = Math.floor(totalMonths / 12)
  const monthDiff = totalMonths % 12

  const formatUnit = (count: number, baseKey: string) =>
    t(count === 1 ? baseKey : `${baseKey}_plural`, { count })

  const yearLabel = formatUnit(yearDiff, 'date_year')
  const monthLabel = formatUnit(monthDiff, 'date_month')

  if (yearDiff < 1) return monthLabel

  return `${yearLabel}, ${monthLabel}`
}
