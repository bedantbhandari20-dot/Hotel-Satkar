import { useEffect, useRef, useState } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import Button from '../ui/Button.jsx'
import SplitText from '../effects/SplitText.jsx'
import BlurText from '../effects/BlurText.jsx'
import Counter from '../effects/Counter.jsx'
import { site, whatsappLink } from '../../data/site.js'
import { ratingMeta } from '../../data/reviews.js'
import { useReducedMotion } from '../../hooks/useMediaQuery.js'
import AmbientParticles from '../effects/AmbientParticles.jsx'
import WeatherWidget from '../effects/WeatherWidget.jsx'

export default function Hero() {
  const bgRef = useRef(null)
  const cueRef = useRef(null)
  const [start, setStart] = useState(false)
  const prefersReduced = useReducedMotion()

  // Begin choreography after Loader finishes (or immediately if returning user)
  useEffect(() => {
    const isLoaded = sessionStorage.getItem('satkar:loaded')
    if (isLoaded || prefersReduced) {
      setStart(true)
    } else {
      // Loader runs ~1.6-2s; start hero just before curtain peels
      const t = setTimeout(() => setStart(true), 1500)
      return () => clearTimeout(t)
    }
  }, [prefersReduced])

  // Hero backdrop parallax + scroll-fade for cue
  useEffect(() => {
    if (prefersReduced) return
    let raf
    const update = () => {
      const el = bgRef.current
      const cue = cueRef.current
      const y = window.scrollY
      if (el) {
        // Cinematic Ken Burns: Image scales up and shifts down slightly as you scroll
        const scale = 1 + y * 0.00015
        const yOffset = y * 0.15
        
        // Transform is hardware accelerated. 
        // We removed the desktop check because scaling up prevents background reveal.
        el.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
      }
      if (cue) {
        // Fade cue out across first 400px of scroll
        const fadeOut = Math.max(0, 1 - y / 400)
        cue.style.opacity = fadeOut.toFixed(3)
        cue.style.transform = `translate(-50%, ${(y * 0.2).toFixed(2)}px)`
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [prefersReduced])

  return (
    <section className="relative isolate min-h-[100svh] flex items-end overflow-hidden" style={{ background: '#E8E0D2' }}>

      {/* ===== HERO BACKDROP — Doti hills at golden hour ===== */}
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'sepia(0.25) saturate(0.9) brightness(0.92) contrast(1.05)' }}
          loading="eager"
          fetchpriority="high"
        />
        {/* Warm gradient veil — keeps text readable, ties to palette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(232,224,210,0.55) 0%, rgba(232,224,210,0.35) 30%, rgba(44,36,24,0.35) 80%, rgba(44,36,24,0.55) 100%)',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-vignette opacity-60" />
      </div>

      {/* Ambient dust/pollen motes in the warm light */}
      <AmbientParticles count={24} color="210, 185, 140" opacity={0.15} speed={0.4} area="hero" />

      {/* ===== MORNING FOG — two counter-drifting veils behind the headline ===== */}
      {!prefersReduced && (
        <>
          {/* Primary veil — wide, crests around headline height, 25s drift */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-18%] top-[18%] h-[58%] animate-fog-drift will-change-transform"
            style={{
              background:
                'linear-gradient(180deg, rgba(245,240,232,0) 0%, rgba(245,240,232,0.07) 35%, rgba(245,240,232,0.13) 55%, rgba(245,240,232,0) 100%)',
              filter: 'blur(32px)',
            }}
          />
          {/* Counter-wisp — offset altitude + reverse drift, 30s */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-22%] top-[32%] h-[42%] animate-fog-drift-reverse will-change-transform"
            style={{
              background:
                'linear-gradient(180deg, rgba(245,240,232,0) 0%, rgba(245,240,232,0.05) 40%, rgba(245,240,232,0.09) 58%, rgba(245,240,232,0) 100%)',
              filter: 'blur(48px)',
            }}
          />
        </>
      )}

      {/* ============= CONTENT ============= */}
      <div className="relative w-full mx-auto max-w-content px-gutter pb-[clamp(5rem,12vw,10rem)] pt-nav">
        <div className="max-w-2xl">
          {/* Eyebrow — subtle location marker */}
          <div
            className="mb-6 transition-[opacity,transform] duration-700 ease-out"
            style={{
              opacity: start ? 1 : 0,
              transform: start ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: '300ms',
            }}
          >
            <span className="hero-eyebrow inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em]">
              <span className="hero-eyebrow-rule block w-8 h-px" />
              Dipayal, Doti — Nepal
            </span>
            <WeatherWidget />
            <span className="hero-coords mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.3em]">
              <span className="hero-coords-pin" aria-hidden>◆</span>
              <span>29.26°N</span>
              <span className="hero-coords-dot" aria-hidden>·</span>
              <span>80.93°E</span>
              <span className="hero-coords-dot" aria-hidden>·</span>
              <span className="hero-coords-elev">640m elevation</span>
            </span>
          </div>

          {/* Headline — character mask reveal */}
          <h1
            className="font-display text-d-1 hero-headline text-balance"
            data-cursor="text"
          >
            <BlurText
              text="A trusted anchor in the heart of "
              delay={600}
              duration={2400}
              stagger={180}
              immediate={start}
            />
            <span className="relative inline-block">
              <BlurText
                text="Doti."
                delay={1500}
                duration={2800}
                stagger={250}
                className="hero-accent-text italic"
                immediate={start}
              />
              {/* Calligraphic stroke that draws in beneath the italic */}
              <span
                aria-hidden
                className="hero-underline absolute left-0 right-3 -bottom-1 h-[2px] origin-left transition-transform duration-1200 ease-silk"
                style={{
                  transform: start ? 'scaleX(1)' : 'scaleX(0)',
                  transitionDelay: '2100ms',
                }}
              />
            </span>
          </h1>

          {/* Nepali tagline */}
          <p className="mt-5 max-w-2xl font-body text-lead hero-tagline text-pretty">
            डोटीको मुटुमा एउटा विश्वासिलो स्थान
          </p>

          {/* Lead — word-stagger reveal */}
          <p className="mt-7 max-w-xl font-body text-lead hero-lead text-pretty">
            <SplitText
              text="Warm rooms, an honest kitchen, and a bakery the town wakes up to — whether you're passing through or staying a season."
              splitBy="word"
              stagger={28}
              delay={1500}
              duration={900}
              immediate={start}
              lineHeightFix="0.32em"
            />
          </p>

          {/* CTA hierarchy — fade up after type lands */}
          <div
            className="mt-10 flex flex-wrap items-center gap-4 transition-[opacity,transform] duration-1100 ease-silk"
            style={{
              opacity: start ? 1 : 0,
              transform: start ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '2300ms',
            }}
          >
            <Button
              href={`tel:${site.phoneTel}`}
              variant="primary"
              size="lg"
              leadingIcon={<Phone size={14} strokeWidth={1.75} />}
              magnetic
              kineticLabel
            >
              Call to Book
            </Button>
            <Button
              href={whatsappLink()}
              variant="ghost"
              size="lg"
              trailingIcon={<MessageCircle size={14} strokeWidth={1.75} />}
              magnetic
              kineticLabel
              className="hero-ghost-btn"
            >
              Chat on WhatsApp
            </Button>
          </div>

          {/* Micro-trust under CTAs */}
          <div
            className="mt-5 inline-flex items-center gap-3 hero-micro-trust transition-[opacity,transform] duration-700 ease-out"
            style={{
              opacity: start ? 1 : 0,
              transform: start ? 'translateY(0)' : 'translateY(8px)',
              transitionDelay: '2500ms',
            }}
          >
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="animate-ping absolute inset-0 rounded-full bg-accent-moss/50 opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-accent-moss" />
            </span>
            <span className="font-body text-[10.5px] uppercase tracking-[0.22em]">
              Front desk open now · typically replies in minutes
            </span>
          </div>
        </div>

        {/* Trust signals row — separated by subtle top border */}
        <div
          className="mt-14 max-w-3xl"
          style={{
            opacity: start ? 1 : 0,
            transform: start ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 900ms ease, transform 900ms ease',
            transitionDelay: '2700ms',
          }}
        >
          <div className="hero-trust-row flex flex-wrap items-baseline gap-x-10 gap-y-6 py-5 px-6 -mx-6">
            <TrustCell
              value={<><Counter to={ratingMeta.average} decimals={1} startOnMount={start} />★</>}
              label={<><Counter to={ratingMeta.count} startOnMount={start} /> Google reviews</>}
            />
            <TrustCell value={<Counter to={6} startOnMount={start} />} label="Room categories" />
            <TrustCell value={<><Counter to={24} startOnMount={start} duration={1200} />/<Counter to={7} startOnMount={start} duration={1400} /></>} label="Front desk" />
            <TrustCell value={<><Counter to={2056} startOnMount={start} duration={2000} /> B.S.</>} label="Established" />
          </div>
        </div>
      </div>

      {/* Scroll cue — fades via rAF as user scrolls */}
      <div
        ref={cueRef}
        aria-hidden
        className="absolute bottom-6 left-1/2 flex flex-col items-center gap-2 hero-scroll-cue will-change-[opacity,transform]"
        style={{
          opacity: start ? 1 : 0,
          transform: 'translate(-50%, 0)',
          transition: 'opacity 700ms ease',
          transitionDelay: '3000ms',
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <span className="hero-scroll-line block w-px h-8 animate-scroll-cue" />
      </div>
    </section>
  )
}

function TrustCell({ value, label }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-2xl hero-trust-value tabular-nums">
        {value}
      </span>
      <span className="font-body text-[10px] uppercase tracking-[0.2em] hero-trust-label">
        {label}
      </span>
    </div>
  )
}
