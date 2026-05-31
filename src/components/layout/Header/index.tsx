import Navbar from './Navbar'

const Header = () => {
  return (
    <>
      <header className="z-50 fixed top-0 inset-x-0 flex justify-center w-full bg-bg/80 backdrop-blur-md border-b border-divider">
        <Navbar />
      </header>
      <div className="mt-14" />
    </>
  )
}

export default Header
