import { useEffect, useRef } from 'react'

/**
 * useMousePosition — captures live cursor position into a ref (no re-renders).
 * Use the ref inside a rAF loop in your component.
 */
export function useMousePosition() {
  const ref = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, vx: 0, vy: 0 })

  useEffect(() => {
    const handler = (e) => {
      const m = ref.current
      m.prevX = m.x
      m.prevY = m.y
      m.x = e.clientX
      m.y = e.clientY
      m.vx = m.x - m.prevX
      m.vy = m.y - m.prevY
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return ref
}
