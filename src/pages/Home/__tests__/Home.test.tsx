import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Home from '../index'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

vi.mock('../Hero', () => ({
  default: () => <div data-testid="hero" />,
}))

vi.mock('../BentoSection', () => ({
  default: () => <div data-testid="bento" />,
}))

vi.mock('../FeaturedSection', () => ({
  default: () => <div data-testid="featured" />,
}))

describe('Home', () => {
  it('renders hero, bento, and featured sections', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('bento')).toBeInTheDocument()
    expect(screen.getByTestId('featured')).toBeInTheDocument()
  })
})
