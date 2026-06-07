import type { Work, WorkCategory } from '@/constant/work'
import type { TimelineItem } from '@/types/timeline'

import type {
  CertificationProperties,
  CmsEntity,
  ContactProperties,
  EducationProperties,
  ExperienceProperties,
  LegalProperties,
  SkillProperties,
  SocialLinkProperties,
  WorkProperties,
} from './types'

export type MappedSkill = {
  id: string
  title: string
  category: string
  image: string
  sortOrder: number
}

export function mapSkills(entities: CmsEntity[]): MappedSkill[] {
  return entities.map(entity => {
    const props = entity.properties as unknown as SkillProperties
    return {
      id: entity.id,
      title: props.name,
      category: props.category,
      image: props.image,
      sortOrder: props.sortOrder ?? entity.sortOrder,
    }
  })
}

export function mapWorks(entities: CmsEntity[], lang: string): Work[] {
  return entities.map(entity => {
    const props = entity.properties as unknown as WorkProperties
    const rawImage = props.image
    return {
      id: Number(entity.slug) || entity.sortOrder,
      title: props.title[lang] ?? props.title.en ?? '',
      subTitle: props.subTitle?.[lang] ?? props.subTitle?.en ?? '',
      image: Array.isArray(rawImage) ? rawImage : rawImage ? [rawImage] : [],
      category: props.category as unknown as WorkCategory[],
      stacks: props.stacks,
      featured: props.featured,
      url: props.url,
      date: props.date,
    }
  })
}

export function mapExperiences(
  entities: CmsEntity[],
  lang: string
): TimelineItem[] {
  return entities.map(entity => {
    const props = entity.properties as unknown as ExperienceProperties
    return {
      id: entity.sortOrder,
      image: props.image,
      fromDate: props.fromDate,
      toDate: props.toDate,
      showDateTimeDifference: props.showDateTimeDifference,
      title: props.title[lang] ?? props.title.en ?? '',
      description: props.description?.[lang] ?? props.description?.en,
      subItems: Array.isArray(props.subItems)
        ? props.subItems.map(sub => ({
            id: 0,
            title: sub.title[lang] ?? sub.title.en ?? '',
            fromDate: sub.fromDate,
            toDate: sub.toDate,
            tasks: sub.tasks?.[lang] ?? sub.tasks?.en,
          }))
        : undefined,
    }
  })
}

export function mapEducations(
  entities: CmsEntity[],
  lang: string
): TimelineItem[] {
  return entities.map(entity => {
    const props = entity.properties as unknown as EducationProperties
    return {
      id: entity.sortOrder,
      image: props.image,
      fromDate: props.fromDate,
      toDate: props.toDate,
      title: props.title[lang] ?? props.title.en ?? '',
      subTitle: props.subTitle?.[lang] ?? props.subTitle?.en,
      description: props.description?.[lang] ?? props.description?.en,
    }
  })
}

export function mapCertifications(
  entities: CmsEntity[],
  lang: string
): TimelineItem[] {
  return entities.map(entity => {
    const props = entity.properties as unknown as CertificationProperties
    return {
      id: entity.sortOrder,
      image: props.image,
      title: props.title[lang] ?? props.title.en ?? '',
      subTitle: props.subTitle?.[lang] ?? props.subTitle?.en,
      customDate: props.customDate?.[lang] ?? props.customDate?.en,
    }
  })
}

export type MappedContact = {
  tel: string
  email: string
}

export function mapContact(entities: CmsEntity[]): MappedContact | null {
  if (!entities.length) return null
  const props = entities[0].properties as unknown as ContactProperties
  return {
    tel: props.tel,
    email: props.email,
  }
}

export type MappedSocialLink = {
  id: string
  label: string
  url: string
  isInternal: boolean
}

export function mapSocialLinks(entities: CmsEntity[]): MappedSocialLink[] {
  return entities.map(entity => {
    const props = entity.properties as unknown as SocialLinkProperties
    return {
      id: entity.slug || entity.id,
      label: props.label,
      url: props.url,
      isInternal: props.isInternal ?? false,
    }
  })
}

export type LegalSection = {
  heading: string
  blocks: LegalBlock[]
}

export type LegalBlock =
  | { type: 'text'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'link'; text: string; href: string }

export type LegalDocument = {
  title: string
  lastUpdated: string
  sections: LegalSection[]
  tiptapContent?: Record<string, unknown>
}

function resolveI18n(value: unknown, lang: string): string {
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as Record<string, string>
      return parsed[lang] ?? parsed['en'] ?? value
    } catch {
      return value
    }
  }
  if (value && typeof value === 'object') {
    const obj = value as Record<string, string>
    return obj[lang] ?? obj['en'] ?? ''
  }
  return String(value ?? '')
}

function isTiptapContent(content: Record<string, unknown>): boolean {
  return content?.type === 'doc' && Array.isArray(content?.content)
}

export function mapLegal(entity: CmsEntity, lang: string): LegalDocument {
  const props = entity.properties as unknown as LegalProperties
  const content =
    entity.contents?.find(c => c.locale === lang) ??
    entity.contents?.find(c => c.locale === 'en') ??
    entity.contents?.[0]

  const rawContent = content?.content
  const isTiptap = rawContent && isTiptapContent(rawContent)
  const sections = isTiptap
    ? []
    : ((rawContent?.sections as LegalSection[]) ?? [])

  return {
    title: resolveI18n(props.title, lang),
    lastUpdated: props.lastUpdated,
    sections,
    ...(isTiptap && { tiptapContent: rawContent }),
  }
}
