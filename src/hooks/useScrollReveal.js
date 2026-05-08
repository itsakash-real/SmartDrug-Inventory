import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          if (options.once !== false) obs.unobserve(el)
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

export function useMultiReveal(selector = '.reveal', containerRef = null) {
  useEffect(() => {
    const root = containerRef?.current || document
    const els = root.querySelectorAll(selector)
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [selector])
}

export function useCountUp(ref, target, duration = 1500) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        obs.unobserve(el)
        const isNum = /^\d+/.test(target)
        if (!isNum) { el.textContent = target; return }
        const num = parseInt(target)
        const suffix = target.replace(/[\d,]+/, '')
        const start = performance.now()
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          el.textContent = Math.floor(num * eased).toLocaleString() + suffix
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
}

export function createRipple(e) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = e.clientX - rect.left - size / 2
  const y = e.clientY - rect.top - size / 2
  const ripple = document.createElement('span')
  ripple.className = 'ripple-effect'
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`
  btn.appendChild(ripple)
  setTimeout(() => ripple.remove(), 600)
}
