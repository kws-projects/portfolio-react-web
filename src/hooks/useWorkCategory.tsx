import { useCallback, useState } from 'react'
import { EnumValues } from 'enum-values'
import { WorkCategory, works } from 'data/works'

const useWorkCategory = () => {
  const [workCategories, setWorkCategories] = useState<WorkCategory[]>(
    EnumValues.getValues(WorkCategory)
  )

  useCallback(() => {
    const filterUniqueCategories = () => {
      const uniqueCategories = works
        .map(work => work.category)
        .flat()
        .sort()
        .filter((currVal, i, arr) => (i === 0 ? true : currVal !== arr[i - 1]))

      setWorkCategories([WorkCategory.ALL, ...uniqueCategories])
    }

    filterUniqueCategories()
  }, [setWorkCategories])

  return workCategories
}

export default useWorkCategory
