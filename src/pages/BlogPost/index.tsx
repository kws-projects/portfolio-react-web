import { useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import PageTitleSketch from "../../components/sketches/PageTitleSketch"
import BlogNodeBlock from "../../components/ui/Block/BlogNodeBlock"
import { blogsAPI } from "../../services/portfolioSvc/blogsAPI"
import { BlogNode } from '../../types/blog'

const BlogPost = () => {
  const { blogId } = useParams()

  const { data: blog, isLoading: isLoadingBlog } = useQuery({
    queryKey: ['blog'],
    queryFn: () => blogsAPI.getBlogPost(Number(blogId)),
  })

  return (
    <main>
      <PageTitleSketch title={blog?.blog.titleEn} />

      {isLoadingBlog ? <></> : null}
      
      {!isLoadingBlog && blog?.nodes.length >= 1 ?
        <div className="self-center w-full max-w-screen-lg mb-24">
          {blog.nodes.map((node: BlogNode) => (
            <BlogNodeBlock
              key={node.id}
              data={node}
            />
          ))}
        </div>
      : null}
    </main>
  )
}

export default BlogPost
