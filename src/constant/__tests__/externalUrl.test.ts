import { ExternalUrl } from '../externalUrl'

describe('ExternalUrl', () => {
  it('contains valid GitHub URL', () => {
    expect(ExternalUrl.GITHUB).toMatch(/^https:\/\/github\.com\//)
  })

  it('contains valid LinkedIn URL', () => {
    expect(ExternalUrl.LINKEDIN).toMatch(/^https:\/\/www\.linkedin\.com\//)
  })
})
