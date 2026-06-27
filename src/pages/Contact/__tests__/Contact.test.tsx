import { useContact } from '@/hooks/usePortfolioData'
import { mapContact } from '@/services/api/mappers'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Contact from '../index'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

vi.mock('@/components/sketches/RandomBackgroundSketch', () => ({
  default: () => <div data-testid="bg-sketch" />,
}))

vi.mock('@/components/sketches/TerminalSketch', () => ({
  default: () => <div data-testid="terminal-sketch" />,
}))

vi.mock('@/components/ui/ContactPortal', () => ({
  default: () => <div data-testid="contact-portal" />,
}))

vi.mock('@/hooks/usePortfolioData', () => ({
  useContact: vi.fn(),
}))

vi.mock('@/services/api/mappers', () => ({
  mapContact: vi.fn(),
}))

describe('Contact', () => {
  it('renders contact info and social portal', () => {
    vi.mocked(useContact).mockReturnValue({ data: [{ id: '1' }] } as never)
    vi.mocked(mapContact).mockReturnValue({
      email: 'hello@example.com',
      tel: '+1234567890',
    })

    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    )

    expect(screen.getByText('contact_title')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /hello@example.com/ })
    ).toHaveAttribute('href', 'mailto:hello@example.com')
    expect(screen.getByRole('link', { name: /\+1234567890/ })).toHaveAttribute(
      'href',
      'tel:+1234567890'
    )
    expect(screen.getByTestId('contact-portal')).toBeInTheDocument()
    expect(screen.getByTestId('terminal-sketch')).toBeInTheDocument()
  })
})
