import Section from '../ui/Section.jsx'
import ImageReveal from '../ui/ImageReveal.jsx'

export default function Legacy() {
  return (
    <Section tone="secondary" bordered>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <span className="eyebrow text-accent block mb-12 -mt-8">Note from Harshit</span>
          <h2 className="font-display text-d-2 text-text-primary text-balance">
            Welcome to <em className="font-display text-accent-soft">Satkar.</em>
          </h2>
          <p className="mt-6 font-body text-lead text-text-secondary mb-6 text-pretty">
            It is my absolute pleasure to welcome you to our hotel, bakery, and cafe. Satkar is more than just a place to stay; it is a genuine family tradition of hospitality right here in the heart of Doti.
          </p>
          <p className="font-body text-text-secondary mb-6 text-pretty">
            Whether you are resting in one of our quiet rooms, picking up a freshly baked pastry from our ovens, or sitting down for a cup of coffee at our cafe, we have poured our hearts into making sure your experience is exceptional.
          </p>
          <p className="font-body text-text-secondary mb-10 text-pretty">
            Our doors are always open, and our ovens are always warm. Thank you for choosing to spend your time with us, and we look forward to serving you.
          </p>
          
        </div>

        {/* Image Content */}
        <div className="order-1 lg:order-2 relative">
          <ImageReveal
            src="/harshit-photo.jpg"
            alt="Harshit Bhandari"
            aspect="aspect-[3/4]"
            kenBurns
            overlay="soft"
            className="shadow-cinema rounded-card bg-surface-elevated object-top"
          />
        </div>
      </div>
    </Section>
  )
}
