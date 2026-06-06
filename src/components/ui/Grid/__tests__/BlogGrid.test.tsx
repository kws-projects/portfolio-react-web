import type { BlogEntity } from '@/types/blog'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import BlogGrid from '../BlogGrid'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

const mockBlogs: BlogEntity[] = [
  {
    id: 'uuid-1',
    slug: 'first-blog',
    status: 'PUBLISHED',
    sortOrder: 0,
    properties: {
      title: { en: 'First Blog' },
      description: { en: 'Description 1' },
      author: 'Author',
      category: 'Tech',
      tags: [],
      coverImage: 'https://example.com/cover1.webp',
      readingTime: 3,
    },
    publishedAt: '2024-01-01T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'uuid-2',
    slug: 'second-blog',
    status: 'PUBLISHED',
    sortOrder: 1,
    properties: {
      title: { en: 'Second Blog' },
      description: { en: 'Description 2' },
      author: 'Author',
      category: 'Tech',
      tags: [],
      coverImage: 'https://example.com/cover2.webp',
      readingTime: 5,
    },
    publishedAt: '2024-02-01T00:00:00Z',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
]

describe('BlogGrid', () => {
  it('renders blog cards when data is provided', () => {
    render(
      <MemoryRouter>
        <BlogGrid
          data={mockBlogs}
          isLoading={false}
          isError={false}
          refetch={vi.fn()}
        />
      </MemoryRouter>
    )
    expect(screen.getByText('First Blog')).toBeInTheDocument()
    expect(screen.getByText('Second Blog')).toBeInTheDocument()
  })

  it('renders skeleton loaders when loading', () => {
    const { container } = render(
      <MemoryRouter>
        <BlogGrid
          data={[]}
          isLoading={true}
          isError={false}
          refetch={vi.fn()}
        />
      </MemoryRouter>
    )
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    )
  })

  it('renders error state when isError is true', () => {
    render(
      <MemoryRouter>
        <BlogGrid
          data={[]}
          isLoading={false}
          isError={true}
          refetch={vi.fn()}
        />
      </MemoryRouter>
    )
    expect(
      screen.getByText('error_blogs_not_found_message')
    ).toBeInTheDocument()
  })

  it('renders retry button on error', () => {
    render(
      <MemoryRouter>
        <BlogGrid
          data={[]}
          isLoading={false}
          isError={true}
          refetch={vi.fn()}
        />
      </MemoryRouter>
    )
    expect(
      screen.getByRole('button', { name: 'button_reload' })
    ).toBeInTheDocument()
  })
})
