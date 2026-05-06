import { ArrowUpRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import RoomCard from '../cards/RoomCard.jsx'
import Button from '../ui/Button.jsx'
import { rooms } from '../../data/rooms.js'

export default function RoomsShowcase({ limit = 3 }) {
  const featured = rooms.slice(0, limit)

  return (
    <Section tone="primary" id="rooms" className="scroll-mt-nav">
      <SectionHeader
        rule
        chapter="मङ्सिर मौसम · Winter mist"
        eyebrow="Stay"
        nepali="बसाइ"
        title="Comfortable rooms for every need."
        description="Six categories from honest budget twins to spacious AC family suites — every one is cleaned, made, and checked the same way, every day."
        action={
          <Button
            to="/rooms"
            variant="link"
            trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
          >
            View more rooms
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {featured.map((r, i) => (
          <div
            key={r.id}
            className="reveal reveal-up"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <RoomCard room={r} index={i} />
          </div>
        ))}
      </div>
    </Section>
  )
}
