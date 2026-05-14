import { useState } from 'react'
import { MessageCircle, Phone, ArrowUpRight } from 'lucide-react'
import Section from '../components/ui/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Button from '../components/ui/Button.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { whatsappLink } from '../data/site.js'
import { cn } from '../lib/cn.js'

const occasions = [
  { id: 'all', label: 'All Cakes' },
  { id: 'birthday', label: 'Birthdays' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'pasni', label: 'Pasni / Rice Feeding' },
  { id: 'anniversary', label: 'Anniversaries' },
  { id: 'custom', label: 'Custom Design' },
]

const cakes = [
  {
    name: 'Classic Vanilla Celebration',
    occasion: ['birthday', 'anniversary'],
    price: 'From Rs 1,200',
    size: '1 lb – 5 lb',
    notice: '24 hours',
    desc: 'Light vanilla sponge with buttercream frosting. Personalized message included.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Rich Chocolate Layer',
    occasion: ['birthday', 'custom'],
    price: 'From Rs 1,500',
    size: '1 lb – 5 lb',
    notice: '24 hours',
    desc: 'Dark chocolate sponge, ganache filling, chocolate shavings on top.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Red Velvet Dream',
    occasion: ['birthday', 'anniversary'],
    price: 'From Rs 1,800',
    size: '1 lb – 3 lb',
    notice: '24 hours',
    desc: 'Signature red velvet with cream cheese frosting. A crowd favourite.',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Pasni Ceremony Cake',
    occasion: ['pasni'],
    price: 'From Rs 2,000',
    size: '2 lb – 5 lb',
    notice: '48 hours',
    desc: 'Decorated with traditional motifs for rice-feeding ceremonies. Custom colors available.',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Wedding Tiered Cake',
    occasion: ['wedding'],
    price: 'From Rs 5,000',
    size: '3–5 tiers',
    notice: '3 days',
    desc: 'Multi-tier fondant cake with floral decorations. Consultation included for design.',
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Fruit Gateau',
    occasion: ['birthday', 'anniversary', 'custom'],
    price: 'From Rs 1,400',
    size: '1 lb – 3 lb',
    notice: '24 hours',
    desc: 'Fresh seasonal fruit over whipped cream sponge. Light and refreshing.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Black Forest',
    occasion: ['birthday', 'custom'],
    price: 'From Rs 1,300',
    size: '1 lb – 5 lb',
    notice: '24 hours',
    desc: 'Chocolate sponge with cherry filling, whipped cream, and chocolate curls.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Custom Photo Cake',
    occasion: ['birthday', 'custom', 'pasni'],
    price: 'From Rs 2,200',
    size: '2 lb – 4 lb',
    notice: '48 hours',
    desc: 'Edible print of your photo on buttercream. Send us the image via WhatsApp.',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Engagement Ring Cake',
    occasion: ['wedding', 'anniversary'],
    price: 'From Rs 3,500',
    size: '2 lb – 4 lb',
    notice: '48 hours',
    desc: 'Elegant fondant cake designed for engagements and ring ceremonies.',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=800&auto=format&fit=crop',
  },
]

const orderSteps = [
  { step: '01', title: 'Pick a cake', desc: 'Browse our collection above or describe your dream cake.' },
  { step: '02', title: 'WhatsApp us', desc: 'Send us the cake name, size, date, and any special requests.' },
  { step: '03', title: 'We confirm', desc: 'We reply with the final price and confirm your order within minutes.' },
  { step: '04', title: 'Pick up or deliver', desc: 'Collect from our bakery or we deliver within Dipayal.' },
]

