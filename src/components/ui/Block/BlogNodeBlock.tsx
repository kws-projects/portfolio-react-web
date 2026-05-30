import { BlogNode, BlogNodeType } from '@/types/blog'
import useBlogNode from '@/hooks/useBlogNode'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DOMPurify from 'dompurify'
import CodeEditor from '@/components/ui/CodeEditor'

type BlogNodeBlockProps = {
  data: BlogNode
}

export const Skeleton = () => (
  <div className="flex flex-col mt-12 animate-pulse">
    <div className="h-44 w-full bg-skeleton rounded-xl" />
  </div>
)

export const BlogNodeBlock = ({ data }: BlogNodeBlockProps) => {
  const { node, isLoading, isError, codeBlock } = useBlogNode(data)

  if (isError) return null
  if (isLoading) return <Skeleton />

  switch (data.type) {
    case BlogNodeType.MD:
      return (
        <div className="md">
          <Markdown remarkPlugins={[remarkGfm]}>{node}</Markdown>
        </div>
      )

    case BlogNodeType.HTML:
      return (
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node) }} />
      )

    case BlogNodeType.CODE:
      return (
        <div
          className="py-3 px-1 border border-border/10 rounded-xl bg-surface-code"
          style={{ height: `${codeBlock?.editorHeight}px` }}
        >
          <CodeEditor
            language={codeBlock?.language ?? 'markdown'}
            value={codeBlock?.code ?? ''}
            readOnly={true}
          />
        </div>
      )

    case BlogNodeType.Image:
      return (
        <img
          src={`data:image/jpeg;base64,${node}`}
          alt="node"
          className="rounded-xl"
        />
      )

    default:
      return null
  }
}
