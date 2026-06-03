import { monitoring } from '@/lib/monitoring'
import type {
  Breadcrumb,
  ErrorContext,
  MonitoringUser,
} from '@/types/monitoring'
import { useCallback } from 'react'

/**
 * Convenience hook that exposes monitoring helpers.
 *
 * Prefer this over importing `monitoring` directly in components — it keeps
 * feature code decoupled and simplifies testing via mocking.
 */
export function useMonitoring() {
  const captureException = useCallback(
    (error: unknown, context?: ErrorContext) =>
      monitoring.captureException(error, context),
    []
  )

  const captureMessage = useCallback(
    (message: string, context?: ErrorContext) =>
      monitoring.captureMessage(message, context),
    []
  )

  const setUser = useCallback(
    (user: MonitoringUser) => monitoring.setUser(user),
    []
  )
  const clearUser = useCallback(() => monitoring.clearUser(), [])

  const addBreadcrumb = useCallback(
    (breadcrumb: Breadcrumb) => monitoring.addBreadcrumb(breadcrumb),
    []
  )

  const setTag = useCallback(
    (key: string, value: string) => monitoring.setTag(key, value),
    []
  )

  return {
    captureException,
    captureMessage,
    setUser,
    clearUser,
    addBreadcrumb,
    setTag,
  } as const
}
