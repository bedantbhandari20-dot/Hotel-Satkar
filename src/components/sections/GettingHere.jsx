import { useEffect, useRef, useState } from 'react'
import { Plane, Bus, Car, MapPin, Phone, RotateCw, Check, Pause, Play } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Button from '../ui/Button.jsx'
import { whatsappLink } from '../../data/site.js'
import { cn } from '../../lib/cn.js'
import { useReducedMotion } from '../../hooks/useMediaQuery.js'

/* ============================================================================
   Route data — preserves all the practical detail from the previous design,
   reframed as an animated journey.
   ============================================================================ */
// Approximate road/flight distances (km) along each leg.
// Sources: Nepal road inventory + flight aero distance KTM→DHI.
// Arrival nodes are 0 km — they're a marker, not a leg.
const routes = [
  {
    id: 'ktm',
    icon: Plane,
    from: 'From Kathmandu',
    nepali: 'काठमाडौंबाट',
    time: '~8 hr total',
    steps: [
      { mode: Plane, km: 600, leg: 'Fly KTM → Dhangadhi', duration: '1h 30m', detail: 'Yeti, Buddha, or Shree Airlines — daily flights to Dhangadhi (DHI). Book 2–3 days ahead.' },
      { mode: Bus,   km: 35,  leg: 'Dhangadhi → Attariya', duration: '~1h',   detail: 'Jeep or bus from Dhangadhi bus park. Catch the Doti-bound vehicle at Attariya junction.' },
      { mode: Car,   km: 130, leg: 'Attariya → Doti',      duration: '~5h',   detail: 'Mountain highway through the Doti hills into Dipayal. Last departure ~14:00.' },
    ],
    tip: 'Book an early-morning flight so you arrive in Dipayal before dark.',
  },
  {
    id: 'nepalgunj',
    icon: Bus,
    from: 'From Nepalgunj',
    nepali: 'नेपालगञ्जबाट',
    time: '~7 hr drive',
    steps: [
      { mode: Bus, km: 250, leg: 'Nepalgunj → Attariya', duration: '~4h', detail: 'Shared jeep or bus along the Mahakali highway.' },
      { mode: Car, km: 130, leg: 'Attariya → Doti',      duration: '~3h', detail: 'Change to a Doti-bound jeep at Attariya junction. Climbs into the hills.' },
    ],
    tip: 'Nepalgunj has daily flights from Kathmandu if you prefer to fly partway.',
  },
  {
    id: 'mahendranagar',
    icon: Car,
    from: 'From Mahendranagar',
    nepali: 'महेन्द्रनगरबाट',
    time: '~5 hr drive',
    steps: [
      { mode: Car, km: 95, leg: 'Mahendranagar → Dadeldhura', duration: '~3h', detail: 'Hill road. Scenic but steep — avoid right after heavy rain.' },
      { mode: Car, km: 85, leg: 'Dadeldhura → Doti',          duration: '~2h', detail: 'Winding down into the Dipayal valley.' },
    ],
    tip: 'Mahendranagar is the entry point from Banbasa, Uttarakhand (India) — just 15 min across the border.',
  },
  {
    id: 'india',
    icon: MapPin,
    from: 'From India (Banbasa)',
    nepali: 'भारत (बनबासा) बाट',
    time: '~5.5 hr',
    steps: [
      { mode: MapPin, km: 5,  leg: 'Cross at Banbasa–Mahendranagar', duration: '~30m', detail: 'Open border. ID for Nepali/Indian nationals; passport for others. Open 6:00–20:00.' },
      { mode: Car,    km: 95, leg: 'Mahendranagar → Dadeldhura',     duration: '~3h',  detail: 'Jeep via the hill road.' },
      { mode: Car,    km: 85, leg: 'Dadeldhura → Doti',              duration: '~2h',  detail: 'Final stretch down into the Dipayal valley.' },
    ],
    tip: 'Coming from Delhi? Take the overnight train to Tanakpur, then taxi to Banbasa (~30 min).',
  },
]

// ----- Distance math --------------------------------------------------------
// Total km in a route (excluding 0-km arrival markers).
const totalKm = (route) => route.steps.reduce((s, x) => s + (x.km || 0), 0)

// Cumulative km BEFORE the start of step i (i.e. distance traveled when arriving at node i).
const cumKmAt = (route, i) =>
  route.steps.slice(0, i).reduce((s, x) => s + (x.km || 0), 0)

