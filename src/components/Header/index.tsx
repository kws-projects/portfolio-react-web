import Navbar from './Navbar'

const Header = () => {
  return (
    <>
      <header className="z-50 fixed top-0 left-0 flex justify-center w-full bg-gray-50">
        <Navbar />
      </header>
      <div className="mt-14"></div>
    </>
  )
}

export default Header
