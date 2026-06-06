import { useQuery } from '@tanstack/react-query'

import {
  useCertifications,
  useContact,
  useEducations,
  useExperiences,
  useLegal,
  usePreview,
  useSkills,
  useSocialLinks,
  useWorks,
} from '../usePortfolioData'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'en' } }),
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

vi.mock('@/services/api', () => ({
  portfolioApi: {
    getSkills: vi.fn(),
    getWorks: vi.fn(),
    getExperiences: vi.fn(),
    getEducations: vi.fn(),
    getCertifications: vi.fn(),
    getContact: vi.fn(),
    getSocialLinks: vi.fn(),
    getLegal: vi.fn(),
    getPreview: vi.fn(),
  },
}))

const mockUseQuery = vi.mocked(useQuery)

beforeEach(() => {
  mockUseQuery.mockReturnValue({ data: [], isLoading: false } as never)
})

describe('useSkills', () => {
  it('passes correct queryKey and staleTime', () => {
    useSkills()
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['skills', 'en'],
        staleTime: 5 * 60 * 1000,
      })
    )
  })
})

describe('useWorks', () => {
  it('passes correct queryKey and staleTime', () => {
    useWorks()
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['works', 'en'],
        staleTime: 5 * 60 * 1000,
      })
    )
  })
})

describe('useExperiences', () => {
  it('passes correct queryKey and staleTime', () => {
    useExperiences()
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['experiences', 'en'],
        staleTime: 5 * 60 * 1000,
      })
    )
  })
})

describe('useEducations', () => {
  it('passes correct queryKey and staleTime', () => {
    useEducations()
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['educations', 'en'],
        staleTime: 5 * 60 * 1000,
      })
    )
  })
})

describe('useCertifications', () => {
  it('passes correct queryKey and staleTime', () => {
    useCertifications()
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['certifications', 'en'],
        staleTime: 5 * 60 * 1000,
      })
    )
  })
})

describe('useContact', () => {
  it('passes correct queryKey and staleTime', () => {
    useContact()
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['contact'],
        staleTime: 10 * 60 * 1000,
      })
    )
  })
})

describe('useSocialLinks', () => {
  it('passes correct queryKey and staleTime', () => {
    useSocialLinks()
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['social-links'],
        staleTime: 10 * 60 * 1000,
      })
    )
  })
})

describe('useLegal', () => {
  it('passes slug and language in queryKey', () => {
    useLegal('privacy-policy')
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['legal', 'privacy-policy', 'en'],
        staleTime: 10 * 60 * 1000,
      })
    )
  })
})

describe('usePreview', () => {
  it('passes token in queryKey and enables when token is truthy', () => {
    usePreview('abc123')
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['preview', 'abc123'],
        enabled: true,
      })
    )
  })

  it('disables query when token is empty', () => {
    usePreview('')
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['preview', ''],
        enabled: false,
      })
    )
  })
})
