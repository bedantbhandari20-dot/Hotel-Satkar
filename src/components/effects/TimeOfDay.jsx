import { useEffect, useState } from 'react'

/**
 * Sets a `data-tod` attribute on <html> based on the viewer's local time.
 * Buckets: dawn (5–8) · morning (8–12) · midday (12–16) · golden (16–19) · dusk (19–22) · night (22–5)
 * CSS reads `[data-tod="..."]` and nudges accent warmth via the .time-tint overlay.
 * Re-checks every 5 minutes so a long session naturally crosses boundaries.
 */
function bucketForHour(h) {
  if (h >= 5 && h < 8)   return 'dawn'
  if (h >= 8 && h < 12)  return 'morning'
  if (h >= 12 && h < 16) return 'midday'
  if (h >= 16 && h < 19) return 'golden'
  if (h >= 19 && h < 22) return 'dusk'
  return 'night'
}

export default function TimeOfDay() {
  const [tod, setTod] = useState(() => bucketForHour(new Date().getHours()))

  useEffect(() => {
    document.documentElement.setAttribute('data-tod', tod)
    const id = setInterval(() => {
      const next = bucketForHour(new Date().getHours())
      setTod((prev) => (prev === next ? prev : next))
    }, 5 * 60 * 1000)
    return () => clearInterval(id)
  }, [tod])

  return <div aria-hidden className="time-tint" />
}
