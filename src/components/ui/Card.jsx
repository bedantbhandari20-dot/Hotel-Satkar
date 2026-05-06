import { cn } from '../../lib/cn.js'

/**
 * Card — elevated warm surface used by RoomCard, GalleryCard, ReviewCard, etc.
 *
 * Features:
 *   • Multi-layer shadow that deepens on hover
 *   • Subtle 1px lift on hover for tactile feedback
 *   • Faint inner highlight on top edge for depth
 *   • Border tightens to gold on hover
 *
 * Variants:
 *   default    — used everywhere
 *   flat       — no shadow, just border
 *   glass      — translucent surface for image-overlaid cards
 */
export default function Card({
  children,
  variant = 'default',
  hover = true,
  as: Tag = 'div',
  className,
  ...props
}) {
  const base =
    'group relative flex flex-col overflow-hidden rounded-card ' +
    'transition-[transform,box-shadow,border-color] duration-600 ease-organic'

  const variants = {
    default:
      'card-frame bg-surface border border-line shadow-card ' +
      'before:absolute before:inset-x-0 before:top-0 before:h-px ' +
      'before:bg-gradient-to-r before:from-transparent before:via-text-primary/15 before:to-transparent ' +
      'before:pointer-events-none before:z-[2]',
    flat:
      'card-frame bg-surface border border-line',
    glass:
      'bg-surface/60 backdrop-blur-md border border-line',
  }

  const hoverFx = hover
    ? 'hover:border-line-accent hover:-translate-y-1 hover:shadow-card-hover'
    : ''

  return (
    <Tag
      className={cn(base, variants[variant], hoverFx, className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
