import { cn } from '../../lib/cn.js'

/**
 * PullQuote — oversized italic display quote with a left rule and
 * background quote-glyph. Use inside long-form sections for editorial
 * texture and depth.
 *
 *   children: the quote body (string or jsx)
 *   attribution: optional, rendered below in micro-caps
 */
export default function PullQuote({ children, attribution, className }) {
  return (
    <figure className={cn('my-10', className)}>
      <blockquote className="pull-quote">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-5 pl-[1.4rem] font-body text-[10.5px] uppercase tracking-[0.22em] text-text-secondary">
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}
