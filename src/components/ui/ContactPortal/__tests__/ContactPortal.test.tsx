import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import ContactPortal from '../index'

vi.mock('@/lib/analytics', () => ({
  analytics: { track: vi.fn() },
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
