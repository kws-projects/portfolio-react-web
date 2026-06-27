import useNavbarToggle from '@/hooks/useNavbarToggle'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Navbar from '../index'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

vi.mock('@/hooks/useNavbarToggle', () => ({
  default: vi.fn(),
}))

vi.mock('@/components/layout/Header/ThemeToggle', () => ({
  default: () => <button type="button">theme</button>,
}))

vi.mock('@/components/layout/Header/LanguageSwitcher', () => ({
  default: () => <button type="button">language</button>,
}))

const mockToggle = vi.fn()
const mockUseNavbarToggle = vi.mocked(useNavbarToggle)

describe('Navbar', () => {
  beforeEach(() => {
    mockToggle.mockClear()
    mockUseNavbarToggle.mockReturnValue({
      isExpanded: true,
      toggle: mockToggle,
    })
  })

  it('renders site name and home link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'website_name' })).toHaveAttribute(
      'href',
      '/'
    )
  })

  it('renders navigation menu items from menuMap', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'nav_home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'nav_about' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'nav_works' })).toBeInTheDocument()
  })

  it('calls toggle when mobile backdrop is clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const backdrop = container.querySelector('.backdrop-blur-sm')
    expect(backdrop).toBeTruthy()
    await user.click(backdrop!)
    expect(mockToggle).toHaveBeenCalled()
  })

  it('shows theme and language controls when expanded', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(
      screen.getAllByRole('button', { name: 'theme' }).length
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByRole('button', { name: 'language' }).length
    ).toBeGreaterThan(0)
  })
})
