import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BlogGrid from '../BlogGrid'
import { Blog, BlogStatus } from '@/types/blog'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

const mockBlogs: Blog[] = [
  {
    id: 1,
    status: BlogStatus.Published,
    author: 'Author',
    category: 'Tech',
    titleEn: 'First Blog',
    descriptionEn: 'Description 1',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    createdBy: 'tester',
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    updatedBy: 'tester',
  },
  {
    id: 2,
    status: BlogStatus.Published,
    author: 'Author',
    category: 'Tech',
    titleEn: 'Second Blog',
    descriptionEn: 'Description 2',
    createdAt: new Date('2024-02-01T00:00:00Z'),
    createdBy: 'tester',
    updatedAt: new Date('2024-02-01T00:00:00Z'),
    updatedBy: 'tester',
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
      screen.getByRole('heading', { name: 'error_blogs_not_found_message' })
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
