import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import BentoSection from '../BentoSection'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

vi.mock('@/hooks/useFadeInView', () => ({
  default: () => ({ ref: { current: null }, motionProps: {} }),
}))

vi.mock('@/hooks/usePortfolioData', () => ({
  useSkills: () => ({
    data: [
      {
        id: '1',
        properties: {
          title: 'React',
          image: '/react.png',
          category: 'Frontend',
        },
      },
    ],
  }),
  useExperiences: () => ({
    data: [
      {
        id: '1',
        properties: {
          title: { en: 'Company' },
          fromDate: '2023-01-01',
          toDate: null,
          subItems: [{ title: { en: 'Engineer' } }],
        },
      },
    ],
  }),
}))

vi.mock('@/services/api/mappers', () => ({
  mapSkills: () => [
    { id: 1, title: 'React', image: '/react.png', category: 'Frontend' },
  ],
  mapExperiences: () => [
    {
      id: 1,
      title: 'Company',
      fromDate: '2023-01-01',
      toDate: undefined,
      subItems: [{ title: 'Engineer' }],
    },
  ],
}))

describe('BentoSection', () => {
  it('renders bento cards with links', () => {
    render(
      <MemoryRouter>
        <BentoSection />
      </MemoryRouter>
    )

    expect(screen.getByText('home_bento_title')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /home_bento_learn_more/ })
    ).toHaveAttribute('href', '/about')
    expect(screen.getByText('Engineer')).toBeInTheDocument()
    expect(screen.getByAltText('React')).toBeInTheDocument()
  })
})
