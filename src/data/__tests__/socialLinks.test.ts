import { socialLinks } from '../socialLinks'

describe('socialLinks', () => {
  it('contains expected links', () => {
    const ids = socialLinks.map(l => l.id)
    expect(ids).toContain('linkedin')
    expect(ids).toContain('github')
    expect(ids).toContain('contact')
  })

  it('each link has required fields', () => {
    socialLinks.forEach(link => {
      expect(link.id).toBeDefined()
      expect(link.url).toBeDefined()
      expect(link.ariaLabel).toBeDefined()
      expect(link.icon).toBeDefined()
      expect(typeof link.external).toBe('boolean')
    })
  })

  it('external links have absolute URLs', () => {
    socialLinks
      .filter(l => l.external)
      .forEach(link => {
        expect(link.url).toMatch(/^https?:\/\//)
      })
  })
})
