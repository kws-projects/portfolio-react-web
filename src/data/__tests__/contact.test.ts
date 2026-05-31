import { contactInfo } from '../contact'

describe('contactInfo', () => {
  it('has a valid phone number', () => {
    expect(contactInfo.tel).toBeDefined()
    expect(contactInfo.tel.length).toBeGreaterThan(0)
  })

  it('has a valid email address', () => {
    expect(contactInfo.email).toBeDefined()
    expect(contactInfo.email).toContain('@')
  })

  it('matches expected values', () => {
    expect(contactInfo).toMatchSnapshot()
  })
})
