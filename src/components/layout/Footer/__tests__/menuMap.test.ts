vi.mock('@/config', () => ({
  envConfig: {
    CV_URL: 'https://example.com/cv',
  },
}))

import { menuMap } from '../menuMap'

describe('Footer menuMap', () => {
  it('has items with sub-items', () => {
    menuMap.forEach(item => {
      expect(item.id).toBeDefined()
      expect(item.titleKey).toBeDefined()
      expect(item.subItems).toBeDefined()
      expect(item.subItems!.length).toBeGreaterThan(0)
    })
  })

  it('matches snapshot', () => {
    expect(menuMap).toMatchSnapshot()
  })
})
