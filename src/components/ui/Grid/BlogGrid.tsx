import BlogCard from '../Card/BlogCard'
import { BlogType } from '../../../types/blog'

type BlogGridProps = {
    data: BlogType[],
    isLoading: boolean,
}

const BlogGrid = ({ data, isLoading }: BlogGridProps) => {
    return (
        <>
        {isLoading
            ? <></>
            : <div className='self-center max-w-screen-xl w-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 lg-12 mt-8 sm:mt-12 px-4 md:px-8'>
                {data.map(blog => (
                    <BlogCard
                        key={blog.id}
                        data={blog}
                    />
                ))}
            </div>
        }
        </>
    )
}

export default BlogGrid