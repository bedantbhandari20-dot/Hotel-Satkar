import { useState, useMemo } from 'react'
import Section from '../components/ui/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import GalleryCard from '../components/cards/GalleryCard.jsx'
import { galleryImages } from '../data/gallery.js'
import { useReveal } from '../hooks/useReveal.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { cn } from '../lib/cn.js'

const categories = ['All', 'Property', 'Rooms', 'Cafe', 'Bakery', 'Events']

// Varying spans create the masonry rhythm — tall/portrait items anchor columns visually
const spanPattern = ['normal', 'tall', 'normal', 'portrait', 'wide', 'normal', 'tall', 'normal']

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  useReveal()
  useDocumentMeta({
    title: 'Gallery',
    description: 'A look at the property, rooms, the cafe, and the bakery at Satkar Hotel, Dipayal.',
    path: '/gallery',
  })

  const counts = useMemo(() => {
    const map = { All: galleryImages.length }
    galleryImages.forEach((g) => {
      map[g.category] = (map[g.category] || 0) + 1
    })
    return map
  }, [])

  const filtered = filter === 'All'
    ? galleryImages
    : galleryImages.filter((g) => g.category === filter)

  return (
    <>
      <div className="pt-nav" />
      <Section tone="primary">
        <SectionHeader
          rule
          chapter={4}
          eyebrow="Gallery"
          title="A curated look at Satkar."
          description="Property, rooms, the cafe, and the moments in between."
          align="center"
        />

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-14">
          {categories.map((c) => {
            const active = filter === c
            const count = counts[c] || 0
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={active}
                disabled={count === 0}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 font-body text-[10.5px] uppercase tracking-[0.22em] rounded-pill border',
                  'transition-[background-color,border-color,color] duration-350 ease-out-quart',
                  active
                    ? 'bg-bg-inverse text-text-inverse border-bg-inverse'
                    : 'border-line text-text-secondary hover:border-line-strong hover:text-text-primary',
                  count === 0 && 'opacity-40 cursor-not-allowed hover:!border-line hover:!text-text-secondary'
                )}
              >
                <span>{c}</span>
              </button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 font-body text-text-tertiary">
            <p className="font-display text-2xl mb-2">No photos in this category yet.</p>
            <p className="text-sm">Try another filter — or come visit and we&apos;ll show you in person.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5">
            {filtered.map((img, i) => (
              <div
                key={img.id}
                className="break-inside-avoid mb-4 md:mb-5 reveal reveal-up"
                style={{ transitionDelay: `${(i % 8) * 50}ms` }}
              >
                <GalleryCard image={img} span={spanPattern[i % spanPattern.length]} />
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
