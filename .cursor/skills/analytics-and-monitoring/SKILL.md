# Analytics & Monitoring

Work with the GA4 analytics and Sentry error-monitoring integrations in this
project. Use when adding events, capturing errors, configuring user identity,
managing consent, or troubleshooting the integration.

## What we track

### Google Analytics 4 — Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `page_view` | Automatic on every route change (via `usePageTracking`) | `page_path`, `page_title` |
| `external_link_click` | User clicks a social link in ContactPortal | `url`, `link_text` |
| `view_project` | (Available) User views a project detail | `project_name`, `project_category` |
| `view_blog` | (Available) User views a blog post | `blog_id`, `blog_title` |
| `download_cv` | (Available) User downloads CV | `source` |
| `contact_click` | (Available) User clicks a contact method | `method` |
| `theme_change` | (Available) User toggles light/dark theme | `theme` |
| `language_change` | (Available) User switches language | `language`, `previous_language` |
| `navigation` | (Available) User navigates via menu | `destination`, `source` |
| `select_content` | (Available) GA4 recommended event | `content_type`, `item_id` |
| `share` | (Available) GA4 recommended event | `method`, `content_type`, `item_id` |

Events marked "(Available)" are typed and ready to use but not yet wired into
components. Add tracking by calling `analytics.track({ name, params })`.

### Sentry — What is monitored

| Category | What | How |
|----------|------|-----|
| Uncaught exceptions | Any unhandled JS error or promise rejection | Automatic (Sentry global handlers) |
| React render crashes | Errors thrown during component render | React 19 error hooks in `createRoot` |
| Performance traces | Page load, route navigation timing | `reactRouterV7BrowserTracingIntegration` |
| Session replay | Full session recording on errors | `replayIntegration` (100% on error, 0% on normal) |
| Manual exceptions | Caught errors in try/catch blocks | `monitoring.captureException(error, context)` |
| Manual messages | Logged warnings/info events | `monitoring.captureMessage(message, context)` |
| Breadcrumbs | Steps leading up to an error | `monitoring.addBreadcrumb(breadcrumb)` |
| Release tracking | Errors tagged with app version | Auto-derived `portfolio@{version}` from `package.json` |
| Source maps | Readable stack traces in dashboard | `@sentry/vite-plugin` uploads during `yarn build` |

### Sentry configuration (production)

| Setting | Value | Meaning |
|---------|-------|---------|
| `tracesSampleRate` | 0.1 | 10% of page loads/navigations traced |
| `replaysSessionSampleRate` | 0 | No session replay for normal sessions |
| `replaysOnErrorSampleRate` | 1 | 100% replay capture when errors occur |
| `sendDefaultPii` | false | No personal data sent automatically |
| `release` | `portfolio@{version}` | Derived from `package.json` at build time |

## Architecture overview

Both integrations follow the **adapter pattern**: a thin typed wrapper in
`src/lib/` owns the SDK, and all other code uses the adapter (or the React
hooks) — never the raw SDK.

```
src/lib/analytics.ts    → GA4 gtag.js adapter
src/lib/monitoring.ts   → Sentry adapter (also re-exports ErrorBoundary)
src/types/analytics.ts  → Typed event definitions
src/types/monitoring.ts → Error context / user / breadcrumb types
src/hooks/useAnalytics.ts     → React hook (route-aware)
src/hooks/useMonitoring.ts    → React hook
src/hooks/usePageTracking.ts  → Auto page-view on route change
```

## GA4 — Adding a new tracked event

1. Define the event shape in `src/types/analytics.ts`:

   ```ts
   export type FeatureUsedEvent = {
     name: 'feature_used'
     params: { feature: string; duration_ms?: number }
   }
   ```

2. Add it to the `AnalyticsEvent` union in the same file.

3. Track it from feature code:

   ```ts
   import { analytics } from '@/lib/analytics'
   analytics.track({ name: 'feature_used', params: { feature: 'export' } })
   ```

   Or via the hook:

   ```tsx
   const { track } = useAnalytics()
   track({ name: 'feature_used', params: { feature: 'export' } })
   ```

### Event naming rules (GA4)

- Use `snake_case`, max 40 characters.
- Avoid GA4 reserved names: `click`, `error`, `first_visit`, `page_view`,
  `scroll`, `session_start`, `user_engagement`.
- Prefer recommended events (`login`, `sign_up`, `search`, `share`,
  `select_content`, `exception`) when they fit.

## Sentry — Capturing errors in feature code

### Automatic capture (already wired)

- **Render crashes**: React 19 error hooks in `main.tsx`.
- **Unhandled exceptions / rejections**: Sentry global handlers.
- **Navigation spans**: React Router v7 tracing integration.

### Manual capture

```ts
import { monitoring } from '@/lib/monitoring'

try {
  await riskyOperation()
} catch (err) {
  monitoring.captureException(err, {
    tags: { feature: 'blog' },
    extras: { blogId: blog.id },
    level: 'error',
  })
}
```

### Breadcrumbs

```ts
monitoring.addBreadcrumb({
  category: 'navigation',
  message: 'User viewed project details',
  data: { projectName: 'My App' },
})
```

### Source-map uploads

Set these **build-time** env vars (not `VITE_` prefixed):

```
SENTRY_AUTH_TOKEN=sntrys_…
SENTRY_ORG=kenneth-wong
SENTRY_PROJECT=portfolio-react-web
```

`@sentry/vite-plugin` uploads source maps automatically during `yarn build`.

## Env vars checklist

| Variable | File | Purpose |
|----------|------|---------|
| `VITE_ANALYTICS_ENABLED` | `.env.example`, `env.ts`, `vite-env.d.ts` | Toggle GA4 |
| `VITE_GA_MEASUREMENT_ID` | same trio | GA4 stream ID |
| `VITE_GA_DEBUG_MODE` | same trio | GA4 debug view |
| `VITE_SENTRY_ENABLED` | same trio | Toggle Sentry |
| `VITE_SENTRY_DSN` | same trio | Sentry ingest URL |
| `VITE_SENTRY_ENVIRONMENT` | same trio | e.g. staging, production |
| `VITE_SENTRY_RELEASE` | Auto-derived in `vite.config.ts` | `portfolio@{version}` from `package.json` |
| `VITE_SENTRY_TRACES_SAMPLE_RATE` | same trio | Performance sample rate |
| `VITE_SENTRY_REPLAYS_SAMPLE_RATE` | same trio | Replay sample rate |
| `VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE` | same trio | Replay-on-error rate |
| `SENTRY_AUTH_TOKEN` | `.env.production.local` or CI secrets | Source-map upload |
| `SENTRY_ORG` | `.env.production.local` or CI secrets | Source-map upload |
| `SENTRY_PROJECT` | `.env.production.local` or CI secrets | Source-map upload |

## Testing

Both adapters are no-ops when disabled (the default in tests).
