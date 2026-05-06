import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn.js'
import { useIsTouch, useReducedMotion } from '../../hooks/useMediaQuery.js'

/**
 * Button — the single source of truth for every CTA.
 *
 *  Variants:
 *    primary  — olive, the only "buy" surface
 *    ghost    — outlined, becomes inverse on hover
 *    soft     — translucent surface, low-emphasis utility
 *    link     — underline that reveals from left
 *
 *  Props:
 *    href           — render as <a> (auto target/rel for external)
 *    leadingIcon    — node placed before children
 *    trailingIcon   — node placed after children
 *    loading        — disabled state with spinner glyph
 *    fullWidth      — w-full
 *    magnetic       — cursor-attraction on hover (award-site signature)
 *    kineticLabel   — duplicate label that slides in on hover
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  as,
  leadingIcon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  disabled,
  magnetic = false,
  kineticLabel = false,
  className,
  ...props
}) {
  const ref = useRef(null)
  const isTouch = useIsTouch()
  const prefersReduced = useReducedMotion()

  // Magnetic effect — cursor pulls the button when nearby
  useEffect(() => {
    if (!magnetic || isTouch || prefersReduced) return
    const el = ref.current
    if (!el) return

    let raf
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const ex = e.clientX - (rect.left + rect.width / 2)
      const ey = e.clientY - (rect.top + rect.height / 2)
      const dist = Math.hypot(ex, ey)
      const range = 100
      if (dist > range) {
        cx = 0
        cy = 0
        return
      }
      cx = ex * 0.3
      cy = ey * 0.3
    }
    const onLeave = () => {
      cx = 0
      cy = 0
    }
    const tick = () => {
      tx += (cx - tx) * 0.18
      ty += (cy - ty) * 0.18
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [magnetic, isTouch, prefersReduced])
  const base =
    'group/btn relative inline-flex items-center justify-center gap-2 font-body uppercase tracking-wide whitespace-nowrap select-none cursor-pointer ' +
    'transition-[transform,background-color,color,border-color,box-shadow] duration-450 ease-organic ' +
    'active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary'

  const sizes = {
    xs: 'text-[10px] tracking-[0.22em] px-4 py-2 min-h-[36px]',
    sm: 'text-[10.5px] tracking-[0.22em] px-5 py-2.5 min-h-[40px]',
    md: 'text-[11px] tracking-[0.22em] px-7 py-3.5 min-h-[48px]',
    lg: 'text-[11.5px] tracking-[0.22em] px-9 py-4 min-h-[54px]',
  }

  const variants = {
    primary: cn(
      'bg-accent-deep text-text-inverse rounded',
      // Resting state: inset top highlight (physical surface) + layered drop shadow
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_2px_6px_rgba(44,36,24,0.24),0_1px_2px_rgba(44,36,24,0.14)]',
      // Hover: lift 2px + warm punchy shadow that reads as weight
      'hover:bg-accent hover:-translate-y-[2px]',
      'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_32px_-4px_rgba(107,85,56,0.62),0_3px_8px_rgba(44,36,24,0.16)]',
      'before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-450',
      'before:bg-[linear-gradient(120deg,transparent_30%,rgba(245,240,232,0.14)_50%,transparent_70%)] before:bg-[length:200%_100%] before:animate-shimmer'
    ),
    ghost: cn(
      'bg-transparent text-text-primary border border-line-strong rounded',
      'hover:bg-text-primary hover:text-text-inverse hover:border-text-primary hover:-translate-y-[1px]'
    ),
    soft: cn(
      'bg-text-primary/[0.04] text-text-primary border border-line rounded',
      'hover:bg-text-primary/[0.06] hover:border-line-strong'
    ),
    link: cn(
      'inline-flex items-center gap-2 cursor-pointer',
      'link-line !p-0 !min-h-0 text-xs tracking-[0.22em] uppercase',
      'no-underline transition-colors duration-300 hover:text-accent-gold'
    ),
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const classes = cn(
    variant === 'link' ? '' : base,
    variant === 'link' ? '' : sizes[size],
    variants[variant],
    widthClass,
    kineticLabel && 'kinetic-host',
    magnetic && 'will-change-transform',
    className
  )

  const labelNode = kineticLabel && variant !== 'link' ? (
    <span className="kinetic-label">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  ) : (
    <span className="relative">{children}</span>
  )

  // The actual visible content
  const content = (
    <>
      {loading && (
        <span
          aria-hidden
          className="inline-block w-3.5 h-3.5 rounded-full border-2 border-current border-r-transparent animate-spin"
        />
      )}
      {!loading && leadingIcon && (
        <span className="inline-flex shrink-0 -ml-0.5 transition-transform duration-350 group-hover/btn:-translate-x-0.5">
          {leadingIcon}
        </span>
      )}
      {labelNode}
      {!loading && trailingIcon && (
        <span className="inline-flex shrink-0 -mr-0.5 transition-transform duration-350 group-hover/btn:translate-x-0.5">
          {trailingIcon}
        </span>
      )}
    </>
  )

  if (to && !disabled) {
    return (
      <Link
        ref={ref}
        to={to}
        className={classes}
        aria-disabled={loading || undefined}
        {...props}
      >
        {content}
      </Link>
    )
  }

  if (href && !disabled) {
    const isExternal = /^(https?:|tel:|mailto:|wa\.me)/.test(href)
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(isExternal && href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        aria-disabled={loading || undefined}
        {...props}
      >
        {content}
      </a>
    )
  }

  if (as) {
    const Component = as
    return (
      <Component
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </Component>
    )
  }

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
}
