import { WorkCategory, workCategoryLabelKeys } from '../work'

describe('WorkCategory', () => {
  it('contains expected categories', () => {
    expect(WorkCategory.ALL).toBe('All')
    expect(WorkCategory.MOBILE).toBe('MOBILE_APP')
    expect(WorkCategory.WEBSITE).toBe('WEBSITE')
  })
})

describe('workCategoryLabelKeys', () => {
  it('has a label key for every category', () => {
    const categories = Object.values(WorkCategory)
    categories.forEach(cat => {
      expect(workCategoryLabelKeys[cat]).toBeDefined()
      expect(typeof workCategoryLabelKeys[cat]).toBe('string')
    })
  })
})
