import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '@/index.css'
import App from '@/App'
import ReactGA from 'react-ga4'
import * as Sentry from '@sentry/react'
import { envConfig } from '@/config'
import { AppEnv } from '@/constant/appEnv'

const queryClient = new QueryClient({})

if (envConfig.NODE_ENV === AppEnv.PROD) {
  ReactGA.initialize(envConfig.GA4_ID!)

  Sentry.init({
    dsn: envConfig.SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [`${envConfig.PORTFOLIO_API_BASE_URL}`, /^\//],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
)
