import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn.js'

/**
 * SplitText — splits children into per-word and per-character spans
 * with a CSS-driven mask reveal animation.
 *
 * Each character is wrapped in a span with overflow-hidden parent so the
 * masked translateY(100%) → 0 reveal feels like type emerging from below.
 *
 * Trigger:
 *   - immediate (default false): animate on mount
 *   - When wrapped in a [data-reveal-stagger] container, the parent useReveal
 *     hook will toggle .is-visible.
 *
 *   props:
 *     - as: HTML tag (default 'span')
 *     - text: string to split
 *     - splitBy: 'char' | 'word'  (default 'char')
 *     - stagger: ms between each (default 25)
 *     - delay: ms before first character starts (default 0)
 *     - duration: ms for each char (default 900)
 *     - className: outer
 *     - lineHeightFix: small bottom padding to keep descenders visible
 */
export default function SplitText({
  as: Tag = 'span',
  text = '',
  splitBy = 'char',
  stagger = 25,
  delay = 0,
  duration = 900,
  className,
  immediate = false,
  italicWords = [],
  lineHeightFix = '0.18em',
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!immediate) return
    // play immediately
    const id = requestAnimationFrame(() => {
      ref.current?.classList.add('is-revealed')
    })
    return () => cancelAnimationFrame(id)
  }, [immediate])

  // Reveal-on-scroll variant uses .reveal-split + IntersectionObserver below
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

  const words = text.split(/(\s+)/) // keep whitespace

  const renderChar = (ch, i, idxOffset) => {
    if (ch === ' ' || ch === '\u00A0') {
      return (
        <span key={`s-${idxOffset + i}`} className="inline-block">
          &nbsp;
        </span>
      )
    }
    return (
      <span
        key={`c-${idxOffset + i}`}
        className="split-char inline-block will-change-transform"
        style={{
          transitionDelay: `${delay + (idxOffset + i) * stagger}ms`,
          transitionDuration: `${duration}ms`,
        }}
        aria-hidden="true"
      >
        {ch}
      </span>
    )
  }

  let charIdx = 0
  const renderedWords = words.map((word, wi) => {
    if (/^\s+$/.test(word)) {
      return (
        <span key={`w-${wi}`} className="inline-block">
          &nbsp;
        </span>
      )
    }
    const isItalic = italicWords.some(
      (iw) => word.toLowerCase() === iw.toLowerCase()
    )
    const chars = splitBy === 'word'
      ? [
          <span
            key={`wc-${wi}`}
            className={cn(
              'split-char inline-block will-change-transform',
              isItalic && 'italic font-display text-accent'
            )}
            style={{
              transitionDelay: `${delay + charIdx * stagger}ms`,
              transitionDuration: `${duration}ms`,
            }}
            aria-hidden="true"
          >
            {word}
          </span>,
        ]
      : Array.from(word).map((ch, ci) => {
          const node = renderChar(ch, ci, charIdx)
          return isItalic
            ? (
              <span key={`ic-${wi}-${ci}`} className="italic font-display text-accent inline-block">
                {node}
              </span>
            )
            : node
        })
    charIdx += splitBy === 'word' ? 1 : word.length
    return (
      <span key={`w-${wi}`} className="split-word inline-block">
        {chars}
      </span>
    )
  })

  return (
    <Tag
      ref={ref}
      className={cn('split-root inline-block', className)}
      style={{ paddingBottom: lineHeightFix }}
    >
      {/* Visually-hidden full text for screen readers */}
      <span className="sr-only">{text}</span>
      {renderedWords}
    </Tag>
  )
}
