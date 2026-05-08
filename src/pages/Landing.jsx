import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useScrollReveal, useMultiReveal, createRipple } from '../hooks/useScrollReveal'

/* ── Phone Mockup SVG ── */
function PhoneMockup() {
  return (
    <div className="phone-mockup" style={{
      width: 160, background: '#111', borderRadius: 28,
      padding: 9, boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
      flexShrink: 0, position: 'relative', zIndex: 2,
    }}>
      <div style={{ background: '#F5F7F6', borderRadius: 20, overflow: 'hidden', minHeight: 280 }}>
        <div style={{ background: '#2E7D32', padding: '12px 12px 8px' }}>
          <div style={{ color: 'white', fontSize: 9, fontWeight: 700, marginBottom: 2 }}>Dashboard · Dr. Ravi 👋</div>
          <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 8 }}>30 April 2026</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, padding: 8 }}>
          {[
            { v: '248', l: 'Medicines', c: '#2E7D32' },
            { v: '12',  l: 'Expiring',  c: '#F9A825' },
            { v: '5',   l: 'Low Stock', c: '#D32F2F' },
            { v: '18',  l: 'Vendors',   c: '#1565C0' },
          ].map(s => (
            <div key={s.l} style={{
              background: 'white', borderRadius: 9, padding: '8px 10px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.c, fontFamily: 'Poppins,sans-serif' }}>{s.v}</div>
              <div style={{ fontSize: 8, color: '#6B7280' }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 8px 8px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#1B1B1B', marginBottom: 5 }}>Active Alerts</div>
          {[
            { t: '🔴 Paracetamol — 3 days left', c: '#FFEBEE', b: '#D32F2F' },
            { t: '🟡 Amoxicillin — Low stock', c: '#FFF8E1', b: '#F9A825' },
          ].map((a, i) => (
            <div key={i} style={{
              background: a.c, borderLeft: `3px solid ${a.b}`,
              borderRadius: 7, padding: '5px 8px',
              fontSize: 8, fontWeight: 600, color: '#1B1B1B',
              marginBottom: 5,
            }}>{a.t}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Count-Up Stat ── */
function CountStat({ value, label }) {
  const ref = useRef(null)
  const [displayed, setDisplayed] = useState('0')
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        obs.unobserve(el)
        const numMatch = value.match(/^[\d,]+/)
        if (!numMatch) { setDisplayed(value); return }
        const num = parseInt(numMatch[0].replace(/,/g, ''))
        const suffix = value.replace(/^[\d,]+/, '')
        const start = performance.now()
        const dur = 1400
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplayed(Math.floor(num * eased).toLocaleString() + suffix)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])
  return (
    <div ref={ref}>
      <div style={{ color: 'white', fontSize: 22, fontWeight: 800, fontFamily: 'Poppins,sans-serif' }}>{displayed}</div>
      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>{label}</div>
    </div>
  )
}

const feats = [
  { icon: '🧾', title: 'Inventory Management',  desc: 'Add, edit, track 248+ medicines with batch numbers, categories, quantities & suppliers.', tag: '#E8F5E9', accent: '#2E7D32', items: ['Full medicine catalog', 'Batch & lot tracking', 'Search & filter'] },
  { icon: '⏰', title: 'Expiry Tracking',        desc: '3-tier automated alerts at 30, 15, and 7 days before expiry. Never miss a critical date.', tag: '#FFF8E1', accent: '#F9A825', items: ['30 / 15 / 7 day alerts', 'Color-coded priority', 'Auto-scheduled'] },
  { icon: '📊', title: 'Analytics Dashboard',    desc: 'Visual insights on drug usage, category distribution, stock trends, and inventory value.', tag: '#E3F2FD', accent: '#1565C0', items: ['Bar & pie charts', 'Usage trends', 'Waste metrics'] },
  { icon: '🔔', title: 'Smart Alerts',           desc: 'Firebase Cloud Messaging delivers real-time push alerts even when the app is closed.', tag: '#FFEBEE', accent: '#D32F2F', items: ['FCM push alerts', 'Configurable tiers', 'Restock shortcuts'] },
]

const stats = [
  { v: '1M+',   l: 'Pharmacies in India' },
  { v: '4–5%',  l: 'Expired medicines rate' },
  { v: '600M+', l: 'Android users in India' },
  { v: 'Zero',  l: 'Hardware needed' },
]

export default function Landing() {
  const containerRef = useRef(null)
  useMultiReveal('.reveal', containerRef)

  return (
    <div ref={containerRef}>
      {/* ── HERO ── */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 55%, #388E3C 100%)',
        padding: '72px 80px 56px',
        display: 'grid', gridTemplateColumns: '1fr auto',
        gap: 60, alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        minHeight: 520,
      }}>
        {/* Animated gradient mesh blobs */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-5%', width: 400, height: 400,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(102,187,106,0.25), transparent 70%)',
          animation: 'meshMove 12s ease-in-out infinite', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-15%', left: '10%', width: 350, height: 350,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,168,37,0.12), transparent 70%)',
          animation: 'meshMove 15s ease-in-out infinite reverse', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '30%', width: 250, height: 250,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)',
          animation: 'meshMove 10s ease-in-out infinite 2s', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)',
            fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 20,
            marginBottom: 20, backdropFilter: 'blur(8px)',
          }}>
            🏆 SIH 2024 · Problem SIH1627
          </div>

          <h1 style={{
            color: 'white', fontSize: 44, fontWeight: 900,
            lineHeight: 1.18, marginBottom: 18, maxWidth: 560,
            letterSpacing: '-0.03em',
          }}>
            Smart Drug Inventory &amp;<br />
            <span className="text-gradient" style={{
              background: 'linear-gradient(135deg, #66BB6A, #A5D6A7, #81C784)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Expiry Tracking</span> System
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.78)', fontSize: 16,
            lineHeight: 1.75, marginBottom: 32, maxWidth: 500,
          }}>
            A mobile-first health-tech platform that digitizes pharmaceutical
            inventory for small clinics and pharmacies across India. Offline-capable,
            automated alerts, and powerful analytics — no hardware needed.
          </p>

          <div className="hero-buttons" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
            <Link to="/download" className="ripple-btn btn-pulse" onClick={createRipple} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'white', color: '#2E7D32',
              padding: '13px 26px', borderRadius: 12,
              fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 16px rgba(0,0,0,0.15)',
              transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
            }}>
              📱 Download App Free
            </Link>
            <Link to="/how-it-works" className="ripple-btn" onClick={createRipple} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent', color: 'white',
              padding: '13px 26px', borderRadius: 12,
              fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700,
              border: '2px solid rgba(255,255,255,0.45)',
              transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
            }}>
              ▶ How It Works
            </Link>
          </div>

          <div className="stats-grid" style={{ display: 'flex', gap: 36 }}>
            {stats.map(s => <CountStat key={s.l} value={s.v} label={s.l} />)}
          </div>
        </div>

        {/* Phone mockup + floating alerts */}
        <div className="hero-phone-wrap" style={{ position: 'relative', paddingRight: 50, paddingTop: 10, paddingBottom: 10, zIndex: 2 }}>
          <PhoneMockup />
          <div className="hero-float-card" style={{
            position: 'absolute', top: 0, right: 10,
            background: 'white', borderRadius: 12, padding: '9px 14px',
            boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
            fontSize: 11, minWidth: 150, zIndex: 3,
            animation: 'float 3s ease-in-out infinite',
          }}>
            <div style={{ fontWeight: 700, color: '#D32F2F', marginBottom: 2 }}>⚠ Expiry Alert</div>
            <div style={{ color: '#6B7280', fontSize: 10 }}>Aspirin 75mg · 5 days left</div>
          </div>
          <div className="hero-float-card" style={{
            position: 'absolute', bottom: 20, right: 0,
            background: '#E8F5E9', borderRadius: 12, padding: '9px 14px',
            boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
            fontSize: 11, minWidth: 150, zIndex: 3,
            animation: 'float 3.5s ease-in-out infinite 0.5s',
          }}>
            <div style={{ fontWeight: 700, color: '#2E7D32', marginBottom: 2 }}>✅ Restocked!</div>
            <div style={{ color: '#6B7280', fontSize: 10 }}>Amoxicillin 250mg · +500 units</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 3,
        }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>Scroll</span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ animation: 'scrollArrow 1.5s ease-in-out infinite' }}>
            <path d="M8 2v14M2 12l6 6 6-6" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust-bar" style={{
        background: 'white', padding: '14px 80px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', gap: 32,
      }}>
        <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, whiteSpace: 'nowrap' }}>
          ALIGNED WITH ·
        </span>
        {[
          { e: '🎯', t: 'SDG 3 — Good Health' },
          { e: '🏗', t: 'SDG 9 — Innovation' },
          { e: '♻',  t: 'SDG 12 — Responsible Production' },
          { e: '🏙', t: 'SDG 11 — Sustainable Cities' },
        ].map(s => (
          <div key={s.t} className="sdg-item" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>{s.e}</span>
            <span style={{ fontSize: 12, color: '#6B7280' }}>{s.t}</span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', background: '#E8F5E9', padding: '5px 14px', borderRadius: 9 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#2E7D32' }}>LPU Capstone · 2024–25</span>
        </div>
      </div>

      {/* ── SECTION DIVIDER ── */}
      <hr className="section-divider" />

      {/* ── FEATURES OVERVIEW ── */}
      <section className="features-section" style={{ padding: '72px 80px' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', background: '#E8F5E9', color: '#2E7D32',
            fontSize: 11, fontWeight: 700, padding: '5px 14px', borderRadius: 20, marginBottom: 12,
          }}>Core Features</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1B1B1B', marginBottom: 16 }}>
            Everything a Pharmacy Needs
          </h2>
          <p style={{ fontSize: 15, color: '#6B7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>
            Built specifically for small clinics and pharmacies in India — offline-first,
            simple to use, and packed with intelligent automation.
          </p>
        </div>

        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {feats.map((f, idx) => (
            <div key={f.title} className="reveal card-noise shimmer-card" style={{
              background: 'white', borderRadius: 16, padding: 24,
              border: '1px solid rgba(0,0,0,0.06)',
              borderTop: `3px solid ${f.accent}`,
              boxShadow: '0 2px 12px rgba(46,125,50,0.08)',
              transition: 'all 0.25s ease',
              transitionDelay: `${idx * 0.05}s`,
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px) translateX(2px)'
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(46,125,50,0.15)'
              e.currentTarget.style.borderLeft = `3px solid ${f.accent}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(46,125,50,0.08)'
              e.currentTarget.style.borderLeft = ''
            }}
            >
              <div style={{
                width: 46, height: 46, background: `radial-gradient(circle at 30% 30%, ${f.tag}, ${f.tag}dd)`,
                borderRadius: 12, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, marginBottom: 14,
              }}>{f.icon}</div>
              <h4 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#1B1B1B' }}>{f.title}</h4>
              <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.75, marginBottom: 14 }}>{f.desc}</p>
              <ul style={{ listStyle: 'none' }}>
                {f.items.map(it => (
                  <li key={it} style={{ fontSize: 11, color: '#6B7280', marginBottom: 5, paddingLeft: 14, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#2E7D32', fontWeight: 700 }}>✓</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION DIVIDER ── */}
      <hr className="section-divider" />

      {/* ── CTA STRIP ── */}
      <section className="reveal cta-strip" style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        padding: '52px 80px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <h2 style={{ color: 'white', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Ready to digitize your pharmacy?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15 }}>
            Free Android app. No hardware. No subscription. Works offline.
          </p>
        </div>
        <div className="cta-buttons" style={{ display: 'flex', gap: 14 }}>
          <Link to="/download" className="ripple-btn btn-pulse" onClick={createRipple} style={{
            background: 'white', color: '#2E7D32', padding: '13px 26px',
            borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 12px rgba(0,0,0,0.15)',
            position: 'relative', overflow: 'hidden',
          }}>📱 Download APK</Link>
          <Link to="/features" className="ripple-btn" onClick={createRipple} style={{
            background: 'transparent', color: 'white', padding: '13px 26px',
            borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700,
            border: '2px solid rgba(255,255,255,0.45)',
            display: 'flex', alignItems: 'center', gap: 8,
            position: 'relative', overflow: 'hidden',
          }}>View All Features →</Link>
        </div>
      </section>
    </div>
  )
}
