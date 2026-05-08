import { useState, useRef, useEffect } from 'react'
import { createRipple } from '../hooks/useScrollReveal'
import useWindowWidth from '../hooks/useWindowWidth'

const SYSTEM_PROMPT = `You are the official AI assistant for "Smart Drug Inventory & Expiry Tracking System" — a capstone project by Lovely Professional University (LPU), Department of Computer Science and Engineering, Phagwara, Punjab – 144001. Academic Year: 2024–2025. Inspired by Smart India Hackathon 2024 problem statement SIH1627.

You ONLY answer questions about this project. If asked anything unrelated, politely redirect to the project.

== PROJECT OVERVIEW ==
The Smart Drug Inventory & Expiry Tracking System is a mobile-first health-tech platform that digitizes pharmaceutical inventory management for small clinics and pharmacies across India. It has two components:
1. A primary Android mobile application
2. A supporting web platform (this website)

== PROBLEM STATEMENT ==
Small clinics and pharmacies across India lack affordable digital tools for managing pharmaceutical inventory. Manual registers, paper-based stock cards, and basic spreadsheets lead to:
- Undetected medicine expiry (4–5% of medicines in India are expired/near-expiry when dispensed)
- Unexpected stockouts of essential drugs
- Inaccurate purchase records
- Poor vendor relationship management
India has 1 million+ registered pharmacies, most without any digital inventory system.

== OBJECTIVES ==
1. Develop a fully functional Android mobile app for digital drug inventory management
2. Implement automated expiry tracking with 3-tier alerts (30, 15, 7 days)
3. Build proactive stock monitoring with configurable minimum quantity thresholds
4. Integrate real-time push notifications via Firebase Cloud Messaging (FCM)
5. Design data-driven analytics dashboard with visual charts
6. Develop vendor and purchase management module
7. Build a supporting web platform with APK download, AI chatbot, and contact form
8. Align with SDGs 3, 9, 11, 12

== ANDROID APP — 7 CORE MODULES ==
MODULE 1: USER AUTHENTICATION - Email/phone login via Firebase Auth, Google Sign-In (OAuth 2.0), OTP-based phone authentication, Persistent login, Forgot Password
MODULE 2: INVENTORY MANAGEMENT - Add medicines with all fields, Edit/delete/archive, Search/filter/sort, Status pills, Room Database offline
MODULE 3: EXPIRY TRACKING - 30-day Notice (blue), 15-day Warning (amber), 7-day Critical (red), Auto-scheduled alerts
MODULE 4: STOCK MONITORING - Configurable min threshold (default: 20), Low-stock alerts, One-tap restock
MODULE 5: PUSH NOTIFICATIONS - Firebase FCM, Background delivery, Configurable quiet hours, Per-tier toggle
MODULE 6: ANALYTICS DASHBOARD - Bar/Donut/Line charts, Key insights, Time filters, MPAndroidChart
MODULE 7: VENDOR MANAGEMENT - Vendor profiles, Purchase orders, Transaction history

== TECHNOLOGY STACK ==
Language: Kotlin, Architecture: MVVM, Database: Room Database (offline), Auth: Firebase Auth, Notifications: FCM, Charts: MPAndroidChart, Version: 1.0.0

== SDG ALIGNMENT ==
SDG 3 – Good Health, SDG 9 – Innovation, SDG 12 – Responsible Production, SDG 11 – Sustainable Cities

== RESPONSE STYLE ==
- Helpful, clear, concise
- Use numbered steps for instructions
- Bold important terms
- Always relate to SmartDrug Inventory
- Professional but friendly`

const FAQS = [
  { group: 'Getting Started', items: [
    { q: 'How do I add a new medicine to the inventory?', label: 'How to add a new medicine?' },
    { q: 'How do I install the SmartDrug Inventory APK on Android?', label: 'How to install the APK?' },
    { q: 'How do I create an account and sign up?', label: 'How to create an account?' },
  ]},
  { group: 'Alerts & Tracking', items: [
    { q: 'How does the expiry tracking and alert system work? What are the 3 tiers?', label: 'How do expiry alerts work?' },
    { q: 'How do push notifications work? How does Firebase FCM deliver alerts?', label: 'How do push notifications work?' },
    { q: 'What is the minimum stock threshold and how does low stock alert work?', label: 'What is stock threshold?' },
  ]},
  { group: 'Inventory', items: [
    { q: 'How do I search and filter medicines in the inventory?', label: 'Search & filter medicines' },
    { q: 'How do I restock a medicine or update its quantity?', label: 'How to restock medicine?' },
    { q: 'How do I edit or delete a medicine from inventory?', label: 'Edit or delete medicine?' },
  ]},
  { group: 'Analytics & Vendors', items: [
    { q: 'How do I use the analytics dashboard? What charts are available?', label: 'Using Analytics Dashboard' },
    { q: 'How do I add and manage vendors or suppliers?', label: 'How to add a vendor?' },
  ]},
  { group: 'Technical', items: [
    { q: 'Does the app work offline without internet?', label: 'Does app work offline?' },
    { q: 'My push notifications are not working. How do I fix it?', label: 'Notifications not working?' },
    { q: 'What are the minimum Android version and system requirements?', label: 'System requirements?' },
    { q: 'What technology stack is SmartDrug Inventory built with?', label: 'Technology stack used?' },
  ]},
  { group: 'Project Info', items: [
    { q: 'What is SmartDrug Inventory and what problem does it solve?', label: 'What is SmartDrug Inventory?' },
    { q: 'Which SDGs does the SmartDrug Inventory project align with?', label: 'SDG alignment?' },
  ]},
]

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^(\d+)\. (.*$)/gm, '<div style="display:flex;gap:8px;margin:4px 0"><span style="color:#2E7D32;font-weight:700;min-width:18px">$1.</span><span>$2</span></div>')
    .replace(/^[•\-] (.*$)/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:#66BB6A;font-weight:700">→</span><span>$1</span></div>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')
}

