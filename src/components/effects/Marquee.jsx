import { cn } from '../../lib/cn.js'

/**
 * Marquee — infinite scrolling ticker.
 *  • Items repeat 2x for seamless loop (CSS animates -50%)
 *  • Pauses on hover
 *  • Olive divider dots between items
 */
export default function Marquee({
  items = [],
  reverse = false,
  className,
  itemClassName,
  divider = '·',
  speed = 32, // seconds per loop
}) {
  const list = items.length ? items : []
  const Item = ({ text }) => (
    <span
      className={cn(
        'inline-flex items-center gap-12 font-display text-[clamp(2rem,5vw,4rem)] leading-none tracking-tight whitespace-nowrap',
        itemClassName
      )}
    >
      {text}
      <span aria-hidden className="text-accent text-[0.6em] not-italic font-body">
        {divider}
      </span>
    </span>
  )

  return (
    <div className={cn('marquee py-10 border-y border-line', className)} aria-hidden>
      <div
        className={cn('marquee-track', reverse && 'marquee-track--reverse')}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...list, ...list].map((t, i) => (
          <Item key={i} text={t} />
        ))}
      </div>
    </div>
  )
}
