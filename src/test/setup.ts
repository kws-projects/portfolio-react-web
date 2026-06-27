import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList
}

// jsdom does not implement scrollTo, so any component/hook that calls it (e.g.
// useScrollToTop) logs a noisy "Not implemented" error. Stub it as a no-op;
// tests that care can still spy on it.
window.scrollTo = (() => {}) as typeof window.scrollTo
Element.prototype.scrollTo = (() => {}) as typeof Element.prototype.scrollTo
