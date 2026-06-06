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

  it('provides a select function', () => {
    useBlogs()

    const options = mockUseQuery.mock.calls[0][0] as Record<string, unknown>
    expect(options.select).toBeTypeOf('function')
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
