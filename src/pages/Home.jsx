import { useReveal } from '../hooks/useReveal.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import Hero from '../components/sections/Hero.jsx'
import BookingBar from '../components/sections/BookingBar.jsx'
import About from '../components/sections/About.jsx'
import Amenities from '../components/sections/Amenities.jsx'
import RoomsShowcase from '../components/sections/RoomsShowcase.jsx'
import CafeShowcase from '../components/sections/CafeShowcase.jsx'
import EventsSection from '../components/sections/EventsSection.jsx'
import GalleryPreview from '../components/sections/GalleryPreview.jsx'
import ReviewsSection from '../components/sections/ReviewsSection.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'
import Marquee from '../components/effects/Marquee.jsx'
import OrnamentDivider from '../components/ui/OrnamentDivider.jsx'

const marqueeWords = [
  'Hospitality',
  'Honest food',
  'Doti, Nepal',
  'Established 2056',
  'Bakery & Cafe',
  'Warm rooms',
  'Family-run',
]

// Zero-height element — the gradient line sits at the exact boundary between two sections
function SectionRule() {
  return (
    <div aria-hidden role="presentation" className="relative h-0 z-[1]">
      <div className="absolute inset-x-0 flex items-center px-gutter" style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
      </div>
    </div>
  )
}

export default function Home() {
  useReveal()
  useDocumentMeta({
    title: null,
    description: 'Warm rooms, an honest kitchen, and a bakery the town wakes up to. Satkar Hotel, Bakery & Cafe in Dipayal, Doti — established 2056 B.S.',
    path: '/',
  })
  return (
    <>
      <Hero />
      <BookingBar />
      <About />
      <Marquee
        items={marqueeWords}
        className="bg-bg-secondary text-text-primary"
        speed={42}
      />
      <Amenities />
      <SectionRule />
      <RoomsShowcase />
      <SectionRule />
      <CafeShowcase />
      <Marquee
        items={['Sourdough', 'Far-Western thalis', 'Pour-over', 'Custom cakes', 'Daily fresh']}
        className="bg-bg-tertiary text-text-primary"
        reverse
        speed={36}
      />
      <EventsSection />
      <SectionRule />
      <GalleryPreview />
      <SectionRule />
      <ReviewsSection />
      <OrnamentDivider />
      <ContactCTA />
    </>
  )
}
