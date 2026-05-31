import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BlogGrid from '../BlogGrid'
import { Blog } from '@/types/blog'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

const mockBlogs: Blog[] = [
  {
    id: 'blog-1',
    titleEn: 'First Blog',
    descriptionEn: 'Description 1',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'blog-2',
    titleEn: 'Second Blog',
    descriptionEn: 'Description 2',
    createdAt: '2024-02-01T00:00:00Z',
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
