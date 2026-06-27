import { render, screen } from '@testing-library/react'
import type { NodeViewProps } from '@tiptap/react'

import { MermaidCodeBlockView } from '../MermaidCodeBlock'

vi.mock('../MermaidDiagram', () => ({
  MermaidDiagram: ({ code }: { code: string }) => (
    <div data-testid="mermaid-diagram">{code}</div>
  ),
}))

vi.mock('@tiptap/react', () => ({
  NodeViewWrapper: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => <pre className={className}>{children}</pre>,
  NodeViewContent: () => <code>source</code>,
}))

const createProps = (language: string, textContent: string): NodeViewProps =>
  ({
    node: {
      attrs: { language },
      textContent,
    },
  }) as unknown as NodeViewProps

describe('MermaidCodeBlockView', () => {
  it('renders MermaidDiagram for mermaid language blocks', () => {
    render(
      <MermaidCodeBlockView {...createProps('mermaid', 'graph TD; A-->B')} />
    )

    expect(screen.getByTestId('mermaid-diagram')).toHaveTextContent(
      'graph TD; A-->B'
    )
  })

  it('renders a pre block for non-mermaid languages', () => {
    const { container } = render(
      <MermaidCodeBlockView {...createProps('typescript', 'const x = 1')} />
    )

    expect(container.querySelector('pre.language-typescript')).toBeTruthy()
    expect(screen.queryByTestId('mermaid-diagram')).not.toBeInTheDocument()
  })
})
