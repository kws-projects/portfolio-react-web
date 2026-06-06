import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'

import { MermaidDiagram } from './MermaidDiagram'

export function MermaidCodeBlockView({ node }: NodeViewProps) {
  const language = node.attrs.language as string | undefined
  const code = node.textContent

  if (language === 'mermaid') {
    return (
      <NodeViewWrapper>
        <MermaidDiagram code={code} />
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper as="pre" className={`language-${language ?? ''}`}>
      <NodeViewContent />
    </NodeViewWrapper>
  )
}
