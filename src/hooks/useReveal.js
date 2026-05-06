import { useEffect, useRef } from 'react'

/**
 * Adds .is-visible to .reveal elements when they enter viewport.
 * Also handles [data-reveal-stagger] containers — staggers children with .reveal-child.
 *
 * Pure IntersectionObserver — no library, no jank.
 */
export function useReveal(rootSelector = null) {
  const ref = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = rootSelector ? document.querySelector(rootSelector) : ref.current
    const scope = root || document

    if (prefersReduced) {
      // Skip animation — just unhide everything
      scope.querySelectorAll('.reveal, .reveal-child').forEach((el) => {
        el.classList.add('is-visible')
      })
      return
    }

    // 1. Standard reveal
    const targets = scope.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    targets.forEach((t) => io.observe(t))

    // 2. Staggered children (data-reveal-stagger)
    const staggerContainers = scope.querySelectorAll('[data-reveal-stagger]')
    const ioStagger = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const baseDelay = parseInt(entry.target.dataset.staggerStart || '0', 10)
          const step = parseInt(entry.target.dataset.staggerStep || '60', 10)
          const children = entry.target.querySelectorAll('.reveal-child')
          children.forEach((child, i) => {
            child.style.transitionDelay = `${baseDelay + i * step}ms`
            child.classList.add('is-visible')
          })
          ioStagger.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )
    staggerContainers.forEach((c) => ioStagger.observe(c))

    return () => {
      io.disconnect()
      ioStagger.disconnect()
    }
  }, [rootSelector])

  return ref
}
