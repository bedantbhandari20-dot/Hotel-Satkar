import { useEffect, useRef } from 'react'
import { useIsTouch } from '../../hooks/useMediaQuery.js'

/**
 * AmbientParticles — floating dust / pollen / coffee steam motes
 *
 * Props:
 *   count    - number of particles (default 40)
 *   color    - particle color hex (default warm gold)
 *   opacity  - base opacity 0-1 (default 0.15)
 *   speed    - drift speed multiplier (default 1)
 *   area     - 'hero' | 'full' — hero constrains to upper portion
 *   blend    - 'screen' | 'normal' — blend mode
 */
export default function AmbientParticles({
  count = 40,
  color = '196, 152, 44',
  opacity = 0.15,
  speed = 1,
  area = 'full',
  blend = 'screen',
}) {
  const canvasRef = useRef(null)
  const isTouch = useIsTouch()

  useEffect(() => {
    if (isTouch) return // disabled on mobile for performance
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    let anim
    let w, h

    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random() * (area === 'hero' ? 0.6 : 1),
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0002 - 0.00015,
      phase: Math.random() * Math.PI * 2,
      freq: 0.2 + Math.random() * 0.4,
    }))

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      w = rect?.width || window.innerWidth
      h = rect?.height || window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const t = performance.now() * 0.001 * speed
      ctx.globalCompositeOperation = blend
      particles.forEach((p) => {
        const dx = p.x + Math.sin(t * p.freq + p.phase) * 0.02
        const dy = p.y + t * p.vy * 60
        // wrap
        const wx = ((dx % 1) + 1) % 1
        const wy = ((dy % 1) + 1) % 1
        p.x = wx
        p.y = wy
        const px = wx * w
        const py = wy * h
        const flicker = 0.7 + Math.sin(t * p.freq * 2.3 + p.phase * 3) * 0.3
        const a = opacity * flicker
        ctx.beginPath()
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${a})`
        ctx.fill()
      })
      anim = requestAnimationFrame(draw)
    }
    anim = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener('resize', resize)
    }
  }, [isTouch, count, color, opacity, speed, area, blend])

  if (isTouch) return null
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none z-[2]"
    />
  )
}
