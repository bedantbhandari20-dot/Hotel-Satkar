import { MessageCircle, ArrowUpRight } from 'lucide-react'
import Section from '../components/ui/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import Button from '../components/ui/Button.jsx'
import CafeShowcase from '../components/sections/CafeShowcase.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { whatsappLink } from '../data/site.js'

const menuHighlights = [
  {
    section: 'Bakery',
    items: [
      {
        name: 'Croissants & Danishes',
        desc: 'Laminated overnight, baked at dawn.',
        price: 'Rs 80–150',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop',
      },
      {
        name: 'Custom Cakes',
        desc: 'Birthdays, anniversaries, corporate orders.',
        price: 'From Rs 1,200',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
      },
      {
        name: 'Daily Breads',
        desc: 'Sourdough, milk loaf, whole wheat.',
        price: 'Rs 90–220',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
      },
    ],
  },
  {
    section: 'Cafe',
    items: [
      {
        name: 'Pour-over Coffee',
        desc: 'Hand-pulled with locally sourced beans.',
        price: 'Rs 180',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
      },
      {
        name: 'Masala Chai',
        desc: 'Brewed with whole spices and full-cream milk.',
        price: 'Rs 80',
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=600&auto=format&fit=crop',
      },
      {
        name: 'Breakfast Plate',
        desc: 'Eggs, toast, butter, seasonal fruit.',
        price: 'Rs 350',
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=600&auto=format&fit=crop',
      },
    ],
  },
  {
    section: 'Restaurant',
    items: [
      {
        name: 'Far-Western Thali',
        desc: 'Daal, bhaat, tarkari, achaar, papad.',
        price: 'Rs 280',
        image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=600&auto=format&fit=crop',
      },
      {
        name: 'Seti River Fish',
        desc: 'Fresh catch, prepared simply.',
        price: 'Rs 650',
        image: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee94?q=80&w=600&auto=format&fit=crop',
      },
      {
        name: 'Continental',
        desc: 'Pastas, grills, sandwiches.',
        price: 'Rs 320–680',
        image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=600&auto=format&fit=crop',
      },
    ],
  },
]

export default function Cafe() {
  useReveal()
  useDocumentMeta({
    title: 'Bakery & Cafe',
    description: 'Sourdough proofed overnight, pour-over coffee, and Far-Western thalis. Custom cakes with a day\u2019s notice.',
    path: '/cafe',
  })
  return (
    <>
      <div className="pt-nav" />
      <CafeShowcase />
      <Section tone="primary">
        <SectionHeader
          rule
          eyebrow="Menu"
          title="What we make."
          description="A short, honest menu. Bakery from dawn, cafe through the day, restaurant from noon."
          align="center"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {menuHighlights.map((m, mi) => (
            <div
              key={m.section}
              className="reveal reveal-up card-frame relative bg-surface border border-line rounded-card p-8 md:p-10
                         shadow-card transition-[transform,box-shadow,border-color] duration-450 ease-out-quart
                         hover:-translate-y-1 hover:shadow-card-hover hover:border-line-accent"
              style={{ transitionDelay: `${mi * 80}ms` }}
            >
              <h3 className="eyebrow text-accent block mb-7">{m.section}</h3>
              <ul className="divide-y divide-line">
                {m.items.map((it) => (
                  <li key={it.name} className="py-5 first:pt-0 last:pb-0 flex gap-4">
                    {it.image && (
                      <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden rounded border border-line">
                        <img
                          src={it.image}
                          alt={it.name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                          style={{ filter: 'sepia(0.12) saturate(0.95)' }}
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-4">
                        <p className="font-display text-xl text-text-primary text-balance">
                          {it.name}
                        </p>
                        <p className="font-body text-sm text-accent shrink-0 tabular-nums">
                          {it.price}
                        </p>
                      </div>
                      <p className="mt-1.5 font-body text-sm text-text-secondary leading-relaxed text-pretty">
                        {it.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Cake order banner */}
      <Section tone="secondary" bordered>
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="eyebrow text-accent-gold block mb-4">Custom Cakes</span>
          <h2 className="font-display text-d-3 text-text-primary text-balance mb-4">
            Birthdays, pasni, weddings —{' '}
            <em className="font-display text-accent-soft">we bake for every occasion.</em>
          </h2>
          <p className="font-body text-text-secondary mb-8 text-pretty">
            From Rs 1,200 with just 24 hours notice. Browse our gallery, pick your flavour,
            and order via WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              to="/cakes"
              variant="primary"
              size="lg"
              trailingIcon={<ArrowUpRight size={14} strokeWidth={1.75} />}
              magnetic
              kineticLabel
            >
              Browse Cakes
            </Button>
            <Button
              href={whatsappLink("Hi Satkar! I'd like to order a custom cake.")}
              variant="ghost"
              size="lg"
              leadingIcon={<MessageCircle size={14} strokeWidth={1.75} />}
              className="!bg-accent-pine !border-accent-pine !text-white hover:!bg-accent-moss hover:!border-accent-moss"
            >
              Order via WhatsApp
            </Button>
          </div>
        </div>
      </Section>

      <ContactCTA />
    </>
  )
}
