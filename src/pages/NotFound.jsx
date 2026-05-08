import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '60px 24px',
      textAlign: 'center', background: 'var(--bg)',
    }}>
      <div style={{
        width: 80, height: 80, background: '#2E7D32', borderRadius: 22,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28, boxShadow: '0 8px 32px rgba(46,125,50,0.25)',
      }}>
        <svg width="44" height="44" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="7" width="18" height="13" rx="3" fill="rgba(255,255,255,0.4)"/>
          <rect x="8" y="2" width="6" height="11" rx="3" fill="rgba(255,255,255,0.7)"/>
          <circle cx="16.5" cy="15" r="5" fill="#66BB6A"/>
          <path d="M14 15l2 2 3.5-3.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 style={{
        fontSize: 72, fontWeight: 900, letterSpacing: '-0.03em',
        background: 'linear-gradient(135deg, #2E7D32, #66BB6A)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 12,
      }}>404</h1>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1B1B1B', marginBottom: 12 }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: 15, color: '#6B7280', maxWidth: 400, marginBottom: 32, lineHeight: 1.75 }}>
        The page you're looking for doesn't exist or has been moved.
        Let's get you back to managing your inventory.
      </p>
      <Link to="/" className="btn-primary ripple-btn" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '14px 32px', fontSize: 15,
      }}>
        ← Back to Home
      </Link>
    </div>
  )
}
