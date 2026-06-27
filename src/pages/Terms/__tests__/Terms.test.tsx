import { useLegal } from '@/hooks/usePortfolioData'
import type { LegalDocument } from '@/services/api/mappers'
import { mapLegal } from '@/services/api/mappers'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Terms from '../index'

const mockRefetch = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

vi.mock('@/hooks/usePortfolioData', () => ({
  useLegal: vi.fn(),
}))

vi.mock('@/services/api/mappers', () => ({
  mapLegal: vi.fn(),
}))

vi.mock('@/hooks/useFadeInView', () => ({
  default: () => ({ ref: { current: null }, motionProps: {} }),
}))

const mockUseLegal = vi.mocked(useLegal)
const mockMapLegal = vi.mocked(mapLegal)

const legalDocument: LegalDocument = {
  title: 'Terms and Conditions',
  lastUpdated: '2024-01-01',
  sections: [
    { heading: 'Intro', blocks: [{ type: 'text', content: 'Terms text' }] },
  ],
}

describe('Terms', () => {
  beforeEach(() => {
    mockRefetch.mockClear()
  })

  it('shows loading skeleton while fetching', () => {
    mockUseLegal.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: mockRefetch,
    } as never)

    const { container } = render(<Terms />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('shows error state with retry', async () => {
    mockUseLegal.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    } as never)

    const user = userEvent.setup()
    render(<Terms />)

    await user.click(screen.getByRole('button', { name: 'button_reload' }))
    expect(mockRefetch).toHaveBeenCalled()
  })

  it('renders legal content when loaded', () => {
    mockUseLegal.mockReturnValue({
      data: { id: '1' },
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    } as never)
    mockMapLegal.mockReturnValue(legalDocument)

    render(<Terms />)

    expect(screen.getByText('Terms and Conditions')).toBeInTheDocument()
    expect(screen.getByText('Terms text')).toBeInTheDocument()
    expect(mockUseLegal).toHaveBeenCalledWith('terms-and-conditions')
  })
})
