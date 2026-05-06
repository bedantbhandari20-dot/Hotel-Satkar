import Section from '../components/ui/Section.jsx'
import About from '../components/sections/About.jsx'
import Amenities from '../components/sections/Amenities.jsx'
import ReviewsSection from '../components/sections/ReviewsSection.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { site } from '../data/site.js'

export default function AboutPage() {
  useReveal()
  useDocumentMeta({
    title: 'About',
    description: `Established ${site.established}, family-run since day one. Satkar Hotel, Bakery & Cafe is a trusted anchor in the heart of Doti.`,
    path: '/about',
  })
  return (
    <>
      <div className="pt-nav" />
      <Section tone="primary">
        <div className="max-w-prose reveal">
          <span className="eyebrow text-accent block mb-6">About Satkar</span>
          <h1 className="font-display text-d-1 text-text-primary text-balance">
            Hospitality, the way Doti has always done it.
          </h1>
          <p className="dropcap mt-10 font-body text-lead text-text-secondary text-pretty">
            Established {site.established}, Satkar began as a humble hotel providing honest, 
            reliable hospitality in Doti. Over the decades, it has grown into the undisputed 
            anchor of Dipayal, expanding to include a full-service bakery, cafe, and meeting 
            venue for Far-Western Nepal&apos;s travellers, families, and businesses.
          </p>
          <p className="mt-6 font-body text-text-secondary text-pretty">
            We are still family-run. Every loaf is still proofed overnight. Every guest is
            still walked to their room.
          </p>
        </div>
      </Section>
      <About />
      <Amenities />
      <ReviewsSection />
      <ContactCTA />
    </>
  )
}
