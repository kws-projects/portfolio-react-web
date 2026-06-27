import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Hero from '../Hero'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

vi.mock('@/hooks/usePortfolioData', () => ({
  useSiteConfig: () => ({
    data: { profileImage: 'https://example.com/profile.jpg' },
  }),
}))

vi.mock('@/components/sketches/FlowFieldSketch', () => ({
  default: () => <div data-testid="flow-sketch" />,
}))

vi.mock('@/components/ui/ContactPortal', () => ({
  default: () => <div data-testid="contact-portal" />,
}))

vi.mock('@/components/ui/TextReveal', () => ({
  default: ({ text }: { text: string }) => <span>{text}</span>,
}))

describe('Hero', () => {
  it('renders hero content and CTAs', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    )

    expect(screen.getByText('website_name')).toBeInTheDocument()
    expect(screen.getByText('home_hero_description')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /home_hero_cta_works/ })
    ).toHaveAttribute('href', '/works')
    expect(
      screen.getByRole('link', { name: 'home_hero_cta_contact' })
    ).toHaveAttribute('href', '/contact')
    expect(screen.getByAltText('Kenneth Wong')).toHaveAttribute(
      'src',
      'https://example.com/profile.jpg'
    )
    expect(screen.getByTestId('contact-portal')).toBeInTheDocument()
  })
})
