import { render, screen } from '@testing-library/react'
import { BlogNodeBlock, Skeleton } from '../BlogNodeBlock'
import { BlogNodeType } from '@/types/blog'

vi.mock('@/hooks/useBlogNode', () => ({
  default: (data: { type: string }) => {
    if (data.type === 'MD') {
      return {
        node: '**Bold text**',
        isLoading: false,
        isError: false,
        codeBlock: null,
      }
    }
    if (data.type === 'HTML') {
      return {
        node: '<p>HTML content</p>',
        isLoading: false,
        isError: false,
        codeBlock: null,
      }
    }
    if (data.type === 'CODE') {
      return {
        node: '',
        isLoading: false,
        isError: false,
        codeBlock: { language: 'js', code: 'const x = 1' },
      }
    }
    if (data.type === 'LOADING') {
      return { node: '', isLoading: true, isError: false, codeBlock: null }
    }
    if (data.type === 'ERROR') {
      return { node: '', isLoading: false, isError: true, codeBlock: null }
    }
    return { node: '', isLoading: false, isError: false, codeBlock: null }
  },
}))

vi.mock('@/components/ui/CodeEditor', () => ({
  default: ({ value }: { value: string }) => (
    <div data-testid="code-editor">{value}</div>
  ),
}))

describe('BlogNodeBlock', () => {
  it('renders markdown content', () => {
    render(<BlogNodeBlock data={{ id: '1', type: BlogNodeType.MD }} />)
    expect(screen.getByText('Bold text')).toBeInTheDocument()
  })

  it('renders HTML content', () => {
    render(<BlogNodeBlock data={{ id: '2', type: BlogNodeType.HTML }} />)
    expect(screen.getByText('HTML content')).toBeInTheDocument()
  })

  it('renders code block', () => {
    render(<BlogNodeBlock data={{ id: '3', type: BlogNodeType.CODE }} />)
    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('returns null on error', () => {
    const { container } = render(
      <BlogNodeBlock data={{ id: '4', type: 'ERROR' as BlogNodeType }} />
    )
    expect(container.firstChild).toBeNull()
  })
})

describe('BlogNodeBlock Skeleton', () => {
  it('renders skeleton loader', () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })
})
