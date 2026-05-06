import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowUpRight, User, Calendar, MessageSquare } from 'lucide-react'
import Section from '../components/ui/Section.jsx'
import Button from '../components/ui/Button.jsx'
import { site, whatsappLink } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { cn } from '../lib/cn.js'
import GettingHere from '../components/sections/GettingHere.jsx'
import FAQ from '../components/sections/FAQ.jsx'

export default function Contact() {
  useReveal()
  useDocumentMeta({
    title: 'Contact',
    description: `Reservations and questions \u2014 ${site.phone}, ${site.email}, or via WhatsApp. Open ${site.hours} at ${site.address.locality}, ${site.address.country}.`,
    path: '/contact',
  })
  const [form, setForm] = useState({ name: '', phone: '', checkin: '', message: '' })
  const [sent, setSent] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Hi Satkar! I'd like to make a booking.
Name: ${form.name}
Phone: ${form.phone}
Check-in: ${form.checkin}${form.message ? `\nMessage: ${form.message}` : ''}`
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <div className="pt-nav" />
      <Section tone="primary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-7 reveal">
            <span className="eyebrow text-accent block mb-6">Reservations</span>
            <h1 className="font-display text-d-1 text-text-primary text-balance">
              Tell us when you&apos;re <em className="font-display text-accent-soft">coming.</em>
            </h1>
            <p className="mt-10 font-body text-lead text-text-secondary mb-12 max-w-prose text-pretty">
              Send the details below and we&apos;ll confirm via WhatsApp within minutes during business hours,
              or by morning if it&apos;s late.
            </p>
            <form
              onSubmit={handleSubmit}
              className="card-frame relative grid grid-cols-1 sm:grid-cols-2 gap-6 bg-surface border border-line rounded-card p-8 md:p-10 shadow-card"
              aria-live="polite"
            >
              <Field
                id="c-name"
                label="Your name"
                icon={User}
                required
                autoComplete="name"
                value={form.name}
                onChange={update('name')}
              />
              <Field
                id="c-phone"
                label="Phone"
                type="tel"
                icon={Phone}
                required
                autoComplete="tel"
                placeholder="+977 …"
                value={form.phone}
                onChange={update('phone')}
              />
              <Field
                id="c-checkin"
                label="Check-in date"
                type="date"
                icon={Calendar}
                required
                min={today}
                value={form.checkin}
                onChange={update('checkin')}
                className="sm:col-span-2"
              />
              <Textarea
                id="c-message"
                label="Message (optional)"
                icon={MessageSquare}
                value={form.message}
                onChange={update('message')}
                className="sm:col-span-2"
              />

              {sent && (
                <div className="sm:col-span-2 -mt-2 px-4 py-3 rounded bg-accent/10 border border-line-accent text-accent font-body text-sm">
                  Opening WhatsApp now &mdash; we&apos;ll be in touch shortly.
                </div>
              )}

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="sm:flex-1"
                  trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
                  magnetic
                  kineticLabel
                >
                  Send via WhatsApp
                </Button>
                <Button
                  href={`tel:${site.phoneTel}`}
                  variant="ghost"
                  size="lg"
                  leadingIcon={<Phone size={14} strokeWidth={1.75} />}
                >
                  Call instead
                </Button>
              </div>
            </form>
          </div>

          {/* Details */}
          <aside className="lg:col-span-5 reveal reveal-right">
            <div className="card-frame relative bg-bg-secondary border border-line rounded-card p-8 md:p-10 space-y-6 shadow-card">
              <Detail icon={Phone} label="Phone">
                <a href={`tel:${site.phoneTel}`} className="kinetic-host hover:text-accent transition-colors duration-350 tabular-nums">
                  {site.phone}
                </a>
              </Detail>
              <Detail icon={MessageCircle} label="WhatsApp">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors duration-350 tabular-nums"
                >
                  {site.phone}
                </a>
              </Detail>
              <Detail icon={Mail} label="Email">
                <a href={`mailto:${site.email}`} className="hover:text-accent transition-colors duration-350">
                  {site.email}
                </a>
              </Detail>
              <Detail icon={MapPin} label="Address">
                {site.address.street}, {site.address.locality},<br />
                {site.address.region}, {site.address.country}
              </Detail>
              <Detail icon={Clock} label="Hours">{site.hours}</Detail>
            </div>

            <div className="mt-6 relative overflow-hidden rounded-card border border-line shadow-card">
              <iframe
                title="Satkar Hotel location — Dipayal, Doti"
                src={`https://www.google.com/maps?q=${site.geo.latitude},${site.geo.longitude}&z=14&output=embed`}
                className="block w-full h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ filter: 'grayscale(0.4) sepia(0.18) hue-rotate(30deg) contrast(0.96) saturate(0.9)' }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(44,51,38,0.10)_100%)]"
              />
            </div>
          </aside>
        </div>
      </Section>

      <GettingHere />
      <FAQ />
    </>
  )
}

function Field({ id, label, icon: Icon, className, ...props }) {
  return (
    <div className={cn('group relative', className)}>
      <label htmlFor={id} className="block eyebrow mb-2 text-text-secondary group-focus-within:text-accent transition-colors duration-350">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={14}
            strokeWidth={1.75}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent transition-colors duration-350 pointer-events-none"
          />
        )}
        <input
          id={id}
          {...props}
          className={cn(
            'w-full bg-bg-primary border border-line rounded py-3.5 font-body text-sm text-text-primary',
            'transition-[border-color,box-shadow,background-color] duration-350 ease-out-quart',
            'focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(91,107,63,0.12)]',
            'placeholder:text-text-tertiary',
            Icon ? 'pl-11 pr-4' : 'px-4'
          )}
        />
      </div>
    </div>
  )
}

function Textarea({ id, label, icon: Icon, className, ...props }) {
  return (
    <div className={cn('group relative', className)}>
      <label htmlFor={id} className="block eyebrow mb-2 text-text-secondary group-focus-within:text-accent transition-colors duration-350">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={14}
            strokeWidth={1.75}
            className="absolute left-4 top-4 text-text-tertiary group-focus-within:text-accent transition-colors duration-350 pointer-events-none"
          />
        )}
        <textarea
          id={id}
          rows={4}
          {...props}
          className={cn(
            'w-full bg-bg-primary border border-line rounded py-3.5 font-body text-sm text-text-primary resize-y',
            'transition-[border-color,box-shadow] duration-350 ease-out-quart',
            'focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(91,107,63,0.12)]',
            'placeholder:text-text-tertiary',
            Icon ? 'pl-11 pr-4' : 'px-4'
          )}
        />
      </div>
    </div>
  )
}

function Detail({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full border border-line-accent bg-accent/5 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={15} strokeWidth={1.5} className="text-accent" />
      </div>
      <div>
        <p className="eyebrow text-text-secondary mb-1">{label}</p>
        <div className="font-body text-text-primary">{children}</div>
      </div>
    </div>
  )
}
