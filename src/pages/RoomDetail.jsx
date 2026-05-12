import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Users, Check } from 'lucide-react'
import Section from '../components/ui/Section.jsx'
import Container from '../components/ui/Container.jsx'
import BookingForm from '../components/booking/BookingForm.jsx'
import RoomCard from '../components/cards/RoomCard.jsx'
import { rooms } from '../data/rooms.js'
import { amenities } from '../data/amenities.js'
import { site } from '../data/site.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useReveal } from '../hooks/useReveal.js'

export default function RoomDetail() {
  const { slug } = useParams()
  useReveal()

  const room = rooms.find((r) => r.id === slug)
  const others = rooms.filter((r) => r.id !== slug).slice(0, 3)

  // Per-room JSON-LD for SEO (HotelRoom + Offer)
  useEffect(() => {
    if (!room) return
    const id = 'jsonld-room-detail'
    const existing = document.getElementById(id)
    if (existing) existing.remove()

    const data = {
      '@context': 'https://schema.org',
      '@type': 'HotelRoom',
      name: `${room.name} — ${room.category}`,
      description: room.description,
      occupancy: {
        '@type': 'QuantitativeValue',
        value: parseInt(room.capacity, 10) || undefined,
        unitText: 'guests',
      },
      amenityFeature: room.features.map((f) => ({
        '@type': 'LocationFeatureSpecification',
        name: f,
        value: true,
      })),
      offers: {
        '@type': 'Offer',
        price: room.price,
        priceCurrency: site.currency,
        availability: 'https://schema.org/InStock',
        url: `${site.url}/rooms/${room.id}`,
      },
      image: room.image,
      url: `${site.url}/rooms/${room.id}`,
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
    return () => document.getElementById(id)?.remove()
  }, [room])

  useDocumentMeta(
    room
      ? {
          title: `${room.name} · ${room.category} Room`,
          description: `${room.description} From Rs ${room.price.toLocaleString()} per night at ${site.shortName}, ${site.address.locality}.`,
          path: `/rooms/${room.id}`,
          image: room.image,
        }
      : { title: 'Room not found', path: '/rooms' }
  )

  if (!room) return <Navigate to="/rooms" replace />

  return (
    <>
      <div className="pt-nav" />

      {/* Hero */}
      <Section tone="primary" className="pb-0">
        <div className="reveal mb-8">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} />
            All rooms
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 reveal">
            <div className="relative overflow-hidden rounded-card border border-line shadow-card">
              <img
                src={room.image}
                alt={room.name}
                className="w-full aspect-[4/3] object-cover"
                loading="eager"
                decoding="async"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-bg-primary/85 backdrop-blur-md text-text-primary font-body text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-pill shadow-fog">
                <span className="block w-1 h-1 rounded-full bg-accent" />
                {room.capacity}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 reveal reveal-right">
            <span className="eyebrow text-accent block mb-4">{room.category}</span>
            <h1 className="font-display text-d-2 text-text-primary text-balance mb-4">
              {room.name}
            </h1>
            <p className="font-body text-lead text-text-secondary leading-relaxed text-pretty mb-8">
              {room.description}
            </p>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-body text-[11px] text-text-secondary uppercase tracking-[0.22em]">Rs</span>
              <span className="font-display text-[3rem] leading-none text-text-primary tabular-nums">
                {room.price.toLocaleString()}
              </span>
              <span className="font-body text-sm text-text-tertiary">/ night</span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-8">
              Taxes included · Pay on arrival
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <Stat label="Sleeps" value={room.capacity} />
              <Stat label="Rooms" value={`${room.rooms.length} avail.`} />
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-3">
                In this room
              </p>
              <ul className="flex flex-wrap gap-2">
                {room.features.map((f) => (
                  <li
                    key={f}
                    className="font-body text-[11px] uppercase tracking-[0.18em] text-text-secondary border border-line px-3 py-1.5 rounded-pill"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Body: amenities + booking form sidebar */}
      <Section tone="primary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: amenities + room numbers */}
          <div className="lg:col-span-7 space-y-12">
            <div className="reveal">
              <p className="eyebrow text-accent mb-3">Amenities</p>
              <h2 className="font-display text-d-3 text-text-primary text-balance mb-8">
                Everything included with your stay.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {amenities.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-line-accent bg-accent/5 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-display text-base text-text-primary mb-0.5">{title}</p>
                      <p className="font-body text-sm text-text-secondary leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal">
              <p className="eyebrow text-accent mb-3">Room numbers</p>
              <h3 className="font-display text-d-4 text-text-primary text-balance mb-4">
                {room.rooms.length} {room.name.toLowerCase()} room{room.rooms.length === 1 ? '' : 's'} available.
              </h3>
              <p className="font-body text-text-secondary leading-relaxed mb-6 max-w-prose">
                Each room is cleaned, made, and checked the same way every day. Pick a specific
                room number when booking — we'll hold it for you.
              </p>
              <div className="flex flex-wrap gap-2">
                {room.rooms.map((n) => (
                  <span
                    key={n}
                    className="font-mono text-sm text-text-primary bg-bg-secondary border border-line px-4 py-2 rounded-pill tabular-nums"
                  >
                    #{n}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal">
              <p className="eyebrow text-accent mb-3">Good to know</p>
              <ul className="space-y-3 max-w-prose">
                {[
                  'Check-in any time, 24/7 front desk',
                  'Free Wi-Fi across rooms and the cafe',
                  'On-site parking for cars and bikes',
                  'Bakery and cafe open from early morning',
                  'Cancellation up to 24 hours before check-in',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-text-secondary">
                    <Check size={16} className="text-accent mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: sticky booking form */}
          <aside className="lg:col-span-5 reveal reveal-right">
            <div className="lg:sticky lg:top-28">
              <div className="bg-[#FAF7F0] rounded-2xl shadow-card border border-line overflow-hidden">
                <div className="px-6 pt-6 pb-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B7355] mb-1">
                    Reserve
                  </p>
                  <h3 className="font-display text-xl text-[#2C2418] uppercase tracking-wide">
                    Request this room
                  </h3>
                </div>
                <BookingForm room={room} source="rooms-detail" />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Other rooms */}
      {others.length > 0 && (
        <Section tone="secondary" bordered>
          <div className="flex items-end justify-between mb-10 reveal">
            <div>
              <p className="eyebrow text-accent mb-3">Also available</p>
              <h2 className="font-display text-d-3 text-text-primary text-balance">
                More ways to stay.
              </h2>
            </div>
            <Link
              to="/rooms"
              className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-secondary hover:text-accent transition-colors"
            >
              All rooms <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {others.map((r, i) => (
              <div key={r.id} className="reveal reveal-up" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <RoomCard room={r} index={i} />
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}

function Stat({ label, value }) {
  return (
    <div className="border border-line rounded-card p-4 bg-bg-secondary">
      <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-1">{label}</p>
      <p className="font-display text-lg text-text-primary flex items-center gap-2">
        <Users size={14} className="text-accent" /> {value}
      </p>
    </div>
  )
}
