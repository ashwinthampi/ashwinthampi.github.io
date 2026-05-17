import { useEffect, useState } from 'react'
import AsciiBackground from './components/AsciiBackground'
import Hero from './components/Hero'
import About from './components/About'
import CareerInterests from './components/CareerInterests'
import PersonalInterests from './components/PersonalInterests'
import Contact from './components/Contact'
import MusicPage from './components/MusicPage'
import BooksPage from './components/BooksPage'
import RunwayPage from './components/RunwayPage'
import type { Page } from './types'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const goHome = () => setPage('home')

  return (
    <>
      <AsciiBackground />
      <main className="relative z-10 max-w-xl mx-auto px-5 sm:px-6 py-12 sm:py-24">
        {page === 'home' && (
          <>
            <Hero />
            <p className="text-xs text-[#555] mb-12">
              the things we build are reflections of how we think, and that the work of engineering is, at its best, closer to art than to manufacturing.
            </p>
            <About />
            <CareerInterests />
            <PersonalInterests onNavigate={setPage} />
            <Contact />
          </>
        )}
        {page === 'music' && <MusicPage onBack={goHome} />}
        {page === 'books' && <BooksPage onBack={goHome} />}
        {page === 'runway' && <RunwayPage onBack={goHome} />}
      </main>
    </>
  )
}
