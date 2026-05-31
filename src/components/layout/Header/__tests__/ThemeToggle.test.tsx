import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from '../ThemeToggle'

const mockToggle = vi.fn()

vi.mock('@/hooks/useTheme', () => ({
  default: () => ({ theme: 'light', toggle: mockToggle }),
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockToggle.mockClear()
  })

  it('renders a button with accessible label', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label')
  })

  it('calls toggle on click', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button'))
    expect(mockToggle).toHaveBeenCalledOnce()
  })

  it('shows correct aria-label for light mode', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark mode'
    )
  })
})
