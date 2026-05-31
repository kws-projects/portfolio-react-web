import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Layout from '../index'

vi.mock('../Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}))

vi.mock('../Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

vi.mock('../TerminalOverlay', () => ({
  default: () => <div data-testid="terminal-overlay" />,
}))

describe('Layout', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    )

  it('renders the Header', () => {
    renderComponent()
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renders the Footer', () => {
    renderComponent()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders the TerminalOverlay', () => {
    renderComponent()
    expect(screen.getByTestId('terminal-overlay')).toBeInTheDocument()
  })
})
