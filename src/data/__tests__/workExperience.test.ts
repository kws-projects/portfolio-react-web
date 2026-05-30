import { getWorkExperiences } from '../workExperience'

describe('getWorkExperiences', () => {
  it('returns all work experience items with sub-items', () => {
    const items = getWorkExperiences('en')
    expect(items.length).toBeGreaterThan(0)
    items.forEach(item => {
      expect(item.title).toBeDefined()
      expect(item.description).toBeDefined()
      expect(item.subItems).toBeDefined()
      expect(item.subItems!.length).toBeGreaterThan(0)
    })
  })

  it('includes task lists in sub-items', () => {
    const items = getWorkExperiences('en')
    items.forEach(item => {
      item.subItems!.forEach(sub => {
        expect(sub.title).toBeDefined()
        expect(sub.tasks!.length).toBeGreaterThan(0)
      })
    })
  })

  it('returns localized content for supported languages', () => {
    const en = getWorkExperiences('en')
    const zhTW = getWorkExperiences('zh-TW')
    expect(zhTW.length).toBe(en.length)
    expect(zhTW[0].title).not.toBe(en[0].title)
  })

  it('falls back to English for unknown language', () => {
    const en = getWorkExperiences('en')
    const unknown = getWorkExperiences('xx-FAKE')
    expect(unknown[0].title).toBe(en[0].title)
  })
})
