import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../index'

vi.mock('../Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}))

describe('Header', () => {
  it('renders a header element', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the Navbar', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })
})
