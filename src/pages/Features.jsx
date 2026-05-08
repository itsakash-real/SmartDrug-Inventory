import { useRef, useEffect, useState } from 'react'
import { useMultiReveal, createRipple } from '../hooks/useScrollReveal'

function AnimatedCheck({ visible }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" stroke="#C8E6C9" strokeWidth="1.5" fill="#E8F5E9" />
      <path
        d="M8 12l3 3 5-5"
        stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="24"
        strokeDashoffset={visible ? 0 : 24}
        style={{ transition: 'stroke-dashoffset 0.5s ease 0.2s' }}
      />
    </svg>
  )
}

function ModuleCard({ m, idx }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el) }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const accentColors = ['#2E7D32', '#1565C0', '#F9A825', '#D32F2F', '#2E7D32', '#7B1FA2']

  return (
    <div ref={ref} className="card-noise shimmer-card module-card" style={{
      background: 'white', borderRadius: 16, padding: 28,
      border: '1px solid rgba(0,0,0,0.06)',
      borderTop: `3px solid ${accentColors[idx % accentColors.length]}`,
      boxShadow: '0 2px 12px rgba(46,125,50,0.08)',
      transition: 'all 0.25s ease',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-3px) translateX(2px)'
      e.currentTarget.style.boxShadow = '0 8px 28px rgba(46,125,50,0.15)'
      e.currentTarget.style.borderLeft = `3px solid ${accentColors[idx % accentColors.length]}`
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = ''
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(46,125,50,0.08)'
      e.currentTarget.style.borderLeft = ''
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 46, height: 46,
          background: `radial-gradient(circle at 30% 30%, ${m.color}ee, ${m.color})`,
          borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, flexShrink: 0,
          boxShadow: `0 4px 12px ${m.color}44`,
        }}>{m.icon}</div>
        <div>
          <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 700, color: '#1B1B1B', marginBottom: 2 }}>{m.title}</h3>
          <div style={{ fontSize: 12, color: '#6B7280' }}>{m.sub}</div>
        </div>
      </div>
      <ul style={{ listStyle: 'none', marginBottom: 16 }}>
        {m.items.map((it, i) => (
          <li key={it} style={{
            fontSize: 12, color: '#6B7280', marginBottom: 7,
            paddingLeft: 0, lineHeight: 1.75,
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <AnimatedCheck visible={visible} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <span style={{
        display: 'inline-block', background: '#E8F5E9', color: '#2E7D32',
        fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 8,
      }}>{m.badge}</span>
    </div>
  )
}

const modules = [
  {
    icon: '🔐', title: 'User Authentication', sub: 'Secure access control',
    color: '#E8F5E9', badge: 'Firebase Auth',
    items: [
      'Email/phone login with Firebase Auth',
      'Google Sign-In (OAuth 2.0)',
      'OTP-based phone authentication',
      'Persistent login with Remember Me',
      'Role-based access (multi-user in CP-2)',
      'Password reset via email / OTP',
    ],
  },
  {
    icon: '🧾', title: 'Inventory Management', sub: 'Full drug catalog control',
    color: '#E3F2FD', badge: 'Room Database · Offline',
    items: [
      'Add medicines: name, batch, qty, expiry, supplier, category, price',
      'Edit / delete / archive medicines',
      'Search by name, batch, supplier (full-text)',
      'Filter chips: Safe / Near-Expiry / Critical',
      'Sort by expiry, name, quantity, category',
      'Min. stock threshold per medicine',
    ],
  },
  {
    icon: '⏰', title: 'Expiry Tracking', sub: '3-tier automated alerts',
    color: '#FFF8E1', badge: 'Auto-scheduled Alerts',
    items: [
      'Automated monitoring of all expiry dates',
      'Tier 1: 30-day Notice (blue)',
      'Tier 2: 15-day Warning (amber)',
      'Tier 3: 7-day Critical (red)',
      'Color-coded status pills on all cards',
      'Alert schedule auto-set on medicine entry',
    ],
  },
  {
    icon: '🔔', title: 'Push Notifications', sub: 'Firebase Cloud Messaging',
    color: '#FFEBEE', badge: 'FCM · Android 8.0+',
    items: [
      'Real-time push delivery via Firebase FCM',
      'Works even when app is closed or in background',
      'Configurable quiet hours',
      'Per-tier toggle: 30d/15d/7d notifications can be turned on/off',
      'Low-stock alerts with restock shortcut',
      'Alert history log with timestamps',
    ],
  },
  {
    icon: '📊', title: 'Analytics Dashboard', sub: 'Data-driven insights',
    color: '#E8F5E9', badge: 'MPAndroidChart',
    items: [
      'Bar chart: monthly drug usage (units dispensed)',
      'Donut chart: drug category distribution',
      'Line chart: stock level trends over the month',
      'Most used drug & most expired drug cards',
      'Total inventory value in ₹',
      'Weekly / Monthly / Quarterly filters',
    ],
  },
  {
    icon: '🏢', title: 'Vendor Management', sub: 'Supplier & purchase records',
    color: '#F3E5F5', badge: 'Integrated Module',
    items: [
      'Add / manage vendor profiles (name, contact, address)',
      'Link medicines to vendors on entry',
      'Purchase order records per vendor',
      'Transaction history log',
      'Restock shortcut directly from alert screen',
      '18+ active vendor slots supported',
    ],
  },
]

const comparison = [
  ['Data Management',    'Manual / Paper-based',         'Digital Android App'],
  ['Expiry Tracking',   'Manual inspection only',        'Automated 30/15/7 day alerts'],
  ['Stock Monitoring',  'Reactive — after stockout',     'Proactive configurable threshold'],
  ['Push Notifications','Not available',                 'Firebase FCM real-time'],
  ['Analytics',         'Not available',                 'Visual charts + insights'],
  ['Vendor Management', 'Separate registers',            'Integrated in same app'],
  ['Data Accuracy',     'Error-prone manual entry',      'Validated form-based entry'],
  ['Cost',              'Low paper, high waste cost',    'Near-zero cost, free tier cloud'],
]

export default function Features() {
  const containerRef = useRef(null)
  useMultiReveal('.reveal', containerRef)

  return (
    <div ref={containerRef}>
      {/* ── HERO ── */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        padding: '56px 80px', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.18)',
          color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700,
          padding: '5px 14px', borderRadius: 20, marginBottom: 14,
        }}>Complete Feature Set</div>
        <h1 style={{ color: 'white', fontSize: 36, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.03em' }}>
          Built for Pharmacists, by Engineers
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 15, maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
          7 core modules covering every aspect of pharmaceutical inventory
          management for small clinics and pharmacies.
        </p>
      </div>

      {/* ── MODULES ── */}
      <section className="features-section" style={{ padding: '64px 80px' }}>
        <div className="modules-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {modules.map((m, idx) => <ModuleCard key={m.title} m={m} idx={idx} />)}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── COMPARISON ── */}
      <section className="reveal features-section" style={{ padding: '64px 80px 72px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1B1B1B', marginBottom: 12 }}>Existing vs Proposed System</h2>
          <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.75 }}>How SmartDrug Inventory transforms the status quo</p>
        </div>
        <div className="comparison-scroll">
          <div className="card-noise comparison-table" style={{ background: 'white', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(46,125,50,0.08)' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr',
              background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '14px 24px',
            }}>
              {['Feature', 'Existing System (Manual)', 'Proposed System (SmartDrug)'].map(h => (
                <div key={h} style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {comparison.map(([feat, old, nw], i) => (
              <div key={feat} style={{
                display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr',
                padding: '14px 24px',
                background: i % 2 === 0 ? 'white' : 'rgba(232,245,233,0.35)',
                borderBottom: '1px solid rgba(0,0,0,0.04)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,245,233,0.6)'}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'white' : 'rgba(232,245,233,0.35)'}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1B1B1B' }}>{feat}</div>
                <div style={{ fontSize: 12, color: '#D32F2F', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>✗</span> {old}
                </div>
                <div style={{ fontSize: 12, color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 700 }}>✓</span> {nw}
                </div>
              </div>
            ))}
          </div>
          <div className="comparison-hint" style={{ display: 'none', textAlign: 'center', fontSize: 11, color: '#6B7280', marginTop: 10 }}>← Scroll to see full table</div>
        </div>
      </section>

      {/* ── OFFLINE BANNER ── */}
      <div className="reveal cta-strip" style={{
        background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)', padding: '28px 80px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 18, fontWeight: 700, color: '#2E7D32', marginBottom: 5 }}>
            100% offline for core features
          </h3>
          <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.75 }}>
            Room Database stores all data locally on device. Internet only needed for login and FCM alerts.
          </p>
        </div>
        <a href="/download" className="btn-primary ripple-btn btn-pulse" onClick={createRipple} style={{
          display: 'flex', alignItems: 'center', gap: 8, position: 'relative', overflow: 'hidden',
        }}>📱 Download Now</a>
      </div>
    </div>
  )
}
