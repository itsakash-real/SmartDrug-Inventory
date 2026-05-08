import { NavLink, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { createRipple } from '../hooks/useScrollReveal'

const Logo = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="7" width="18" height="13" rx="3" fill="rgba(255,255,255,0.4)"/>
    <rect x="8" y="2" width="6" height="11" rx="3" fill="rgba(255,255,255,0.7)"/>
    <circle cx="16.5" cy="15" r="5" fill="#66BB6A"/>
    <path d="M14 15l2 2 3.5-3.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const navLinks = [
  { to: '/',             label: 'Home' },
  { to: '/features',     label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/download',     label: 'Download' },
  { to: '/chatbot',      label: 'AI Chatbot' },
  { to: '/contact',      label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  /* Close drawer on outside click */
  useEffect(() => {
    if (!mobileOpen) return
    const close = (e) => {
      if (!e.target.closest('.mobile-drawer') && !e.target.closest('.hamburger-btn')) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [mobileOpen])

  const navStyle = {
    position: 'sticky', top: 0, zIndex: 100,
    height: 64, padding: '0 48px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: scrolled ? 'rgba(255,255,255,0.82)' : 'white',
    backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    boxShadow: scrolled ? '0 1px 16px rgba(46,125,50,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
    transition: 'all 0.3s ease',
  }

  return (
    <>
      <nav style={navStyle}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, background: '#2E7D32', borderRadius: 11,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><Logo /></div>
          <div>
            <div className="nav-logo-text" style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, color: '#1B1B1B', lineHeight: 1.2 }}>
              SmartDrug Inventory
            </div>
            <div style={{ fontSize: 10, color: '#6B7280', fontWeight: 400 }}>
              For Clinics &amp; Pharmacies
            </div>
          </div>
        </Link>

        {/* Desktop Links — hidden below 1024px via CSS class .nav-desktop-links */}
        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {navLinks.map(l => (
            <NavLink
              key={l.to} to={l.to} end={l.to === '/'}
              style={({ isActive }) => ({
                fontSize: 13, fontWeight: 600,
                color: isActive ? '#2E7D32' : '#6B7280',
                padding: '6px 14px', borderRadius: 8,
                position: 'relative', transition: 'color 0.2s',
                display: 'inline-flex', alignItems: 'center',
              })}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
                      width: '60%', height: 3, borderRadius: 2,
                      background: 'linear-gradient(90deg, #2E7D32, #66BB6A)',
                    }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Link
            to="/download"
            className="ripple-btn btn-primary btn-pulse"
            onClick={createRipple}
            style={{ marginLeft: 8, padding: '9px 20px', fontSize: 13 }}
          >
            Download APK
          </Link>
        </div>

        {/* Hamburger — shown below 1024px via CSS class .hamburger-btn */}
        <button
          onClick={(e) => { e.stopPropagation(); setMobileOpen(!mobileOpen) }}
          aria-label="Toggle menu"
          style={{
            display: 'none', background: 'none', border: 'none',
            padding: 8, cursor: 'pointer', minHeight: 44, minWidth: 44,
            alignItems: 'center', justifyContent: 'center',
          }}
          className="hamburger-btn"
        >
          <div style={{ width: 22, height: 16, position: 'relative' }}>
            {[0, 7, 14].map((t, i) => (
              <span key={i} style={{
                position: 'absolute', left: 0, top: t, width: '100%', height: 2,
                background: '#1B1B1B', borderRadius: 2, transition: 'all 0.3s ease',
                ...(mobileOpen && i === 0 ? { transform: 'translateY(7px) rotate(45deg)' } : {}),
                ...(mobileOpen && i === 1 ? { opacity: 0 } : {}),
                ...(mobileOpen && i === 2 ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}),
              }} />
            ))}
          </div>
        </button>
      </nav>

      {/* Mobile Drawer — full-width dropdown below navbar */}
      {mobileOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: 'fixed', top: 64, left: 0, right: 0,
            background: 'white', zIndex: 99,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            animation: 'fadeUp 0.25s ease',
            maxHeight: 'calc(100vh - 64px)', overflowY: 'auto',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ padding: '12px 16px' }}>
            {navLinks.map(l => (
              <NavLink
                key={l.to} to={l.to} end={l.to === '/'}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center',
                  padding: '0 16px',
                  minHeight: 48,
                  borderRadius: 10,
                  fontSize: 15, fontWeight: 600,
                  color: isActive ? '#2E7D32' : '#1B1B1B',
                  background: isActive ? '#E8F5E9' : 'transparent',
                  marginBottom: 4,
                  borderLeft: isActive ? '4px solid #2E7D32' : '4px solid transparent',
                  transition: 'all 0.15s',
                })}
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/download"
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 12, padding: '13px', minHeight: 48, width: '100%' }}
            >
              📱 Download APK
            </Link>
          </div>
        </div>
      )}

      {/* Backdrop overlay when drawer is open */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.2)', zIndex: 98,
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}
