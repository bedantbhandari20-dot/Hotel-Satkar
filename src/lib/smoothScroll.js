import Lenis from 'lenis'

let lenisInstance = null

/**
 * Initialize Lenis once for the entire app.
 * Returns the singleton instance — safe to call multiple times.
 *
 * Award-tier easing: cubic-bezier-like exponential out (Awwwards SOTD signature).
 */
export function initSmoothScroll() {
  if (lenisInstance) return lenisInstance

  // Respect reduced motion — skip smooth scroll entirely
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Disable Lenis on mobile/touch screens to let native 120Hz scrolling take over
  const isTouch = window.matchMedia('(pointer: coarse), (max-width: 1024px)').matches
  if (prefersReduced || isTouch) return null

  lenisInstance = new Lenis({
    duration: 1.15,
    // Out-expo curve — cinematic deceleration
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.6,
    syncTouch: false,
    lerp: 0.1,
  })

  // Drive Lenis with rAF
  function raf(time) {
    lenisInstance?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}

export function scrollToTop(immediate = false) {
  if (!lenisInstance) {
    window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'auto' })
    return
  }
  lenisInstance.scrollTo(0, { immediate })
}

export function scrollTo(target, options = {}) {
  if (!lenisInstance) {
    if (typeof target === 'string') {
      const el = document.querySelector(target)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
    return
  }
  lenisInstance.scrollTo(target, options)
}
