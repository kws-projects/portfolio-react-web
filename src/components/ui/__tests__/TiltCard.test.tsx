import { render, screen, fireEvent } from '@testing-library/react'
import TiltCard from '../TiltCard'

describe('TiltCard', () => {
  it('renders children', () => {
    render(<TiltCard>Card content</TiltCard>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <TiltCard className="my-class">Content</TiltCard>
    )
    expect(container.firstChild).toHaveClass('my-class')
  })

  it('passes style prop to the element', () => {
    const { container } = render(
      <TiltCard style={{ color: 'red' }}>Content</TiltCard>
    )
    const el = container.firstChild as HTMLElement
    expect(el.style.color).toBe('red')
  })

  it('resets transform on mouse leave', () => {
    const { container } = render(<TiltCard>Content</TiltCard>)
    const card = container.firstChild as HTMLElement

    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 })
    fireEvent.mouseLeave(card)

    expect(card.style.transform).toBe('')
  })
})
