import { Link } from 'react-router-dom'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Download APK', to: '/download' },
      { label: 'How It Works', to: '/how-it-works' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'AI Chatbot', to: '/chatbot' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQ', to: '/chatbot' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'About', to: '/' },
      { label: 'SDG Alignment', to: '/features' },
      { label: 'LPU Capstone', to: '/' },
    ],
  },
]

const socials = [
  { emoji: '🐙', label: 'GitHub', hoverBg: '#24292e', hoverColor: 'white' },
  { emoji: '🐦', label: 'Twitter', hoverBg: '#1DA1F2', hoverColor: 'white' },
  { emoji: '💼', label: 'LinkedIn', hoverBg: '#0077B5', hoverColor: 'white' },
  { emoji: '▶', label: 'YouTube', hoverBg: '#FF0000', hoverColor: 'white' },
]

export default function Footer() {
  return (
    <footer className="footer-section" style={{
      background: '#1B2B1C',
      padding: '48px 80px 20px',
      color: 'rgba(255,255,255,0.5)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle green dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #66BB6A 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div className="footer-grid" style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: 40, marginBottom: 32,
        position: 'relative', zIndex: 1,
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, background: '#2E7D32', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <rect x="2" y="7" width="18" height="13" rx="3" fill="rgba(255,255,255,0.4)"/>
                <rect x="8" y="2" width="6" height="11" rx="3" fill="rgba(255,255,255,0.7)"/>
                <circle cx="16.5" cy="15" r="5" fill="#66BB6A"/>
                <path d="M14 15l2 2 3.5-3.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700 }}>
                SmartDrug Inventory
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>For Clinics &amp; Pharmacies</div>
            </div>
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', maxWidth: 260 }}>
            A capstone project by Lovely Professional University, Dept. of CSE.
            Inspired by SIH 2024 problem statement SIH1627.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {['SDG 3', 'SDG 9', 'SDG 11', 'SDG 12'].map(s => (
              <span key={s} style={{
                background: 'rgba(102,187,106,0.15)',
                color: '#66BB6A',
                fontSize: 9, fontWeight: 700,
                padding: '3px 8px', borderRadius: 6,
              }}>{s}</span>
            ))}
          </div>
        </div>

        {cols.map(col => (
          <div key={col.title}>
            <div style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '.6px',
              marginBottom: 14,
            }}>{col.title}</div>
            {col.links.map(l => (
              <Link key={l.label} to={l.to} style={{
                display: 'block',
                fontSize: 13,
                color: 'rgba(255,255,255,0.45)',
                marginBottom: 9,
                transition: 'color .2s, transform .2s',
              }}
              onMouseEnter={e => { e.target.style.color = 'rgba(255,255,255,0.9)'; e.target.style.transform = 'translateX(3px)' }}
              onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.45)'; e.target.style.transform = '' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Social icons with brand colors */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 24,
        position: 'relative', zIndex: 1,
      }}>
        {socials.map(s => (
          <div key={s.label} style={{
            width: 36, height: 36, borderRadius: 9,
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, cursor: 'pointer', transition: 'all .2s', background: 'transparent',
          }}
          title={s.label}
          onMouseEnter={e => { e.currentTarget.style.background = s.hoverBg; e.currentTarget.style.borderColor = s.hoverBg; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = '' }}
          >{s.emoji}</div>
        ))}
      </div>

      <div className="footer-bottom" style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 11,
        position: 'relative', zIndex: 1,
      }}>
        <span>© 2026 SmartDrug Inventory · LPU CSE Capstone Project · SIH1627</span>
        <span>Made with ❤ for Indian Healthcare</span>
      </div>
    </footer>
  )
}
