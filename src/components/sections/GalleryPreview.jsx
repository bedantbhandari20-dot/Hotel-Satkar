import { ArrowUpRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import GalleryCard from '../cards/GalleryCard.jsx'
import Button from '../ui/Button.jsx'
import { galleryImages } from '../../data/gallery.js'

// Bento layout map: alternates tall + landscape for visual rhythm
const spans = ['tall', 'normal', 'normal', 'normal', 'tall', 'normal']

export default function GalleryPreview() {
  const six = galleryImages.slice(0, 6)
  return (
    <Section tone="secondary" bordered id="gallery" className="scroll-mt-nav">
      <SectionHeader
        rule
        eyebrow="Gallery"
        nepali="ग्यालरी"
        title="A look around Satkar."
        description="Property, rooms, the cafe, and the moments in between."
        action={
          <Button
            to="/gallery"
            variant="link"
            trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
          >
            View all {galleryImages.length} photos
          </Button>
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[1fr]">
        {six.map((img, i) => (
          <div
            key={img.id}
            className="reveal reveal-up"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <GalleryCard image={img} span={spans[i % spans.length]} />
          </div>
        ))}
      </div>
    </Section>
  )
}
