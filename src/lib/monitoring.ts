/**
 * Sentry error-monitoring adapter.
 *
 * Wraps `@sentry/react` behind a project-specific interface so feature code
 * stays decoupled from the SDK. Swapping to a different provider is a
 * localised change confined to this file.
 *
 * **Setup checklist (one-time per project):**
 * 1. Set `VITE_SENTRY_ENABLED=true` and `VITE_SENTRY_DSN=https://…`
 * 2. Call `monitoring.init()` once at startup (already done in `main.tsx`).
 * 3. Use `monitoring.captureException(error)` for caught errors in features.
 * 4. Wrap the app in `<SentryErrorBoundary>` for render-crash recovery.
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/react/
 */

import { env } from '@/config/env'
import type {
  Breadcrumb,
  ErrorContext,
  MonitoringUser,
} from '@/types/monitoring'
import * as Sentry from '@sentry/react'
import { useEffect } from 'react'
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom'

const isEnabled = () =>
  env.monitoring.enabled && Boolean(env.monitoring.sentryDsn)

export const monitoring = {
  /**
   * Initialise Sentry.
   *
   * Must run **before** `ReactDOM.createRoot` so the React 19 error hooks
   * and the browser-tracing integration can instrument correctly.
   */
  init() {
    if (!isEnabled()) return

    Sentry.init({
      dsn: env.monitoring.sentryDsn,
      environment: env.monitoring.sentryEnvironment,
      release: env.monitoring.sentryRelease || undefined,
      debug: env.isDevelopment,
      sendDefaultPii: false,

      integrations: [
        Sentry.reactRouterV7BrowserTracingIntegration({
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
        Sentry.replayIntegration(),
      ],

      tracesSampleRate: env.monitoring.tracesSampleRate,
      replaysSessionSampleRate: env.monitoring.replaysSampleRate,
      replaysOnErrorSampleRate: env.monitoring.replaysOnErrorSampleRate,

      beforeSend(event) {
        if (env.isDevelopment) {
          console.debug('[Sentry] Would send event:', event)
        }
        return event
      },
    })
  },

  // ── Exceptions ──────────────────────────────────────────────────────────

  captureException(error: unknown, context?: ErrorContext) {
    if (!isEnabled()) {
      if (env.isDevelopment) console.error('[monitoring]', error, context)
      return
    }

    Sentry.withScope(scope => {
      if (context?.tags) {
        Object.entries(context.tags).forEach(([k, v]) => scope.setTag(k, v))
      }
      if (context?.extras) {
        Object.entries(context.extras).forEach(([k, v]) => scope.setExtra(k, v))
      }
      if (context?.level) scope.setLevel(context.level)
      if (context?.fingerprint) scope.setFingerprint(context.fingerprint)

      Sentry.captureException(error)
    })
  },

  // ── Messages ────────────────────────────────────────────────────────────

  captureMessage(message: string, context?: ErrorContext) {
    if (!isEnabled()) {
      if (env.isDevelopment) console.warn('[monitoring]', message, context)
      return
    }

    Sentry.withScope(scope => {
      if (context?.tags) {
        Object.entries(context.tags).forEach(([k, v]) => scope.setTag(k, v))
      }
      if (context?.extras) {
        Object.entries(context.extras).forEach(([k, v]) => scope.setExtra(k, v))
      }
      if (context?.level) scope.setLevel(context.level)

      Sentry.captureMessage(message, context?.level)
    })
  },

  // ── User context ────────────────────────────────────────────────────────

  setUser(user: MonitoringUser) {
    if (!isEnabled()) return
    Sentry.setUser(user)
  },

  clearUser() {
    if (!isEnabled()) return
    Sentry.setUser(null)
  },

  // ── Breadcrumbs ─────────────────────────────────────────────────────────

  addBreadcrumb(breadcrumb: Breadcrumb) {
    if (!isEnabled()) return
    Sentry.addBreadcrumb({
      category: breadcrumb.category,
      message: breadcrumb.message,
      level: breadcrumb.level,
      data: breadcrumb.data,
    })
  },

  // ── Tags ────────────────────────────────────────────────────────────────

  setTag(key: string, value: string) {
    if (!isEnabled()) return
    Sentry.setTag(key, value)
  },

  // ── React 19 error hooks ───────────────────────────────────────────────

  getReactErrorHandlers(): {
    onUncaughtError: (error: unknown, errorInfo: React.ErrorInfo) => void
    onCaughtError: (error: unknown, errorInfo: React.ErrorInfo) => void
    onRecoverableError: (error: unknown, errorInfo: React.ErrorInfo) => void
  } {
    if (!isEnabled()) {
      return {
        onUncaughtError: (error, errorInfo) => {
          console.error(
            '[React] Uncaught error:',
            error,
            errorInfo.componentStack
          )
        },
        onCaughtError: (error, errorInfo) => {
          console.error(
            '[React] Caught error:',
            error,
            errorInfo.componentStack
          )
        },
        onRecoverableError: (error, errorInfo) => {
          console.error(
            '[React] Recoverable error:',
            error,
            errorInfo.componentStack
          )
        },
      }
    }

    return {
      onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
        if (env.isDevelopment) {
          console.warn(
            '[Sentry] Uncaught error:',
            error,
            errorInfo.componentStack
          )
        }
      }),
      onCaughtError: Sentry.reactErrorHandler(),
      onRecoverableError: Sentry.reactErrorHandler(),
    }
  },
}

export const SentryErrorBoundary = Sentry.ErrorBoundary
