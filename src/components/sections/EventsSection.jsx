import { ArrowUpRight, Users, Coffee, Calendar } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Button from '../ui/Button.jsx'
import ImageReveal from '../ui/ImageReveal.jsx'

const capabilities = [
  { icon: Users, title: '50-guest capacity', desc: 'Comfortable for conferences, receptions, and family functions.' },
  { icon: Calendar, title: 'Full-day bookings', desc: 'Half-day and full-day options with on-site coordination.' },
  { icon: Coffee, title: 'In-house catering', desc: 'Bakery-fresh breaks and full thali menus from our kitchen.' },
]

export default function EventsSection() {
  return (
    <Section tone="primary">
      {/* Hall feature image */}
      <div className="reveal mb-16">
        <ImageReveal
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop"
          alt="Satkar event hall set for an evening function"
          aspect="aspect-[21/9]"
          kenBurns
          overlay="soft"
          className="shadow-cinema rounded-card"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
        <div className="lg:col-span-5 reveal">
          <span className="eyebrow text-accent block mb-6">Events</span>
          <h2 className="font-display text-d-2 text-text-primary text-balance leading-[1.05]">
            Air-conditioned hall for up to <em className="font-display italic text-accent-soft">50 guests.</em>
          </h2>
          <p className="mt-6 font-body text-lead text-text-secondary mb-10 text-pretty">
            A reliable, fully-equipped space backed by a kitchen that scales. We have hosted Doti&apos;s
            weddings, training programs, and government meetings for two decades.
          </p>
          <Button
            to="/contact"
            variant="primary"
            size="md"
            trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
            magnetic
            kineticLabel
          >
            Plan your event
          </Button>
        </div>

        <ul
          className="lg:col-span-7 card-frame relative grid grid-cols-1 gap-px bg-line rounded-card overflow-hidden border border-line shadow-card"
        >
          {capabilities.map((c, i) => {
            const Icon = c.icon
            return (
              <li
                key={c.title}
                className="group bg-bg-primary p-8 md:p-10 flex gap-6 items-start reveal reveal-up
                           transition-colors duration-600 ease-organic hover:bg-surface-elevated"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="relative w-12 h-12 rounded-full border border-line bg-surface
                             flex items-center justify-center shrink-0
                             transition-[border-color,background-color,transform] duration-600 ease-organic
                             group-hover:border-line-accent group-hover:bg-accent/5 group-hover:rotate-[6deg]"
                >
                  <Icon size={19} strokeWidth={1.25} className="text-accent transition-transform duration-600 ease-organic group-hover:-rotate-[6deg]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="font-display text-2xl text-text-primary text-balance leading-tight">
                      {c.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-text-secondary leading-relaxed text-pretty">
                    {c.desc}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
