import { useState, useEffect } from 'react'
import { Calendar, Users, ArrowUpRight, Phone } from 'lucide-react'
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
    {/* Sticky strip — slides in below the navbar on all screen sizes */}
    <div
      aria-hidden={!sticky}
      className={cn(
        'fixed left-0 right-0 z-40 top-[78px] lg:top-[88px]',
        'bg-bg-primary/98 md:bg-bg-primary/96 backdrop-blur-sm md:backdrop-blur-2xl border-b border-line',
        'shadow-[0_4px_24px_rgba(44,36,24,0.06)]',
        'transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]',
        sticky
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-full pointer-events-none'
      )}
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-content px-gutter h-14 flex items-center gap-2 md:gap-6"
      >
        {/* Check-in */}
        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          <Calendar size={12} strokeWidth={1.5} className="text-accent shrink-0" />
          <span className="hidden md:inline font-body text-[10.5px] uppercase tracking-[0.18em] text-text-secondary">In</span>
          <input
            type="date"
            value={checkin}
            min={today()}
            onChange={(e) => setCheckin(e.target.value)}
            className="bg-transparent font-body text-xs md:text-sm text-text-primary focus:outline-none tabular-nums cursor-pointer"
          />
        </div>

        <span aria-hidden className="text-line/60 font-mono text-xs select-none shrink-0">→</span>

        {/* Check-out */}
        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          <span className="hidden md:inline font-body text-[10.5px] uppercase tracking-[0.18em] text-text-secondary">Out</span>
          <input
            type="date"
            value={checkout}
            min={checkin}
            onChange={(e) => setCheckout(e.target.value)}
            className="bg-transparent font-body text-xs md:text-sm text-text-primary focus:outline-none tabular-nums cursor-pointer"
          />
          <span className="font-mono text-[10px] text-text-tertiary tabular-nums shrink-0">{nights}n</span>
        </div>

        {/* Guests — hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
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

        <div className="ml-auto flex items-center gap-2 shrink-0">
          {/* Call — hidden on mobile */}
          <Button
            href={`tel:${site.phoneTel}`}
            variant="ghost"
            size="sm"
            leadingIcon={<Phone size={12} strokeWidth={1.75} />}
            aria-label="Call to book"
            className="hidden md:inline-flex"
          >
            Call
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            trailingIcon={<ArrowUpRight size={12} strokeWidth={1.75} />}
          >
            <span className="hidden md:inline">Check Availability</span>
            <span className="md:hidden">Book</span>
          </Button>
        </div>
      </form>
    </div>


</>
  )
}
