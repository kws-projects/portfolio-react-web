import { analytics } from '@/lib/analytics'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Sends a GA4 `page_view` event whenever the route changes.
 *
 * Mount once inside a component that has router context (e.g. `Layout`):
 *
 * ```tsx
 * export function Layout() {
 *   usePageTracking()
 *   return <Outlet />
 * }
 * ```
 */
export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    analytics.page(location.pathname + location.search)
  }, [location.pathname, location.search])
}
