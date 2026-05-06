import { useEffect, useRef } from 'react'
import { useIsTouch } from '../../hooks/useMediaQuery.js'

/**
 * SteamParticles — rising warm mist for cafe/bakery atmosphere.
 * Lightweight canvas layer; disabled on touch.
 */
export default function SteamParticles({
  count = 20,
  color = '245, 240, 232',
  opacity = 0.08,
  speed = 0.4,
}) {
  const canvasRef = useRef(null)
  const isTouch = useIsTouch()

  useEffect(() => {
    if (isTouch) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    let anim
    let w, h

    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random() * 0.5 + 0.5, // start near bottom
      r: Math.random() * 2.5 + 0.8,
      vx: (Math.random() - 0.5) * 0.00015,
      vy: -(Math.random() * 0.00025 + 0.00015), // drift upward
      phase: Math.random() * Math.PI * 2,
      life: Math.random(),
      maxLife: 0.5 + Math.random() * 0.5,
    }))

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      w = rect?.width || canvas.offsetWidth || 300
      h = rect?.height || canvas.offsetHeight || 300
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
      particles.forEach((p) => {
        p.life += 0.0008 * speed
        if (p.life > p.maxLife) {
          p.life = 0
          p.x = Math.random()
          p.y = 0.85 + Math.random() * 0.15
          p.vx = (Math.random() - 0.5) * 0.00015
          p.vy = -(Math.random() * 0.00025 + 0.00015)
        }
        const age = p.life / p.maxLife
        const fade = Math.sin(age * Math.PI) // bloom in, bloom out
        const dx = p.x + Math.sin(t * 0.3 + p.phase) * 0.015
        const dy = p.y + (1 - age) * -0.15 // rise
        const px = ((dx % 1) + 1) % 1 * w
        const py = ((dy % 1) + 1) % 1 * h
        const flicker = 0.6 + Math.sin(t * 2 + p.phase) * 0.4
        const a = opacity * fade * flicker
        ctx.beginPath()
        ctx.arc(px, py, p.r * (0.8 + fade * 0.4), 0, Math.PI * 2)
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
  }, [isTouch, count, color, opacity, speed])

  if (isTouch) return null
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  )
}
