import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import ContactPortal from '../index'

vi.mock('@/lib/analytics', () => ({
  analytics: { track: vi.fn() },
}))

vi.mock('@/hooks/usePortfolioData', () => ({
  useSocialLinks: () => ({
    data: [
      {
        id: 'link-1',
        slug: 'linkedin',
        status: 'PUBLISHED',
        sortOrder: 0,
        properties: {
          label: 'LinkedIn',
          url: 'https://linkedin.com/in/test',
          icon: 'linkedin',
          isInternal: false,
        },
        publishedAt: '2024-01-01',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      {
        id: 'link-2',
        slug: 'github',
        status: 'PUBLISHED',
        sortOrder: 1,
        properties: {
          label: 'GitHub',
          url: 'https://github.com/test',
          icon: 'github',
          isInternal: false,
        },
        publishedAt: '2024-01-01',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
    ],
    isLoading: false,
    isError: false,
  }),
}))

describe('ContactPortal', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ContactPortal />
      </MemoryRouter>
    )

  it('renders social links', () => {
    renderComponent()
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('each link has an aria-label', () => {
    renderComponent()
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('aria-label')
    })
  })

  it('external links open in new tab', () => {
    renderComponent()
    const links = screen.getAllByRole('link')
    const externalLinks = links.filter(
      l => l.getAttribute('target') === '_blank'
    )
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })
})
