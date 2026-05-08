import { useState, useEffect } from 'react'

/**
 * Returns the current window width with a debounced resize listener (150ms).
 * Use to conditionally apply mobile styles in components with inline styles.
 */
export default function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  useEffect(() => {
    let timer
    const handleResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setWidth(window.innerWidth), 150)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}
