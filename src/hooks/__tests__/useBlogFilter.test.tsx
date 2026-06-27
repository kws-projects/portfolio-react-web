import type { BlogEntity } from '@/types/blog'
import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { useBlogFilter } from '../useBlogFilter'

const mockNavigate = vi.fn()
const mockRefetch = vi.fn()

const mockBlogItems: BlogEntity[] = [
  {
    id: '1',
    slug: 'post-a',
    status: 'published',
    sortOrder: 1,
    properties: {
      category: 'tech',
      title: { en: 'A' },
      description: { en: '' },
      author: 'Author',
      tags: [],
      coverImage: '',
      readingTime: 1,
    },
    publishedAt: '2024-01-01',
    createdAt: '',
    updatedAt: '',
    contents: [],
  },
  {
    id: '2',
    slug: 'post-b',
    status: 'published',
    sortOrder: 2,
    properties: {
      category: 'design',
      title: { en: 'B' },
      description: { en: '' },
      author: 'Author',
      tags: [],
      coverImage: '',
      readingTime: 1,
    },
    publishedAt: '2024-02-01',
    createdAt: '',
    updatedAt: '',
    contents: [],
  },
]

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/hooks/useBlogs', () => ({
  useBlogs: vi.fn(() => ({
    data: {
      items: mockBlogItems,
      pagination: {
        page: 1,
        pageSize: 9,
        totalItems: 2,
        totalPages: 1,
      },
    },
    isLoading: false,
    isError: false,
    refetch: mockRefetch,
  })),
}))

const wrapper =
  (initialEntry = '/blogs') =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
  )

describe('useBlogFilter', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('defaults to newest sort and all categories', () => {
    const { result } = renderHook(() => useBlogFilter(), {
      wrapper: wrapper(),
    })

    expect(result.current.selectedSort).toBe('newest')
    expect(result.current.selectedCategory).toBe('all')
    expect(result.current.blogs).toHaveLength(2)
  })

  it('parses category and sort from query string', () => {
    const { result } = renderHook(() => useBlogFilter(), {
      wrapper: wrapper('/blogs?category=tech&sort=oldest&page=2'),
    })

    expect(result.current.selectedCategory).toBe('tech')
    expect(result.current.selectedSort).toBe('oldest')
    expect(result.current.currentPage).toBe(2)
  })

  it('collects available categories from blog data', () => {
    const { result } = renderHook(() => useBlogFilter(), {
      wrapper: wrapper(),
    })

    expect(result.current.availableCategories).toEqual(['design', 'tech'])
  })

  it('navigates when category changes and resets page', () => {
    const { result } = renderHook(() => useBlogFilter(), {
      wrapper: wrapper('/blogs?page=2'),
    })

    act(() => result.current.handleCategoryChange('tech'))

    expect(mockNavigate).toHaveBeenCalledWith(
      { pathname: '/blogs', search: '?category=tech' },
      { replace: true }
    )
  })

  it('navigates when sort changes', () => {
    const { result } = renderHook(() => useBlogFilter(), {
      wrapper: wrapper(),
    })

    act(() => result.current.handleSortChange('oldest'))

    expect(mockNavigate).toHaveBeenCalledWith(
      { pathname: '/blogs', search: '?sort=oldest' },
      { replace: true }
    )
  })

  it('navigates when page changes', () => {
    const { result } = renderHook(() => useBlogFilter(), {
      wrapper: wrapper(),
    })

    act(() => result.current.handlePageChange(3))

    expect(mockNavigate).toHaveBeenCalledWith(
      { pathname: '/blogs', search: '?page=3' },
      { replace: true }
    )
  })
})
