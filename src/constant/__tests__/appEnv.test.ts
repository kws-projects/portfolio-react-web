import { getReleaseType } from '../appEnv'

describe('getReleaseType', () => {
  it('returns "Develop" or "Release"', () => {
    const result = getReleaseType()
    expect(['Develop', 'Release']).toContain(result)
  })
})
