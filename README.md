# Portfolio React Web

A personal portfolio website built with React, TypeScript, and Vite.

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **TanStack React Query v5** for server state
- **Tailwind CSS v3** for styling
- **Framer Motion** for animations
- **i18next / react-i18next** for i18n (English, Arabic, Japanese, Chinese)
- Light / dark / system **theming**
- **Google Analytics 4** (GA4) via typed gtag.js adapter
- **Sentry** for error monitoring, performance tracing, and session replay
- **react-helmet-async** for document titles
- **Vitest** + **Testing Library** for tests
- **ESLint 9** (flat config) + **Prettier** + **import-sort**
- **Husky** + **lint-staged** + **commitlint** for git hooks
- **Docker** + **docker-compose** for deployment
- `@/` path alias mapped to `src/`

## Prerequisites

- Node `>=22`
- [Yarn](https://classic.yarnpkg.com/)

## Getting started

```bash
yarn install
yarn env:setup         # creates .env.development.local & .env.production.local from .env.example
yarn dev               # http://localhost:3001
```

## Scripts

| Script               | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `yarn dev`           | Dev server (loads `.env.development.local`)           |
| `yarn build`         | Type-check + build for prod (loads `.env.production.local`) |
| `yarn build:dev`     | Build using the development env                      |
| `yarn preview`       | Preview the production build                         |
| `yarn env:setup`     | Create local env files from `.env.example`           |
| `yarn lint`          | Run ESLint                                           |
| `yarn format`        | Format with Prettier                                 |
| `yarn import-sort`   | Sort imports across `src`                            |
| `yarn typecheck`     | Type-check without emitting                          |
| `yarn test`          | Run tests once                                       |
| `yarn test:watch`    | Run tests in watch mode                              |
| `yarn test:coverage` | Run tests with coverage                              |

## Project structure

```
src/
  components/          # Shared components
    layout/            # Layout (Header, Footer, TerminalOverlay, page tracking)
    ui/                # Reusable UI primitives (Button, Card, Timeline, etc.)
    sketches/          # p5.js background sketches
  pages/               # Page-level components (Home, About, Works, Blogs, etc.)
  lib/                 # Third-party adapters (analytics.ts, monitoring.ts)
  config/              # Typed env access (env.ts)
  hooks/               # Shared hooks (useAnalytics, useMonitoring, usePageTracking, etc.)
  services/            # API clients (portfolio BFF API via TanStack Query)
  constant/            # App constants and enums
  types/               # Shared types (analytics events, monitoring, blog, etc.)
  utils/               # General utilities (i18n, dayjs, common)
  test/                # Vitest global setup + shared helpers
```

Tests go in a `__tests__/` folder at the same level as the code under test.

## Analytics (Google Analytics 4)

GA4 is integrated via a typed gtag.js adapter in `src/lib/analytics.ts`. It is
**disabled by default** and activates when you set `VITE_ANALYTICS_ENABLED=true`
and provide `VITE_GA_MEASUREMENT_ID`.

### Quick start

1. Set env vars in `.env.production.local`:
   ```
   VITE_ANALYTICS_ENABLED=true
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
2. That's it — page views are tracked automatically via `usePageTracking()` in
   the Layout component, and the gtag script is loaded dynamically.

### Tracking events

```ts
import { analytics } from '@/lib/analytics'

analytics.track({ name: 'view_project', params: { project_name: 'My App' } })
analytics.track({ name: 'download_cv', params: { source: 'about_page' } })
analytics.track({ name: 'contact_click', params: { method: 'email' } })
```

### Adding new event types

Define new event shapes in `src/types/analytics.ts` and add them to the
`AnalyticsEvent` union. All `analytics.track(...)` calls are then validated at
compile time.

## Error monitoring (Sentry)

Sentry is integrated via `@sentry/react` in `src/lib/monitoring.ts`. It is
**disabled by default** and activates when you set `VITE_SENTRY_ENABLED=true`
and provide `VITE_SENTRY_DSN`.

### What is captured automatically

| Category               | How                                                      |
| ---------------------- | -------------------------------------------------------- |
| **Render crashes**     | React 19 error hooks in `main.tsx`                       |
| **Unhandled exceptions** | Sentry global handler                                  |
| **Unhandled rejections** | Sentry global handler                                  |
| **Network errors**     | Breadcrumb integration (fetch/XHR)                       |
| **Console errors**     | Breadcrumb integration                                   |
| **Navigation**         | React Router v7 tracing integration                      |
| **Performance**        | Browser tracing (configurable sample rate)                |
| **Session replay**     | Replay integration (configurable, off by default)         |

### Manual error capture

```ts
import { monitoring } from '@/lib/monitoring'

try {
  await fetchBlogPosts()
} catch (err) {
  monitoring.captureException(err, {
    tags: { feature: 'blog' },
    extras: { endpoint: '/api/blogs' },
  })
}
```

### Source map uploads

For readable stack traces in production, set these **build-time** env vars
(not `VITE_` prefixed — they are not exposed to the client):

```
SENTRY_AUTH_TOKEN=sntrys_…
SENTRY_ORG=kenneth-wong
SENTRY_PROJECT=portfolio-react-web
```

The `@sentry/vite-plugin` in `vite.config.ts` will automatically upload source
maps during `yarn build` when all three are present.

## Environment variables

Env files (all git-ignored except the example):

- `.env.example` - template of required variables (committed).
- `.env.development.local` - used by `yarn dev` and `yarn build:dev`.
- `.env.production.local` - used by `yarn build` (values are inlined into the
  bundle at build time).

Run `yarn env:setup` to create the two local files from `.env.example`, then fill
them in. The correct file is selected per script via `dotenv-cli`, so:

- **Developing**: `yarn dev` -> `.env.development.local`.
- **Production build**: `yarn build` -> `.env.production.local`.

Only `VITE_`-prefixed variables are exposed to the client. Read them through the
typed `src/config/env.ts` rather than `import.meta.env` directly. When adding a
variable, update `env.ts`, `.env.example`, the local env files, and
`src/vite-env.d.ts`.

## Theming

Light/dark theme toggling is handled via a `data-theme` attribute on `<html>`,
persisted to `localStorage`. Use the `useTheme()` hook or the `<ThemeToggle />`
component.

## Internationalisation & RTL

- Translations live in `src/utils/i18n/locales/`.
- Use `useTranslation()` for all user-facing text.
- Direction (`dir="rtl"`) is set automatically for RTL languages via the
  `useDirection` hook.

## Git hooks & commits

- **pre-commit**: `lint-staged` runs import-sort, Prettier, ESLint, and related
  Vitest tests on staged files.
- **commit-msg**: `commitlint` enforces
  [Conventional Commits](https://www.conventionalcommits.org/).
- **pre-push**: type-check, lint, and the full test suite must pass before code
  can be pushed.

## Git workflow & CI

Branches: `main` (production), `develop` (development). Branch from `main`, open
a PR, and merge only after review + passing CI — never push directly to
`main`/`develop`. CI runs tests on every push/PR; merging to `main` automatically
determines the version bump level from Conventional Commits, bumps `package.json`,
tags the release (`v<version>`), and opens a PR back to `develop`. See
[CONTRIBUTING.md](CONTRIBUTING.md).

## Deployment (Docker)

```bash
docker compose up --build   # serves the built app on http://localhost:3000
```

## Cursor rules & skills

- Rules (`.cursor/rules/`): `project-structure`, `best-practices`,
  `git-workflow`, `evolving-conventions`.
- Skills (`.cursor/skills/`): `analytics-and-monitoring` (GA4 + Sentry patterns),
  `generate-release-notes` (consistent release notes).
