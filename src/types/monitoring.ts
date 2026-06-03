/**
 * Typed definitions for the monitoring / error-tracking layer.
 *
 * Keep Sentry-specific types out of feature code — reference only these
 * interfaces so call-sites stay decoupled from the concrete SDK.
 */

/** Severity levels aligned with Sentry (and most logging systems). */
export type Severity = 'fatal' | 'error' | 'warning' | 'info' | 'debug'

/** Contextual metadata attached to a captured exception or message. */
export interface ErrorContext {
  /** Helps filter errors in the dashboard (e.g. "payments", "auth"). */
  tags?: Record<string, string>
  /** Arbitrary structured data attached to the event. */
  extras?: Record<string, unknown>
  /** Override the default severity for this particular capture. */
  level?: Severity
  /**
   * Fingerprint strings that control how Sentry groups similar errors.
   * Only set when the default grouping is too broad or too narrow.
   */
  fingerprint?: string[]
}

/**
 * User identity passed to the monitoring SDK so errors are linked to a
 * specific user session. Never include PII beyond what is necessary.
 */
export interface MonitoringUser {
  id: string
  email?: string
  username?: string
}

/** A breadcrumb records a step that led up to an error. */
export interface Breadcrumb {
  category: string
  message: string
  level?: Severity
  data?: Record<string, unknown>
}
