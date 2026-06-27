import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import NotFound from '../index'

vi.mock('@/components/sketches/NotFoundSketch', () => ({
  default: () => <div data-testid="not-found-sketch" />,
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

describe('NotFound', () => {
  it('renders 404 heading and back home link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'error_back_home' })
    ).toHaveAttribute('href', '/')
    expect(screen.getByTestId('not-found-sketch')).toBeInTheDocument()
  })
})
