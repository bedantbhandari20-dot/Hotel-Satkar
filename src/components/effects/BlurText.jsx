import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn.js'

/**
 * BlurText — fades each word in from blur(10px) to sharp.
 * Feels like morning mist clearing.
 */
export default function BlurText({
  as: Tag = 'span',
  text = '',
  stagger = 120,
  delay = 0,
  duration = 1400,
  className,
  immediate = false,
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!immediate) return
    const id = requestAnimationFrame(() => {
      ref.current?.classList.add('is-revealed')
    })
    return () => cancelAnimationFrame(id)
  }, [immediate])

  useEffect(() => {
    if (immediate) return
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.classList.add('is-revealed')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [immediate])

  const words = text.split(/(\s+)/)

  let wordIdx = 0
  const renderedWords = words.map((word, wi) => {
    if (/^\s+$/.test(word)) {
      return (
        <span key={`w-${wi}`} className="inline-block">
          &nbsp;
        </span>
      )
    }

    const node = (
      <span
        key={`w-${wi}`}
        className="blur-word inline-block will-change-[filter,opacity,transform]"
        style={{
          transitionDelay: `${delay + wordIdx * stagger}ms`,
          transitionDuration: `${duration}ms`,
        }}
        aria-hidden="true"
      >
        {word}
      </span>
    )

    wordIdx++
    return node
  })

  return (
    <Tag ref={ref} className={cn('blur-root inline-block', className)}>
      <span className="sr-only">{text}</span>
      {renderedWords}
    </Tag>
  )
}
