import { WorkCategory } from '@/constant/work'
import { useWorks } from '@/hooks/usePortfolioData'
import { mapWorks } from '@/services/api/mappers'
import { parse, stringify } from 'qs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

type UseWorkFilterOptions = {
  disableFilter?: boolean
}

const useWorkFilter = ({
  disableFilter = false,
}: UseWorkFilterOptions = {}) => {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const { search, pathname } = useLocation()

  const { data: workEntities, isLoading, isError, refetch } = useWorks()

  const localizedWorks = useMemo(
    () => (workEntities ? mapWorks(workEntities, i18n.language) : []),
    [workEntities, i18n.language]
  )

  const availableCategories = useMemo(() => {
    if (!localizedWorks.length) return [WorkCategory.ALL]

    const seen = new Set<WorkCategory>()
    for (const work of localizedWorks) {
      for (const cat of work.category) {
        seen.add(cat)
      }
    }

    const ordered = Object.values(WorkCategory).filter(
      cat => cat !== WorkCategory.ALL && seen.has(cat)
    ) as WorkCategory[]

    return [WorkCategory.ALL, ...ordered]
  }, [localizedWorks])

  const initialCategories = useMemo(() => {
    if (disableFilter) return [WorkCategory.ALL]

    const queryCategory = parse(search, { ignoreQueryPrefix: true })
      ?.category as WorkCategory[]
    const isValidCategory =
      Array.isArray(queryCategory) &&
      queryCategory.some(cat => availableCategories.includes(cat))
    return isValidCategory ? queryCategory : [WorkCategory.ALL]
  }, [search, disableFilter, availableCategories])

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

      return next
    })
  }, [])

  const filteredWorks = useMemo(
    () =>
      localizedWorks.filter(work =>
        selectedCategories.includes(WorkCategory.ALL)
          ? true
          : selectedCategories.includes(work.category[0])
      ),
    [selectedCategories, localizedWorks]
  )

  return {
    selectedCategories,
    filteredWorks,
    workCategories: availableCategories,
    handleCategoryChange,
    isLoading,
    isError,
    refetch,
  }
}

export default useWorkFilter
