import { menuMap } from '../menuMap'

describe('Navbar menuMap', () => {
  it('has items for all main navigation routes', () => {
    const paths = menuMap.map(item => item.path)
    expect(paths).toContain('/')
    expect(paths).toContain('/about')
    expect(paths).toContain('/works')
    expect(paths).toContain('/blogs')
    expect(paths).toContain('/contact')
  })

  it('each item has required fields', () => {
    menuMap.forEach(item => {
      expect(item.id).toBeDefined()
      expect(item.titleKey).toBeDefined()
      expect(item.path).toBeDefined()
    })
  })

  it('matches snapshot', () => {
    expect(menuMap).toMatchSnapshot()
  })
})
