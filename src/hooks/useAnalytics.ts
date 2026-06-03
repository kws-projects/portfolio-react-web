import { analytics } from '@/lib/analytics'
import type { AnalyticsEvent, ConsentSettings } from '@/types/analytics'
import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Convenience hook that exposes analytics helpers pre-bound to the current
 * route context.
 */
export function useAnalytics() {
  const location = useLocation()

  const page = useCallback(
    (title?: string) => analytics.page(location.pathname, title),
    [location.pathname]
  )

  const track = useCallback(
    (event: AnalyticsEvent) => analytics.track(event),
    []
  )

  const updateConsent = useCallback(
    (consent: ConsentSettings) => analytics.updateConsent(consent),
    []
  )

  return { page, track, updateConsent } as const
}
