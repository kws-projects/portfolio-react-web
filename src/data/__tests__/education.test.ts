import { getEducation } from '../education'

describe('getEducation', () => {
  it('returns all education items', () => {
    const items = getEducation('en')
    expect(items.length).toBeGreaterThan(0)
    items.forEach(item => {
      expect(item.title).toBeDefined()
      expect(item.subTitle).toBeDefined()
      expect(item.fromDate).toBeDefined()
      expect(item.toDate).toBeDefined()
    })
  })

  it('returns localized content for supported languages', () => {
    const en = getEducation('en')
    const zhTW = getEducation('zh-TW')
    expect(zhTW.length).toBe(en.length)
    expect(zhTW[0].title).not.toBe(en[0].title)
  })

  it('falls back to English for unknown language', () => {
    const en = getEducation('en')
    const unknown = getEducation('xx-FAKE')
    expect(unknown[0].title).toBe(en[0].title)
  })
})
