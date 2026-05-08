import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { createRipple } from '../hooks/useScrollReveal'

const steps = [
  { n: 1, title: 'Download & Install', desc: 'Download the APK from this website. Enable "Install from unknown sources" in Android settings. Install the app on your Android 8.0+ smartphone.', details: ['Download APK from smartdruginventory.in/download (12.4 MB)', 'Settings → Security → Enable "Install from unknown sources"', 'Tap the downloaded APK to begin installation', 'No Google Play Store required · Works immediately after install'], icon: '📥' },
  { n: 2, title: 'Create Your Account', desc: 'Sign up with your email, phone number, or Google account. Enter your clinic name and location. Ready in under 60 seconds.', details: ['Email / Phone / Google Sign-In supported', 'Set up clinic name, address, and location', 'Firebase Auth handles secure authentication', 'Persistent login with Remember Me option'], icon: '👤' },
  { n: 3, title: 'Add Your Medicines', desc: 'Tap the + button on the Inventory screen. Enter medicine name, batch number, quantity, expiry date, category, supplier, and unit price.', details: ['Fill validated form with name, batch, qty, expiry', 'Select category from dropdown (Analgesic, Antibiotic, etc.)', 'Pick supplier from vendor list', 'Alert schedule auto-set at 30, 15, 7 days before expiry'], icon: '💊' },
  { n: 4, title: 'Receive Smart Alerts', desc: 'Firebase Cloud Messaging pushes real-time notifications to your phone as expiry dates approach or stock falls below your threshold.', details: ['🔴 Critical: 7-day expiry alert (red)', '🟡 Warning: 15-day expiry alert (amber)', '🔵 Notice: 30-day expiry alert (blue)', 'Low-stock alerts with one-tap restock button'], icon: '🔔' },
  { n: 5, title: 'Monitor & Analyse', desc: 'Visit the Analytics dashboard for insights on drug usage, category distribution, stock trends, and inventory value. Make data-driven decisions.', details: ['Bar chart: monthly drug usage trends', 'Donut chart: drug category distribution', 'Key insights: most used drug, waste %, inventory value', 'Week / Month / Quarter time filters'], icon: '📊' },
]

function StepCard({ step, side }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el) }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="card-noise shimmer-card step-card" style={{
      background: 'white', borderRadius: 16, padding: 28,
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 2px 12px rgba(46,125,50,0.08)',
      ...(side === 'left' ? { marginRight: 24 } : { marginLeft: 24 }),
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : `translateX(${side === 'left' ? '-40px' : '40px'})`,
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    }}>
      <StepContent step={step} />
    </div>
  )
}

function StepNumber({ n }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 24 }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 48, height: 48, borderRadius: '50%',
          background: '#2E7D32', color: 'white',
          fontSize: 20, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Poppins,sans-serif',
          position: 'relative', zIndex: 1,
          boxShadow: '0 4px 16px rgba(46,125,50,0.3)',
        }}
      >
        {/* Rotating border ring */}
        <div style={{
          position: 'absolute', inset: -5,
          borderRadius: '50%',
          border: '2px dashed #66BB6A',
          opacity: hovered ? 1 : 0,
          animation: hovered ? 'rotateBorder 3s linear infinite' : 'none',
          transition: 'opacity 0.3s',
        }} />
        {/* Outer glow ring */}
        <div style={{
          position: 'absolute', inset: -3,
          borderRadius: '50%',
          background: 'transparent',
          boxShadow: '0 0 0 3px #E8F5E9',
        }} />
        {n}
      </div>
    </div>
  )
}

function AnimatedTimeline() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const anim = () => {
          const rect = el.getBoundingClientRect()
          const vh = window.innerHeight
          const total = rect.height
          const visible = Math.min(vh - rect.top, total)
          setProgress(Math.max(0, Math.min(1, visible / total)))
        }
        window.addEventListener('scroll', anim, { passive: true })
        anim()
        return () => window.removeEventListener('scroll', anim)
      }
    }, { threshold: 0 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="timeline-line" style={{
      position: 'absolute', left: '50%', top: 0, bottom: 0,
      width: 2, transform: 'translateX(-50%)',
      background: '#E8F5E9',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%',
        height: `${progress * 100}%`,
        background: 'linear-gradient(to bottom, #2E7D32, #66BB6A)',
        transition: 'height 0.1s linear',
      }} />
    </div>
  )
}

export default function HowItWorks() {
  return (
    <div>
      {/* ── HERO ── */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        padding: '56px 80px', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.18)',
          color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700,
          padding: '5px 14px', borderRadius: 20, marginBottom: 14,
        }}>Simple 5-Step Process</div>
        <h1 style={{ color: 'white', fontSize: 36, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.03em' }}>
          How SmartDrug Inventory Works
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 15, maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
          From installation to automated alerts — get your pharmacy digital in under 10 minutes.
        </p>
      </div>

      {/* ── STEPS TIMELINE ── */}
      <section className="features-section timeline-section" style={{ padding: '72px 80px' }}>
        <div className="timeline-wrapper" style={{ position: 'relative' }}>
          <AnimatedTimeline />
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={step.n} className="timeline-step" style={{
                display: 'grid', gridTemplateColumns: '1fr 80px 1fr',
                gap: 0, marginBottom: 48, alignItems: 'start',
              }}>
                {isLeft ? <StepCard step={step} side="left" /> : <div className="step-empty" />}
                <div className="step-number-col">
                  <StepNumber n={step.n} />
                </div>
                {!isLeft ? <StepCard step={step} side="right" /> : <div className="step-empty" />}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-strip" style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        padding: '40px 80px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            Get started in under 10 minutes →
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.75 }}>Free APK · No hardware · Works offline</p>
        </div>
        <Link to="/download" className="ripple-btn btn-pulse" onClick={createRipple} style={{
          background: 'white', color: '#2E7D32',
          padding: '13px 26px', borderRadius: 12,
          fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 12px rgba(0,0,0,0.15)',
          position: 'relative', overflow: 'hidden',
        }}>📱 Download APK Free</Link>
      </div>
    </div>
  )
}

function StepContent({ step }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40,
          background: 'radial-gradient(circle at 30% 30%, #E8F5E9, #C8E6C9)',
          borderRadius: 11,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          boxShadow: '0 2px 8px rgba(46,125,50,0.12)',
        }}>{step.icon}</div>
        <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, fontWeight: 700, color: '#1B1B1B' }}>
          {step.title}
        </h3>
      </div>
      <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.75, marginBottom: 16 }}>{step.desc}</p>
      <div style={{ background: '#F5F7F6', borderRadius: 10, padding: 14 }}>
        {step.details.map(d => (
          <div key={d} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#66BB6A', marginTop: 7, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.75 }}>{d}</span>
          </div>
        ))}
      </div>
    </>
  )
}
