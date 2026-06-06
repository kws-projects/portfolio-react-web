import '@/index.css'

import App from '@/App'
import { analytics } from '@/lib/analytics'
import { monitoring } from '@/lib/monitoring'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'

// Apply theme before first paint to avoid flash

;(() => {
  const stored = localStorage.getItem('theme-preference')
  if (stored === 'dark' || stored === 'light') {
    document.documentElement.setAttribute('data-theme', stored)
  } else {
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    document.documentElement.setAttribute('data-theme', system)
  }
})()

// Apply direction before first paint to avoid layout shift
;(() => {
  const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur']
  const storedLang = localStorage.getItem('i18n-language')
  if (storedLang) {
    const dir = RTL_LANGUAGES.includes(storedLang) ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = storedLang
  }
})()

// Initialise integrations before mounting React (order matters for Sentry).
monitoring.init()
analytics.init()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element "#root" was not found in the document.')
}

createRoot(rootElement, monitoring.getReactErrorHandlers()).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
)
