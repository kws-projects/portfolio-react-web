import { useLegal } from '@/hooks/usePortfolioData'
import type { LegalDocument } from '@/services/api/mappers'
import { mapLegal } from '@/services/api/mappers'
import { render, screen } from '@testing-library/react'

import Privacy from '../index'

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
  title: 'Privacy Policy',
  lastUpdated: '2024-06-01',
  sections: [
    { heading: 'Data', blocks: [{ type: 'text', content: 'Privacy text' }] },
  ],
}

describe('Privacy', () => {
  it('renders privacy content when loaded', () => {
    mockUseLegal.mockReturnValue({
      data: { id: '1' },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as never)
    mockMapLegal.mockReturnValue(legalDocument)

    render(<Privacy />)

    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Privacy text')).toBeInTheDocument()
    expect(mockUseLegal).toHaveBeenCalledWith('privacy-policy')
  })
})
