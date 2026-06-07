import {
  mapCertifications,
  mapContact,
  mapEducations,
  mapExperiences,
  mapLegal,
  mapSkills,
  mapSocialLinks,
  mapWorks,
} from '../mappers'
import type { CmsEntity } from '../types'

function makeEntity(overrides: Partial<CmsEntity> = {}): CmsEntity {
  return {
    id: 'e1',
    slug: 'slug-1',
    status: 'published',
    sortOrder: 1,
    properties: {},
    publishedAt: '2024-01-01T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...overrides,
  }
}

describe('mapSkills', () => {
  it('maps entities to MappedSkill[]', () => {
    const entities = [
      makeEntity({
        id: 's1',
        sortOrder: 5,
        properties: {
          name: 'TypeScript',
          category: 'Language',
          image: '/ts.png',
          sortOrder: 10,
        },
      }),
    ]

    const result = mapSkills(entities)

    expect(result).toEqual([
      {
        id: 's1',
        title: 'TypeScript',
        category: 'Language',
        image: '/ts.png',
        sortOrder: 10,
      },
    ])
  })

  it('falls back to entity.sortOrder when props.sortOrder is undefined', () => {
    const entities = [
      makeEntity({
        id: 's2',
        sortOrder: 3,
        properties: {
          name: 'React',
          category: 'Framework',
          image: '/react.png',
        },
      }),
    ]

    const result = mapSkills(entities)

    expect(result[0].sortOrder).toBe(3)
  })

  it('returns empty array for empty input', () => {
    expect(mapSkills([])).toEqual([])
  })
})

describe('mapWorks', () => {
  const workEntity = makeEntity({
    slug: '42',
    sortOrder: 7,
    properties: {
      title: { en: 'My Project', ja: 'マイプロジェクト' },
      subTitle: { en: 'Subtitle EN', ja: 'サブタイトル' },
      image: ['/img.png'],
      category: ['WEBSITE'],
      stacks: ['React'],
      featured: true,
      url: 'https://example.com',
      date: { year: 2024, month: 6 },
    },
  })

  it('maps entities with the requested language', () => {
    const result = mapWorks([workEntity], 'ja')

    expect(result).toEqual([
      {
        id: 42,
        title: 'マイプロジェクト',
        subTitle: 'サブタイトル',
        image: ['/img.png'],
        category: ['WEBSITE'],
        stacks: ['React'],
        featured: true,
        url: 'https://example.com',
        date: { year: 2024, month: 6 },
      },
    ])
  })

  it('falls back to en when requested language key is missing', () => {
    const result = mapWorks([workEntity], 'fr')

    expect(result[0].title).toBe('My Project')
    expect(result[0].subTitle).toBe('Subtitle EN')
  })

  it('uses entity.sortOrder as id when slug is not numeric', () => {
    const entity = makeEntity({
      slug: 'non-numeric',
      sortOrder: 99,
      properties: {
        title: { en: 'X' },
        subTitle: { en: 'Y' },
        image: [],
        category: [],
        url: '',
        date: { year: 2024, month: 1 },
      },
    })

    expect(mapWorks([entity], 'en')[0].id).toBe(99)
  })

  it('returns empty array for empty input', () => {
    expect(mapWorks([], 'en')).toEqual([])
  })
})

