import Section from '../components/ui/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import RoomCard from '../components/cards/RoomCard.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'
import { rooms } from '../data/rooms.js'
import { useReveal } from '../hooks/useReveal.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

export default function Rooms() {
  useReveal()
  useDocumentMeta({
    title: 'Rooms',
    description: 'Six categories from honest twins to family AC suites. Cleaned, made, and checked the same way every day at Satkar Hotel, Dipayal.',
    path: '/rooms',
  })
  return (
    <>
      <div className="pt-nav" />
      <Section tone="primary">
        <SectionHeader
          rule
          chapter={2}
          eyebrow="Stay"
          title="Six categories. One standard of warmth."
          description={`${rooms.length} room categories from honest twins to family-sized AC suites — every one is cleaned, made, and checked the same way, every day.`}
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((r, i) => (
            <div
              key={r.id}
              className="reveal reveal-up"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <RoomCard room={r} index={i} />
            </div>
          ))}
        </div>
      </Section>
      <ContactCTA />
    </>
  )
}
