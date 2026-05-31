import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BlogCard, Skeleton } from '../BlogCard'
import { Blog, BlogStatus } from '@/types/blog'

const mockBlog: Blog = {
  id: 1,
  status: BlogStatus.Published,
  author: 'Test Author',
  category: 'Tech',
  titleEn: 'Test Blog Title',
  descriptionEn: 'A test description for the blog.',
  createdAt: new Date('2024-06-15T00:00:00Z'),
  createdBy: 'tester',
  updatedAt: new Date('2024-06-15T00:00:00Z'),
  updatedBy: 'tester',
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

  it('links to the blog post page', () => {
    render(
      <MemoryRouter>
        <BlogCard data={mockBlog} />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blogs/1')
  })
})

describe('BlogCard Skeleton', () => {
  it('renders skeleton loader', () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })
})
