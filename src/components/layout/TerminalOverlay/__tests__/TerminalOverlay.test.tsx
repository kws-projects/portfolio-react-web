import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import TerminalOverlay from '../index'

vi.mock('../InteractiveTerminal', () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="interactive-terminal">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}))

describe('TerminalOverlay', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <TerminalOverlay />
      </MemoryRouter>
    )

  it('renders the trigger button', () => {
    renderComponent()
    expect(screen.getByLabelText('Open terminal')).toBeInTheDocument()
  })

  it('does not show terminal initially', () => {
    renderComponent()
    expect(screen.queryByTestId('interactive-terminal')).not.toBeInTheDocument()
  })

  it('opens terminal when trigger is clicked', async () => {
    const user = userEvent.setup()
    renderComponent()

    await user.click(screen.getByLabelText('Open terminal'))
    expect(screen.getByTestId('interactive-terminal')).toBeInTheDocument()
  })

  it('shows keyboard shortcut hint', () => {
    renderComponent()
    expect(screen.getByText(/K/)).toBeInTheDocument()
  })
})
