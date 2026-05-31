import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import InteractiveTerminal from '../index'

describe('InteractiveTerminal', () => {
  const renderComponent = (onClose?: () => void) =>
    render(
      <MemoryRouter>
        <InteractiveTerminal onClose={onClose} />
      </MemoryRouter>
    )

  it('renders welcome message', () => {
    renderComponent()
    expect(
      screen.getByText("Welcome to Kenneth Wong's portfolio.")
    ).toBeInTheDocument()
  })

  it('renders the input prompt', () => {
    renderComponent()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the close button', () => {
    renderComponent()
    expect(screen.getByLabelText('Close terminal')).toBeInTheDocument()
  })

  it('shows help output when help command is entered', async () => {
    const user = userEvent.setup()
    renderComponent()

    const input = screen.getByRole('textbox')
    await user.type(input, 'help{Enter}')

    expect(screen.getByText('Available commands:')).toBeInTheDocument()
  })

  it('shows whoami output', async () => {
    const user = userEvent.setup()
    renderComponent()

    const input = screen.getByRole('textbox')
    await user.type(input, 'whoami{Enter}')

    expect(screen.getByText('Kenneth Wong')).toBeInTheDocument()
  })

  it('shows error for unknown command', async () => {
    const user = userEvent.setup()
    renderComponent()

    const input = screen.getByRole('textbox')
    await user.type(input, 'foobar{Enter}')

    expect(screen.getByText('command not found: foobar')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    renderComponent(onClose)

    await user.click(screen.getByLabelText('Close terminal'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose on exit command', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    renderComponent(onClose)

    const input = screen.getByRole('textbox')
    await user.type(input, 'exit{Enter}')

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('clears terminal on clear command', async () => {
    const user = userEvent.setup()
    renderComponent()

    const input = screen.getByRole('textbox')
    await user.type(input, 'clear{Enter}')

    expect(
      screen.queryByText("Welcome to Kenneth Wong's portfolio.")
    ).not.toBeInTheDocument()
  })

  it('echoes text back', async () => {
    const user = userEvent.setup()
    renderComponent()

    const input = screen.getByRole('textbox')
    await user.type(input, 'echo hello world{Enter}')

    expect(screen.getByText('hello world')).toBeInTheDocument()
  })
})
