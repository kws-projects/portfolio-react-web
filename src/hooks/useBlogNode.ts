import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BlogNode, BlogNodeType } from '@/types/blog'
import { blogsAPI } from '@/services/portfolioSvc/blogsAPI'

const useBlogNode = (data: BlogNode) => {
  const {
    data: node,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blog-node', data.blogId, data.id],
    queryFn: () => blogsAPI.getBlogNode(Number(data.blogId), Number(data.id)),
  })

  const codeBlock = useMemo(() => {
    if (data?.type !== BlogNodeType.CODE || !node) return null

    const lines = node.split('\n')
    return {
      language: lines[0] || 'markdown',
      editorHeight: lines[1] || 0,
      code: lines.slice(2).join('\n'),
    }
  }, [data.type, node])

  return { node, isLoading, isError, codeBlock }
}

export default useBlogNode
