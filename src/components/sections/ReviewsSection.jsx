import { ArrowUpRight, Star } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import ReviewCard from '../cards/ReviewCard.jsx'
import Button from '../ui/Button.jsx'
import { reviews, ratingMeta } from '../../data/reviews.js'

export default function ReviewsSection() {
  return (
    <Section tone="primary" id="reviews" className="scroll-mt-nav">
      <SectionHeader
        rule
        eyebrow="Reviews"
        nepali="पाहुनाहरूको प्रतिक्रिया"
        title="What our guests say."
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
                {ratingMeta.count} {ratingMeta.source ?? 'verified'} reviews
              </span>
            </span>
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {reviews.map((r, i) => (
          <div
            key={r.id}
            className={i % 2 === 0 ? 'reveal reveal-left' : 'reveal reveal-right'}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <ReviewCard review={r} index={i} />
          </div>
        ))}
      </div>

      <div className="mt-14 flex justify-center reveal">
        <Button
          to="/reviews"
          variant="link"
          trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
        >
          Read all {ratingMeta.count} reviews
        </Button>
      </div>
    </Section>
  )
}
