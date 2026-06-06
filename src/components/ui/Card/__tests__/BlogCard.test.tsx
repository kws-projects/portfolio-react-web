import type { BlogEntity } from '@/types/blog'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { BlogCard, Skeleton } from '../BlogCard'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

const mockBlog: BlogEntity = {
  id: 'uuid-1',
  slug: 'test-blog-post',
  status: 'PUBLISHED',
  sortOrder: 0,
  properties: {
    title: { en: 'Test Blog Title', 'zh-TW': '測試文章' },
    description: {
      en: 'A test description for the blog.',
      'zh-TW': '測試描述',
    },
    author: 'Test Author',
    category: 'Tech',
    tags: ['react', 'typescript'],
    coverImage: 'https://example.com/cover.webp',
    readingTime: 5,
  },
  publishedAt: '2024-06-15T00:00:00Z',
  createdAt: '2024-06-15T00:00:00Z',
  updatedAt: '2024-06-15T00:00:00Z',
}

describe('BlogCard', () => {
  it('renders blog title', () => {
    render(
      <MemoryRouter>
        <BlogCard data={mockBlog} />
      </MemoryRouter>
    )
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument()
  })

  it('renders blog description', () => {
    render(
      <MemoryRouter>
        <BlogCard data={mockBlog} />
      </MemoryRouter>
    )
    expect(
      screen.getByText('A test description for the blog.')
    ).toBeInTheDocument()
  })

  it('links to the blog post page using slug', () => {
    render(
      <MemoryRouter>
        <BlogCard data={mockBlog} />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blogs/test-blog-post')
  })
})

describe('BlogCard Skeleton', () => {
  it('renders skeleton loader', () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })
})
