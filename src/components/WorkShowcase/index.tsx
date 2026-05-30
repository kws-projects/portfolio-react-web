import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useFadeInView from '@/hooks/useFadeInView'
import useWorkFilter from '@/hooks/useWorkFilter'
import { workCategoryLabels } from '@/constant/work'

type WorkShowcaseProps = {
  disableAnimation?: boolean
  disableFilter?: boolean
}

const WorkShowcase = ({
  disableAnimation = false,
  disableFilter = false,
}: WorkShowcaseProps) => {
  const { ref, motionProps } = useFadeInView({ disabled: disableAnimation })

  const {
    selectedCategories,
    filteredWorks,
    workCategories,
    handleCategoryChange,
  } = useWorkFilter({ disableFilter })

  return (
    <section className="w-full select-none">
      {!disableFilter && (
        <nav className="w-full">
          <ul className="flex overflow-x-scroll no-scrollbar space-x-4 px-6 md:px-1 py-1">
            {workCategories.map(workCategory => (
              <li
                key={workCategory}
                className={`px-4 py-1 rounded-md bg-gray-100 shadow-custom-sm text-sm cursor-pointer whitespace-nowrap 
                                ${selectedCategories.includes(workCategory) ? 'bg-gray-800 text-gray-100' : 'hover:bg-gray-200'}`}
                onClick={() => handleCategoryChange(workCategory)}
              >
                {workCategoryLabels[workCategory]}
              </li>
            ))}
          </ul>
        </nav>
      )}

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 sm:mt-12 px-4 md:px-0"
        ref={ref}
        {...motionProps}
      >
        {filteredWorks.map(work => (
          <Link
            key={work.id}
            to={work.url}
            className={
              'aspect-square rounded-lg shadow-custom-neu bg-cover bg-no-repeat bg-center'
            }
            style={{ backgroundImage: `url(${work.image[0]})` }}
          >
            <div className="group/card-mask flex flex-col justify-center items-center relative top-0 left-0 w-full h-full space-y-4 rounded-lg p-4 hover:bg-black hover:bg-opacity-50">
              <span className="text-2xl text-center text-gray-50 opacity-0 group-hover/card-mask:opacity-100">
                {work.title}
              </span>
              <p className="text-center text-gray-50 opacity-0 group-hover/card-mask:opacity-100">
                {work.subTitle}
              </p>
            </div>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}

export default WorkShowcase
