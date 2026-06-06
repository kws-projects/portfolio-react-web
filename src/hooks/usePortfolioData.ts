import { portfolioApi } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export function useSkills() {
  const { i18n } = useTranslation()
  return useQuery({
    queryKey: ['skills', i18n.language],
    queryFn: () => portfolioApi.getSkills(i18n.language),
    staleTime: 5 * 60 * 1000,
  })
}

export function useWorks() {
  const { i18n } = useTranslation()
  return useQuery({
    queryKey: ['works', i18n.language],
    queryFn: () => portfolioApi.getWorks(i18n.language),
    staleTime: 5 * 60 * 1000,
  })
}

export function useExperiences() {
  const { i18n } = useTranslation()
  return useQuery({
    queryKey: ['experiences', i18n.language],
    queryFn: () => portfolioApi.getExperiences(i18n.language),
    staleTime: 5 * 60 * 1000,
  })
}

export function useEducations() {
  const { i18n } = useTranslation()
  return useQuery({
    queryKey: ['educations', i18n.language],
    queryFn: () => portfolioApi.getEducations(i18n.language),
    staleTime: 5 * 60 * 1000,
  })
}

export function useCertifications() {
  const { i18n } = useTranslation()
  return useQuery({
    queryKey: ['certifications', i18n.language],
    queryFn: () => portfolioApi.getCertifications(i18n.language),
    staleTime: 5 * 60 * 1000,
  })
}

export function useContact() {
  return useQuery({
    queryKey: ['contact'],
    queryFn: () => portfolioApi.getContact(),
    staleTime: 10 * 60 * 1000,
  })
}

export function useSocialLinks() {
  return useQuery({
    queryKey: ['social-links'],
    queryFn: () => portfolioApi.getSocialLinks(),
    staleTime: 10 * 60 * 1000,
  })
}

export function useLegal(slug: string) {
  const { i18n } = useTranslation()
  return useQuery({
    queryKey: ['legal', slug, i18n.language],
    queryFn: () => portfolioApi.getLegal(slug, i18n.language),
    staleTime: 10 * 60 * 1000,
  })
}

export function usePreview(token: string) {
  return useQuery({
    queryKey: ['preview', token],
    queryFn: () => portfolioApi.getPreview(token),
    enabled: !!token,
  })
}

export function useSiteConfig() {
  return useQuery({
    queryKey: ['site-config'],
    queryFn: () => portfolioApi.getSiteConfig(),
    staleTime: 10 * 60 * 1000,
    select: data => {
      if (!data || data.length === 0) return null
      return data[0].properties as Record<string, unknown>
    },
  })
}
