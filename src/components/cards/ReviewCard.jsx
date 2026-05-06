import { Star } from 'lucide-react'
import Card from '../ui/Card.jsx'
import { cn } from '../../lib/cn.js'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export default function ReviewCard({ review, index }) {
  return (
    <Card className="h-full p-8 md:p-10">
      {/* Decorative quote mark */}
      <span
        aria-hidden
        className="font-display absolute -top-2 right-6 md:right-8 text-accent/20 text-[7rem] leading-none select-none"
      >
        “
      </span>

      {/* Stars row */}
      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={1.25}
            className={cn(
              'transition-colors duration-350',
              i < review.rating
                ? 'fill-accent text-accent'
                : 'text-line-strong'
            )}
          />
        ))}
        <span className="ml-2 font-body text-[10.5px] uppercase tracking-[0.22em] text-text-secondary tabular-nums">
          {review.rating}.0
        </span>
      </div>

      {/* The quote */}
      <blockquote className="relative font-display text-xl md:text-2xl leading-[1.4] text-text-primary text-balance">
        {review.quote}
      </blockquote>

      {/* Attribution */}
      <footer className="mt-8 pt-6 border-t border-line flex items-center gap-4">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            loading="lazy"
            className="w-10 h-10 rounded-full object-cover border border-line-accent shrink-0"
          />
        ) : (
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=8B7355&color=F5F0E8&bold=true&size=128&font-size=0.42`}
            alt={review.name}
            loading="lazy"
            aria-hidden
            className="w-10 h-10 rounded-full object-cover border border-line-accent shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'inline-flex'
            }}
          />
        )}
        <span
          aria-hidden
          className="hidden items-center justify-center w-10 h-10 rounded-full
                     bg-accent/10 border border-line-accent
                     font-display text-sm text-accent tracking-wider shrink-0"
        >
          {initials(review.name)}
        </span>
        <div>
          <p className="font-body text-sm text-text-primary">{review.name}</p>
          <p className="font-body text-[10.5px] uppercase tracking-[0.22em] text-text-secondary mt-1">
            {review.source ?? 'Verified'}
            {review.when ? ` · ${review.when}` : review.location ? ` · ${review.location}` : ''}
          </p>
        </div>
      </footer>
    </Card>
  )
}
