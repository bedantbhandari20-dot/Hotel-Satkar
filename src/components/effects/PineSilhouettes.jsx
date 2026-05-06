import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useMediaQuery.js'

/**
 * Edge-of-viewport pine silhouettes that drift past as you scroll —
 * like trees flicking by a car window on the road into Doti.
 * Fixed-position SVGs on both edges, parallax slower than content.
 */
export default function PineSilhouettes() {
  const prefersReduced = useReducedMotion()
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    if (prefersReduced) return
    let raf
    const update = () => {
      const y = window.scrollY
      // Left side drifts up slowly (factor 0.18), right side faster (0.32)
      if (leftRef.current) {
        leftRef.current.style.transform = `translate3d(0, ${(-y * 0.18).toFixed(2)}px, 0)`
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translate3d(0, ${(-y * 0.32).toFixed(2)}px, 0)`
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [prefersReduced])

  return (
    <>
      {/* LEFT edge — taller, more sparse pines */}
      <div aria-hidden className="pine-silhouette pine-silhouette--left">
        <svg ref={leftRef} viewBox="0 0 80 800" preserveAspectRatio="xMinYMax meet" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor">
            {/* Trunk + tiered branches — three trees at varying heights */}
            <PineTree x={18} y={780} h={180} />
            <PineTree x={42} y={760} h={150} />
            <PineTree x={8}  y={640} h={210} />
            <PineTree x={56} y={520} h={170} />
            <PineTree x={28} y={400} h={140} />
            <PineTree x={12} y={250} h={190} />
          </g>
        </svg>
      </div>

      {/* RIGHT edge — slightly fewer, faster parallax */}
      <div aria-hidden className="pine-silhouette pine-silhouette--right">
        <svg ref={rightRef} viewBox="0 0 80 800" preserveAspectRatio="xMaxYMax meet" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor">
            <PineTree x={62} y={770} h={200} />
            <PineTree x={34} y={690} h={160} />
            <PineTree x={70} y={560} h={180} />
            <PineTree x={20} y={420} h={150} />
            <PineTree x={50} y={280} h={170} />
          </g>
        </svg>
      </div>
    </>
  )
}

/** Stylized pine: vertical trunk with stacked triangular tiers narrowing toward the apex. */
function PineTree({ x, y, h }) {
  const trunkW = 1.4
  const tiers = 5
  const baseW = h * 0.32
  const top = y - h
  // Build tier polygon points
  const tierPaths = []
  for (let i = 0; i < tiers; i++) {
    const t = i / (tiers - 1) // 0 at base, 1 at apex
    const tierY = y - (h * 0.18) - ((h * 0.78) * t)
    const tierW = baseW * (1 - t * 0.78)
    const tierH = (h * 0.78) / tiers * 1.6
    tierPaths.push(
      <polygon key={i} points={`${x - tierW / 2},${tierY} ${x + tierW / 2},${tierY} ${x},${tierY - tierH}`} />
    )
  }
  return (
    <g>
      {/* Trunk */}
      <rect x={x - trunkW / 2} y={top + h * 0.6} width={trunkW} height={h * 0.4} />
      {tierPaths}
    </g>
  )
}
