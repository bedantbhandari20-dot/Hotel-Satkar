import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import Section from '../ui/Section.jsx'
import { cn } from '../../lib/cn.js'

const faqs = [
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cash (NPR), eSewa, Khalti, and IME Pay. Card machines are not yet available in Dipayal, so please carry cash or a loaded digital wallet as backup. We do not accept foreign currency directly.',
  },
  {
    q: 'What are the check-in and check-out times?',
    a: 'Check-in is from 12:00 noon. Check-out is by 11:00 AM. Early check-in and late check-out are subject to availability — WhatsApp us the day before and we\'ll do our best. The front desk is open 24 hours, so late arrivals are no problem.',
  },
  {
    q: 'Is hot water available all day?',
    a: 'Yes. All rooms have solar-heated hot water, supplemented by electric geysers during cloudy days. In the winter months (Poush–Magh) the geysers do most of the work — there is never a cold-water-only moment.',
  },
  {
    q: 'Do you have a generator / power backup during load shedding?',
    a: 'Yes. We run a generator during scheduled load shedding. Common areas and corridors stay lit, and room charging points stay active. Dipayal typically sees 2–6 hours of cuts in peak season — our backup covers it.',
  },
  {
    q: 'Do you have vegetarian, Jain, or special diet options?',
    a: 'Our kitchen is fully capable of vegetarian and egg-free meals. For Jain requirements (no root vegetables), please let us know at booking and we\'ll prepare accordingly. We do not have a certified halal kitchen but can accommodate most dietary needs with advance notice.',
  },
  {
    q: 'Are pets allowed?',
    a: 'Small, well-behaved pets are welcome on request — please mention it when booking. We ask that pets not be left unattended in rooms and are kept on a lead in common areas. A NPR 500 pet cleaning fee applies per stay.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Free cancellation up to 24 hours before check-in. Cancellations within 24 hours or no-shows forfeit one night\'s charge. For group bookings (5+ rooms), we ask for 72 hours\' notice. Since we\'re a small property, last-minute cancellations genuinely hurt — we appreciate the heads-up.',
  },
  {
    q: 'Do you cater weddings and events? What is the minimum?',
    a: 'Yes — we regularly cater weddings, pasni ceremonies, and corporate dinners. Minimum catering order is 30 guests. We can arrange a full thali spread, bakery items, and custom cakes. Contact us at least 7 days ahead to discuss the menu and logistics.',
  },
  {
    q: 'Is there Wi-Fi?',
    a: 'Yes, free Wi-Fi throughout the property. Speeds in Dipayal are improving — expect 5–15 Mbps on a good day, slower in heavy rain. If you\'re working remotely, the cafe has the most reliable connection.',
  },
  {
    q: 'Is Satkar suitable for solo female travellers?',
    a: 'Yes. The front desk is staffed 24/7, the property is well-lit, and Dipayal Bazar is a safe, walkable town. We have hosted many solo and group female travellers. Room doors have deadbolts and internal latches. WhatsApp us if you have specific concerns before booking.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <Section tone="primary" id="faq" className="scroll-mt-nav">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
        {/* Header column */}
        <div className="lg:col-span-4 reveal">
          <span className="eyebrow text-accent block mb-6">FAQ</span>
          <p className="font-mono text-[11px] tracking-[0.14em] text-accent-soft block mb-5 normal-case">
            सामान्य प्रश्नहरू
          </p>
          <h2 className="font-display text-d-3 text-text-primary text-balance mb-6">
            Questions we get<br />
            <em className="font-display text-accent-soft">before you arrive.</em>
          </h2>
          <p className="font-body text-text-secondary text-pretty">
            Don't see yours? WhatsApp us — someone at the front desk will answer within the hour during daylight.
          </p>
        </div>

        {/* Accordion column */}
        <div className="lg:col-span-8 reveal">
          <dl className="divide-y divide-line">
            {faqs.map((faq, i) => {
              const isOpen = open === i
              return (
                <div key={i} className="faq-item">
                  <dt>
                    <button
                      className="faq-trigger w-full flex items-center justify-between gap-6 py-5 text-left group"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span className={cn(
                        'font-body text-sm md:text-base text-text-primary transition-colors duration-350',
                        isOpen && 'text-accent'
                      )}>
                        {faq.q}
                      </span>
                      <span className={cn(
                        'shrink-0 w-7 h-7 rounded-full border border-line flex items-center justify-center',
                        'transition-[border-color,background-color] duration-350',
                        isOpen ? 'border-accent bg-accent/10' : 'group-hover:border-accent/50'
                      )}>
                        {isOpen
                          ? <Minus size={12} strokeWidth={1.75} className="text-accent" />
                          : <Plus size={12} strokeWidth={1.75} className="text-text-secondary group-hover:text-accent transition-colors duration-350" />
                        }
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={cn(
                      'overflow-hidden transition-[max-height,opacity] duration-500 ease-out-quart',
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    )}
                    aria-hidden={!isOpen}
                  >
                    <p className="font-body text-sm text-text-secondary leading-relaxed pb-5 max-w-prose text-pretty">
                      {faq.a}
                    </p>
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </Section>
  )
}
