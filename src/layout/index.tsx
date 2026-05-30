import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TerminalOverlay from '@/components/TerminalOverlay'

const Layout = () => {
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
