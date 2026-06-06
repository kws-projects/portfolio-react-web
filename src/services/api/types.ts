export interface ApiResponse<T> {
  success: boolean
  data: T
  meta: {
    timestamp: string
    requestId: string
    pagination?: {
      page: number
      pageSize: number
      totalItems: number
      totalPages: number
    }
  }
}

export interface CmsEntity {
  id: string
  slug: string
  status: string
  sortOrder: number
  properties: Record<string, unknown>
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  contents?: CmsEntityContent[]
}

export interface CmsEntityContent {
  id: string
  locale: string
  content: Record<string, unknown>
}

export interface SkillProperties {
  name: string
  category: string
  image: string
  sortOrder?: number
}

export interface WorkProperties {
  title: Record<string, string>
  subTitle: Record<string, string>
  image: string | string[]
  category: string[]
  stacks?: string[]
  featured?: boolean
  url: string
  date: { year: number; month: number }
}

export interface ExperienceProperties {
  title: Record<string, string>
  subTitle?: Record<string, string>
  description?: Record<string, string>
  image?: string
  fromDate?: string
  toDate?: string
  customDate?: Record<string, string>
  showDateTimeDifference?: boolean
  tasks?: Record<string, string[]>
  subItems?: ExperienceSubItem[]
}

export interface ExperienceSubItem {
  title: Record<string, string>
  fromDate?: string
  toDate?: string
  tasks?: Record<string, string[]>
}

export interface EducationProperties {
  title: Record<string, string>
  subTitle?: Record<string, string>
  description?: Record<string, string>
  image?: string
  fromDate?: string
  toDate?: string
}

export interface CertificationProperties {
  title: Record<string, string>
  subTitle?: Record<string, string>
  description?: Record<string, string>
  image?: string
  customDate?: Record<string, string>
}

export interface ContactProperties {
  tel: string
  email: string
}

export interface SocialLinkProperties {
  label: string
  url: string
  isInternal?: boolean
}

export interface LegalProperties {
  title: Record<string, string>
  lastUpdated: string
}

export interface SiteConfigProperties {
  profileImage: string
}
