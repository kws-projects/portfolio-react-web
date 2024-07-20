import BlogCard from '../Card/BlogCard'
import { Blog } from '../../../types/blog'

type BlogGridProps = {
    data: Blog[],
    isLoading: boolean,
    isError: boolean,
}

const BlogGrid = ({ data, isLoading, isError }: BlogGridProps) => {
    return (
        <>
            {isLoading ? <></> : null}
            {isError ? <></> : null}

            {!isLoading && !isError ?
                <div className='self-center max-w-screen-xl w-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 lg-12 mt-8 sm:mt-12 px-4 md:px-8'>
                    {data.map(blog => (
                        <BlogCard
                            key={blog.id}
                            data={blog}
                        />
                    ))}
                </div>
            : null}
        </>
    )
}

export default BlogGrid
