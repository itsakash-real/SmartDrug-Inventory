import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import Download from './pages/Download'
import Chatbot from './pages/Chatbot'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return null
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageWrapper({ children }) {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(false)
    const t = requestAnimationFrame(() => setShow(true))
    return () => cancelAnimationFrame(t)
  }, [pathname])
  return <div className={show ? 'page-enter' : ''} style={{ opacity: show ? undefined : 0 }}>{children}</div>
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <PageWrapper>
        <Routes>
          <Route path="/"            element={<Landing />} />
          <Route path="/features"    element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/download"    element={<Download />} />
          <Route path="/chatbot"     element={<Chatbot />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </PageWrapper>
      <Footer />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <>
      <div id="scroll-progress" />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  )
}
