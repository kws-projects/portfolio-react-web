import { getCertifications } from '../certifications'

describe('getCertifications', () => {
  it('returns all certification items', () => {
    const items = getCertifications('en')
    expect(items.length).toBeGreaterThan(0)
    items.forEach(item => {
      expect(item.title).toBeDefined()
      expect(item.subTitle).toBeDefined()
    })
  })

  it('returns localized content for supported languages', () => {
    const en = getCertifications('en')
    const ja = getCertifications('ja')
    expect(ja.length).toBe(en.length)
    expect(ja[0].title).not.toBe(en[0].title)
  })

  it('falls back to English for unknown language', () => {
    const en = getCertifications('en')
    const unknown = getCertifications('xx-FAKE')
    expect(unknown[0].title).toBe(en[0].title)
  })
})
