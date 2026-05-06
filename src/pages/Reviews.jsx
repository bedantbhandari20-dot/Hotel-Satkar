import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import Section from '../components/ui/Section.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import ReviewCard from '../components/cards/ReviewCard.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'
import { allReviews, ratingMeta } from '../data/reviews.js'
import { useReveal } from '../hooks/useReveal.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { cn } from '../lib/cn.js'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: '5', label: '5 stars' },
  { id: '4', label: '4 stars' },
  { id: 'mixed', label: 'Mixed' },
]

const SORTS = [
  { id: 'recent', label: 'Most recent' },
  { id: 'rating', label: 'Highest rated' },
  { id: 'oldest', label: 'Oldest' },
]

// Rough age in days from a Google "X ago" string. Lower = more recent.
function ageRank(when = '') {
  const w = when.toLowerCase()
  const m = w.match(/(\d+)/)
  const n = m ? parseInt(m[1], 10) : 1
  if (w.includes('month')) return n * 30
  if (w.includes('year')) return n * 365
  if (w.includes('week')) return n * 7
  if (w.includes('day')) return n
  return 999
}

export default function Reviews() {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('recent')
  useReveal()
  useDocumentMeta({
    title: 'Reviews',
    description: `${ratingMeta.count} verbatim Google reviews of Satkar Hotel, Bakery & Cafe — an honest look at what guests say, not a curated highlight reel.`,
    path: '/reviews',
  })

  const counts = useMemo(() => {
    const map = { all: allReviews.length, '5': 0, '4': 0, mixed: 0 }
    allReviews.forEach((r) => {
      if (r.rating === 5) map['5']++
      else if (r.rating === 4) map['4']++
      else map.mixed++
    })
    return map
  }, [])

  const filtered = useMemo(() => {
    let list = allReviews
    if (filter === '5') list = list.filter((r) => r.rating === 5)
    else if (filter === '4') list = list.filter((r) => r.rating === 4)
    else if (filter === 'mixed') list = list.filter((r) => r.rating <= 3)

    list = [...list]
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'oldest') list.sort((a, b) => ageRank(b.when) - ageRank(a.when))
    else list.sort((a, b) => ageRank(a.when) - ageRank(b.when))
    return list
  }, [filter, sort])

  return (
    <>
      <div className="pt-nav" />
      <Section tone="primary">
        <SectionHeader
          rule
          chapter={5}
          eyebrow="Reviews"
          title="What guests actually say."
          align="center"
          description={
            <span className="inline-flex items-center gap-3 text-text-primary">
              <span className="inline-flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    strokeWidth={1.25}
                    className={
                      i < Math.round(ratingMeta.average)
                        ? 'fill-accent text-accent'
                        : 'text-line-strong'
                    }
                  />
                ))}
              </span>
              <span className="font-body text-sm tabular-nums">
                <span className="text-text-primary">{ratingMeta.average.toFixed(1)}</span>
                <span className="text-text-tertiary mx-1.5">/</span>
                <span className="text-text-tertiary">5</span>
                <span className="mx-3 text-text-tertiary">·</span>
                <span className="text-text-secondary">
                  {ratingMeta.count} Google reviews
                </span>
              </span>
            </span>
          }
        />

        {/* Honest disclosure */}
        <p className="font-display text-text-secondary text-lg max-w-2xl mx-auto text-center mb-12 text-balance">
          Every review below is a verbatim Google review &mdash; including the hard ones.
          We&apos;ve grown by listening to all of them.
        </p>

        {/* Filter + sort row */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-start md:items-center mb-14">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.id
              const count = counts[f.id]
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 font-body text-[10.5px] uppercase tracking-[0.22em] rounded-pill border',
                    'transition-[background-color,border-color,color] duration-350 ease-out-quart',
                    active
                      ? 'bg-bg-inverse text-text-inverse border-bg-inverse'
                      : 'border-line text-text-secondary hover:border-line-strong hover:text-text-primary'
                  )}
                >
                  <span>{f.label}</span>
                </button>
              )
            })}
          </div>
          <div className="inline-flex items-center gap-3">
            <span className="font-body text-[10px] uppercase tracking-[0.22em] text-text-tertiary">Sort</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-surface border border-line rounded pl-4 pr-9 py-2.5 font-body text-[10.5px] uppercase tracking-[0.22em] text-text-primary focus:outline-none focus:border-accent transition-colors duration-350 cursor-pointer"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                ▾
              </span>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 font-body text-text-tertiary">
            <p className="font-display text-2xl mb-2">No reviews match this filter.</p>
            <p className="text-sm">Try widening your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filtered.map((r, i) => (
              <div
                key={r.id}
                className={i % 2 === 0 ? 'reveal reveal-left' : 'reveal reveal-right'}
                style={{ transitionDelay: `${(i % 6) * 60}ms` }}
              >
                <ReviewCard review={r} index={i} />
              </div>
            ))}
          </div>
        )}
      </Section>
      <ContactCTA />
    </>
  )
}
