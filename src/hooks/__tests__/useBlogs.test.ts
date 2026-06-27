import { useQuery } from '@tanstack/react-query'

import { useBlog, useBlogs } from '../useBlogs'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'en' } }),
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

vi.mock('@/services/api', () => ({
  portfolioApi: {
    getBlogs: vi.fn(),
    getBlog: vi.fn(),
  },
}))

const mockUseQuery = vi.mocked(useQuery)

describe('useBlogs', () => {
  beforeEach(() => {
    mockUseQuery.mockReturnValue({ data: [], isLoading: false } as never)
  })

  it('passes correct queryKey including language', () => {
    useBlogs()

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['blogs', 'en', {}],
        staleTime: 2 * 60 * 1000,
      })
    )
  })

  it('select normalises paginated API shape', () => {
    useBlogs()
    const options = mockUseQuery.mock.calls[0][0] as {
      select: (data: unknown) => unknown
    }

    const paginated = options.select({
      data: [{ id: '1' }],
      pagination: {
        page: 2,
        pageSize: 9,
        totalItems: 10,
        totalPages: 2,
      },
    })

    expect(paginated).toEqual({
      items: [{ id: '1' }],
      pagination: {
        page: 2,
        pageSize: 9,
        totalItems: 10,
        totalPages: 2,
      },
    })
  })

  it('select falls back for legacy array responses', () => {
    useBlogs()
    const options = mockUseQuery.mock.calls[0][0] as {
      select: (data: unknown) => unknown
    }

    const legacy = options.select([{ id: 'a' }, { id: 'b' }])
    expect(legacy).toEqual({
      items: [{ id: 'a' }, { id: 'b' }],
      pagination: {
        page: 1,
        pageSize: 2,
        totalItems: 2,
        totalPages: 1,
      },
    })
  })
})

describe('useBlog', () => {
  beforeEach(() => {
    mockUseQuery.mockReturnValue({ data: null, isLoading: false } as never)
  })

  it('passes slug in queryKey and enables when slug is defined', () => {
    useBlog('my-post')

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['blog', 'my-post', 'en'],
        enabled: true,
        staleTime: 2 * 60 * 1000,
      })
    )
  })

  it('disables the query when slug is undefined', () => {
    useBlog(undefined)

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['blog', undefined, 'en'],
        enabled: false,
      })
    )
  })
})
