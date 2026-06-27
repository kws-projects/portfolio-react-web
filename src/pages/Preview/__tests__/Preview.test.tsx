import { usePreview } from '@/hooks/usePortfolioData'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import Preview from '../index'

const mockRefetch = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

vi.mock('@/hooks/usePortfolioData', () => ({
  usePreview: vi.fn(),
}))

const mockUsePreview = vi.mocked(usePreview)

const previewEntity = {
  id: 'entity-1',
  slug: 'draft-post',
  status: 'draft',
  properties: { title: { en: 'Draft' } },
  contents: [
    {
      id: 'content-1',
      locale: 'en',
      content: { type: 'doc', content: [] },
    },
  ],
}

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/preview/token-123']}>
      <Routes>
        <Route path="/preview/:token" element={<Preview />} />
      </Routes>
    </MemoryRouter>
  )

describe('Preview', () => {
  it('shows preview banner and entity details', () => {
    mockUsePreview.mockReturnValue({
      data: previewEntity,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    } as never)

    renderPage()

    expect(screen.getByText('Preview Mode')).toBeInTheDocument()
    expect(screen.getByText('Entity ID: entity-1')).toBeInTheDocument()
    expect(screen.getByText('Slug: draft-post')).toBeInTheDocument()
    expect(screen.getByText('en')).toBeInTheDocument()
  })

  it('shows loading skeleton while fetching', () => {
    mockUsePreview.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: mockRefetch,
    } as never)

    const { container } = renderPage()
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('shows error state with retry', async () => {
    mockUsePreview.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    } as never)

    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'button_reload' }))
    expect(mockRefetch).toHaveBeenCalled()
  })
})
