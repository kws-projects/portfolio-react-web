import Layout from '@/components/layout'
import About from '@/pages/About'
import BlogPost from '@/pages/BlogPost'
import Blogs from '@/pages/Blogs'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Preview from '@/pages/Preview'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'
import Works from '@/pages/Works'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="works" element={<Works />} />
      <Route path="blogs">
        <Route index element={<Blogs />} />
        <Route path=":slug" element={<BlogPost />} />
      </Route>
      <Route path="contact" element={<Contact />} />
      <Route path="terms-and-conditions" element={<Terms />} />
      <Route path="privacy-policy" element={<Privacy />} />
      <Route path="preview/:token" element={<Preview />} />
      <Route path="/*" element={<NotFound />} />
    </Route>
  </Routes>
)

export default AppRouter
