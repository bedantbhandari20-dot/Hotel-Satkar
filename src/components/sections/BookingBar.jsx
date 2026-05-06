import { useState, useEffect } from 'react'
import { Calendar, Users, ArrowUpRight, Phone, MessageCircle } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { site, whatsappLink } from '../../data/site.js'
import { cn } from '../../lib/cn.js'

const today = () => new Date().toISOString().slice(0, 10)
const tomorrow = () => new Date(Date.now() + 86400000).toISOString().slice(0, 10)

export default function BookingBar() {
  const [checkin, setCheckin] = useState(today())
  const [checkout, setCheckout] = useState(tomorrow())
  const [guests, setGuests] = useState('2')
  const [sticky, setSticky] = useState(false)

  const nights = Math.max(
    1,
    Math.round((new Date(checkout) - new Date(checkin)) / 86400000)
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg =
      `Hi Satkar! I'd like to book a room.\n` +
      `• Check-in: ${checkin}\n` +
      `• Check-out: ${checkout}\n` +
      `• Nights: ${nights}\n` +
      `• Guests: ${guests}`
    window.open(whatsappLink(msg), '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setSticky(window.scrollY > window.innerHeight * 0.75)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
    {/* Sticky desktop strip — slides in below the navbar */}
    <div
      aria-hidden={!sticky}
      className={cn(
        'hidden md:block fixed left-0 right-0 z-40',
        'bg-bg-primary/98 md:bg-bg-primary/96 backdrop-blur-sm md:backdrop-blur-2xl border-b border-line',
        'shadow-[0_4px_24px_rgba(44,36,24,0.06)]',
        'transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]',
        sticky
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-full pointer-events-none'
      )}
      style={{ top: '88px' }}
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-content px-gutter h-14 flex items-center gap-6"
      >
        <div className="flex items-center gap-2">
          <Calendar size={12} strokeWidth={1.5} className="text-accent shrink-0" />
          <span className="font-body text-[10.5px] uppercase tracking-[0.18em] text-text-secondary">In</span>
          <input
            type="date"
            value={checkin}
            min={today()}
            onChange={(e) => setCheckin(e.target.value)}
            className="bg-transparent font-body text-sm text-text-primary focus:outline-none tabular-nums cursor-pointer"
          />
        </div>
        <span aria-hidden className="text-line/60 font-mono text-xs select-none">→</span>
        <div className="flex items-center gap-2">
          <span className="font-body text-[10.5px] uppercase tracking-[0.18em] text-text-secondary">Out</span>
          <input
            type="date"
            value={checkout}
            min={checkin}
            onChange={(e) => setCheckout(e.target.value)}
            className="bg-transparent font-body text-sm text-text-primary focus:outline-none tabular-nums cursor-pointer"
          />
          <span className="font-mono text-[10px] text-text-tertiary tabular-nums">{nights}n</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={12} strokeWidth={1.5} className="text-accent shrink-0" />
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="bg-transparent font-body text-sm text-text-primary focus:outline-none cursor-pointer"
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5+">5+ guests</option>
          </select>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            href={`tel:${site.phoneTel}`}
            variant="ghost"
            size="sm"
            leadingIcon={<Phone size={12} strokeWidth={1.75} />}
            aria-label="Call to book"
          >
            Call
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            trailingIcon={<ArrowUpRight size={12} strokeWidth={1.75} />}
          >
            Check Availability
          </Button>
        </div>
      </form>
    </div>

    {/* Sticky mobile bottom bar */}
    <div
      aria-hidden={!sticky}
      className={cn(
        'md:hidden fixed left-0 right-0 z-40',
        'bg-bg-inverse/98 backdrop-blur-sm border-t border-white/10',
        'transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]',
        sticky
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-full pointer-events-none'
      )}
      style={{
        bottom: 0,
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      }}
    >
      <div className="px-4 pt-3 flex gap-3">
        <Button
          href={`tel:${site.phoneTel}`}
          variant="primary"
          size="md"
          fullWidth
          leadingIcon={<Phone size={14} strokeWidth={1.75} />}
        >
          Call to Book
        </Button>
        <Button
          href={whatsappLink()}
          variant="ghost"
          size="md"
          aria-label="Chat on WhatsApp"
          leadingIcon={<MessageCircle size={14} strokeWidth={1.75} />}
          className="shrink-0 text-text-inverse border-white/20 hover:border-white/40 hover:bg-white/10"
        >
          Chat
        </Button>
      </div>
    </div>

    <section className="relative -mt-24 z-10">
      <div className="mx-auto max-w-content px-gutter">
        {/* Concierge header — sits above the form */}
        <div className="px-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent-gold">
            Reserve your stay
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="
            relative bg-surface border border-line rounded-card overflow-hidden
            shadow-cinema p-2
            grid grid-cols-1 md:grid-cols-[1.1fr_1.1fr_0.9fr_auto] gap-px
            before:absolute before:inset-x-0 before:top-0 before:h-[2px]
            before:bg-gradient-to-r before:from-transparent before:via-accent-gold/55 before:to-transparent
          "
        >
          <Field label="Check-in" icon={Calendar}>
            <input
              type="date"
              value={checkin}
              min={today()}
              onChange={(e) => setCheckin(e.target.value)}
              className="bg-transparent text-text-primary font-body text-sm w-full focus:outline-none tabular-nums"
            />
          </Field>

          <Field label="Check-out" icon={Calendar} hint={`${nights} ${nights === 1 ? 'night' : 'nights'}`}>
            <input
              type="date"
              value={checkout}
              min={checkin}
              onChange={(e) => setCheckout(e.target.value)}
              className="bg-transparent text-text-primary font-body text-sm w-full focus:outline-none tabular-nums"
            />
          </Field>

          <Field label="Guests" icon={Users}>
            <div className="relative">
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="appearance-none bg-transparent text-text-primary font-body text-sm w-full pr-6 focus:outline-none cursor-pointer"
              >
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5+">5+ guests</option>
              </select>
              <span aria-hidden className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-text-secondary">
                ▾
              </span>
            </div>
          </Field>

          <div className="flex items-stretch gap-2 md:p-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
              magnetic
              kineticLabel
            >
              Check Availability
            </Button>
            <Button
              href={`tel:${site.phoneTel}`}
              variant="ghost"
              size="md"
              className="hidden md:inline-flex"
              aria-label="Call to book"
              leadingIcon={<Phone size={14} strokeWidth={1.75} />}
            >
              Call
            </Button>
          </div>
        </form>
      </div>
    </section>
    </>
  )
}

/**
 * One booking field — gold dot + eyebrow + icon + input.
 * Bottom border lights up gold on focus-within.
 */
function Field({ label, icon: Icon, hint, children }) {
  return (
    <label
      className={cn(
        'group relative block bg-bg-primary px-6 py-5 cursor-text',
        'transition-colors duration-350',
        'focus-within:bg-surface-elevated',
        // Gold underline on focus
        'after:absolute after:inset-x-5 after:bottom-0 after:h-px after:bg-accent',
        'after:scale-x-0 after:origin-left after:transition-transform after:duration-450 after:ease-organic',
        'focus-within:after:scale-x-100'
      )}
    >
      <span className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-2 eyebrow-muted">
          <Icon size={11} strokeWidth={1.5} className="text-accent" />
          {label}
        </span>
        {hint && (
          <span className="font-body text-[10px] uppercase tracking-[0.18em] text-text-tertiary tabular-nums">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  )
}
