import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn.js'

/**
 * Counter — animates from 0 to target when scrolled into view.
 *  • Eased with quad-out
 *  • Supports decimals (e.g. 4.1)
 *  • Reduced motion: shows final value immediately
 */
export default function Counter({
  to = 100,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  startOnMount = false,
}) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVal(to)
      return
    }

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration)
        // ease-out-quart
        const eased = 1 - Math.pow(1 - p, 4)
        setVal(eased * to)
        if (p < 1) requestAnimationFrame(tick)
        else setVal(to)
      }
      requestAnimationFrame(tick)
    }

    if (startOnMount) {
      start()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start()
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration, startOnMount])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}
