/**
 * Google Analytics 4 adapter.
 *
 * Wraps the gtag.js API behind a typed, thin interface so feature code never
 * touches the global `gtag` function directly. Swapping providers later is a
 * localised change confined to this file.
 *
 * **Setup checklist (one-time per project):**
 * 1. Set `VITE_ANALYTICS_ENABLED=true` and `VITE_GA_MEASUREMENT_ID=G-…`
 * 2. Call `analytics.init()` once at startup (already done in `main.tsx`).
 * 3. Track pages via `analytics.page(path)` (wired in the router helper).
 * 4. Track events via `analytics.track({ name, params })` from features.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */

import { env } from '@/config/env'
import type {
  AnalyticsEvent,
  ConsentSettings,
  UserProperties,
} from '@/types/analytics'

const GTAG_URL = 'https://www.googletagmanager.com/gtag/js'

const isEnabled = () =>
  env.analytics.enabled && Boolean(env.analytics.gaMeasurementId)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

/**
 * Dynamically inject the gtag.js script tag.
 * Avoids hard-coding it in index.html so the measurement ID stays in env.
 */
function loadScript(measurementId: string): void {
  if (typeof document === 'undefined') return
  if (document.querySelector(`script[src^="${GTAG_URL}"]`)) return

  const script = document.createElement('script')
  script.src = `${GTAG_URL}?id=${measurementId}`
  script.async = true
  document.head.appendChild(script)
}

export const analytics = {
  /**
   * Initialise GA4.
   *
   * Loads the gtag.js script, applies default consent settings, and
   * configures the measurement stream. Call once in your entry point.
   */
  init() {
    if (!isEnabled()) return

    const id = env.analytics.gaMeasurementId
    loadScript(id)

    gtag('js', new Date())

    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    } satisfies ConsentSettings)

    gtag('config', id, {
      send_page_view: false,
      ...(env.analytics.debugMode || env.isDevelopment
        ? { debug_mode: true }
        : {}),
    })
  },

  // ── Consent ──────────────────────────────────────────────────────────────

  /**
   * Update consent state at runtime (for future CMP integration).
   */
  updateConsent(consent: ConsentSettings) {
    if (!isEnabled()) return
    gtag('consent', 'update', consent)
  },

  // ── Page views ───────────────────────────────────────────────────────────

  /**
   * Record a virtual page view (SPA navigation).
   *
   * Called automatically by the router integration; you normally do not need
   * to call this manually.
   */
  page(path: string, title?: string) {
    if (!isEnabled()) return
    gtag('event', 'page_view', {
      page_path: path,
      ...(title ? { page_title: title } : {}),
    })
  },

  // ── Events ───────────────────────────────────────────────────────────────

  /**
   * Track a typed analytics event.
   *
   * ```ts
   * analytics.track({ name: 'view_project', params: { project_name: 'My App' } })
   * analytics.track({ name: 'download_cv', params: { source: 'about_page' } })
   * ```
   */
  track({ name, params }: AnalyticsEvent) {
    if (!isEnabled()) return
    gtag('event', name, params ?? {})
  },

  // ── User identity ────────────────────────────────────────────────────────

  setUserId(userId: string) {
    if (!isEnabled()) return
    gtag('config', env.analytics.gaMeasurementId, { user_id: userId })
  },

  clearUserId() {
    if (!isEnabled()) return
    gtag('config', env.analytics.gaMeasurementId, { user_id: undefined })
  },

  setUserProperties(properties: UserProperties) {
    if (!isEnabled()) return
    gtag('set', 'user_properties', properties)
  },

  // ── Teardown (tests / hot-reload) ────────────────────────────────────────

  reset() {
    if (typeof document === 'undefined') return
    document.querySelector(`script[src^="${GTAG_URL}"]`)?.remove()
    if (typeof window !== 'undefined') {
      window.dataLayer = []
    }
  },
}
