import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/cn.js'

/**
 * ImageReveal — premium image with:
 *   • Skeleton shimmer until decoded
 *   • Fade-in on load
 *   • Optional slow Ken Burns zoom
 *   • Consistent cinematic filter
 *
 * Accepts everything <img> does, plus:
 *   - aspect: tailwind aspect class (e.g. 'aspect-[4/3]')
 *   - rounded: tailwind radius (default 'rounded-card')
 *   - kenBurns: boolean — apply slow zoom animation
 *   - overlay: 'none' | 'soft' | 'strong' — gradient overlay for legibility
 */
export default function ImageReveal({
  src,
  alt = '',
  aspect = 'aspect-[4/3]',
  rounded = 'rounded-card',
  kenBurns = false,
  overlay = 'none',
  clip = false,
  className,
  imgClassName,
  loading = 'lazy',
  sizes,
  priority = false,
  ...props
}) {
  const [loaded, setLoaded] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const imgRef = useRef(null)
  const wrapRef = useRef(null)

  // If image is already cached, fire onLoad immediately
  useEffect(() => {
    const el = imgRef.current
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true)
  }, [])

  // Clip reveal — wipe in when scrolled into view
  useEffect(() => {
    if (!clip) return
    const el = wrapRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setRevealed(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [clip])

  const overlays = {
    none: null,
    soft: 'after:absolute after:inset-0 after:bg-gradient-to-t after:from-bg-inverse/55 after:to-transparent after:pointer-events-none',
    strong:
      'after:absolute after:inset-0 after:bg-gradient-to-t after:from-bg-inverse/85 after:via-bg-inverse/30 after:to-transparent after:pointer-events-none',
  }

  return (
    <div
      ref={wrapRef}
      className={cn(
        'relative overflow-hidden bg-surface-sunken',
        aspect,
        rounded,
        !loaded && 'skeleton',
        overlays[overlay],
        clip && 'clip-reveal',
        clip && revealed && 'is-revealed',
        className
      )}
      {...props}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : loading}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn(
          'img-cinema img-fade absolute inset-0',
          loaded && 'is-loaded',
          kenBurns && 'animate-slow-zoom',
          imgClassName
        )}
      />
    </div>
  )
}
