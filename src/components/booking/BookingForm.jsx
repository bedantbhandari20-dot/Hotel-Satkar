import { useEffect, useMemo, useState } from 'react'
import { Phone, MessageCircle, Check, Loader2 } from 'lucide-react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase.js'
import { site, whatsappLink } from '../../data/site.js'
import { createBooking } from '../../lib/firestore.js'

// Days between two YYYY-MM-DD strings (≥ 0).
function diffNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime()
  if (!Number.isFinite(ms) || ms <= 0) return 0
  return Math.round(ms / 86_400_000)
}

/**
 * BookingForm — the single source of truth for a room booking submission.
 * Used by both RoomPickerModal (compact, sticky CTA) and RoomDetail (full-width).
 *
 * Props:
 *   - room        : a row from data/rooms.js
 *   - source      : tag stored on the booking doc ('rooms-modal' | 'rooms-detail')
 *   - onSuccess   : optional callback after a successful submission
 *   - onClose     : optional close handler (used by the modal's success view)
 */
export default function BookingForm({ room, source = 'website', onSuccess, onClose }) {
  // ── Per-room availability (live from Firestore admin) ────────────────────
  const [availability, setAvailability] = useState({})
  const [availLoading, setAvailLoading] = useState(true)

  useEffect(() => {
    if (!room) return
    setAvailLoading(true)
    const roomNames = room.rooms.map((n) => `Room ${n}`)
    const q = query(collection(db, 'rooms'), where('name', 'in', roomNames))
    getDocs(q)
      .then((snap) => {
        const map = {}
        snap.docs.forEach((d) => {
          const num = d.data().name.replace('Room ', '')
          map[num] = d.data().available !== false
        })
        setAvailability(map)
      })
      .catch(() => setAvailability({}))
      .finally(() => setAvailLoading(false))
  }, [room])

  // ── Form state ────────────────────────────────────────────────────────────
  const today = new Date().toISOString().slice(0, 10)
  const tomorrow = useMemo(() => {
    const d = new Date(); d.setDate(d.getDate() + 1)
    return d.toISOString().slice(0, 10)
  }, [])

  const [form, setForm] = useState({
    roomNumber: '',
    checkIn: today,
    checkOut: tomorrow,
    guests: 2,
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Auto-pick the first available room number once availability loads.
  useEffect(() => {
    if (!room || availLoading || form.roomNumber) return
    const firstFree = room.rooms.find((n) => availability[n] !== false)
    if (firstFree) setForm((f) => ({ ...f, roomNumber: firstFree }))
  }, [room, availLoading, availability]) // eslint-disable-line react-hooks/exhaustive-deps

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const nights = diffNights(form.checkIn, form.checkOut)
  const total = nights > 0 ? nights * (room?.price || 0) : 0

  const waMessage = `Hi Satkar! I'd like to book a room.
Room: ${room?.name} (#${form.roomNumber || '—'}) · ${room?.category}
Check-in: ${form.checkIn}
Check-out: ${form.checkOut} (${nights} night${nights === 1 ? '' : 's'})
Guests: ${form.guests}
Name: ${form.name}
Phone: ${form.phone}${form.message ? `\nMessage: ${form.message}` : ''}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.roomNumber) return setError('Please select an available room.')
    if (nights <= 0) return setError('Check-out must be after check-in.')
    if (!form.name.trim()) return setError('Please enter your name.')
    if (!form.phone.trim()) return setError('Please enter a phone number we can reach you on.')

    setSubmitting(true)
    try {
      await createBooking({
        ...form,
        guests: Number(form.guests) || form.guests,
        roomType: `${room.category} — ${room.name}`,
        nights,
        pricePerNight: room.price,
        total,
        source,
      })
      setSuccess(true)
      onSuccess?.()
    } catch (err) {
      console.error(err)
      setError('Could not send your request. Please call us or try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!room) return null
  if (success) {
    return (
      <SuccessView room={room} form={form} nights={nights} total={total} waMessage={waMessage} onClose={onClose} />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Room number picker */}
      <div className="px-6 pt-6 pb-4">
        <Label>Choose a room</Label>
        {availLoading ? (
          <div className="grid grid-cols-4 gap-2">
            {room.rooms.map((n) => (
              <div key={n} className="h-12 rounded-lg bg-[#EDE7DA] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {room.rooms.map((num) => {
              const isAvailable = availability[num] !== false
              const isSelected = form.roomNumber === num
              return (
                <button
                  key={num}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => setForm((f) => ({ ...f, roomNumber: num }))}
                  className={`flex flex-col items-center justify-center h-12 rounded-lg text-center transition-all
                    ${!isAvailable
                      ? 'bg-red-500 text-white cursor-not-allowed opacity-90'
                      : isSelected
                        ? 'bg-[#2C2418] text-[#F5F0E8] ring-2 ring-[#C4982C] ring-offset-2 ring-offset-[#FAF7F0]'
                        : 'bg-[#EDE7DA] text-[#2C2418] hover:bg-[#E3DACA]'
                    }`}
                >
                  <span className="font-mono text-sm font-bold leading-none">{num}</span>
                  {!isAvailable && (
                    <span className="text-[8px] uppercase tracking-wider mt-0.5 font-mono text-red-100">Booked</span>
                  )}
                </button>
              )
            })}
          </div>
        )}
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          <Legend swatch="bg-[#EDE7DA] border border-[rgba(44,36,24,0.15)]" label="Available" />
          <Legend swatch="bg-[#2C2418]" label="Selected" />
          <Legend swatch="bg-red-500" label="Booked" />
        </div>
      </div>

      {/* Dates + guests */}
      <div className="px-6 pb-4 grid grid-cols-2 gap-3">
        <Field label="Check-in" type="date" min={today} value={form.checkIn} onChange={update('checkIn')} required />
        <Field label="Check-out" type="date" min={form.checkIn || today} value={form.checkOut} onChange={update('checkOut')} required />
        <Field label="Guests" type="number" min={1} max={10} value={form.guests} onChange={update('guests')} required className="col-span-2" />
      </div>

      {/* Contact */}
      <div className="px-6 pb-4 grid grid-cols-1 gap-3">
        <Field label="Your name" value={form.name} onChange={update('name')} required autoComplete="name" placeholder="Full name" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone" type="tel" value={form.phone} onChange={update('phone')} required autoComplete="tel" placeholder="+977 …" />
          <Field label="Email (optional)" type="email" value={form.email} onChange={update('email')} autoComplete="email" placeholder="you@…" />
        </div>
        <Field label="Message (optional)" as="textarea" rows={2} value={form.message} onChange={update('message')} placeholder="Arrival time, special requests…" />
      </div>

      {/* Total + actions */}
      <div className="px-6 pb-6 pt-2 border-t border-[rgba(44,36,24,0.08)] bg-[#F5F0E8]/40">
        <div className="flex items-end justify-between mb-4 mt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#8B7355]">
              {nights > 0 ? `${nights} night${nights === 1 ? '' : 's'} × Rs ${room.price.toLocaleString()}` : 'Pick valid dates'}
            </p>
            <p className="font-display text-2xl text-[#2C2418] tabular-nums mt-1">
              Rs {total.toLocaleString()}
            </p>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B7355] text-right">
            Taxes<br />included
          </p>
        </div>

        {error && (
          <p className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
        )}

        <div className="flex items-center gap-2 mt-4">
          <a
            href={`tel:${site.phoneTel}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[rgba(44,36,24,0.15)] text-[#2C2418] rounded-xl font-mono text-[11px] uppercase tracking-widest hover:bg-[#EDE7DA] transition-colors"
          >
            <Phone size={12} /> Call
          </a>
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[rgba(44,36,24,0.15)] text-[#2C2418] rounded-xl font-mono text-[11px] uppercase tracking-widest hover:bg-[#EDE7DA] transition-colors"
          >
            <MessageCircle size={12} /> WhatsApp
          </a>
        </div>
        <p className="text-center text-[10px] text-[#8B7355] mt-3 font-mono">
          We'll confirm via phone or WhatsApp within minutes during business hours.
        </p>
      </div>
    </form>
  )
}

function Label({ children }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-widest text-[#8B7355] mb-2">{children}</p>
  )
}

function Legend({ swatch, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded ${swatch}`} />
      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8B7355]">{label}</span>
    </div>
  )
}

function Field({ label, as, className = '', ...props }) {
  const baseInput =
    'w-full px-3 py-2.5 bg-[#EDE7DA] border border-[rgba(44,36,24,0.1)] rounded-lg text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/30 focus:border-[#C4982C]/40 placeholder:text-[#8B7355]/60'
  return (
    <label className={`block ${className}`}>
      <span className="block font-mono text-[10px] uppercase tracking-widest text-[#8B7355] mb-1.5">{label}</span>
      {as === 'textarea' ? (
        <textarea {...props} className={`${baseInput} resize-none`} />
      ) : (
        <input {...props} className={baseInput} />
      )}
    </label>
  )
}

function SuccessView({ room, form, nights, total, waMessage, onClose }) {
  return (
    <div className="p-8 text-center">
      <div className="w-14 h-14 rounded-full bg-[#5B6B3F]/15 text-[#5B6B3F] flex items-center justify-center mx-auto mb-5">
        <Check size={26} strokeWidth={2.25} />
      </div>
      <h4 className="font-display text-xl text-[#2C2418] uppercase tracking-wide mb-2">Request received</h4>
      <p className="text-sm text-[#6B5E4F] leading-relaxed mb-6 max-w-sm mx-auto">
        Thanks {form.name.split(' ')[0] || 'there'} — we've logged your request for{' '}
        <strong className="text-[#2C2418]">Room {form.roomNumber}</strong> ({room.name}),{' '}
        {nights} night{nights === 1 ? '' : 's'} · Rs {total.toLocaleString()}.
        We'll confirm shortly. Sending a WhatsApp note now gets the fastest reply.
      </p>
      <div className="flex flex-col gap-2">
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2C2418] text-[#F5F0E8] rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-[#3d3324] transition-colors"
        >
          <MessageCircle size={14} /> Confirm on WhatsApp
        </a>
        {onClose && (
          <button
            onClick={onClose}
            className="w-full py-2.5 text-[11px] font-mono uppercase tracking-widest text-[#8B7355] hover:text-[#2C2418] transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  )
}
