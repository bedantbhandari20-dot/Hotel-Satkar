import { Phone, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Button from '../ui/Button.jsx'
import { site, whatsappLink } from '../../data/site.js'

export default function ContactCTA() {
  return (
    <Section tone="inverse" id="contact" className="scroll-mt-nav">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        <div className="lg:col-span-6 reveal">
          <span className="eyebrow text-accent-gold block mb-6">Ready when you are</span>
          <h2 className="font-display text-d-2 text-text-inverse text-balance">
            Book a stay, or stop in for <em className="font-display text-accent-gold">breakfast.</em>
          </h2>
          <p className="mt-6 font-body text-lead text-text-inverse/80 mb-10 max-w-md text-pretty">
            Call our front desk anytime, message us on WhatsApp, or simply walk in.
            We are ready 24 hours a day.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button
              href={`tel:${site.phoneTel}`}
              variant="primary"
              size="lg"
              leadingIcon={<Phone size={14} strokeWidth={1.75} />}
              magnetic
              kineticLabel
            >
              {site.phone}
            </Button>
            <Button
              href={whatsappLink()}
              variant="ghost"
              size="lg"
              trailingIcon={<MessageCircle size={14} strokeWidth={1.75} />}
              className="!text-text-inverse !border-text-inverse/25 hover:!bg-accent-pine hover:!text-white hover:!border-accent-pine"
              magnetic
              kineticLabel
            >
              WhatsApp
            </Button>
          </div>

          <Button
            to="/contact"
            variant="link"
            trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
            className="!text-text-inverse/85 hover:!text-accent-gold"
          >
            Or send a booking request
          </Button>
        </div>

        <div className="lg:col-span-6 reveal reveal-right">
          <div className="relative rounded-card overflow-hidden border border-text-inverse/15 bg-text-inverse/[0.04] backdrop-blur-sm shadow-cinema">
            <div className="p-8 md:p-10">
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-accent-gold/40 bg-accent-gold/10 shrink-0">
                  <MapPin size={16} strokeWidth={1.5} className="text-accent-gold" />
                </span>
                <div>
                  <p className="font-display text-xl text-text-inverse">
                    {site.address.street}, {site.address.locality}
                  </p>
                  <p className="font-body text-sm text-text-inverse/70 mt-1">
                    {site.address.region}, {site.address.country}
                  </p>
                </div>
              </div>
            </div>
            <iframe
              title="Satkar Hotel location"
              src="https://www.google.com/maps?q=Dipayal+Silgadhi&output=embed"
              className="w-full h-72 border-t border-text-inverse/10"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: 'grayscale(0.4) sepia(0.30) hue-rotate(15deg) brightness(0.82) contrast(1.04)' }}
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
