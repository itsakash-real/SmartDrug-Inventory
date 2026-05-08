import { useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useMultiReveal, createRipple } from '../hooks/useScrollReveal'

const contactInfo = [
  { icon: '🎓', bg: '#E8F5E9', title: 'Lovely Professional University', lines: ['Department of Computer Science & Engineering', 'Phagwara, Punjab – 144001'] },
  { icon: '✉', bg: '#E3F2FD', title: 'Project Email', lines: ['smartdrug@lpu.ac.in', 'capstone.cse@lpu.ac.in'] },
  { icon: '📞', bg: '#FFF8E1', title: 'Supervisor Contact', lines: ['Available through university portal', 'Mon – Fri, 10 AM – 5 PM'] },
  { icon: '📍', bg: '#FFEBEE', title: 'Campus Location', lines: ['LPU Campus, Jalandhar – Delhi National Highway', 'Phagwara, Punjab, India'] },
]

const categories = ['', 'General Inquiry', 'Bug Report', 'Feature Request', 'Installation Help', 'Project Collaboration']
const projectLinks = [
  { icon: '💻', label: 'GitHub Repository', href: 'https://github.com/Akshayver123/SmartDrugInventory' },
  { icon: '📄', label: 'Project Report PDF', href: '/CapstoneReport.pdf' },
  { icon: '🎥', label: 'Demo Video', href: '#' },
]
const socials = [
  { emoji: '🐙', hoverBg: '#24292e' }, { emoji: '🐦', hoverBg: '#1DA1F2' },
  { emoji: '💼', hoverBg: '#0077B5' }, { emoji: '▶', hoverBg: '#FF0000' },
]

const inputBase = {
  width: '100%', border: '1.5px solid #e8e8e8', borderRadius: 10,
  padding: '14px 14px 10px', fontSize: 13, color: '#1B1B1B',
  fontFamily: 'DM Sans, sans-serif', outline: 'none', background: 'white',
  transition: 'border-color .2s, box-shadow .2s',
}

