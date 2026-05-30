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

export const sortByDate = <
  T extends { fromDate?: string; customDate?: string },
>(
  items: T[]
): T[] =>
  [...items].sort((a, b) => {
    if (a.fromDate && b.fromDate) return compareDate(a.fromDate, b.fromDate)
    if (a.customDate && b.customDate)
      return compareDate(a.customDate, b.customDate)
    return 0
  })

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
  if (monthDiff === 0) return yearLabel

  return `${yearLabel}, ${monthLabel}`
}

export const getDurationString = (
  fromDate: string,
  toDate?: string,
  options?: { locale?: string; t?: TranslateFn }
) => {
  const locale = options?.locale ?? 'en'
  const fmt = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  })
  const from = fmt.format(new Date(fromDate))

  if (!toDate) {
    const present = options?.t?.('date_present') ?? 'Present'
    return `${from} - ${present}`
  }

  return `${from} - ${fmt.format(new Date(toDate))}`
}
