import { useEffect } from 'react'
import { trackPageview } from 'services/ga4'

const usePageTitle = (title: string) => {
  useEffect(() => {
    trackPageview(title)
  }, [title])
}

export default usePageTitle
