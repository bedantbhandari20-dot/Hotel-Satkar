import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn.js'

/**
 * PageTransition — overlay slab that animates between routes.
 *
 *  - On route change, plays "enter" (slides in from below to cover viewport)
 *  - At apex, briefly shows the brand mark
 *  - Then plays "exit" (slides up out of viewport)
 *
 * No portals needed; rendered at root.
 */
export default function PageTransition() {
  const { pathname } = useLocation()
  const [phase, setPhase] = useState('idle') // idle | enter | exit
  const firstMount = useRef(true)

  useEffect(() => {
    if (firstMount.current) {
      // Skip on first mount — Loader handles initial paint
      firstMount.current = false
      return
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    setPhase('enter')
    const t1 = setTimeout(() => {
      setPhase('exit')
      const t2 = setTimeout(() => setPhase('idle'), 800)
      return () => clearTimeout(t2)
    }, 800)

    return () => clearTimeout(t1)
  }, [pathname])

  if (phase === 'idle') return null

  return (
    <div
      aria-hidden
      className={cn(
        'page-transition',
        phase === 'enter' && 'page-transition--enter',
        phase === 'exit' && 'page-transition--exit'
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        {/* Hairline that draws in at apex */}
        <span
          className="block h-px bg-accent-gold/60 origin-center transition-transform duration-700 ease-silk"
          style={{
            width: '6rem',
            transform: phase === 'enter' ? 'scaleX(1)' : 'scaleX(0)',
            transitionDelay: phase === 'enter' ? '500ms' : '0ms',
          }}
        />
        <div
          className="font-display text-5xl tracking-[0.18em] text-text-inverse transition-[opacity,transform] duration-700 ease-silk"
          style={{
            opacity: phase === 'enter' ? 1 : 0,
            transform: phase === 'enter' ? 'translateY(0)' : 'translateY(8px)',
            transitionDelay: phase === 'enter' ? '600ms' : '0ms',
          }}
        >
          S
          <span className="text-accent-gold">.</span>
        </div>
        <span
          className="font-body text-[10px] uppercase tracking-[0.32em] text-text-inverse/55 transition-opacity duration-500"
          style={{
            opacity: phase === 'enter' ? 1 : 0,
            transitionDelay: phase === 'enter' ? '700ms' : '0ms',
          }}
        >
          Satkar
        </span>
      </div>
    </div>
  )
}
