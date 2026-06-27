import {
  useCertifications,
  useEducations,
  useExperiences,
  useSiteConfig,
  useSkills,
} from '@/hooks/usePortfolioData'
import { render, screen } from '@testing-library/react'

import About from '../index'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

vi.mock('@/hooks/useFadeInView', () => ({
  default: () => ({ ref: { current: null }, motionProps: {} }),
}))

vi.mock('@/components/ui/ContactPortal', () => ({
  default: () => <div data-testid="contact-portal" />,
}))

vi.mock('@/hooks/usePortfolioData', () => ({
  useSkills: vi.fn(),
  useExperiences: vi.fn(),
  useEducations: vi.fn(),
  useCertifications: vi.fn(),
  useSiteConfig: vi.fn(),
}))

vi.mock('@/services/api/mappers', () => ({
  mapSkills: vi.fn(() => [
    { id: 1, title: 'React', image: '/react.png', category: 'Frontend' },
  ]),
  mapExperiences: vi.fn(() => [
    { id: 1, title: 'Engineer', fromDate: '2020-01-01' },
  ]),
  mapCertifications: vi.fn(() => []),
  mapEducations: vi.fn(() => []),
}))

const loaded = {
  data: [{ id: '1' }],
  isLoading: false,
  isError: false,
  refetch: vi.fn(),
}

describe('About', () => {
  beforeEach(() => {
    vi.mocked(useSkills).mockReturnValue(loaded as never)
    vi.mocked(useExperiences).mockReturnValue(loaded as never)
    vi.mocked(useEducations).mockReturnValue(loaded as never)
    vi.mocked(useCertifications).mockReturnValue(loaded as never)
    vi.mocked(useSiteConfig).mockReturnValue({
      data: { profileImage: '/profile.png' },
    } as never)
  })

  it('renders intro and section headings', () => {
    render(<About />)

    expect(screen.getByText('about_self_intro_heading')).toBeInTheDocument()
    expect(screen.getByText('about_skills_title')).toBeInTheDocument()
    expect(
      screen.getByText('about_cv_work_experience_title')
    ).toBeInTheDocument()
    expect(screen.getByAltText('Profile')).toHaveAttribute(
      'src',
      '/profile.png'
    )
    expect(screen.getByTestId('contact-portal')).toBeInTheDocument()
  })

  it('shows error state when skills fail to load', () => {
    vi.mocked(useSkills).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: vi.fn(),
    } as never)

    render(<About />)
    expect(screen.getByText('error_loading_data')).toBeInTheDocument()
  })

  it('shows loading skeleton for skills', () => {
    vi.mocked(useSkills).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    } as never)

    const { container } = render(<About />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })
})
