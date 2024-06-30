import { Routes, Route } from 'react-router-dom'
import './utils/i18n'
import './App.css'
import Layout from './layout'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="works" element={<Works />} />
        <Route path="blogs">
          <Route index element={<Blogs />} />
          <Route path=":postId" element={<BlogPost />} />
        </Route>
        <Route path="contact" element={<Contact />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
