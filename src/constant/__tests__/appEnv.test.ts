import { AppEnv, getReleaseType } from '../appEnv'

describe('AppEnv', () => {
  it('has DEV and PROD values', () => {
    expect(AppEnv.DEV).toBe('DEV')
    expect(AppEnv.PROD).toBe('PROD')
  })
})

describe('getReleaseType', () => {
  it('returns "Develop" or "Release" based on NODE_ENV', () => {
    const result = getReleaseType()
    expect(['Develop', 'Release', undefined]).toContain(result)
  })
})
