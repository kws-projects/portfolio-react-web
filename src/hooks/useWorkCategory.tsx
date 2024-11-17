import { useEffect, useState } from 'react'
import { WorkCategory, works } from 'data/works'

const useWorkCategory = () => {
  const [workCategories, setWorkCategories] = useState<WorkCategory[] | null>(
    null
  )

  useEffect(() => {
    const filterUniqueCategories = () => {
      const uniqueCategories = works
        .map(work => work.category)
        .flat()
        .sort()
        .filter((currVal, i, arr) => (i === 0 ? true : currVal !== arr[i - 1]))

      setWorkCategories([WorkCategory.ALL, ...uniqueCategories])
    }

    filterUniqueCategories()
  }, [])

  return workCategories
}

export default useWorkCategory
