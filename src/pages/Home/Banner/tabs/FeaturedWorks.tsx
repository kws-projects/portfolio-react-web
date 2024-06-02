import { Link } from 'react-router-dom'
import { works } from '../../../../data/works'

const FeaturedWorks = () => {
  return (
    <div className="flex flex-col justify-center md:justify-start md:flex-row w-full h-full space-x-0 md:space-x-6 space-y-4 md:space-y-0">
      {works
        .filter(work => work.featured)
        .map(work => (
          <Link
            key={work.id}
            to={work.url}
            className="flex flex-row md:flex-col justify-start w-full h-fit md:h-full shadow-custom-neu rounded-lg bg-gray-50"
          >
            <img
              src={work.image[0]}
              alt={work.title}
              className="aspect-square rounded-l-lg h-32 md:h-max md:rounded-t-lg md:rounded-bl-none"
            />

            <div className="p-4">
              <p className="text-lg font-medium">{work.title}</p>
              <p className="pt-2">
                {work.stacks?.map((stack, i) => (
                  <span
                    key={i}
                    className="inline-block rounded-full text-sm mx-1 px-3 bg-gray-100 shadow-custom-sm"
                    style={{ paddingTop: '2px', paddingBottom: '1px' }}
                  >
                    {stack}
                  </span>
                ))}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default FeaturedWorks
