/**
 * Typed GA4 event definitions for the portfolio site.
 *
 * GA4 uses snake_case event names (max 40 chars). Events are grouped into
 * categories so call-sites benefit from autocomplete and compile-time checks.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events
 */

/** GA4 recommended navigation / engagement events. */
export type PageViewEvent = {
  name: 'page_view'
  params: { page_path: string; page_title?: string }
}

export type SelectContentEvent = {
  name: 'select_content'
  params: { content_type: string; item_id: string }
}

export type ShareEvent = {
  name: 'share'
  params: { method: string; content_type: string; item_id: string }
}

/** Portfolio-specific events. */
export type ViewProjectEvent = {
  name: 'view_project'
  params: { project_name: string; project_category?: string }
}

export type ViewBlogEvent = {
  name: 'view_blog'
  params: { blog_id: string; blog_title: string }
}

export type DownloadCvEvent = {
  name: 'download_cv'
  params: { source: string }
}

export type ContactClickEvent = {
  name: 'contact_click'
  params: { method: string }
}

export type ExternalLinkClickEvent = {
  name: 'external_link_click'
  params: { url: string; link_text?: string }
}

export type ThemeChangeEvent = {
  name: 'theme_change'
  params: { theme: string }
}

export type LanguageChangeEvent = {
  name: 'language_change'
  params: { language: string; previous_language?: string }
}

export type NavigationEvent = {
  name: 'navigation'
  params: { destination: string; source?: string }
}

/** Fully custom events. Use snake_case names; avoid GA4 reserved names. */
export type CustomEvent = {
  name: string
  params?: Record<string, string | number | boolean>
}

/**
 * Discriminated union of all supported analytics events.
 *
 * Add new event shapes here so every `analytics.track(...)` call is validated
 * at compile time.
 */
export type AnalyticsEvent =
  | PageViewEvent
  | SelectContentEvent
  | ShareEvent
  | ViewProjectEvent
  | ViewBlogEvent
  | DownloadCvEvent
  | ContactClickEvent
  | ExternalLinkClickEvent
  | ThemeChangeEvent
  | LanguageChangeEvent
  | NavigationEvent
  | CustomEvent

/** Properties set once per user (persisted across sessions in GA4). */
export type UserProperties = Record<string, string | number | boolean>

/**
 * Consent categories aligned with Google Consent Mode v2.
 *
 * @see https://developers.google.com/tag-platform/security/concepts/consent-mode
 */
export type ConsentSettings = {
  analytics_storage?: 'granted' | 'denied'
  ad_storage?: 'granted' | 'denied'
  ad_user_data?: 'granted' | 'denied'
  ad_personalization?: 'granted' | 'denied'
}
