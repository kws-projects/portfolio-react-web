import { portfolioApi } from '@/services/api'
import type { CmsEntity } from '@/services/api/types'
import type { BlogEntity } from '@/types/blog'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export interface BlogListParams {
  page?: number
  pageSize?: number
  sort?: string
  order?: 'asc' | 'desc'
  category?: string
}

export interface PaginatedBlogs {
  items: BlogEntity[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}

export function useBlogs(params: BlogListParams = {}) {
  const { i18n } = useTranslation()

  return useQuery({
    queryKey: ['blogs', i18n.language, params],
    queryFn: () =>
      portfolioApi.getBlogs({
        locale: i18n.language,
        ...params,
      }),
    select: (data): PaginatedBlogs => {
      const raw = data as unknown as {
        data: CmsEntity[]
        pagination: {
          page: number
          pageSize: number
          totalItems: number
          totalPages: number
        }
      }
      if (
        raw &&
        typeof raw === 'object' &&
        'data' in raw &&
        'pagination' in raw
      ) {
        return {
          items: raw.data as unknown as BlogEntity[],
          pagination: raw.pagination,
        }
      }
      const items = (Array.isArray(data) ? data : []) as unknown as BlogEntity[]
      return {
        items,
        pagination: {
          page: 1,
          pageSize: items.length,
          totalItems: items.length,
          totalPages: 1,
        },
      }
    },
    staleTime: 2 * 60 * 1000,
  })
}

export function useBlog(slug: string | undefined) {
  const { i18n } = useTranslation()

  return useQuery({
    queryKey: ['blog', slug, i18n.language],
    queryFn: () => portfolioApi.getBlog(slug!, i18n.language),
    enabled: !!slug,
    select: (data: CmsEntity) => data as unknown as BlogEntity,
    staleTime: 2 * 60 * 1000,
  })
}