export default function Cakes() {
  useReveal()
  useDocumentMeta({
    title: 'Order a Cake',
    description: 'Custom cakes for birthdays, pasni, weddings, and anniversaries. From Rs 1,200 with 24-hour notice. Order via WhatsApp from Satkar Bakery, Dipayal.',
    path: '/cakes',
  })

  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? cakes
    : cakes.filter((c) => c.occasion.includes(filter))

  const buildOrderMsg = (cake) =>
    `Hi Satkar! I'd like to order a cake:\n\n🎂 ${cake.name}\n📏 Size: \n📅 Date needed: \n💬 Special requests: `

  return (
    <>
      <div className="pt-nav" />

      {/* Hero banner */}
      <Section tone="secondary" bordered>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <div className="reveal">
            <span className="eyebrow text-accent block mb-6">Custom Cakes</span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-accent-soft block mb-5 normal-case">
              अर्डर गर्नुहोस्
            </span>
            <h1 className="font-display text-d-1 text-text-primary text-balance">
              Every celebration deserves a{' '}
              <em className="font-display text-accent-soft">Satkar cake.</em>
            </h1>
            <p className="mt-6 font-body text-lead text-text-secondary mb-6 text-pretty">
              Birthdays, pasni ceremonies, weddings, anniversaries — we bake fresh for every
              occasion. Choose from our gallery or describe your dream cake and we&apos;ll make it real.
            </p>

            <ul className="flex flex-wrap gap-3 mb-10">
              {[
                'From Rs 1,200',
                '24h notice',
                'Delivery in Dipayal',
                'Custom designs',
              ].map((b) => (
                <li
                  key={b}
                  className="inline-flex items-center gap-2 font-body text-[10.5px] uppercase tracking-[0.22em]
                             text-text-secondary border border-line rounded-pill px-3.5 py-2"
                >
                  <span className="block w-1 h-1 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button
                href={whatsappLink("Hi Satkar! I'd like to order a custom cake. Here are my details:\n\n🎂 Cake: \n📏 Size: \n📅 Date needed: \n💬 Special requests: ")}
                variant="primary"
                size="lg"
                leadingIcon={<MessageCircle size={14} strokeWidth={1.75} />}
                magnetic
                kineticLabel
                className="!bg-accent-pine !border-accent-pine !text-white hover:!bg-accent-moss hover:!border-accent-moss"
              >
                Order via WhatsApp
              </Button>
              <Button
                href="tel:+9779851411730"
                variant="ghost"
                size="md"
                trailingIcon={<Phone size={14} strokeWidth={1.75} />}
              >
                Call to order
              </Button>
            </div>
          </div>

          <div className="reveal reveal-right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card shadow-cinema">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop"
                alt="Beautifully decorated celebration cake"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'sepia(0.08) saturate(1.05)' }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Cake gallery with occasion filter */}
      <Section tone="primary">
        <SectionHeader
          rule
          eyebrow="Our Cakes"
          title="Pick your flavour."
          description="Filter by occasion, then tap 'Order this cake' to pre-fill your WhatsApp message."
          align="center"
        />

        {/* Occasion filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 reveal">
          {occasions.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setFilter(o.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2.5 rounded-pill border',
                'font-body text-[10.5px] uppercase tracking-[0.22em]',
                'transition-[background-color,border-color,color,box-shadow] duration-450 ease-out-quart',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
                filter === o.id
                  ? 'bg-bg-inverse text-text-inverse border-bg-inverse shadow-[0_8px_24px_-12px_rgba(44,36,24,0.5)]'
                  : 'border-line text-text-secondary hover:border-line-strong hover:text-text-primary'
              )}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* Cake grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((cake, i) => (
            <div
              key={cake.name}
              className="reveal reveal-up card-frame group relative bg-surface border border-line rounded-card overflow-hidden
                         shadow-card transition-[transform,box-shadow,border-color] duration-450 ease-out-quart
                         hover:-translate-y-1 hover:shadow-card-hover hover:border-line-accent"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={cake.image}
                  alt={cake.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  style={{ filter: 'sepia(0.08) saturate(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {/* Price badge */}
                <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wider bg-bg-primary/90 backdrop-blur-sm text-accent px-3 py-1.5 rounded-pill border border-line">
                  {cake.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl text-text-primary mb-2">{cake.name}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed text-pretty mb-4">
                  {cake.desc}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-5">
                  <span>{cake.size}</span>
                  <span className="text-line">|</span>
                  <span>{cake.notice} notice</span>
                </div>

                {/* Occasion tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cake.occasion.map((o) => (
                    <span
                      key={o}
                      className="font-body text-[9px] uppercase tracking-[0.18em] text-accent-soft bg-accent/8 border border-accent/15 rounded-pill px-2.5 py-1"
                    >
                      {occasions.find((x) => x.id === o)?.label || o}
                    </span>
                  ))}
                </div>

                <a
                  href={whatsappLink(buildOrderMsg(cake))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-[10.5px] uppercase tracking-[0.22em]
                             text-accent-pine hover:text-accent-moss transition-colors duration-300"
                >
                  <MessageCircle size={13} strokeWidth={1.75} />
                  Order this cake
                  <ArrowUpRight size={11} strokeWidth={1.75} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How to order — step-by-step */}
      <Section tone="secondary" bordered>
        <SectionHeader
          rule
          eyebrow="How to order"
          title="Four simple steps."
          description="No app needed — just WhatsApp us and we handle the rest."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {orderSteps.map((s, i) => (
            <div
              key={s.step}
              className="reveal reveal-up text-center p-8 rounded-card border border-line bg-surface shadow-card"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="font-display text-3xl text-accent-gold block mb-4">{s.step}</span>
              <h3 className="font-display text-lg text-text-primary mb-2">{s.title}</h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed text-pretty">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center reveal">
          <Button
            href={whatsappLink("Hi Satkar! I'd like to order a custom cake. Here are my details:\n\n🎂 Cake: \n📏 Size: \n📅 Date needed: \n💬 Special requests: ")}
            variant="primary"
            size="lg"
            leadingIcon={<ArrowUpRight size={14} strokeWidth={1.75} />}
            magnetic
            kineticLabel
          >
            Start your order
          </Button>
        </div>
      </Section>

      <ContactCTA />
    </>
  )
}
