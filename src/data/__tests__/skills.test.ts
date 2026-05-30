import { skills } from '../skills'

describe('skills', () => {
  it('contains skills in all categories', () => {
    const categories = [...new Set(skills.map(s => s.category))]
    expect(categories).toContain('Frontend')
    expect(categories).toContain('Backend')
    expect(categories).toContain('Others')
  })

  it('each skill has required fields', () => {
    skills.forEach(skill => {
      expect(skill.id).toBeDefined()
      expect(skill.title).toBeDefined()
      expect(skill.category).toBeDefined()
      expect(skill.image).toBeDefined()
    })
  })

  it('has unique ids', () => {
    const ids = skills.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
