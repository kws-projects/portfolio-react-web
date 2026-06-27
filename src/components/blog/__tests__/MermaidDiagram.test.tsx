import { render, screen, waitFor } from '@testing-library/react'

import { MermaidDiagram } from '../MermaidDiagram'

const mockRender = vi.fn()

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: (...args: unknown[]) => mockRender(...args),
  },
}))

describe('MermaidDiagram', () => {
  beforeEach(() => {
    mockRender.mockReset()
    document.documentElement.setAttribute('data-theme', 'light')
  })

  it('shows loading state before render completes', () => {
    mockRender.mockReturnValue(new Promise(() => {}))

    render(<MermaidDiagram code="graph TD; A-->B" />)

    expect(screen.getByText('Rendering diagram…')).toBeInTheDocument()
  })

  it('renders SVG when mermaid succeeds', async () => {
    mockRender.mockResolvedValue({ svg: '<svg data-testid="svg"></svg>' })

    render(<MermaidDiagram code="graph TD; A-->B" />)

    await waitFor(() => {
      expect(screen.getByTestId('svg')).toBeInTheDocument()
    })
  })

  it('shows error UI when mermaid fails', async () => {
    mockRender.mockRejectedValue(new Error('Invalid syntax'))

    render(<MermaidDiagram code="invalid" />)

    await waitFor(() => {
      expect(screen.getByText('Diagram rendering error')).toBeInTheDocument()
      expect(screen.getByText('Invalid syntax')).toBeInTheDocument()
    })
  })
})