describe('mapExperiences', () => {
  it('maps entities with subItems', () => {
    const entity = makeEntity({
      sortOrder: 1,
      properties: {
        title: { en: 'Company A' },
        description: { en: 'Built things' },
        image: '/logo.png',
        fromDate: '2020-01',
        toDate: '2023-06',
        showDateTimeDifference: true,
        subItems: [
          {
            title: { en: 'Role 1', ja: 'ロール1' },
            fromDate: '2020-01',
            toDate: '2021-06',
            tasks: { en: ['Task A', 'Task B'], ja: ['タスクA'] },
          },
        ],
      },
    })

    const result = mapExperiences([entity], 'en')

    expect(result).toEqual([
      {
        id: 1,
        image: '/logo.png',
        fromDate: '2020-01',
        toDate: '2023-06',
        showDateTimeDifference: true,
        title: 'Company A',
        description: 'Built things',
        subItems: [
          {
            id: 0,
            title: 'Role 1',
            fromDate: '2020-01',
            toDate: '2021-06',
            tasks: ['Task A', 'Task B'],
          },
        ],
      },
    ])
  })

  it('falls back to en for title, description, and sub-item fields', () => {
    const entity = makeEntity({
      properties: {
        title: { en: 'Fallback Title' },
        description: { en: 'Fallback Desc' },
        subItems: [{ title: { en: 'Sub EN' }, tasks: { en: ['t1'] } }],
      },
    })

    const result = mapExperiences([entity], 'ja')

    expect(result[0].title).toBe('Fallback Title')
    expect(result[0].description).toBe('Fallback Desc')
    expect(result[0].subItems![0].title).toBe('Sub EN')
    expect(result[0].subItems![0].tasks).toEqual(['t1'])
  })

  it('handles missing optional fields', () => {
    const entity = makeEntity({
      properties: { title: { en: 'Minimal' } },
    })

    const result = mapExperiences([entity], 'en')

    expect(result[0].title).toBe('Minimal')
    expect(result[0].description).toBeUndefined()
    expect(result[0].subItems).toBeUndefined()
  })

  it('returns empty array for empty input', () => {
    expect(mapExperiences([], 'en')).toEqual([])
  })
})

describe('mapEducations', () => {
  it('maps entities to TimelineItem[]', () => {
    const entity = makeEntity({
      sortOrder: 2,
      properties: {
        title: { en: 'BSc Computer Science' },
        subTitle: { en: 'University X' },
        description: { en: 'Studied CS' },
        image: '/uni.png',
        fromDate: '2016-09',
        toDate: '2020-06',
      },
    })

    const result = mapEducations([entity], 'en')

    expect(result).toEqual([
      {
        id: 2,
        image: '/uni.png',
        fromDate: '2016-09',
        toDate: '2020-06',
        title: 'BSc Computer Science',
        subTitle: 'University X',
        description: 'Studied CS',
      },
    ])
  })

  it('falls back to en when language key is missing', () => {
    const entity = makeEntity({
      properties: {
        title: { en: 'EN Title' },
        subTitle: { en: 'EN Sub' },
      },
    })

    const result = mapEducations([entity], 'ja')

    expect(result[0].title).toBe('EN Title')
    expect(result[0].subTitle).toBe('EN Sub')
  })

  it('returns empty array for empty input', () => {
    expect(mapEducations([], 'en')).toEqual([])
  })
})

describe('mapCertifications', () => {
  it('maps entities to TimelineItem[]', () => {
    const entity = makeEntity({
      sortOrder: 3,
      properties: {
        title: { en: 'AWS Cert' },
        subTitle: { en: 'Amazon' },
        image: '/aws.png',
        customDate: { en: 'Jan 2023', ja: '2023年1月' },
      },
    })

    const result = mapCertifications([entity], 'en')

    expect(result).toEqual([
      {
        id: 3,
        image: '/aws.png',
        title: 'AWS Cert',
        subTitle: 'Amazon',
        customDate: 'Jan 2023',
      },
    ])
  })

  it('localizes customDate based on language', () => {
    const entity = makeEntity({
      properties: {
        title: { en: 'Cert', ja: '認定' },
        customDate: { en: 'Jan 2023', ja: '2023年1月' },
      },
    })

    expect(mapCertifications([entity], 'ja')[0].customDate).toBe('2023年1月')
  })

  it('falls back to en for customDate when language key is missing', () => {
    const entity = makeEntity({
      properties: {
        title: { en: 'Cert' },
        customDate: { en: 'Jan 2023' },
      },
    })

    expect(mapCertifications([entity], 'fr')[0].customDate).toBe('Jan 2023')
  })

  it('returns empty array for empty input', () => {
    expect(mapCertifications([], 'en')).toEqual([])
  })
})

describe('mapContact', () => {
  it('returns tel and email from the first entity', () => {
    const entities = [
      makeEntity({ properties: { tel: '+1234567890', email: 'a@b.com' } }),
    ]

    expect(mapContact(entities)).toEqual({
      tel: '+1234567890',
      email: 'a@b.com',
    })
  })

  it('returns null for empty array', () => {
    expect(mapContact([])).toBeNull()
  })
})

