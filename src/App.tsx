import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import AsciiBackground from './components/AsciiBackground'
import Hero from './components/Hero'
import About from './components/About'
import CareerInterests from './components/CareerInterests'
import PersonalInterests from './components/PersonalInterests'
import Contact from './components/Contact'
import MusicPage from './components/MusicPage'
import BooksPage from './components/BooksPage'
import RunwayPage from './components/RunwayPage'

export default function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const goHome = () => navigate('/')

  return (
    <>
      <AsciiBackground />
      <main className="relative z-10 max-w-xl mx-auto px-5 sm:px-6 py-12 sm:py-24">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <p className="text-xs text-[#555] mb-12">
                  the things we build are reflections of how we think, and that the work of engineering is, at its best, closer to art than to manufacturing.
                </p>
                <About />
                <CareerInterests />
                <PersonalInterests />
                <Contact />
              </>
            }
          />
          <Route path="/music" element={<MusicPage onBack={goHome} />} />
          <Route path="/books" element={<BooksPage onBack={goHome} />} />
          <Route path="/runway" element={<RunwayPage onBack={goHome} />} />
        </Routes>
      </main>
    </>
  )
}