function getTime() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

function FaqItem({ item, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '9px 11px', borderRadius: 10, marginBottom: 3,
        cursor: 'pointer',
        background: isActive ? '#E8F5E9' : hovered ? '#f8f8f8' : 'transparent',
        border: `1px solid ${isActive ? '#C8E6C9' : 'transparent'}`,
        transition: 'all .15s',
        display: 'flex', alignItems: 'center', gap: 8,
      }}
    >
      <div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#1B1B1B', lineHeight: 1.35 }}>
        {item.label}
      </div>
      <span style={{
        fontSize: 10, color: '#6B7280', transition: 'transform 0.2s',
        transform: hovered ? 'rotate(90deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}>▶</span>
    </div>
  )
}

export default function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [activeFaq, setActiveFaq] = useState(null)
  const [faqSearch, setFaqSearch] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const messagesEnd = useRef(null)
  const inputRef = useRef(null)
  const [faqSheetOpen, setFaqSheetOpen] = useState(false)
  const w = useWindowWidth()

  useEffect(() => {
    setMessages([{
      role: 'bot',
      html: `👋 <strong>Welcome to SmartDrug AI Assistant!</strong><br/><br/>
        I'm here to help you with everything about the <strong>Smart Drug Inventory &amp; Expiry Tracking System</strong> —
        from installation and features to troubleshooting and analytics.<br/><br/>
        Ask me anything, or pick a question from the FAQ panel on the left!`,
      time: getTime(),
      quickReplies: ['How do I add a new medicine?', 'How does expiry tracking work?', 'How to install the APK?', 'Does the app work offline?'],
    }])
  }, [])

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text) {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    const userMsg = { role: 'user', text: msg, time: getTime() }
    setMessages(prev => [...prev, userMsg])
    const newHistory = [...history, { role: 'user', content: msg }]
    setHistory(newHistory)
    setLoading(true)
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...newHistory.slice(-10)], max_tokens: 1024, temperature: 0.5 }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error?.message || 'API error')
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'
      setHistory(prev => [...prev, { role: 'assistant', content: reply }])
      setMessages(prev => [...prev, { role: 'bot', html: formatMessage(reply), time: getTime() }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'bot',
        html: `⚠️ <strong>Error:</strong> ${err.message}<br/><span style="color:#6B7280;font-size:11px">Check your VITE_GROQ_API_KEY in .env file.</span>`,
        time: getTime(), isError: true,
      }])
    } finally { setLoading(false) }
  }

  function handleKey(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  function clearChat() {
    setHistory([]); setActiveFaq(null)
    setMessages([{ role: 'bot', html: `👋 Chat cleared! How can I help you with SmartDrug Inventory?`, time: getTime(), quickReplies: ['How to add medicine?', 'Expiry alerts', 'Install APK', 'Offline support'] }])
  }

  const filteredFaqs = FAQS.map(g => ({ ...g, items: g.items.filter(i => !faqSearch || i.label.toLowerCase().includes(faqSearch.toLowerCase())) })).filter(g => g.items.length > 0)
  const MAX_CHARS = 500

  return (
    <div>
      {/* ── HERO ── */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        padding: '40px 80px', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.18)',
          color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700,
          padding: '5px 14px', borderRadius: 20, marginBottom: 12,
        }}>🤖 AI-Powered · Groq Llama 3.3 70B</div>
        <h1 style={{ color: 'white', fontSize: 32, fontWeight: 900, marginBottom: 10, letterSpacing: '-0.03em' }}>
          SmartDrug AI Assistant
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 14, maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
          Ask anything about installation, features, expiry alerts, stock management,
          vendors, or analytics. Powered by Groq's ultra-fast LLM.
        </p>
      </div>

      {/* ── CHAT LAYOUT ── */}
      <div className="chatbot-layout" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', height: 'calc(100vh - 64px - 128px)', minHeight: 520, background: '#F5F7F6' }}>

        {/* ── FAQ PANEL (desktop only) ── */}
        <div className="chatbot-faq-desktop" style={{ background: 'white', borderRight: '1px solid rgba(0,0,0,0.09)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #f0f0f0' }}>
            <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 700, color: '#1B1B1B', marginBottom: 10 }}>Frequently Asked Questions</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F5F7F6', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 9, padding: '7px 11px' }}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="#bbb" strokeWidth="1.5"/><path d="M11 11l3 3" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <input type="text" placeholder="Search questions…" value={faqSearch} onChange={e => setFaqSearch(e.target.value)} style={{ border: 'none', background: 'transparent', fontSize: 12, color: '#1B1B1B', outline: 'none', width: '100%', fontFamily: 'DM Sans, sans-serif' }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 10 }}>
            {filteredFaqs.map(group => (
              <div key={group.group}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.6px', padding: '10px 8px 4px' }}>{group.group}</div>
                {group.items.map(item => (
                  <FaqItem key={item.q} item={item} isActive={activeFaq === item.q} onClick={() => { setActiveFaq(item.q); sendMessage(item.q) }} />
                ))}
              </div>
            ))}
          </div>
          {/* Groq badge */}
          <div style={{ margin: 10, padding: 12, background: 'linear-gradient(135deg, #1B2B1C, #243625)', borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <span style={{ fontSize: 14 }}>⚡</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#66BB6A' }}>Groq Llama 3.3 · 70B</span>
              <span style={{ fontSize: 8, background: '#2E7D32', color: 'white', padding: '2px 6px', borderRadius: 4, fontWeight: 700, marginLeft: 'auto' }}>FAST</span>
            </div>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>Ultra-fast AI. All answers based on the official SmartDrug capstone report.</p>
          </div>
        </div>

        {/* ── CHAT PANEL ── */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Chat header */}
          <div style={{ background: 'white', padding: '12px 24px', borderBottom: '1px solid rgba(0,0,0,0.09)', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ width: 40, height: 40, background: '#2E7D32', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, color: '#1B1B1B', display: 'flex', alignItems: 'center', gap: 8 }}>
                SmartDrug AI Assistant
                <span style={{ fontSize: 9, background: 'linear-gradient(135deg, #F9A825, #FFB300)', color: '#1B1B1B', padding: '2px 8px', borderRadius: 6, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 3 }}>⚡ Groq</span>
              </div>
              <div className="chat-subtitle" style={{ fontSize: 11, color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2E7D32', animation: 'pulse 2s infinite' }} />
                Online · Ultra-fast responses
              </div>
            </div>
            <button onClick={clearChat} className="ripple-btn" onClickCapture={createRipple} style={{ background: '#F5F7F6', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 9, padding: '7px 14px', fontSize: 12, color: '#6B7280', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', transition: 'all .15s', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => e.target.style.background = '#eee'} onMouseLeave={e => e.target.style.background = '#F5F7F6'}>↺ Clear Chat</button>
            {/* FAQs toggle button — shown only on mobile */}
            {w <= 1024 && (
              <button onClick={() => setFaqSheetOpen(true)} style={{
                background: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: 9,
                padding: '7px 14px', fontSize: 12, fontWeight: 600, color: '#2E7D32',
                cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', minHeight: 36,
              }}>FAQs</button>
            )}
          </div>

          {/* Messages area with subtle animated gradient */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '24px',
            display: 'flex', flexDirection: 'column', gap: 16,
            background: 'linear-gradient(135deg, rgba(232,245,233,0.15), rgba(245,247,246,1), rgba(227,242,253,0.1))',
            backgroundSize: '400% 400%', animation: 'gradientShift 20s ease infinite',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', animation: 'fadeUp .25s ease' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: msg.role === 'user' ? '#E8F5E9' : '#2E7D32',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: msg.role === 'user' ? 11 : 16,
                  fontWeight: msg.role === 'user' ? 700 : 400,
                  color: msg.role === 'user' ? '#2E7D32' : 'white',
                }}>{msg.role === 'user' ? 'You' : '🤖'}</div>
                <div style={{ maxWidth: '72%', display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    padding: '12px 16px', borderRadius: 18,
                    borderBottomLeftRadius: msg.role === 'bot' ? 4 : 18,
                    borderBottomRightRadius: msg.role === 'user' ? 4 : 18,
                    background: msg.role === 'user' ? '#2E7D32' : msg.isError ? '#FFF5F5' : 'white',
                    color: msg.role === 'user' ? 'white' : '#1B1B1B',
                    fontSize: 13, lineHeight: 1.75,
                    boxShadow: msg.role === 'bot' ? '0 1px 6px rgba(46,125,50,0.08)' : 'none',
                    borderLeft: msg.isError ? '3px solid #D32F2F' : 'none',
                    position: 'relative',
                  }}>
                    {msg.role === 'bot' && !msg.isError && (
                      <span style={{ position: 'absolute', top: -6, right: -4, fontSize: 10, opacity: 0.6 }}>🤖</span>
                    )}
                    {msg.role === 'user' ? msg.text : <span dangerouslySetInnerHTML={{ __html: msg.html }} />}
                  </div>
                  <div style={{ fontSize: 9, color: '#ccc', marginTop: 4, padding: '0 4px' }}>{msg.time}</div>
                  {msg.quickReplies && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 8 }}>
                      {msg.quickReplies.map(qr => (
                        <button key={qr} onClick={() => sendMessage(qr)} className="ripple-btn quick-reply-chip" onClickCapture={createRipple} style={{
                          background: 'white', border: '1.5px solid #C8E6C9', color: '#2E7D32', fontSize: 11, fontWeight: 600,
                          padding: '5px 13px', borderRadius: 20, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif',
                          transition: 'all .15s', position: 'relative', overflow: 'hidden',
                        }}
                        onMouseEnter={e => { e.target.style.background = '#E8F5E9'; e.target.style.borderColor = '#2E7D32' }}
                        onMouseLeave={e => { e.target.style.background = 'white'; e.target.style.borderColor = '#C8E6C9' }}
                        >{qr}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', animation: 'fadeUp .25s ease' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
                <div style={{ background: 'white', borderRadius: 18, borderBottomLeftRadius: 4, padding: '12px 18px', display: 'flex', gap: 5, alignItems: 'center', boxShadow: '0 1px 6px rgba(46,125,50,0.08)' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#66BB6A', animation: `typeBounce 1.2s infinite ${i * .15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input bar with char count + focus glow */}
          <div style={{ background: 'white', borderTop: '1px solid rgba(0,0,0,0.09)', padding: '14px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: '#F5F7F6', border: `1.5px solid ${inputFocused ? '#66BB6A' : 'rgba(0,0,0,0.09)'}`,
                borderRadius: 14, padding: '9px 16px',
                transition: 'all .2s',
                boxShadow: inputFocused ? '0 0 0 3px rgba(102,187,106,0.15)' : 'none',
              }}>
                <textarea
                  ref={inputRef} value={input}
                  onChange={e => { if (e.target.value.length <= MAX_CHARS) setInput(e.target.value) }}
                  onKeyDown={handleKey}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Ask anything about SmartDrug Inventory…"
                  rows={1}
                  style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 13, color: '#1B1B1B', outline: 'none', fontFamily: 'DM Sans, sans-serif', resize: 'none', maxHeight: 80, lineHeight: 1.5 }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 4 }}>
                <span style={{ fontSize: 10, color: input.length > MAX_CHARS * 0.9 ? '#D32F2F' : '#ccc' }}>
                  {input.length}/{MAX_CHARS}
                </span>
              </div>
            </div>
            <button
              onClick={() => sendMessage()} disabled={loading || !input.trim()}
              className="ripple-btn" onClickCapture={createRipple}
              style={{
                width: 46, height: 46, background: loading || !input.trim() ? '#ccc' : '#2E7D32',
                border: 'none', borderRadius: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                transition: 'background .15s', flexShrink: 0,
                position: 'relative', overflow: 'hidden',
                boxShadow: loading || !input.trim() ? 'none' : '0 2px 8px rgba(46,125,50,0.3)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE FAQ BOTTOM SHEET ── */}
      {faqSheetOpen && w <= 1024 && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setFaqSheetOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
              zIndex: 199, animation: 'fadeUp 0.15s ease',
            }}
          />
          {/* Sheet */}
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            height: '60vh', background: 'white',
            borderRadius: '20px 20px 0 0', zIndex: 200,
            boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
            display: 'flex', flexDirection: 'column',
            animation: 'slideUpSheet 0.3s ease',
          }}>
            {/* Drag handle */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd' }} />
            </div>
            <div style={{ padding: '0 16px 8px', borderBottom: '1px solid #f0f0f0' }}>
              <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, color: '#1B1B1B' }}>Frequently Asked Questions</h3>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 10 }}>
              {filteredFaqs.map(group => (
                <div key={group.group}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.6px', padding: '10px 8px 4px' }}>{group.group}</div>
                  {group.items.map(item => (
                    <FaqItem key={item.q} item={item} isActive={activeFaq === item.q} onClick={() => {
                      setActiveFaq(item.q)
                      sendMessage(item.q)
                      setFaqSheetOpen(false)
                    }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
