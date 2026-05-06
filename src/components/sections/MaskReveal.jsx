import { useEffect, useRef } from 'react'

export default function MaskReveal() {
  const containerRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    let raf
    const update = () => {
      if (!containerRef.current || !svgRef.current) return
      
      const { top, height } = containerRef.current.getBoundingClientRect()
      
      // We start pinning as soon as the container hits the top of the viewport
      const scrollableDistance = height - window.innerHeight
      
      let progress = 0
      if (top <= 0) {
        progress = -top / scrollableDistance
      }
      progress = Math.max(0, Math.min(1, progress))
      
      // Scale modestly to avoid viewport bleeding, max 15x
      const scale = 1 + Math.pow(progress * 2, 3) * 15
      
      // Fade out opacity quickly between 30% and 50% progress
      // so it seamlessly transitions into the beautiful image
      const opacity = progress > 0.3 ? 1 - ((progress - 0.3) * 5) : 1
      const finalOpacity = Math.max(0, Math.min(1, opacity))
      
      svgRef.current.style.transform = `scale(${scale})`
      svgRef.current.style.opacity = finalOpacity
      
      // Completely remove it from render when invisible to prevent artifacting
      svgRef.current.style.visibility = finalOpacity <= 0 ? 'hidden' : 'visible'
      
      raf = requestAnimationFrame(update)
    }
    
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-bg-primary z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* The beautiful image to reveal */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-c6a4d142104d?q=80&w=2400&auto=format&fit=crop"
            alt="Satkar Luxury Room Reveal"
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(0.15) saturate(0.9) brightness(0.95)' }}
          />
          {/* Subtle gradient so the next section blends in perfectly */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />
        </div>

        {/* The SVG Mask overlay */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full z-10 will-change-transform pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="text-mask" x="0" y="0" width="100%" height="100%">
              {/* White = Solid background */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {/* Black = Hole cutout for the text */}
              <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                className="font-display font-bold tracking-tighter"
                style={{ fontSize: 'min(24vw, 300px)' }}
                fill="black"
              >
                REST
              </text>
            </mask>
          </defs>
          
          {/* A rectangle covering the screen, painted with our dark background color, using the mask to cut out the text */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#1C160E" /* Exactly matches --bg-primary */
            mask="url(#text-mask)"
          />
        </svg>

        {/* A subtle hint telling users to keep scrolling */}
        <div className="absolute bottom-10 inset-x-0 text-center z-20 pointer-events-none mix-blend-difference">
           <p className="font-body text-xs tracking-[0.3em] uppercase text-white/50">Keep scrolling</p>
        </div>

      </div>
    </section>
  )
}
