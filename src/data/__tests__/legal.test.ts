import { getTermsContent, getPrivacyContent } from '../legal'

describe('getTermsContent', () => {
  it('returns a document with title and sections', () => {
    const doc = getTermsContent('en')
    expect(doc.title).toBe('Terms and Conditions')
    expect(doc.lastUpdated).toBeDefined()
    expect(doc.sections.length).toBeGreaterThan(0)
  })

  it('returns localized content for supported languages', () => {
    const en = getTermsContent('en')
    const zhTW = getTermsContent('zh-TW')
    expect(zhTW.title).not.toBe(en.title)
    expect(zhTW.sections.length).toBe(en.sections.length)
  })

  it('falls back to English for unknown language', () => {
    const en = getTermsContent('en')
    const unknown = getTermsContent('xx-FAKE')
    expect(unknown.title).toBe(en.title)
  })
})

describe('getPrivacyContent', () => {
  it('returns a document with title and sections', () => {
    const doc = getPrivacyContent('en')
    expect(doc.title).toBe('Privacy Policy')
    expect(doc.lastUpdated).toBeDefined()
    expect(doc.sections.length).toBeGreaterThan(0)
  })

  it('returns localized content for supported languages', () => {
    const en = getPrivacyContent('en')
    const ja = getPrivacyContent('ja')
    expect(ja.title).not.toBe(en.title)
  })

  it('falls back to English for unknown language', () => {
    const en = getPrivacyContent('en')
    const unknown = getPrivacyContent('xx-FAKE')
    expect(unknown.title).toBe(en.title)
  })
})
