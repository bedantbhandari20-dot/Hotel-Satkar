import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn.js'
import { getLenis } from '../../lib/smoothScroll.js'

/**
 * Loader — cinematic curtain.
 *
 * Sequence:
 *  1) On mount, full-screen dark olive curtain
 *  2) Brand letters rise into place with stagger (~600ms)
 *  3) Tabular counter ticks 00 → 100
 *  4) After min 1.6s + load complete, curtain peels away clip-path-style
 *  5) Component self-removes from DOM after exit animation
 *
 * Shown only on first navigation (sessionStorage flag) so route changes
 * inside the SPA don't re-trigger the loader.
 */
const BRAND = ['S', 'A', 'T', 'K', 'A', 'R']

export default function Loader({ minDuration = 1600, onDone = () => {} }) {
  const [shown, setShown] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem('satkar:loaded')
  })
  const [revealed, setRevealed] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [pct, setPct] = useState(0)
  const startRef = useRef(0)

  useEffect(() => {
    if (!shown) {
      onDone()
      return
    }
    startRef.current = performance.now()
    document.documentElement.classList.add('is-loading')

    // Lock scroll while curtain is up
    const lenis = getLenis()
    lenis?.stop()
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'

    // Reveal letters after first frame
    const r = requestAnimationFrame(() => setRevealed(true))

    // Counter loop — eased, never reaches 100 until ready
    let raf
    const tick = (t) => {
      const elapsed = t - startRef.current
      const target = Math.min(96, (elapsed / minDuration) * 100)
      setPct((prev) => prev + (target - prev) * 0.12)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Listen for page-load + min-duration
    const finalize = () => {
      const elapsed = performance.now() - startRef.current
      const wait = Math.max(0, minDuration - elapsed)
      setTimeout(() => {
        cancelAnimationFrame(raf)
        setPct(100)
        // small pause to read 100
        setTimeout(() => {
          setExiting(true)
          // Unlock scroll a moment before curtain finishes
          setTimeout(() => {
            const l = getLenis()
            l?.start()
            document.body.style.overflow = ''
          }, 200)
          // After exit animation, fully unmount
          setTimeout(() => {
            sessionStorage.setItem('satkar:loaded', '1')
            document.documentElement.classList.remove('is-loading')
            setShown(false)
            onDone()
          }, 1100)
        }, 220)
      }, wait)
    }

    if (document.readyState === 'complete') finalize()
    else window.addEventListener('load', finalize, { once: true })

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(r)
      window.removeEventListener('load', finalize)
      document.documentElement.classList.remove('is-loading')
      document.body.style.overflow = ''
      getLenis()?.start()
    }
  }, [shown, minDuration, onDone])

  if (!shown) return null

  return (
    <div
      className={cn('loader-curtain', exiting && 'loader-curtain--exit')}
      role="status"
      aria-label="Loading Satkar"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Eyebrow */}
        <span className="font-body text-[10px] uppercase tracking-[0.32em] text-text-inverse/45">
          Hospitality · Doti
        </span>

        {/* Brand wordmark */}
        <div className={cn('loader-mark', revealed && 'is-revealed')}>
          {BRAND.map((ch, i) => (
            <span
              key={i}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {ch}
            </span>
          ))}
          <span style={{ transitionDelay: `${BRAND.length * 80}ms` }} className="text-accent-gold">
            .
          </span>
        </div>

        {/* Subhead */}
        <span
          className="font-display text-base text-text-inverse/55 transition-opacity duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transitionDelay: `${(BRAND.length + 2) * 80}ms`,
          }}
        >
          Established 2056 B.S.
        </span>
      </div>

      {/* Progress hairline */}
      <div className="loader-progress">
        <div className="relative -mt-4 mb-3 h-px w-[220px] bg-text-inverse/15 overflow-hidden">
          <span
            className="absolute inset-y-0 left-0 bg-accent-gold/70"
            style={{ width: `${pct}%`, transition: 'width 220ms ease-out' }}
          />
        </div>
      </div>
    </div>
  )
}
