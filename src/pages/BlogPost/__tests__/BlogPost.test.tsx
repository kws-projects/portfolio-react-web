import { useBlog } from '@/hooks/useBlogs'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import BlogPost from '../index'

const mockRefetch = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) =>
      opts ? `${key}:${JSON.stringify(opts)}` : key,
    i18n: { language: 'en' },
  }),
}))

vi.mock('@/hooks/useBlogs', () => ({
  useBlog: vi.fn(),
}))

vi.mock('@/components/blog/TiptapRenderer', () => ({
  TiptapRenderer: () => <div data-testid="tiptap-renderer" />,
}))

const mockUseBlog = vi.mocked(useBlog)

const blogData = {
  id: '1',
  slug: 'hello-world',
  properties: {
    title: { en: 'Hello World' },
    description: { en: 'A test post' },
    author: 'Kenneth',
    category: 'tech',
    tags: ['react'],
    readingTime: 5,
  },
  publishedAt: '2024-03-15',
  contents: [
    {
      locale: 'en',
      content: {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Introduction' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Body text' }],
          },
        ],
      },
    },
  ],
}

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/blogs/hello-world']}>
      <Routes>
        <Route path="/blogs/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>
  )

describe('BlogPost', () => {
  beforeEach(() => {
    mockRefetch.mockClear()
  })

  it('renders blog content when loaded', () => {
    mockUseBlog.mockReturnValue({
      data: blogData,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    } as never)

    renderPage()

    expect(
      screen.getByRole('heading', { name: 'Hello World' })
    ).toBeInTheDocument()
    expect(screen.getByText('A test post')).toBeInTheDocument()
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByTestId('tiptap-renderer')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Introduction' })).toHaveAttribute(
      'href',
      '#introduction'
    )
  })

  it('shows loading skeleton while fetching', () => {
    mockUseBlog.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: mockRefetch,
    } as never)

    const { container } = renderPage()
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('shows error state with retry', async () => {
    mockUseBlog.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    } as never)

    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'button_reload' }))
    expect(mockRefetch).toHaveBeenCalled()
  })
})
