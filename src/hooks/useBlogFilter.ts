import type { BlogListParams } from '@/hooks/useBlogs'
import { useBlogs } from '@/hooks/useBlogs'
import { parse, stringify } from 'qs'
import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const BLOG_PAGE_SIZE = 9

export type BlogSortOption = 'newest' | 'oldest'

interface ParsedBlogQuery {
  category?: string
  sort?: BlogSortOption
  page?: number
}

function parseQuery(search: string): ParsedBlogQuery {
  const q = parse(search, { ignoreQueryPrefix: true })
  return {
    category: typeof q.category === 'string' ? q.category : undefined,
    sort: q.sort === 'oldest' ? 'oldest' : 'newest',
    page: q.page ? Math.max(1, Number(q.page)) : 1,
  }
}

export function useBlogFilter() {
  const navigate = useNavigate()
  const { search, pathname } = useLocation()

  const query = useMemo(() => parseQuery(search), [search])

  const apiParams: BlogListParams = useMemo(
    () => ({
      page: query.page ?? 1,
      pageSize: BLOG_PAGE_SIZE,
      sort: 'publishedAt',
      order: query.sort === 'oldest' ? 'asc' : 'desc',
      ...(query.category && query.category !== 'all'
        ? { category: query.category }
        : {}),
    }),
    [query]
  )

  const { data, isLoading, isError, refetch } = useBlogs(apiParams)

  const updateQuery = useCallback(
    (updates: Partial<ParsedBlogQuery>) => {
      const next = { ...query, ...updates }
      if (updates.category !== undefined || updates.sort !== undefined) {
        next.page = 1
      }
      const params: Record<string, string | number> = {}
      if (next.category && next.category !== 'all')
        params.category = next.category
      if (next.sort && next.sort !== 'newest') params.sort = next.sort
      if (next.page && next.page > 1) params.page = next.page

      navigate(
        {
          pathname,
          search: Object.keys(params).length ? `?${stringify(params)}` : '',
        },
        { replace: true }
      )
    },
    [query, navigate, pathname]
  )

  const handleCategoryChange = useCallback(
    (category: string) => updateQuery({ category }),
    [updateQuery]
  )

  const handleSortChange = useCallback(
    (sort: BlogSortOption) => updateQuery({ sort }),
    [updateQuery]
  )

  const handlePageChange = useCallback(
    (page: number) => updateQuery({ page }),
    [updateQuery]
  )

  const availableCategories = useMemo(() => {
    if (!data?.items.length) return []
    const seen = new Set<string>()
    for (const blog of data.items) {
      const cat = blog.properties.category
      if (cat) seen.add(cat)
    }
    return Array.from(seen).sort()
  }, [data])

  return {
    blogs: data?.items ?? [],
    pagination: data?.pagination ?? {
      page: 1,
      pageSize: BLOG_PAGE_SIZE,
      totalItems: 0,
      totalPages: 1,
    },
    selectedCategory: query.category ?? 'all',
    selectedSort: query.sort ?? 'newest',
    currentPage: query.page ?? 1,
    availableCategories,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
    isLoading,
    isError,
    refetch,
  }
}
