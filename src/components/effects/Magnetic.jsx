import { useEffect, useRef } from 'react'
import { useIsTouch, useReducedMotion } from '../../hooks/useMediaQuery.js'
import { cn } from '../../lib/cn.js'

/**
 * Magnetic — wrap any element to give it cursor-attraction.
 *  • Strength controls how strongly the element follows cursor (0-1)
 *  • Range controls how far away the cursor pulls (px)
 *  • Inner content can also have a subtler follow via .magnetic-inner
 */
export default function Magnetic({
  children,
  as: Tag = 'span',
  strength = 0.35,
  range = 120,
  innerStrength = 0.15,
  className,
  ...rest
}) {
  const ref = useRef(null)
  const isTouch = useIsTouch()
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (isTouch || prefersReduced) return
    const el = ref.current
    if (!el) return
    const inner = el.querySelector('.magnetic-inner')

    let raf
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let active = false

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const ex = e.clientX - (rect.left + rect.width / 2)
      const ey = e.clientY - (rect.top + rect.height / 2)
      const dist = Math.hypot(ex, ey)
      if (dist > range) {
        active = false
        cx = 0
        cy = 0
        return
      }
      active = true
      cx = ex * strength
      cy = ey * strength
    }

    const onLeave = () => {
      active = false
      cx = 0
      cy = 0
    }

    const tick = () => {
      tx += (cx - tx) * 0.18
      ty += (cy - ty) * 0.18
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      if (inner) {
        inner.style.transform = `translate3d(${tx * (innerStrength / strength - 1)}px, ${ty * (innerStrength / strength - 1)}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [isTouch, prefersReduced, strength, range, innerStrength])

  return (
    <Tag
      ref={ref}
      className={cn('inline-block will-change-transform', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