describe('mapSocialLinks', () => {
  it('maps entities to MappedSocialLink[]', () => {
    const entity = makeEntity({
      id: 'sl-1',
      slug: 'github',
      properties: {
        label: 'GitHub',
        url: 'https://github.com',
        icon: 'github-icon',
        isInternal: true,
      },
    })

    const result = mapSocialLinks([entity])

    expect(result).toEqual([
      {
        id: 'github',
        label: 'GitHub',
        url: 'https://github.com',
        isInternal: true,
      },
    ])
  })

  it('defaults isInternal to false when not provided', () => {
    const entity = makeEntity({
      id: 'sl-2',
      slug: '',
      properties: { label: 'X', url: 'https://x.com', icon: 'x-icon' },
    })

    const result = mapSocialLinks([entity])

    expect(result[0].isInternal).toBe(false)
    expect(result[0].id).toBe('sl-2')
  })

  it('returns empty array for empty input', () => {
    expect(mapSocialLinks([])).toEqual([])
  })
})

describe('mapLegal', () => {
  const sections = [
    { heading: 'Intro', blocks: [{ type: 'text' as const, content: 'Hello' }] },
  ]

  it('maps entity with locale-matched content', () => {
    const entity = makeEntity({
      properties: {
        title: { en: 'Privacy Policy', ja: 'プライバシー' },
        lastUpdated: '2024-06-01',
      },
      contents: [
        { id: 'c1', locale: 'en', content: { sections } },
        { id: 'c2', locale: 'ja', content: { sections: [] } },
      ],
    })

    const result = mapLegal(entity, 'en')

    expect(result).toEqual({
      title: 'Privacy Policy',
      lastUpdated: '2024-06-01',
      sections,
    })
  })

  it('falls back to en content when requested locale is missing', () => {
    const entity = makeEntity({
      properties: { title: { en: 'Terms' }, lastUpdated: '2024-01-01' },
      contents: [{ id: 'c1', locale: 'en', content: { sections } }],
    })

    const result = mapLegal(entity, 'fr')

    expect(result.title).toBe('Terms')
    expect(result.sections).toEqual(sections)
  })

  it('falls back to first content entry when neither locale nor en exists', () => {
    const jaSections = [{ heading: '紹介', blocks: [] }]
    const entity = makeEntity({
      properties: { title: { ja: 'タイトル' }, lastUpdated: '2024-01-01' },
      contents: [{ id: 'c1', locale: 'ja', content: { sections: jaSections } }],
    })

    const result = mapLegal(entity, 'fr')

    expect(result.sections).toEqual(jaSections)
  })

  it('returns empty sections when contents is undefined', () => {
    const entity = makeEntity({
      properties: { title: { en: 'Doc' }, lastUpdated: '2024-01-01' },
    })

    const result = mapLegal(entity, 'en')

    expect(result.sections).toEqual([])
    expect(result.tiptapContent).toBeUndefined()
  })

  it('falls back title to en when requested language is missing', () => {
    const entity = makeEntity({
      properties: { title: { en: 'EN Title' }, lastUpdated: '2024-01-01' },
    })

    const result = mapLegal(entity, 'ja')

    expect(result.title).toBe('EN Title')
  })

  it('detects TipTap content and returns it as tiptapContent', () => {
    const tiptapDoc = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Section Title' }],
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Body text here' }],
        },
      ],
    }
    const entity = makeEntity({
      properties: {
        title: { en: 'Privacy Policy' },
        lastUpdated: '2024-06-01',
      },
      contents: [{ id: 'c1', locale: 'en', content: tiptapDoc }],
    })

    const result = mapLegal(entity, 'en')

    expect(result.sections).toEqual([])
    expect(result.tiptapContent).toEqual(tiptapDoc)
  })

  it('does not return tiptapContent for structured sections format', () => {
    const entity = makeEntity({
      properties: {
        title: { en: 'Terms' },
        lastUpdated: '2024-01-01',
      },
      contents: [{ id: 'c1', locale: 'en', content: { sections } }],
    })

    const result = mapLegal(entity, 'en')

    expect(result.sections).toEqual(sections)
    expect(result.tiptapContent).toBeUndefined()
  })
})
