import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import TerminalOverlay from './TerminalOverlay'

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
