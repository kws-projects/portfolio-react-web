import { useQuery } from '@tanstack/react-query'
import { BlogNode, BlogNodeType } from 'types/blog'
import { blogsAPI } from 'services/portfolioSvc/blogsAPI'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DOMPurify from 'dompurify'
import CodeEditor from 'components/ui/CodeEditor'
import { useMemo } from 'react'

type BlogNodeBlockProps = {
  data: BlogNode
}

export const Skeleton = () => (
  <div className="flex flex-col mt-12 animate-pulse">
    <div className="h-44 w-full bg-gray-200 rounded-sm"></div>
  </div>
)

export const BlogNodeBlock = ({ data }: BlogNodeBlockProps) => {
  const {
    data: node,
    isLoading: isLoadingNode,
    isError: isErrorNode,
  } = useQuery({
    queryKey: ['blog-node', data.blogId, data.id],
    queryFn: () => blogsAPI.getBlogNode(Number(data.blogId), Number(data.id)),
  })

  const { language, editorHeight, code } = useMemo(() => {
    let language = 'markdown'
    let code = ''
    let editorHeight = 0

    if (data?.type === BlogNodeType.CODE) {
      const lines = node?.split('\n')
      language = lines ? lines[0] : language
      editorHeight = lines ? lines[1] : editorHeight
      code = lines ? lines.slice(2).join('\n') : code
    }

    return { language, editorHeight, code }
  }, [data.type, node])

  return (
    <>
      {!isErrorNode ? (
        <>
          {isLoadingNode && <Skeleton />}

          {!isLoadingNode && data.type === BlogNodeType.MD && (
            <div className={'md mt-12'}>
              {data.type === BlogNodeType.MD ? (
                <Markdown remarkPlugins={[remarkGfm]}>{node}</Markdown>
              ) : null}
            </div>
          )}

          {!isLoadingNode && data.type === BlogNodeType.HTML && (
            <div className={'mt-12'}>
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node) }}
              />
            </div>
          )}

          {!isLoadingNode && data.type === BlogNodeType.CODE && (
            <div className={'mt-12'}>
              <div
                className="py-3 px-1 border-2 rounded-md border-solid border-gray-300"
                style={{
                  backgroundColor: '#ededed',
                  height: `${editorHeight}px`,
                }}
              >
                <CodeEditor language={language} value={code} readOnly={true} />
              </div>
            </div>
          )}

          {!isLoadingNode && data.type === BlogNodeType.Image && (
            <div className={'mt-12'}>
              <img src={`data:image/jpeg;base64,${node}`} alt={'node'} />
            </div>
          )}
        </>
      ) : null}
    </>
  )
}
