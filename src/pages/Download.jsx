import { useRef } from 'react'
import { useMultiReveal, createRipple } from '../hooks/useScrollReveal'

const installSteps = [
  { n: 1, title: 'Download the APK file', desc: 'Click the Download button. The APK file (12.4 MB) will download to your phone\'s Downloads folder. Make sure you have a stable internet connection.' },
  { n: 2, title: 'Enable "Install from unknown sources"', desc: 'Go to Settings → Security → Enable "Install unknown apps". On Android 10+, select the browser you used and toggle "Allow from this source".' },
  { n: 3, title: 'Open the downloaded APK', desc: 'Open your Downloads folder or tap the notification. Find SmartDrug_Inventory_v1.0.0.apk and tap it to begin the installation process.' },
  { n: 4, title: 'Accept permissions & Install', desc: 'Tap "Install" when prompted. Required permissions: Notifications (FCM alerts), Storage (local backup), and Internet (Firebase sync).' },
  { n: 5, title: 'Launch & Sign Up', desc: 'Open SmartDrug Inventory from your app drawer. Create your account, set up your clinic profile, and start adding medicines immediately!', color: '#66BB6A' },
]

const appDetails = [
  { l: 'Version',       v: '1.0.0 (Build 100)' },
  { l: 'File Size',     v: '12.4 MB' },
  { l: 'Min Android',   v: 'Android 8.0 (API 26)' },
  { l: 'Architecture',  v: 'Kotlin · MVVM' },
  { l: 'Database',      v: 'Room DB (Offline)' },
  { l: 'Notifications', v: 'Firebase FCM' },
  { l: 'Released',      v: 'April 2026' },
]

const requirements = [
  { e: '📱', l: 'Android version', v: '8.0 (Oreo) or above' },
  { e: '💾', l: 'Storage',         v: '50 MB free space' },
  { e: '🌐', l: 'Internet',        v: 'Only for login & FCM alerts' },
  { e: '🔋', l: 'RAM',             v: '2 GB minimum recommended' },
]

export default function Download() {
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
        }}>Free · No Subscription</div>
        <h1 style={{ color: 'white', fontSize: 36, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.03em' }}>
          Download SmartDrug Inventory
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 15, maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
          Direct APK. Works on all Android 8.0+ devices. No Google Play required.
        </p>
      </div>

      {/* ── CONTENT ── */}
      <section className="features-section split-layout" style={{ padding: '60px 80px', display: 'grid', gridTemplateColumns: '340px 1fr', gap: 32 }}>
        {/* LEFT COLUMN */}
        <div className="split-left">
          {/* Phone preview */}
          <div className="reveal phone-preview" style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{
              width: 130, background: '#111', borderRadius: 24, padding: 8,
              boxShadow: '0 12px 36px rgba(0,0,0,0.25)',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #2E7D32, #388E3C)',
                borderRadius: 18, height: 220,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 10,
              }}>
                <div style={{
                  width: 56, height: 56, background: 'rgba(255,255,255,0.15)',
                  borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="32" height="32" viewBox="0 0 22 22" fill="none">
                    <rect x="2" y="7" width="18" height="13" rx="3" fill="rgba(255,255,255,0.4)"/>
                    <rect x="8" y="2" width="6" height="11" rx="3" fill="rgba(255,255,255,0.7)"/>
                    <circle cx="16.5" cy="15" r="5" fill="#66BB6A"/>
                    <path d="M14 15l2 2 3.5-3.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ color: 'white', fontFamily: 'Poppins,sans-serif', fontSize: 11, fontWeight: 700, textAlign: 'center' }}>SmartDrug</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, textAlign: 'center' }}>Inventory v1.0.0</div>
                <a
                  href="/app-debug.apk"
                  download="SmartDrug_Inventory_v1.0.0.apk"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white', fontSize: 9, padding: '5px 14px',
                    borderRadius: 8, fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >⬇ Download APK</a>
              </div>
            </div>
          </div>

          {/* App Details Card */}
          <div className="reveal card-noise" style={{
            background: 'white', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 2px 12px rgba(46,125,50,0.08)', overflow: 'hidden',
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
              <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, color: '#1B1B1B' }}>App Details</h3>
            </div>
            {appDetails.map((d, i) => (
              <div key={d.l} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '11px 20px',
                borderBottom: i < appDetails.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                background: i % 2 === 0 ? 'white' : 'rgba(232,245,233,0.25)',
              }}>
                <span style={{ fontSize: 12, color: '#6B7280' }}>{d.l}</span>
                <strong style={{ fontSize: 12, color: '#1B1B1B' }}>{d.v}</strong>
              </div>
            ))}

            <div style={{ padding: 20 }}>
              <a
                href="/app-debug.apk"
                download="SmartDrug_Inventory_v1.0.0.apk"
                className="ripple-btn btn-primary btn-pulse"
                onClickCapture={createRipple}
                style={{
                  width: '100%', padding: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  textDecoration: 'none',
                  boxSizing: 'border-box'
                }}
              >
                ⬇ Download APK (12.4 MB)
              </a>
              <div style={{ textAlign: 'center', fontSize: 10, color: '#bbb', marginTop: 10 }}>
                SHA-256 verified · Safe to install
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Install Guide */}
        <div className="reveal card-noise" style={{
          background: 'white', borderRadius: 16,
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 2px 12px rgba(46,125,50,0.08)',
          padding: 32,
        }}>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 22, fontWeight: 800, color: '#1B1B1B', marginBottom: 28 }}>
            Installation Guide
          </h2>

          {installSteps.map((step) => (
            <div key={step.n} style={{ display: 'flex', gap: 18, marginBottom: 24 }}>
              <div style={{
                width: 34, height: 34,
                borderRadius: '50%',
                background: step.color || '#2E7D32',
                color: 'white', fontSize: 14, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Poppins,sans-serif', flexShrink: 0,
                boxShadow: `0 2px 8px ${step.color || '#2E7D32'}44`,
              }}>{step.n}</div>
              <div>
                <h4 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, color: '#1B1B1B', marginBottom: 5 }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            </div>
          ))}

          {/* Requirements */}
          <div style={{ background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)', borderRadius: 14, padding: 20, marginTop: 10 }}>
            <h4 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, color: '#2E7D32', marginBottom: 14 }}>
              System Requirements
            </h4>
            {requirements.map(r => (
              <div key={r.l} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 16 }}>{r.e}</span>
                <span style={{ fontSize: 12, color: '#6B7280', minWidth: 120 }}>{r.l}:</span>
                <strong style={{ fontSize: 12, color: '#1B1B1B' }}>{r.v}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
