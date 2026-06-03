import { usePageTracking } from '@/hooks/usePageTracking'
import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import TerminalOverlay from './TerminalOverlay'

const Layout = () => {
  usePageTracking()

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <TerminalOverlay />
    </>
  )
}

export default Layout
