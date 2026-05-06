import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
} from 'lucide-react'
import { site, navLinks, whatsappLink } from '../../data/site.js'

export default function Footer() {
  return (
    <footer className="relative bg-bg-inverse text-text-inverse/75">
      {/* Top hairline accent — cream-tinted on dark */}
      <div className="h-px bg-gradient-to-r from-transparent via-text-inverse/25 to-transparent" />

      <div className="mx-auto max-w-content px-gutter pt-24 pb-10">
        {/* Colophon flourish — opens the closing block */}
        <div
          aria-hidden
          className="ornament opacity-30 [&::before]:!bg-text-inverse/20 [&::after]:!bg-text-inverse/20 mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand block */}
          <div className="lg:col-span-5 max-w-md">
            <Link
              to="/"
              className="inline-flex items-baseline font-display text-3xl tracking-tight text-text-inverse"
            >
              {site.shortName}
              <span className="text-accent-gold">.</span>
            </Link>
            <p className="mt-6 font-body text-text-inverse/75 leading-relaxed text-pretty">
              {site.tagline}
            </p>
            <p className="mt-5 font-body text-[11px] uppercase tracking-[0.22em] text-text-inverse/50">
              Established {site.established} · {site.priceRange}
            </p>

            {/* Social row */}
            <ul className="mt-8 flex items-center gap-3">
              {[
                { icon: Instagram, href: site.social.instagram, label: 'Instagram' },
                { icon: Facebook, href: site.social.facebook, label: 'Facebook' },
                { icon: MessageCircle, href: whatsappLink(), label: 'WhatsApp' },
              ].map((s) => {
                const Icon = s.icon
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full
                                 border border-text-inverse/15 text-text-inverse/75
                                 transition-[color,border-color,background-color] duration-450 ease-organic
                                 hover:text-accent-gold hover:border-accent-gold/50 hover:bg-accent-gold/10"
                    >
                      <Icon size={15} strokeWidth={1.5} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-3">
            <h4 className="font-body text-eyebrow uppercase text-text-inverse/55 mb-6">Explore</h4>
            <ul className="space-y-3.5">
              {[...navLinks, { label: 'Reviews', to: '/reviews' }].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="kinetic-host inline-block font-body text-sm text-text-inverse/85 hover:text-accent-gold transition-colors duration-450 ease-organic"
                  >
                    <span className="kinetic-label">
                      <span>{l.label}</span>
                      <span aria-hidden className="text-accent-gold">{l.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Reach us */}
          <div className="lg:col-span-4">
            <h4 className="font-body text-eyebrow uppercase text-text-inverse/55 mb-6">Reach us</h4>
            <ul className="space-y-4 text-sm font-body">
              <li className="flex items-start gap-3">
                <MapPin size={15} strokeWidth={1.5} className="mt-0.5 text-accent-gold/70 shrink-0" />
                <span className="text-text-inverse/80 text-pretty">
                  {site.address.street}, {site.address.locality}
                  <br />
                  {site.address.region}, {site.address.country}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} strokeWidth={1.5} className="mt-0.5 text-accent-gold/70 shrink-0" />
                <a
                  href={`tel:${site.phoneTel}`}
                  className="text-text-inverse/85 hover:text-accent-gold transition-colors duration-450 ease-organic tabular-nums"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} strokeWidth={1.5} className="mt-0.5 text-accent-gold/70 shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-text-inverse/85 hover:text-accent-gold transition-colors duration-450 ease-organic"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} strokeWidth={1.5} className="mt-0.5 text-accent-gold/70 shrink-0" />
                <span className="text-text-inverse/80">{site.hours}</span>
              </li>
            </ul>

            <a
              href={`https://www.google.com/maps?q=${site.geo.latitude},${site.geo.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.22em] text-accent-gold/70 hover:text-accent-gold transition-colors duration-450 ease-organic"
            >
              <MapPin size={12} strokeWidth={1.5} />
              Get directions
            </a>

            <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-text-inverse/35 uppercase">
              Regd. · Sudurpashchim Province · Est. {site.established}
            </p>
          </div>
        </div>

        {/* Fine print row — editorial colophon */}
        <div className="mt-20 pt-6 border-t border-text-inverse/10 flex flex-col md:flex-row gap-3 md:gap-6 justify-between items-start md:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-text-inverse/50">
            <span>© {new Date().getFullYear()} {site.name}</span>
          </div>
          <Link
            to="/contact"
            className="text-[11px] uppercase tracking-[0.22em] text-text-inverse/70 hover:text-accent-gold transition-colors duration-450 ease-organic"
          >
            Plan a visit
          </Link>
        </div>
      </div>
    </footer>
  )
}
