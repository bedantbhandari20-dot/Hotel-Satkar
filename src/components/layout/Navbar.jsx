import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Phone, ArrowUpRight, Sun, Moon } from 'lucide-react'
import { cn } from '../../lib/cn.js'
import { navLinks, site } from '../../data/site.js'
import Button from '../ui/Button.jsx'
import { useTheme } from '../../contexts/ThemeContext.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { dark, toggle } = useTheme()

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrolled(y > 24)
        setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close mobile menu on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50',
        'transition-[background-color,backdrop-filter,border-color,box-shadow] duration-600 ease-silk',
        scrolled || open
          ? 'bg-bg-primary/80 md:bg-bg-primary/60 backdrop-blur-md md:backdrop-blur-3xl md:backdrop-saturate-[1.2] border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
          : 'bg-bg-primary/50 md:bg-bg-primary/30 backdrop-blur-sm md:backdrop-blur-xl border-b border-white/5'
      )}
    >
      <div className="mx-auto max-w-content px-gutter h-[78px] lg:h-[88px] grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Wordmark — column 1 */}
        <Link
          to="/"
          className="group inline-flex items-baseline font-display text-[1.65rem] lg:text-[1.85rem] tracking-tight text-text-primary leading-none"
          data-cursor="hover"
          aria-label={`${site.shortName} home`}
        >
          <span className="transition-colors duration-450 ease-organic group-hover:text-accent">
            {site.shortName}
          </span>
          <span className="text-accent-gold -ml-px">.</span>
        </Link>

        {/* Desktop nav — column 2, perfectly centered */}
        <nav className="hidden lg:flex items-center justify-center">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'kinetic-host relative px-4 py-2 font-body font-medium text-[12.5px] uppercase tracking-[0.22em]',
                  'transition-colors duration-450 ease-organic',
                  isActive
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="kinetic-label flex flex-col items-center">
                    <span>{l.label}</span>
                    <span aria-hidden className="text-accent-soft font-mono text-[9.5px] tracking-[0.12em] normal-case">{l.labelNepali}</span>
                  </span>
                  <span
                    className={cn(
                      'absolute left-4 right-4 -bottom-px h-px bg-accent-gold origin-left',
                      'transition-transform duration-600 ease-wood',
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right cell — CTA on desktop, burger on mobile */}
        <div className="flex items-center justify-end gap-1">
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={cn(
              'relative inline-flex items-center justify-center w-9 h-9 rounded',
              'text-text-secondary hover:text-text-primary',
              'transition-colors duration-300'
            )}
          >
            <span
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                'transition-all duration-300 ease-out-quart',
                dark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              )}
            >
              <Sun size={16} strokeWidth={1.5} />
            </span>
            <span
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                'transition-all duration-300 ease-out-quart',
                dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              )}
            >
              <Moon size={16} strokeWidth={1.5} />
            </span>
          </button>

          <div className="hidden lg:block ml-2">
            <Button
              href={`tel:${site.phoneTel}`}
              variant="primary"
              size="sm"
              trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
              magnetic
              kineticLabel
            >
              Book a Stay
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'lg:hidden relative inline-flex items-center justify-center w-11 h-11 -mr-2 rounded',
              'text-text-primary transition-colors duration-300',
              'hover:text-accent'
            )}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span
              className={cn(
                'absolute inset-0 m-auto w-[18px] h-px bg-current',
                'transition-transform duration-450 ease-out-quart',
                open ? 'rotate-45' : '-translate-y-[5px]'
              )}
            />
            <span
              className={cn(
                'absolute inset-0 m-auto w-[18px] h-px bg-current',
                'transition-opacity duration-200',
                open ? 'opacity-0' : 'opacity-100'
              )}
            />
            <span
              className={cn(
                'absolute inset-0 m-auto w-[18px] h-px bg-current',
                'transition-transform duration-450 ease-out-quart',
                open ? '-rotate-45' : 'translate-y-[5px]'
              )}
            />
          </button>
        </div>
      </div>

      {/* Scroll progress hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
      />

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'lg:hidden overflow-y-auto',
          'transition-[max-height,opacity] duration-600 ease-out-quart',
          open ? 'max-h-[calc(100svh-78px)] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div
          className="px-gutter pt-4 bg-bg-primary/90 backdrop-blur-md border-t border-white/5"
          style={{ paddingBottom: 'max(3rem, env(safe-area-inset-bottom))' }}
        >
          <ul className="flex flex-col">
            {navLinks.map((l, i) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  style={{
                    transitionDelay: open ? `${i * 60 + 100}ms` : '0ms',
                  }}
                  className={({ isActive }) =>
                    cn(
                      'group/item flex items-center justify-between py-5 border-b border-line',
                      'font-display text-[2rem] tracking-tight',
                      'transition-[opacity,transform,color] duration-600 ease-out-quart',
                      open
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4',
                      isActive ? 'text-accent-soft' : 'text-text-primary'
                    )
                  }
                >
                  <span className="flex flex-col">
                    <span>{l.label}</span>
                    <span className="font-mono text-sm tracking-wider text-text-secondary normal-case mt-0.5">{l.labelNepali}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1}
                    className="text-text-secondary transition-transform duration-350 group-hover/item:rotate-45 group-hover/item:text-accent"
                  />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4">
            <Button
              href={`tel:${site.phoneTel}`}
              variant="primary"
              size="lg"
              fullWidth
              leadingIcon={<Phone size={14} strokeWidth={1.75} />}
            >
              Call to Book
            </Button>
            <span className="font-body text-xs tracking-[0.22em] uppercase text-text-secondary text-center">
              {site.phone} · {site.hours}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
