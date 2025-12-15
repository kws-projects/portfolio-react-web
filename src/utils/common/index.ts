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

export const getDateTimeDifference = (
  fromDateTime: Dayjs,
  toDateTime: Dayjs | undefined = dayjs()
) => {
  const yearDiff = toDateTime.diff(fromDateTime, 'year')
  const monthDiff = toDateTime.diff(fromDateTime, 'month') % 12

  const yearLabel = yearDiff > 1 ? `${yearDiff} years` : `${yearDiff} year`

  const monthLabel =
    monthDiff > 1 ? `${monthDiff} months` : `${monthDiff} month`

  let timeDiffLabel = `${yearLabel}, ${monthLabel}`

  if (yearDiff < 1) {
    timeDiffLabel = `${monthLabel}`
  }

  return timeDiffLabel
}
