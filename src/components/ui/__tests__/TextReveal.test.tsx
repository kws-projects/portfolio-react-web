import { render, screen, act } from '@testing-library/react'
import TextReveal from '../TextReveal'

describe('TextReveal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders a span element', () => {
    render(<TextReveal text="Hello" />)
    expect(
      screen.getByText((_, el) => el?.tagName === 'SPAN')
    ).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<TextReveal text="Hello" className="custom-class" />)
    const span = screen.getByText((_, el) => el?.tagName === 'SPAN')
    expect(span).toHaveClass('custom-class')
  })

  it('starts animating after delay', () => {
    render(<TextReveal text="Hello World" delay={0} speed={10} />)

    act(() => {
      vi.advanceTimersByTime(100)
    })

    const span = screen.getByText((_, el) => el?.tagName === 'SPAN')
    expect(span.textContent).toHaveLength('Hello World'.length)
  })

  it('shows placeholder before delay elapses', () => {
    render(<TextReveal text="Hello" delay={500} />)
    const span = screen.getByText((_, el) => el?.tagName === 'SPAN')
    expect(span).toBeInTheDocument()
  })
})
