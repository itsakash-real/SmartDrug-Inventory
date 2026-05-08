# SmartDrug Inventory – Website

A full React + Vite website for the Smart Drug Inventory & Expiry Tracking System
LPU CSE Capstone Project · SIH 2024 · Problem SIH1627

---

## Project Structure

```
smartdrug-website/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        <- Sticky top navigation
│   │   └── Footer.jsx        <- Site footer with links
│   ├── pages/
│   │   ├── Landing.jsx       <- Homepage: hero, features, stats, CTA
│   │   ├── Features.jsx      <- All 7 modules + comparison table
│   │   ├── HowItWorks.jsx    <- 5-step alternating timeline
│   │   ├── Download.jsx      <- APK card + installation guide
│   │   ├── Chatbot.jsx       <- Groq AI chatbot with FAQ sidebar
│   │   └── Contact.jsx       <- Contact form + project links
│   ├── App.jsx               <- React Router setup (6 routes)
│   ├── main.jsx              <- Entry point
│   └── index.css             <- Global styles + CSS variables
├── .env                      <- ADD YOUR GROQ API KEY HERE
├── .env.example              <- Template for env variables
├── index.html                <- HTML entry with custom favicon
└── vite.config.js
```

---

## Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Add your Groq API key
Edit .env and replace the placeholder:
```
VITE_GROQ_API_KEY=gsk_your_actual_groq_key_here
```
Get a free API key at https://console.groq.com

### 3. Run development server
```
npm run dev
```
Open http://localhost:5173

### 4. Build for production
```
npm run build
```
Output goes to dist/ — ready to deploy.

---

## Pages & Routes

/               Landing      - Hero, features, phone mockup, CTA
/features       Features     - All 7 modules, comparison table
/how-it-works   How It Works - 5-step visual timeline
/download       Download     - APK card, install guide, requirements
/chatbot        AI Chatbot   - Groq chatbot + FAQ sidebar
/contact        Contact      - Form + project info + social links

---

## Chatbot Setup

Uses Groq API with llama-3.3-70b-versatile model.
- Key is read from import.meta.env.VITE_GROQ_API_KEY
- Answers grounded in SmartDrug capstone report via system prompt
- Last 10 messages kept as context per session

For Vercel/Netlify: add VITE_GROQ_API_KEY in environment variables dashboard.

---

## Deploy to Vercel
```
npm install -g vercel && vercel
```
Set VITE_GROQ_API_KEY in Vercel project -> Settings -> Environment Variables.

## Deploy to Netlify
Build the project, then drag & drop the dist/ folder at netlify.com/drop.

---

Made with love for Indian Healthcare - LPU CSE Capstone 2024-25
