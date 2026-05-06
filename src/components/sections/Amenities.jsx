import Section from '../ui/Section.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import AmenityCard from '../cards/AmenityCard.jsx'
import { amenities } from '../../data/amenities.js'

export default function Amenities() {
  return (
    <Section tone="secondary" bordered>
      <SectionHeader
        rule
        eyebrow="Amenities"
        nepali="सुविधाहरू"
        title="Curated experiences."
        description="Everything a long day deserves and a short stay needs — at no extra fuss."
        align="center"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
        {amenities.map((a, i) => (
          <div
            key={a.title}
            className="reveal reveal-up"
            style={{ transitionDelay: `${(i % 4) * 80}ms` }}
          >
            <AmenityCard amenity={a} index={i} />
          </div>
        ))}
      </div>
    </Section>
  )
}
