import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import PageMeta from '../PageMeta'

vi.mock('@/hooks/useScrollToTop', () => ({ default: vi.fn() }))
vi.mock('@/hooks/usePageTitle', () => ({ default: vi.fn() }))

describe('PageMeta', () => {
  const renderComponent = (props: {
    title: string
    description: string
    robots?: string
    canonicalUrl?: string
  }) =>
    render(
      <HelmetProvider>
        <PageMeta {...props} />
      </HelmetProvider>
    )

  it('renders without crashing', () => {
    const { container } = renderComponent({
      title: 'Test Page',
      description: 'A test description',
    })
    expect(container).toBeDefined()
  })

  it('accepts optional robots prop', () => {
    const { container } = renderComponent({
      title: 'Test',
      description: 'Desc',
      robots: 'noindex, nofollow',
    })
    expect(container).toBeDefined()
  })

  it('accepts optional canonicalUrl prop', () => {
    const { container } = renderComponent({
      title: 'Test',
      description: 'Desc',
      canonicalUrl: 'https://example.com',
    })
    expect(container).toBeDefined()
  })
})