// Auto-advance timing: ~7 seconds total animation, weighted by leg length.
// Short legs feel quick; the long flight or bus ride takes more time.
const TOTAL_ANIM_MS = 7000
const MIN_STEP_MS = 700
const stepDurationFor = (route, i) => {
  const total = totalKm(route)
  if (total === 0 || !route.steps[i]?.km) return MIN_STEP_MS
  const fraction = route.steps[i].km / total
  return Math.max(MIN_STEP_MS, Math.round(fraction * TOTAL_ANIM_MS))
}

// Visual rail layout. Each leg gets a vertical gap proportional to its km share,
// clamped to a sane minimum so cards never overlap.
const STEP_GAP_PX = 72         // fixed gap between every pair of nodes
const stepGapPx = (route, i) => {
  if (i === route.steps.length - 1) return 0
  return STEP_GAP_PX
}

/* ============================================================================
   Component
   ============================================================================ */
const NODE_HEIGHT_PX = 40 + STEP_GAP_PX  // 112 — height of each <li> slot

export default function GettingHere() {
  const [activeId, setActiveId] = useState(routes[0].id)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const sectionRef = useRef(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [soulKey, setSoulKey] = useState(0)
  const prefersReduced = useReducedMotion()

  const route = routes.find((r) => r.id === activeId)
  const totalSteps = route.steps.length
  const isComplete = step >= totalSteps - 1

  // Start animation only when section enters the viewport
  useEffect(() => {
    if (!sectionRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          io.disconnect()
        }
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: 0 }
    )
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  // Auto-advance steps when playing — duration of each step is proportional
  // to the actual km of that leg (via stepDurationFor)
  useEffect(() => {
    if (!hasEntered || !playing || prefersReduced) return
    if (step >= totalSteps - 1) return
    const ms = stepDurationFor(route, step)
    const t = setTimeout(() => setStep((s) => s + 1), ms)
    return () => clearTimeout(t)
  }, [step, playing, hasEntered, prefersReduced, totalSteps, route])

  // Reduced motion → reveal all steps immediately
  useEffect(() => {
    if (prefersReduced && hasEntered) setStep(totalSteps - 1)
  }, [prefersReduced, hasEntered, totalSteps])

  // Increment soulKey on every step change so the impact animation re-fires
  useEffect(() => {
    setSoulKey((k) => k + 1)
  }, [step])

  const switchRoute = (id) => {
    setActiveId(id)
    setStep(0)
    setPlaying(true)
  }

  const replay = () => {
    setStep(0)
    setPlaying(true)
  }

  // ----- Distance-aware progress --------------------------------------------
  const routeTotalKm = totalKm(route)
  const traveledKm = cumKmAt(route, step)
  const progressKmPct = routeTotalKm > 0 ? (traveledKm / routeTotalKm) * 100 : 0

  // Step-timing for the smooth fill transition (matches stepDurationFor)
  const currentTransitionMs = step > 0 ? stepDurationFor(route, step - 1) : 600

  return (
    <Section tone="secondary" bordered id="getting-here" className="scroll-mt-nav">
      <div ref={sectionRef} />
      <span className="eyebrow text-accent block mb-6 reveal">Getting here</span>
      <p className="font-mono text-[11px] tracking-[0.14em] text-accent-soft block mb-5 normal-case reveal">
        यहाँ कसरी पुग्ने
      </p>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12 reveal">
        <h2 className="font-display text-d-3 text-text-primary text-balance max-w-xl">
          Dipayal takes a little planning.<br />
          <em className="font-display text-accent-soft">Pick your starting point.</em>
        </h2>
        <Button
          href={whatsappLink('Hi Satkar! Can you help me plan the trip to Dipayal?')}
          variant="ghost"
          size="md"
          trailingIcon={<Phone size={13} strokeWidth={1.75} />}
          className="shrink-0"
        >
          Ask us anything
        </Button>
      </div>

      {/* ============== ORIGIN TABS ============== */}
      <div className="reveal mb-10 flex flex-wrap gap-2 md:gap-3">
        {routes.map((r) => {
          const RIcon = r.icon
          const active = r.id === activeId
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => switchRoute(r.id)}
              aria-pressed={active}
              className={cn(
                'group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-pill border',
                'font-body text-[10.5px] uppercase tracking-[0.22em]',
                'transition-[background-color,border-color,color,box-shadow] duration-450 ease-out-quart',
                active
                  ? 'bg-bg-inverse text-text-inverse border-bg-inverse shadow-[0_8px_24px_-12px_rgba(44,36,24,0.5)]'
                  : 'border-line text-text-secondary hover:border-line-strong hover:text-text-primary'
              )}
            >
              <RIcon size={13} strokeWidth={1.5} className={cn(active ? 'text-accent-gold' : 'text-accent-soft')} />
              <span>{r.from.replace('From ', '')}</span>
              <span
                className={cn(
                  'font-mono text-[9px] tracking-[0.16em] normal-case ml-1',
                  active ? 'text-text-inverse/60' : 'text-text-tertiary'
                )}
              >
                {r.time}
              </span>
            </button>
          )
        })}
      </div>

      {/* ============== ANIMATED JOURNEY ============== */}
      <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left rail — vertical traveler progress */}
        <div className="lg:col-span-7 relative">
          {/* Progress bar header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-accent-soft">
                {route.nepali}
              </p>
              <span className="block w-1 h-1 rounded-full bg-line-accent" />
              <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-text-secondary tabular-nums">
                <span className="text-accent-gold">{Math.round(traveledKm).toLocaleString()}</span>
                <span className="mx-1 text-text-tertiary">/</span>
                <span>{routeTotalKm.toLocaleString()} km</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause' : 'Play'}
                className="w-8 h-8 rounded-full border border-line text-text-secondary hover:border-line-strong hover:text-text-primary transition-colors duration-300 flex items-center justify-center"
              >
                {playing ? <Pause size={12} strokeWidth={1.75} /> : <Play size={12} strokeWidth={1.75} />}
              </button>
              <button
                type="button"
                onClick={replay}
                aria-label="Replay"
                className="w-8 h-8 rounded-full border border-line text-text-secondary hover:border-line-strong hover:text-text-primary transition-colors duration-300 flex items-center justify-center"
              >
                <RotateCw size={12} strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* Stepper — each row is a 2-column grid: [node + connector] | [card + gap] */}
          <ol key={route.id} className="relative">

            {route.steps.map((s, i) => {
              const ModeIcon = s.mode
              const isActive = i === step
              const isDone = i < step
              const visible = i <= step
              const gapPx = stepGapPx(route, i)
              const legKmPct = routeTotalKm > 0 ? Math.round((s.km / routeTotalKm) * 100) : 0
              const legAnimMs = stepDurationFor(route, i)
              const isLast = i === totalSteps - 1

              return (
                <li
                  key={i}
                  className={cn(
                    'relative grid grid-cols-[40px_1fr] gap-x-4 transition-[opacity] duration-700 ease-out-expo',
                    visible ? 'opacity-100' : 'opacity-30',
                  )}
                >
                  {/* LEFT — node + per-leg connector line */}
                  <div className="relative" style={{ paddingBottom: `${gapPx}px` }}>
                    {/* Faint rail dot — just a positional anchor, no line */}
                    {!isLast && (
                      <span aria-hidden className="absolute left-[19px] top-[2.5rem] bottom-0 w-px bg-line/30 z-0" />
                    )}

                    {/* Node — clickable */}
                    <button
                      type="button"
                      onClick={() => { setStep(i); setPlaying(false) }}
                      aria-label={`Jump to step ${i + 1}: ${s.leg}`}
                      className={cn(
                        'relative w-10 h-10 rounded-full border flex items-center justify-center z-10',
                        'transition-[background-color,border-color,box-shadow,transform] duration-500 ease-organic',
                        isActive && 'border-accent bg-accent/12 shadow-[0_0_0_6px_rgba(196,152,44,0.10)] scale-105',
                        isDone && 'border-accent-pine bg-accent-pine/15',
                        !isActive && !isDone && 'border-line bg-bg-primary',
                      )}
                    >
                      {isDone ? (
                        <Check size={13} strokeWidth={2} className="text-accent-pine" />
                      ) : (
                        <ModeIcon
                          size={13}
                          strokeWidth={1.5}
                          className={cn(
                            isActive && 'text-accent',
                            !isActive && !isDone && 'text-text-tertiary',
                          )}
                        />
                      )}
                      {isActive && !prefersReduced && (
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full ring-2 ring-accent/40 animate-ping"
                          style={{ animationDuration: '2s' }}
                        />
                      )}
                    </button>
                  </div>

                  {/* RIGHT — card and proportional gap below */}
                  <div style={{ paddingBottom: `${gapPx}px` }}>
                    <div
                      className={cn(
                        'rounded-card border p-5 md:p-6 transition-[background-color,border-color,box-shadow] duration-500 ease-organic',
                        isActive
                          ? 'bg-surface border-line-accent shadow-card'
                          : 'bg-bg-primary border-line',
                      )}
                    >
                      <div className="flex items-baseline justify-between gap-4 mb-1.5">
                        <p className="font-display text-lg md:text-xl text-balance leading-snug text-text-primary">
                          {s.leg}
                        </p>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-soft shrink-0 tabular-nums">
                          {s.duration}
                        </span>
                      </div>
                      <p className="font-body text-[13px] md:text-sm text-text-secondary leading-relaxed text-pretty mb-3">
                        {s.detail}
                      </p>
                      {s.km > 0 && (
                        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary tabular-nums">
                          <span className="text-accent-gold">{s.km} km</span>
                          <span aria-hidden className="block w-1 h-1 rounded-full bg-line-accent" />
                          <span>{legKmPct}% of journey</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Total journey card — appears after last leg completes */}
          <div
            className={cn(
              'mt-6 grid grid-cols-[40px_1fr] gap-x-4 transition-[opacity] duration-700 ease-out-expo',
              isComplete ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
          >
            <div className="flex items-center justify-center pt-1">
              <span className="w-10 h-10 rounded-full border border-accent-gold bg-accent-gold/15 flex items-center justify-center shadow-[0_0_0_8px_rgba(196,152,44,0.10)]">
                <MapPin size={14} strokeWidth={1.5} className="text-accent-gold" />
              </span>
            </div>
            <div className="rounded-card border border-accent-gold/40 bg-accent-gold/5 p-5 md:p-6 shadow-card">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <p className="font-display text-lg md:text-xl text-accent-gold">Arrive at Satkar</p>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-soft shrink-0">{route.time}</span>
              </div>
              <p className="font-body text-[13px] md:text-sm text-text-secondary text-pretty mb-4">
                {route.from.replace('From ', '')} to Dipayal Bazar · ~{routeTotalKm.toLocaleString()} km total
              </p>
              <p className="font-body text-[13px] text-text-primary text-pretty italic">
                {route.tip}
              </p>
            </div>
          </div>
        </div>

        {/* Right column — context panel */}
        <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <div className="rounded-card border border-line bg-surface p-7 md:p-8 shadow-card">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-accent-soft mb-3">
              Total journey
            </p>
            <p className="font-display text-d-3 text-text-primary mb-2 tabular-nums">
              {route.time.replace('~', '')}
            </p>
            <p className="font-body text-sm text-text-secondary text-pretty mb-5">
              {route.from} to Dipayal · Doti
            </p>

            {/* Total km readout */}
            <div className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary mb-1">
              <span>Distance</span>
            </div>
            <p className="font-display text-2xl text-accent-gold tabular-nums">
              ~{routeTotalKm.toLocaleString()} km
            </p>

            <div className="h-px bg-line my-6" />

            <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-accent-gold mb-3">
              Tip
            </p>
            <p className="font-body text-sm text-text-primary leading-relaxed text-pretty">
              {route.tip}
            </p>

            {/* Progress mini-bar — driven by km, not step count */}
            <div className="mt-7 pt-6 border-t border-line">
              <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.22em] text-text-tertiary mb-2">
                <span>
                  <span className="text-accent">{Math.round(traveledKm).toLocaleString()}</span>
                  <span className="mx-1.5 text-text-tertiary">/</span>
                  <span>{routeTotalKm.toLocaleString()} km</span>
                </span>
                <span className="tabular-nums text-accent-gold">{Math.round(progressKmPct)}%</span>
              </div>
              <div className="h-1 rounded-pill bg-line overflow-hidden">
                <div
                  className="h-full rounded-pill bg-gradient-to-r from-accent-gold via-accent to-accent-pine transition-[width] ease-out-expo"
                  style={{
                    width: `${progressKmPct}%`,
                    transitionDuration: prefersReduced ? '0ms' : `${currentTransitionMs}ms`,
                  }}
                />
              </div>
            </div>

            {isComplete && (
              <div className="mt-7 flex items-center gap-3 p-4 rounded bg-accent-gold/10 border border-accent-gold/30">
                <span className="block w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                <p className="font-body text-sm text-text-primary">
                  Welcome to <span className="font-display text-accent-gold">Satkar</span>.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Local pickup note */}
      <div className="mt-12 reveal flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-card border border-line-accent bg-accent/5">
        <div className="w-10 h-10 rounded-full border border-line-accent bg-accent/10 flex items-center justify-center shrink-0">
          <Car size={15} strokeWidth={1.5} className="text-accent" />
        </div>
        <div>
          <p className="font-body text-sm font-medium text-text-primary mb-1">Local pickup on request</p>
          <p className="font-body text-sm text-text-secondary text-pretty">
            Arriving at Dhangadhi Airport or Mahendranagar and don&apos;t want to sort the jeeps yourself?
            WhatsApp us 24 hours ahead and we&apos;ll arrange a driver from NPR 3,000–5,000 depending on distance.
          </p>
        </div>
      </div>
    </Section>
  )
}
