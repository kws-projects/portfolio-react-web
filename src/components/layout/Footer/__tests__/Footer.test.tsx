import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from '../index'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

vi.mock('@/components/ui/ContactPortal', () => ({
  default: () => <div data-testid="contact-portal" />,
}))

vi.mock('../Version', () => ({
  default: () => <div data-testid="version" />,
}))

describe('Footer', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

  it('renders a footer element', () => {
    renderComponent()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the website name link', () => {
    renderComponent()
    expect(screen.getByText('website_name')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderComponent()
    expect(screen.getByText('contact_title')).toBeInTheDocument()
    expect(screen.getByText('terms_title_short')).toBeInTheDocument()
    expect(screen.getByText('privacy_title')).toBeInTheDocument()
  })

  it('renders the contact portal', () => {
    renderComponent()
    expect(screen.getAllByTestId('contact-portal').length).toBeGreaterThan(0)
  })
})
