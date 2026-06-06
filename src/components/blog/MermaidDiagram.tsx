import { isDarkTheme } from '@/utils/theme'
import mermaid from 'mermaid'
import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  code: string
  className?: string
}

export function MermaidDiagram({ code, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const dark = isDarkTheme()
    mermaid.initialize({
      startOnLoad: false,
      theme: dark ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
    })

    const id = `mermaid-${crypto.randomUUID().slice(0, 8)}`

    mermaid
      .render(id, code.trim())
      .then(({ svg: renderedSvg }) => {
        setSvg(renderedSvg)
        setError('')
      })
      .catch((err: Error) => {
        setError(err.message || 'Failed to render diagram')
        setSvg('')
      })
  }, [code])

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
        <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
          Diagram rendering error
        </p>
        <pre className="text-xs text-red-500 dark:text-red-400 whitespace-pre-wrap">
          {error}
        </pre>
        <details className="mt-3">
          <summary className="text-xs text-red-400 cursor-pointer">
            Show source
          </summary>
          <pre className="mt-2 text-xs bg-red-100 dark:bg-red-950/50 rounded p-2 overflow-x-auto">
            {code}
          </pre>
        </details>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="my-6 flex items-center justify-center h-32 rounded-xl bg-surface border border-ui">
        <span className="text-sm text-tertiary animate-pulse">
          Rendering diagram…
        </span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-diagram my-6 flex justify-center overflow-x-auto ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
