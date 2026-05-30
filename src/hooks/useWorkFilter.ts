import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { parse, stringify } from 'qs'
import { WorkCategory } from '@/constant/work'
import { works } from '@/data/works'

const workCategories = Object.values(WorkCategory) as WorkCategory[]

type UseWorkFilterOptions = {
  disableFilter?: boolean
}

const useWorkFilter = ({
  disableFilter = false,
}: UseWorkFilterOptions = {}) => {
  const navigate = useNavigate()
  const { search, pathname } = useLocation()

  const initialCategories = useMemo(() => {
    if (disableFilter) return [WorkCategory.ALL]

    const queryCategory = parse(search, { ignoreQueryPrefix: true })
      ?.category as WorkCategory[]
    const isValidCategory =
      Array.isArray(queryCategory) &&
      queryCategory.some(cat => workCategories.includes(cat))
    return isValidCategory ? queryCategory : [WorkCategory.ALL]
  }, [search, disableFilter])

  const [selectedCategories, setSelectedCategories] =
    useState<WorkCategory[]>(initialCategories)

  useEffect(() => {
    if (!disableFilter) {
      navigate(
        {
          pathname,
          search: `?${stringify({ category: selectedCategories })}`,
        },
        { replace: true }
      )
    }
  }, [disableFilter, navigate, pathname, selectedCategories])

  const handleCategoryChange = useCallback((category: WorkCategory) => {
    if (category === WorkCategory.ALL) {
      setSelectedCategories([category])
      return
    }

    setSelectedCategories(prev => {
      let next = prev.filter(c => c !== WorkCategory.ALL)

      if (next.includes(category)) {
        if (next.length > 1) {
          next = next.filter(c => c !== category)
        }
      } else {
        next = [...next, category]
      }

      const nonAllCategories = workCategories.filter(
        c => c !== WorkCategory.ALL
      )
      if (next.length === nonAllCategories.length) {
        return [WorkCategory.ALL]
      }

      return next
    })
  }, [])

  const filteredWorks = useMemo(
    () =>
      works.filter(work =>
        selectedCategories.includes(WorkCategory.ALL)
          ? true
          : selectedCategories.includes(work.category[0])
      ),
    [selectedCategories]
  )

  return {
    selectedCategories,
    filteredWorks,
    workCategories,
    handleCategoryChange,
  }
}

export default useWorkFilter
