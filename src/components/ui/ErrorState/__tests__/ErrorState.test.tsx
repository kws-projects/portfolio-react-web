import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ErrorState from '../index'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

describe('ErrorState', () => {
  it('renders the error message', () => {
    render(<ErrorState message="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders default message from i18n key when no message provided', () => {
    render(<ErrorState />)
    expect(screen.getByText('error_loading_data')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<ErrorState />)
    expect(screen.getByText('error_loading_data_subtitle')).toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    render(<ErrorState message="Error" onRetry={() => {}} />)
    expect(
      screen.getByRole('button', { name: 'button_reload' })
    ).toBeInTheDocument()
  })

  it('does not render retry button when onRetry is omitted', () => {
    render(<ErrorState message="Error" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', async () => {
    const handleRetry = vi.fn()
    const user = userEvent.setup()

    render(<ErrorState message="Error" onRetry={handleRetry} />)
    await user.click(screen.getByRole('button', { name: 'button_reload' }))

    expect(handleRetry).toHaveBeenCalledOnce()
  })
})
