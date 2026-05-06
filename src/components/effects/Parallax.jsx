import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useMediaQuery.js'
import { cn } from '../../lib/cn.js'

/**
 * Parallax — translates child by `speed` * scroll-progress within viewport.
 *
 *  speed: how much the element drifts (px) at the boundaries
 *  axis:  'y' or 'x'
 */
export default function Parallax({
  children,
  speed = 80,
  axis = 'y',
  className,
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return

    let raf
    let inView = false

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
      },
      { threshold: 0, rootMargin: '20% 0px 20% 0px' }
    )
    io.observe(el)

    const update = () => {
      if (inView) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        // -1 → 1 across viewport
        const progress =
          (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)
        const offset = -progress * speed
        el.style.transform =
          axis === 'y'
            ? `translate3d(0, ${offset.toFixed(2)}px, 0)`
            : `translate3d(${offset.toFixed(2)}px, 0, 0)`
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [speed, axis, prefersReduced])

  return (
    <Tag
      ref={ref}
      className={cn('will-change-transform', className)}
      data-parallax
    >
      {children}
    </Tag>
  )
}
