import { getWorks } from '../works'

describe('getWorks', () => {
  it('returns English content for "en"', () => {
    const works = getWorks('en')
    expect(works.length).toBeGreaterThan(0)
    expect(works[0].title).toBeDefined()
    expect(works[0].subTitle).toBeDefined()
  })

  it('returns localized content for "zh-TW"', () => {
    const en = getWorks('en')
    const zhTW = getWorks('zh-TW')
    expect(zhTW.length).toBe(en.length)

    const hasLocalizedItem = zhTW.some(
      (item, i) => item.subTitle !== en[i].subTitle
    )
    expect(hasLocalizedItem).toBe(true)
  })

  it('falls back to English for unknown language', () => {
    const en = getWorks('en')
    const unknown = getWorks('xx-FAKE')
    expect(unknown[0].title).toBe(en[0].title)
  })

  it('preserves non-localized fields across languages', () => {
    const en = getWorks('en')
    const ja = getWorks('ja')
    en.forEach((work, i) => {
      expect(ja[i].id).toBe(work.id)
      expect(ja[i].category).toEqual(work.category)
      expect(ja[i].url).toBe(work.url)
      expect(ja[i].image).toEqual(work.image)
    })
  })
})
