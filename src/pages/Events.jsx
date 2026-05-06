import { useReveal } from '../hooks/useReveal.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import EventsSection from '../components/sections/EventsSection.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'
import Section from '../components/ui/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'

const pastEvents = [
  {
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1400&auto=format&fit=crop',
    title: 'Wedding receptions',
    desc: 'Warm-lit evenings, full-service catering, custom cake from the bakery.',
  },
  {
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1400&auto=format&fit=crop',
    title: 'Conferences & training',
    desc: 'Projector, mics, AC, full-day tea breaks and a hot-thali lunch.',
  },
  {
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1400&auto=format&fit=crop',
    title: 'Birthdays & family functions',
    desc: 'Custom décor, a cake made-to-order, and a kitchen that scales.',
  },
  {
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1400&auto=format&fit=crop',
    title: 'Government & corporate',
    desc: 'Two decades of hosting Doti\u2019s officials, NGOs, and visiting teams.',
  },
]

export default function Events() {
  useReveal()
  useDocumentMeta({
    title: 'Events',
    description: 'Air-conditioned event hall for up to 50 guests. A reliable, fully-equipped space backed by a kitchen that scales.',
    path: '/events',
  })
  return (
    <>
      <div className="pt-nav" />
      <EventsSection />
      <Section tone="secondary" bordered>
        <SectionHeader
          rule
          eyebrow="Occasions"
          title="A space we have hosted for two decades."
          description="From weddings to government meetings — the hall adapts."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pastEvents.map((e, i) => (
            <div
              key={e.title}
              className="reveal reveal-up group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line shadow-card mb-5">
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-[1.05]"
                  style={{ filter: 'sepia(0.18) saturate(0.92)' }}
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg-inverse/55 via-transparent to-transparent" />
              </div>
              <h3 className="font-display text-xl text-text-primary mb-2 text-balance">{e.title}</h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed text-pretty">{e.desc}</p>
            </div>
          ))}
        </div>
      </Section>
      <ContactCTA />
    </>
  )
}
