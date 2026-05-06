import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener?.('change', onChange) ?? mql.addListener(onChange)
    return () => {
      mql.removeEventListener?.('change', onChange) ?? mql.removeListener(onChange)
    }
  }, [query])

  return matches
}

export const useReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')
export const useIsTouch = () => !useMediaQuery('(hover: hover) and (pointer: fine)')
