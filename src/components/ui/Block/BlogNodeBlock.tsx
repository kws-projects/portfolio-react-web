import { useQuery } from '@tanstack/react-query'
import { BlogNode, BlogNodeType } from "../../../types/blog"
import { blogsAPI } from "../../../services/portfolioSvc/blogsAPI"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type BlogNodeBlockProps = {
    data: BlogNode
}

const BlogNodeBlock = ({ data }: BlogNodeBlockProps) => {
    const { data: node, isLoading: isLoadingNode } = useQuery({
        queryKey: [`blog-node-${data.blogId}-${data.id}`],
        queryFn: () => blogsAPI.getBlogNode(Number(data.blogId), Number(data.id)),
    })

    return (
        <>
            {isLoadingNode ? <></> : null}

            {!isLoadingNode ?
                <div className={`${data.type === BlogNodeType.MD ? 'md ' : ''}mt-12`}>
                    {data.type === BlogNodeType.MD ?
                        <Markdown remarkPlugins={[remarkGfm]}>{node}</Markdown>
                    : null}

                    {data.type === BlogNodeType.HTML ?
                        <div dangerouslySetInnerHTML={{  __html: node }} />
                    : null}

                    {data.type === BlogNodeType.Image ?
                        <img src={`data:image/jpeg;base64,${node}`} alt={'node'} />
                    : null}

                    {data.type === BlogNodeType.P5Sketch ?
                        <div>This is a P5 sketch.</div>
                    : null}
                </div>
            : null}
        </>
    )
}

export default BlogNodeBlock
