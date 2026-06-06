import { apiClient } from './client'
import type { ApiResponse, CmsEntity } from './types'

const extractData = <T>(response: { data: ApiResponse<T> }) =>
  response.data.data

export const portfolioApi = {
  getSkills: (locale?: string) =>
    apiClient
      .get<ApiResponse<CmsEntity[]>>('/v1/skills', { params: { locale } })
      .then(extractData),

  getWorks: (locale?: string) =>
    apiClient
      .get<ApiResponse<CmsEntity[]>>('/v1/works', { params: { locale } })
      .then(extractData),

  getExperiences: (locale?: string) =>
    apiClient
      .get<ApiResponse<CmsEntity[]>>('/v1/experiences', { params: { locale } })
      .then(extractData),

  getEducations: (locale?: string) =>
    apiClient
      .get<ApiResponse<CmsEntity[]>>('/v1/educations', { params: { locale } })
      .then(extractData),

  getCertifications: (locale?: string) =>
    apiClient
      .get<ApiResponse<CmsEntity[]>>('/v1/certifications', {
        params: { locale },
      })
      .then(extractData),

  getContact: () =>
    apiClient.get<ApiResponse<CmsEntity[]>>('/v1/contact').then(extractData),

  getSocialLinks: () =>
    apiClient
      .get<ApiResponse<CmsEntity[]>>('/v1/social-links')
      .then(extractData),

  getBlogs: (params?: {
    locale?: string
    page?: number
    pageSize?: number
    sort?: string
    order?: 'asc' | 'desc'
    category?: string
  }) =>
    apiClient
      .get<
        ApiResponse<{
          data: CmsEntity[]
          pagination: {
            page: number
            pageSize: number
            totalItems: number
            totalPages: number
          }
        }>
      >('/v1/blogs', { params })
      .then(extractData),

  getBlog: (slug: string, locale?: string) =>
    apiClient
      .get<ApiResponse<CmsEntity>>(`/v1/blogs/${slug}`, {
        params: { locale },
      })
      .then(extractData),

  getLegal: (slug: string, locale?: string) =>
    apiClient
      .get<ApiResponse<CmsEntity>>(`/v1/legal/${slug}`, {
        params: { locale },
      })
      .then(extractData),

  getPreview: (token: string) =>
    apiClient
      .get<ApiResponse<CmsEntity>>(`/v1/preview/${token}`)
      .then(extractData),

  getSiteConfig: () =>
    apiClient
      .get<ApiResponse<CmsEntity[]>>('/v1/site-config')
      .then(extractData),
}

export type { ApiResponse, CmsEntity } from './types'
