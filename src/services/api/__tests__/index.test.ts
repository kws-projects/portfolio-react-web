const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}))

vi.mock('@/services/api/client', () => ({
  apiClient: {
    get: (...args: unknown[]) => mockGet(...args),
  },
}))

import { portfolioApi } from '../index'

describe('portfolioApi', () => {
  beforeEach(() => {
    mockGet.mockResolvedValue({ data: { data: [{ id: '1' }] } })
  })

  it('getSkills calls the skills endpoint with locale', async () => {
    await portfolioApi.getSkills('en')
    expect(mockGet).toHaveBeenCalledWith('/v1/skills', {
      params: { locale: 'en' },
    })
  })

  it('getWorks calls the works endpoint', async () => {
    await portfolioApi.getWorks('zh-TW')
    expect(mockGet).toHaveBeenCalledWith('/v1/works', {
      params: { locale: 'zh-TW' },
    })
  })

  it('getBlogs calls the blogs endpoint with params', async () => {
    await portfolioApi.getBlogs({ page: 2, pageSize: 9, sort: 'publishedAt' })
    expect(mockGet).toHaveBeenCalledWith('/v1/blogs', {
      params: { page: 2, pageSize: 9, sort: 'publishedAt' },
    })
  })

  it('getBlog calls the blog slug endpoint', async () => {
    await portfolioApi.getBlog('hello-world', 'en')
    expect(mockGet).toHaveBeenCalledWith('/v1/blogs/hello-world', {
      params: { locale: 'en' },
    })
  })

  it('getLegal calls the legal slug endpoint', async () => {
    await portfolioApi.getLegal('privacy-policy', 'en')
    expect(mockGet).toHaveBeenCalledWith('/v1/legal/privacy-policy', {
      params: { locale: 'en' },
    })
  })

  it('getPreview calls the preview token endpoint', async () => {
    await portfolioApi.getPreview('token-abc')
    expect(mockGet).toHaveBeenCalledWith('/v1/preview/token-abc')
  })

  it('getSiteConfig calls the site-config endpoint', async () => {
    await portfolioApi.getSiteConfig()
    expect(mockGet).toHaveBeenCalledWith('/v1/site-config')
  })

  it('extracts nested data from API response', async () => {
    const result = await portfolioApi.getContact()
    expect(result).toEqual([{ id: '1' }])
  })
})
