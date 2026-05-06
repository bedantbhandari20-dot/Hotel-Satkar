import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useMediaQuery.js'

export default function AltitudeShift() {
  const prefersReduced = useReducedMotion()
  const coolRef = useRef(null)
  const duskRef = useRef(null)

  useEffect(() => {
    if (prefersReduced) return
    let raf
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      // Triangular crossfade — cool fades out by midpoint, dusk fades in past midpoint
      const cool = Math.max(0, 1 - p * 2)
      const dusk = Math.max(0, p * 2 - 1)
      if (coolRef.current) coolRef.current.style.opacity = cool.toFixed(3)
      if (duskRef.current) duskRef.current.style.opacity = dusk.toFixed(3)
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [prefersReduced])

  return (
    <div aria-hidden className="altitude-shift">
      <div ref={coolRef} className="altitude-cool" style={{ opacity: 1 }} />
      <div className="altitude-warm" />
      <div ref={duskRef} className="altitude-dusk" style={{ opacity: 0 }} />
    </div>
  )
}
