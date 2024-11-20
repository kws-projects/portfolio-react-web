import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, useInView, useAnimation } from 'framer-motion'
import { EnumValues } from 'enum-values'
import { parse, stringify } from 'qs'
import { getWorkCategoryLabel, WorkCategory } from 'constant/work'
import { works } from 'data/works'

type WorkShowcaseProps = {
  disableAnimation?: boolean
  disableFilter?: boolean
}

const WorkShowcase = ({
  disableAnimation = false,
  disableFilter = false,
}: WorkShowcaseProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const fadeInControl = useAnimation()

  useEffect(() => {
    if (isInView) {
      fadeInControl.start('visible')
    }
  }, [fadeInControl, isInView])

  const workCategories = EnumValues.getValues(WorkCategory) as WorkCategory[]

  const navigate = useNavigate()
  const { search, pathname } = useLocation()
  const initialSearch = useMemo(() => {
    const queryCategory = parse(search, { ignoreQueryPrefix: true })
      ?.category as WorkCategory[]
    const isValidCategory =
      Array.isArray(queryCategory) &&
      queryCategory.filter(cat => workCategories.includes(cat)).length > 0
    return isValidCategory ? queryCategory : [WorkCategory.ALL]
  }, [search, workCategories])

  const [selectedCategories, setSelectedCategories] =
    useState<WorkCategory[]>(initialSearch)
  const [filter, setFilter] = useState<WorkCategory[]>(initialSearch)

  useEffect(() => {
    if (!disableFilter) setFilter(selectedCategories)
  }, [disableFilter, selectedCategories])

  useEffect(() => {
    if (!disableFilter) {
      navigate(
        {
          pathname,
          search: `?${stringify({
            ...{ category: filter },
          })}`,
        },
        { replace: true }
      )
    }
  }, [disableFilter, navigate, pathname, search, selectedCategories, filter])

  const handleCategoryChange = useCallback(
    (category: WorkCategory) => {
      const numOfSelectedCategories = selectedCategories
        ? selectedCategories.length + 1
        : undefined
      const numOfAvailableCategoryOptions = workCategories
        ? workCategories?.length - 1
        : undefined

      // select all
      if (category === WorkCategory.ALL) setSelectedCategories([category])

      // deselect all when user select new category from all option
      if (selectedCategories?.includes(WorkCategory.ALL)) {
        setSelectedCategories(
          prev => prev && prev.filter(workCat => workCat !== WorkCategory.ALL)
        )
      }

      // deselect selected category
      if (
        selectedCategories?.includes(category) &&
        numOfSelectedCategories &&
        numOfSelectedCategories > 2
      ) {
        setSelectedCategories(
          selectedCategories.filter(cat => cat !== category)
        )
      }

      // select category
      if (!selectedCategories?.includes(category)) {
        setSelectedCategories(prev => (prev ? [...prev, category] : []))
      }

      // select all when user selected all other categories
      if (
        numOfSelectedCategories &&
        numOfSelectedCategories === numOfAvailableCategoryOptions
      ) {
        setSelectedCategories([WorkCategory.ALL])
      }
    },
    [selectedCategories, workCategories]
  )

  return (
    <section className="w-full">
      <nav className="w-full">
        <ul className="flex overflow-x-scroll no-scrollbar space-x-4 px-6 md:px-1 py-1">
          {workCategories?.map(workCategory => (
            <li
              key={workCategory}
              className={`px-4 py-1 rounded-md bg-gray-100 shadow-custom-sm text-sm cursor-pointer whitespace-nowrap 
                                ${selectedCategories?.includes(workCategory) ? 'bg-gray-800 text-gray-100' : 'hover:bg-gray-200'}`}
              onClick={() => handleCategoryChange(workCategory)}
            >
              {getWorkCategoryLabel()[workCategory]}
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 sm:mt-12 px-4 md:px-0"
        ref={ref}
        variants={{
          ...(!disableAnimation && {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }),
        }}
        initial={!disableAnimation && 'hidden'}
        animate={!disableAnimation && fadeInControl}
        transition={{
          ...(!disableAnimation && { duration: 0.5 }),
        }}
      >
        {works
          .filter(work =>
            selectedCategories?.includes(WorkCategory.ALL)
              ? true
              : selectedCategories?.includes(work.category[0])
          )
          .map(work => (
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
