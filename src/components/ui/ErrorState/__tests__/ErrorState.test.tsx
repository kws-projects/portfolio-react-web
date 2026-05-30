import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorState from '../index'

describe('ErrorState', () => {
  it('renders the error message', () => {
    render(<ErrorState message="Something went wrong" />)
    expect(
      screen.getByRole('heading', { name: 'Something went wrong' })
    ).toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    render(<ErrorState message="Error" onRetry={() => {}} />)
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument()
  })

  it('does not render retry button when onRetry is omitted', () => {
    render(<ErrorState message="Error" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', async () => {
    const handleRetry = vi.fn()
    const user = userEvent.setup()

    render(<ErrorState message="Error" onRetry={handleRetry} />)
    await user.click(screen.getByRole('button', { name: 'Reload' }))

    expect(handleRetry).toHaveBeenCalledOnce()
  })

  it('uses custom retry label', () => {
    render(
      <ErrorState message="Error" onRetry={() => {}} retryLabel="Try again" />
    )
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument()
  })
})
