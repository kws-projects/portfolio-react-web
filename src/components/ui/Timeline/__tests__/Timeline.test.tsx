import { render, screen } from '@testing-library/react'
import { TimelineList } from '../index'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

const mockItems = [
  {
    id: 1,
    title: 'First Job',
    subTitle: 'Company A',
    fromDate: '2022-01-01',
    toDate: '2023-01-01',
  },
  {
    id: 2,
    title: 'Second Job',
    subTitle: 'Company B',
    fromDate: '2023-02-01',
  },
]

describe('TimelineList', () => {
  it('renders all timeline items', () => {
    render(<TimelineList items={mockItems} />)
    expect(screen.getByText('First Job')).toBeInTheDocument()
    expect(screen.getByText('Second Job')).toBeInTheDocument()
  })

  it('renders subtitles', () => {
    render(<TimelineList items={mockItems} />)
    expect(screen.getByText('Company A')).toBeInTheDocument()
    expect(screen.getByText('Company B')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <TimelineList items={mockItems} className="custom" />
    )
    expect(container.firstChild).toHaveClass('custom')
  })

  it('renders children after items', () => {
    render(
      <TimelineList items={mockItems}>
        <div>Extra content</div>
      </TimelineList>
    )
    expect(screen.getByText('Extra content')).toBeInTheDocument()
  })

  it('renders with empty items array', () => {
    const { container } = render(<TimelineList items={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
