import { GAEventCategory, GAEventAction } from '../gaEvent'

describe('GAEventCategory', () => {
  it('has expected values', () => {
    expect(GAEventCategory.USER).toBe('user')
    expect(GAEventCategory.NAVIGATION).toBe('navigation')
  })
})

describe('GAEventAction', () => {
  it('has expected values', () => {
    expect(GAEventAction.NAVIGATE_TO_LINKEDIN).toBeDefined()
    expect(GAEventAction.NAVIGATE_TO_GITHUB).toBeDefined()
    expect(GAEventAction.NAVIGATE_TO_CONTACT).toBeDefined()
  })
})
