import { dayjs } from '@/utils/dayjs'
import {
  compareDate,
  sortByDate,
  getDateTimeDifference,
  getDurationString,
} from '../index'

describe('compareDate', () => {
  it('returns negative when dateA is more recent than dateB', () => {
    expect(compareDate('2024-06-01', '2024-01-01')).toBeLessThan(0)
  })

  it('returns positive when dateA is older than dateB', () => {
    expect(compareDate('2023-01-01', '2024-01-01')).toBeGreaterThan(0)
  })

  it('returns 0 when both dates are the same', () => {
    expect(compareDate('2024-01-01', '2024-01-01')).toBe(0)
  })

  it('returns 0 when either date is undefined', () => {
    expect(compareDate(undefined, '2024-01-01')).toBe(0)
    expect(compareDate('2024-01-01', undefined)).toBe(0)
    expect(compareDate(undefined, undefined)).toBe(0)
  })
})

describe('sortByDate', () => {
  it('sorts items by fromDate descending (most recent first)', () => {
    const items = [
      { fromDate: '2022-01-01' },
      { fromDate: '2024-01-01' },
      { fromDate: '2023-01-01' },
    ]
    const sorted = sortByDate(items)
    expect(sorted.map(i => i.fromDate)).toEqual([
      '2024-01-01',
      '2023-01-01',
      '2022-01-01',
    ])
  })

  it('sorts items by customDate when fromDate is absent', () => {
    const items = [
      { customDate: '2021-06-01' },
      { customDate: '2023-06-01' },
      { customDate: '2022-06-01' },
    ]
    const sorted = sortByDate(items)
    expect(sorted.map(i => i.customDate)).toEqual([
      '2023-06-01',
      '2022-06-01',
      '2021-06-01',
    ])
  })

  it('does not mutate the original array', () => {
    const items = [{ fromDate: '2023-01-01' }, { fromDate: '2024-01-01' }]
    const sorted = sortByDate(items)
    expect(sorted).not.toBe(items)
  })
})

describe('getDateTimeDifference', () => {
  const mockT = (key: string, opts?: Record<string, unknown>) => {
    const count = opts?.count ?? 0
    if (key === 'date_year') return `${count} year`
    if (key === 'date_year_plural') return `${count} years`
    if (key === 'date_month') return `${count} month`
    if (key === 'date_month_plural') return `${count} months`
    return key
  }

  it('returns only months when less than a year', () => {
    const from = dayjs('2024-01-01')
    const to = dayjs('2024-07-01')
    expect(getDateTimeDifference(from, { toDateTime: to, t: mockT })).toBe(
      '6 months'
    )
  })

  it('returns only years when months is 0', () => {
    const from = dayjs('2022-01-01')
    const to = dayjs('2024-01-01')
    expect(getDateTimeDifference(from, { toDateTime: to, t: mockT })).toBe(
      '2 years'
    )
  })

  it('returns years and months combined', () => {
    const from = dayjs('2022-01-01')
    const to = dayjs('2024-06-01')
    expect(getDateTimeDifference(from, { toDateTime: to, t: mockT })).toBe(
      '2 years, 5 months'
    )
  })

  it('uses singular form for 1 year / 1 month', () => {
    const from = dayjs('2023-01-01')
    const to = dayjs('2024-02-01')
    expect(getDateTimeDifference(from, { toDateTime: to, t: mockT })).toBe(
      '1 year, 1 month'
    )
  })
})

describe('getDurationString', () => {
  it('formats a date range', () => {
    const result = getDurationString('2022-06-01', '2024-02-01')
    expect(result).toContain('2022')
    expect(result).toContain('2024')
    expect(result).toContain(' - ')
  })

  it('shows "Present" when toDate is undefined', () => {
    const result = getDurationString('2024-05-01')
    expect(result).toContain('Present')
  })

  it('uses translated present label when t is provided', () => {
    const t = (key: string) => (key === 'date_present' ? '現在' : key)
    const result = getDurationString('2024-05-01', undefined, { t })
    expect(result).toContain('現在')
  })

  it('respects locale for month formatting', () => {
    const resultEn = getDurationString('2024-01-15', '2024-06-15', {
      locale: 'en',
    })
    expect(resultEn).toContain('January')

    const resultZh = getDurationString('2024-01-15', '2024-06-15', {
      locale: 'zh-TW',
    })
    expect(resultZh).toContain('1')
  })
})
