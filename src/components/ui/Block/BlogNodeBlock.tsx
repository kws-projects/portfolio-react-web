import { ReactNode } from 'react'
import { BlogNode, BlogNodeType } from '@/types/blog'
import useBlogNode from '@/hooks/useBlogNode'
import Markdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DOMPurify from 'dompurify'
import CodeEditor from '@/components/ui/CodeEditor'

type BlogNodeBlockProps = {
  data: BlogNode
}

export const Skeleton = () => (
  <div className="flex flex-col gap-4 animate-pulse">
    <div className="h-4 w-full bg-skeleton rounded" />
    <div className="h-4 w-11/12 bg-skeleton rounded" />
    <div className="h-4 w-4/5 bg-skeleton rounded" />
    <div className="h-40 w-full bg-skeleton rounded-xl mt-4" />
    <div className="h-4 w-full bg-skeleton rounded mt-4" />
    <div className="h-4 w-9/12 bg-skeleton rounded" />
  </div>
)

const FencedCodeBlock = ({
  language,
  code,
}: {
  language: string
  code: string
}) => {
  const lineCount = code.split('\n').length
  const editorHeight = Math.max(lineCount * 20 + 16, 60)

  return (
    <div className="rounded-xl border border-border/10 bg-surface-code overflow-hidden my-4">
      <div className="flex items-center px-4 py-2 border-b border-border/6 bg-surface-code">
        <span className="text-xs text-tertiary font-mono">{language}</span>
      </div>
      <div style={{ height: `${editorHeight}px` }}>
        <CodeEditor language={language} value={code} readOnly={true} />
      </div>
    </div>
  )
}

const markdownComponents: Components = {
  pre({ children }) {
    return <>{children}</>
  },
  code({ className, children, node }) {
    const isBlock = node?.position && String(children).includes('\n')
    const match = /language-(\w+)/.exec(className || '')
    const code = String(children).replace(/\n$/, '')

    if (match || isBlock) {
      return (
        <FencedCodeBlock language={match?.[1] ?? 'plaintext'} code={code} />
      )
    }

    return <code className={className}>{children as ReactNode}</code>
  },
}

export const BlogNodeBlock = ({ data }: BlogNodeBlockProps) => {
  const { node, isLoading, isError, codeBlock } = useBlogNode(data)

  if (isError) return null
  if (isLoading) return <Skeleton />

  switch (data.type) {
    case BlogNodeType.MD:
      return (
        <div className="md">
          <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {node}
          </Markdown>
        </div>
      )

    case BlogNodeType.HTML:
      return (
        <div
          className="md"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node) }}
        />
      )

    case BlogNodeType.CODE:
      return (
        <FencedCodeBlock
          language={codeBlock?.language ?? 'markdown'}
          code={codeBlock?.code ?? ''}
        />
      )

    case BlogNodeType.Image:
      return (
        <figure>
          <img
            src={`data:image/jpeg;base64,${node}`}
            alt="blog content"
            className="rounded-xl w-full"
          />
        </figure>
      )

    default:
      return null
  }
}