function FloatingField({ label, name, type = 'text', required, value, onChange, as, rows }) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value
  const Tag = as || 'input'
  return (
    <div style={{ position: 'relative' }}>
      <Tag
        name={name} type={type} required={required} value={value} onChange={onChange}
        placeholder=" " rows={rows}
        style={{
          ...inputBase,
          ...(as === 'textarea' ? { resize: 'vertical', minHeight: 100 } : {}),
          borderColor: focused ? '#66BB6A' : '#e8e8e8',
          boxShadow: focused ? '0 0 0 3px rgba(102,187,106,0.12)' : 'none',
          background: focused ? '#FAFFF9' : 'white',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label style={{
        position: 'absolute', left: 14,
        top: isActive ? -8 : as === 'textarea' ? 14 : '50%',
        transform: isActive ? 'none' : as === 'textarea' ? 'none' : 'translateY(-50%)',
        fontSize: isActive ? 10 : 13,
        fontWeight: isActive ? 700 : 400,
        color: isActive ? '#2E7D32' : '#6B7280',
        background: 'white', padding: '0 4px',
        transition: 'all 0.2s ease', pointerEvents: 'none',
      }}>
        {label}{required && <span style={{ color: '#D32F2F' }}> *</span>}
      </label>
    </div>
  )
}

function FloatingSelect({ label, name, required, value, onChange, options }) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value
  return (
    <div style={{ position: 'relative' }}>
      <select name={name} required={required} value={value} onChange={onChange}
        style={{
          ...inputBase, cursor: 'pointer', appearance: 'none',
          borderColor: focused ? '#66BB6A' : '#e8e8e8',
          boxShadow: focused ? '0 0 0 3px rgba(102,187,106,0.12)' : 'none',
          background: focused ? '#FAFFF9' : 'white',
        }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      >
        <option value="">Select…</option>
        {options.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <label style={{
        position: 'absolute', left: 14,
        top: isActive ? -8 : '50%',
        transform: isActive ? 'none' : 'translateY(-50%)',
        fontSize: isActive ? 10 : 13,
        fontWeight: isActive ? 700 : 400,
        color: isActive ? '#2E7D32' : '#6B7280',
        background: 'white', padding: '0 4px',
        transition: 'all 0.2s ease', pointerEvents: 'none',
      }}>
        {label}{required && <span style={{ color: '#D32F2F' }}> *</span>}
      </label>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', clinic: '', category: '', subject: '', message: '', consent: false })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const containerRef = useRef(null)
  useMultiReveal('.reveal', containerRef)

  const progress = useMemo(() => {
    const fields = ['name', 'email', 'category', 'subject', 'message']
    const filled = fields.filter(f => form[f]).length
    return Math.round((filled / fields.length) * 100)
  }, [form])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setForm({ name: '', email: '', phone: '', clinic: '', category: '', subject: '', message: '', consent: false })
    }, 1500)
  }

  return (
    <div ref={containerRef}>
      <div className="hero-section" style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', padding: '56px 80px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700, padding: '5px 14px', borderRadius: 20, marginBottom: 14 }}>Get In Touch</div>
        <h1 style={{ color: 'white', fontSize: 36, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.03em' }}>Contact &amp; Feedback</h1>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 15, maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>Questions, bug reports, or feedback? We'd love to hear from you.</p>
      </div>

      <section className="features-section split-layout" style={{ padding: '60px 80px', display: 'grid', gridTemplateColumns: '340px 1fr', gap: 32 }}>
        {/* LEFT */}
        <div className="split-left">
          <div className="reveal card-noise" style={{ background: 'white', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(46,125,50,0.08)', overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '16px 22px', borderBottom: '1px solid #f0f0f0' }}>
              <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, color: '#1B1B1B' }}>Project Contact</h3>
            </div>
            {contactInfo.map(c => (
              <div key={c.title} style={{ display: 'flex', gap: 14, padding: '14px 22px', borderBottom: '1px solid #f8f8f8', alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 12, fontWeight: 700, color: '#1B1B1B', marginBottom: 3 }}>{c.title}</div>
                  {c.lines.map(l => <div key={l} style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.75 }}>{l}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="reveal card-noise" style={{ background: 'white', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(46,125,50,0.08)', padding: 20 }}>
            <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 700, color: '#1B1B1B', marginBottom: 14 }}>Project Links</div>
            {projectLinks.map(l => (
              <a key={l.label} href={l.href} target={l.href !== '#' ? "_blank" : undefined} rel={l.href !== '#' ? "noopener noreferrer" : undefined} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#F5F7F6', borderRadius: 10, marginBottom: 8, cursor: 'pointer', transition: 'background .15s', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E8F5E9'} onMouseLeave={e => e.currentTarget.style.background = '#F5F7F6'}>
                <span style={{ fontSize: 16 }}>{l.icon}</span>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#1B1B1B' }}>{l.label}</span>
                <span style={{ fontSize: 12, color: '#2E7D32', fontWeight: 700 }}>→</span>
              </a>
            ))}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 12, fontWeight: 700, color: '#1B1B1B', marginBottom: 10 }}>Follow the Project</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {socials.map(s => (
                  <div key={s.emoji} style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid rgba(0,0,0,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer', transition: 'all .2s', background: 'white' }}
                    onMouseEnter={e => { e.currentTarget.style.background = s.hoverBg; e.currentTarget.style.borderColor = s.hoverBg; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.09)'; e.currentTarget.style.transform = '' }}
                  >{s.emoji}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Contact Form */}
        <div className="reveal card-noise" style={{ background: 'white', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(46,125,50,0.08)', padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 22, fontWeight: 800, color: '#1B1B1B' }}>Send Us a Message</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 80, height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: progress === 100 ? '#2E7D32' : 'linear-gradient(90deg, #66BB6A, #2E7D32)', borderRadius: 3, transition: 'width 0.3s ease' }} />
              </div>
              <span style={{ fontSize: 10, color: '#6B7280', fontWeight: 700 }}>{progress}%</span>
            </div>
          </div>

          {submitted && (
            <div style={{ background: '#E8F5E9', border: '1.5px solid #C8E6C9', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeUp .3s ease' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2E7D32"/><path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="24" style={{ animation: 'drawCheck 0.5s ease forwards' }}/></svg>
              <div>
                <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, color: '#2E7D32', fontSize: 13 }}>Message sent successfully!</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>We'll get back to you within 24–48 hours.</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <FloatingField label="Full Name" name="name" required value={form.name} onChange={handleChange} />
              <FloatingField label="Email Address" name="email" type="email" required value={form.email} onChange={handleChange} />
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <FloatingField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
              <FloatingField label="Clinic / Pharmacy Name" name="clinic" value={form.clinic} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <FloatingSelect label="Category" name="category" required value={form.category} onChange={handleChange} options={categories} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <FloatingField label="Subject" name="subject" required value={form.subject} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <FloatingField label="Message" name="message" required value={form.message} onChange={handleChange} as="textarea" rows={5} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#2E7D32' }} />
              <span style={{ fontSize: 12, color: '#6B7280' }}>I agree to be contacted via email regarding my inquiry</span>
            </div>
            <button type="submit" disabled={submitting} className="ripple-btn btn-primary" onClickCapture={createRipple} style={{
              width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: submitting ? 0.8 : 1,
            }}>
              {submitting ? (
                <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spinnerRotate 0.6s linear infinite' }} /> Sending…</>
              ) : 'Send Message →'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 11, color: '#bbb', marginTop: 12 }}>
              We typically respond within 24–48 hours on working days.{' '}
              <Link to="/chatbot" style={{ color: '#2E7D32', fontWeight: 600 }}>Use AI Chatbot</Link> for instant help.
            </p>
          </form>
        </div>
      </section>

      <div className="reveal cta-strip" style={{ background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)', padding: '28px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, fontWeight: 700, color: '#2E7D32', marginBottom: 4 }}>Need instant help?</h3>
          <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.75 }}>Our AI chatbot is available 24/7 and can answer most questions immediately.</p>
        </div>
        <Link to="/chatbot" className="btn-primary ripple-btn" onClick={createRipple} style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', overflow: 'hidden' }}>🤖 Open AI Chatbot →</Link>
      </div>
    </div>
  )
}
