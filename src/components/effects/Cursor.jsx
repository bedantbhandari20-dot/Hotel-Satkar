import { useEffect, useRef } from 'react'
import { useIsTouch, useReducedMotion } from '../../hooks/useMediaQuery.js'

/**
 * Cursor — two-layer custom cursor (dot + lerp ring).
 *
 *  • Inner dot follows pointer immediately
 *  • Outer ring lerps with damping ~0.18 → smooth trailing
 *  • Hover state triggered by [data-cursor="hover"] OR a, button, label, [role="button"]
 *  • Text state triggered by [data-cursor="text"]
 *  • Hidden on touch devices, reduced-motion, or when pointer leaves window
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const isTouch = useIsTouch()
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (isTouch || prefersReduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const setRingState = (cls, on) => {
      ring.classList.toggle(cls, on)
    }

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Place dot immediately
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
    }

    const onLeave = () => document.body.classList.add('cursor-hide')
    const onEnter = () => document.body.classList.remove('cursor-hide')

    const onDown = () => setRingState('is-clicking', true)
    const onUp = () => setRingState('is-clicking', false)

    // Detect hover targets via mouseover bubbling
    const onOver = (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      const hover = t.closest('a, button, [role="button"], label, [data-cursor="hover"], input, select, textarea')
      const text = t.closest('[data-cursor="text"], p, h1, h2, h3, h4, h5, h6, blockquote')
      // Hover wins over text
      if (hover) {
        setRingState('is-hover', true)
        setRingState('is-text', false)
      } else if (text) {
        setRingState('is-hover', false)
        setRingState('is-text', true)
      } else {
        setRingState('is-hover', false)
        setRingState('is-text', false)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup', onUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    // rAF loop for the ring (lerp toward dot)
    let raf
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Hide native cursor on hover-capable devices
    document.documentElement.style.cursor = 'none'
    const sel = 'a, button, input, select, textarea, label, [role="button"]'
    const modified = document.querySelectorAll(sel)
    modified.forEach((el) => { el.style.cursor = 'none' })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.style.cursor = ''
      modified.forEach((el) => { el.style.cursor = '' })
    }
  }, [isTouch, prefersReduced])

  if (isTouch || prefersReduced) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
