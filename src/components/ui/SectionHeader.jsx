import { cn } from '../../lib/cn.js'

/**
 * SectionHeader — every page section uses this for consistent rhythm and typography.
 *
 *  Props:
 *    eyebrow     — small label above the title
 *    title       — main display heading
 *    description — supporting paragraph
 *    action      — top-right CTA (e.g. "View All →")
 *    align       — 'left' (default) | 'center'
 *    rule        — show a 1px accent rule above the eyebrow
 *    size        — 'lg' (default) | 'md' for tighter sections
 *    chapter     — integer 1-12 → renders Roman numeral above eyebrow
 */
export default function SectionHeader({
  eyebrow,
  title,
  nepali,
  description,
  action,
  align = 'left',
  rule = false,
  size = 'lg',
  chapter,
  className,
}) {
  const titleSize =
    size === 'lg'
      ? 'text-d-2'
      : 'text-d-3'

  const isCenter = align === 'center'

  return (
    <header
      className={cn(
        'flex flex-col gap-8 mb-14 md:mb-20 reveal',
        isCenter
          ? 'items-center text-center'
          : 'md:flex-row md:items-end md:justify-between md:gap-12',
        className
      )}
    >
      <div className={cn('max-w-2xl', isCenter && 'mx-auto')}>
        {chapter && (
          <p className={cn('chapter-marker mb-4', isCenter && 'justify-center')}>
            <span className="chapter-prefix">Chapter</span>
            <span className="chapter-sep" aria-hidden> — </span>
            <span className="chapter-label">{chapter}</span>
          </p>
        )}
        {eyebrow && (
          <span className="eyebrow block mb-2">{eyebrow}</span>
        )}
        {nepali && (
          <span className="font-mono text-[11px] tracking-[0.14em] text-accent-soft block mb-5 normal-case">{nepali}</span>
        )}
        <h2
          className={cn(
            'font-display text-text-primary text-balance',
            titleSize
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'mt-6 font-body text-lead text-text-secondary text-pretty',
              isCenter && 'mx-auto'
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className={cn('shrink-0', !isCenter && 'md:pb-2')}>{action}</div>
      )}
    </header>
  )
}
