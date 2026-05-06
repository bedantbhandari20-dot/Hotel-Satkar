import { useEffect, useRef } from 'react'
import { useIsTouch, useReducedMotion } from '../../hooks/useMediaQuery.js'
import { cn } from '../../lib/cn.js'

/**
 * Tilt — subtle 3D card tilt that follows cursor within bounds.
 *  • Max angle is small (≤ 4°) so it reads as "premium" not "kitsch"
 *  • Resets smoothly on leave
 */
export default function Tilt({
  children,
  className,
  maxTilt = 4,
  scale = 1.0,
  perspective = 1000,
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null)
  const isTouch = useIsTouch()
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (isTouch || prefersReduced) return
    const el = ref.current
    if (!el) return

    let raf
    let rx = 0
    let ry = 0
    let trx = 0
    let tryY = 0

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      trx = dy * -maxTilt
      tryY = dx * maxTilt
    }
    const onLeave = () => {
      trx = 0
      tryY = 0
    }

    const tick = () => {
      rx += (trx - rx) * 0.12
      ry += (tryY - ry) * 0.12
      el.style.transform = `perspective(${perspective}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [isTouch, prefersReduced, maxTilt, scale, perspective])

  return (
    <Tag
      ref={ref}
      className={cn('tilt will-change-transform', className)}
      style={{ transformStyle: 'preserve-3d' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
