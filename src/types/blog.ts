export interface BlogProperties {
  title: Record<string, string>
  description: Record<string, string>
  author: string
  category: string
  tags: string[]
  coverImage: string
  readingTime: number
}

export interface BlogContent {
  id: string
  locale: string
  content: Record<string, unknown>
}

export interface BlogEntity {
  id: string
  slug: string
  status: string
  sortOrder: number
  properties: BlogProperties
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  contents?: BlogContent[]
}
