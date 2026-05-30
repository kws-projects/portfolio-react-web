import { useState, useCallback } from 'react'

const useNavbarToggle = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggle = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  return { isExpanded, toggle }
}

export default useNavbarToggle
