import { useCallback } from 'react'
import { trackPageview } from 'services/ga4'

const usePageTitle = (title: string) => {
  useCallback(() => {
    trackPageview(title)
  }, [title])
}

export default usePageTitle
