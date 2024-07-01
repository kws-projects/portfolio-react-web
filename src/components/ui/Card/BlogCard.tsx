import { Link } from 'react-router-dom'
import { Blog } from '../../../types/blog'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

type BlogCardProps = {
    data: Blog,
}

const BlogCard = ({ data }: BlogCardProps) => {
    dayjs.extend(localizedFormat)

    return (
        <Link
            to={`/blogs/${data.id}`}
            className={
                'aspect-square rounded-lg shadow-custom-neu bg-cover bg-no-repeat bg-center'
            }
        >
            <div className='h-full rounded-lg hover:bg-gray-50 hover:shadow-custom-neu-hover'>
                <div
                    className='h-1/2 bg-cover bg-center rounded-t-lg bg-gray-200'
                    style={{ backgroundImage: `url(${process.env.REACT_APP_PORTFOLIO_API_URL}/v1/blogs/${data.id}/thumbnail)` }}
                />
                <div className='flex flex-col justify-between h-1/2 p-6'>
                    <div>
                        <h1 className='text-xl pb-1' >{data.titleEn}</h1>
                        <p className='hidden md:flex text-sm text-gray-500'>{data.descriptionEn}</p>
                    </div>
                    
                    <span className='text-gray-500 text-sm'>{dayjs(data.createdAt).format('LL')}</span>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
