import { useEffect, useState } from 'react'

const CACHE_KEY = 'satkar:weather'
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

function wmoLabel(code) {
  if (code === 0)            return 'clear sky'
  if (code <= 2)             return 'mainly clear'
  if (code === 3)            return 'overcast'
  if (code <= 49)            return 'mist clearing'
  if (code <= 57)            return 'drizzle'
  if (code <= 67)            return 'rain'
  if (code <= 77)            return 'snow'
  if (code <= 82)            return 'rain showers'
  if (code >= 95)            return 'thunderstorm'
  return 'variable'
}

function formatTime(iso) {
  // iso is "2024-01-15T06:12" — extract HH:MM
  return iso ? iso.slice(11, 16) : '—'
}

export default function WeatherWidget() {
  const [data, setData] = useState(() => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY))
      if (cached && Date.now() - cached.ts < CACHE_TTL) return cached
    } catch {}
    return null
  })

  useEffect(() => {
    if (data) return
    const url =
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude=29.26&longitude=80.93' +
      '&current=temperature_2m,weather_code' +
      '&daily=sunrise,sunset' +
      '&timezone=Asia%2FKathmandu&forecast_days=1'
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        const payload = {
          ts: Date.now(),
          temp: Math.round(json.current.temperature_2m),
          code: json.current.weather_code,
          sunrise: formatTime(json.daily.sunrise?.[0]),
          sunset: formatTime(json.daily.sunset?.[0]),
        }
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload))
        setData(payload)
      })
      .catch(() => {}) // silently fail — widget just stays hidden
  }, [data])

  if (!data) return null

  return (
    <span className="hero-weather mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.3em]">
      <span className="hero-weather-temp">{data.temp}°C</span>
      <span className="hero-coords-dot" aria-hidden>·</span>
      <span className="hero-weather-cond">{wmoLabel(data.code)}</span>
      <span className="hero-coords-dot" aria-hidden>·</span>
      <span>↑ {data.sunrise}</span>
      <span className="hero-coords-dot" aria-hidden>·</span>
      <span>↓ {data.sunset}</span>
    </span>
  )
}
