import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn.js'

const CHARS = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export default function ScrambleText({
  as: Tag = 'span',
  text,
  className,
  delay = 0,
  duration = 1500,
  immediate = false,
}) {
  // Start with invisible characters so height/layout is preserved
  // but it doesn't show before the delay kicks in.
  const [displayText, setDisplayText] = useState(() => text.replace(/[^\s]/g, '\u00A0'))
  const [isScrambling, setIsScrambling] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    let frameId
    let startTimestamp = null
    let timeoutId = null

    const scramble = () => {
      setIsScrambling(true)
      const animate = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min(1, (timestamp - startTimestamp) / duration)
        
        if (progress === 1) {
          setDisplayText(text)
          setIsScrambling(false)
          return
        }

        const resolveCount = Math.floor(progress * text.length)
        
        let scrambled = ''
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ' || text[i] === '\u00A0') {
            scrambled += text[i]
          } else if (i < resolveCount) {
            scrambled += text[i]
          } else {
            scrambled += CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        }
        
        setDisplayText(scrambled)
        frameId = requestAnimationFrame(animate)
      }
      frameId = requestAnimationFrame(animate)
    }

    if (immediate) {
      timeoutId = setTimeout(scramble, delay)
    } else {
      const el = ref.current
      if (!el) return
      
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        setDisplayText(text)
        return
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              timeoutId = setTimeout(scramble, delay)
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
      )
      io.observe(el)

      return () => {
        io.disconnect()
        clearTimeout(timeoutId)
        if (frameId) cancelAnimationFrame(frameId)
      }
    }

    return () => {
      clearTimeout(timeoutId)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [immediate, text, delay, duration])

  return (
    <Tag ref={ref} className={cn('inline-block', className)} aria-hidden="true">
      {displayText}
    </Tag>
  )
}
