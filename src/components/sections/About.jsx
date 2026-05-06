import { ArrowUpRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Button from '../ui/Button.jsx'
import ImageReveal from '../ui/ImageReveal.jsx'

const badges = [
  { label: 'Family-run since 2056 B.S.' },
  { label: 'Daily fresh bakery' },
  { label: '24/7 front desk' },
  { label: '10 min · Shaileshwari Temple' },
  { label: 'Beside the Seti bend' },
]

export default function About() {
  return (
    <Section tone="primary">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
        <div className="lg:col-span-5 reveal">
          <span className="eyebrow text-accent block mb-6">Our story</span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-accent-soft block mb-5 normal-case">हाम्रो कथा</span>
          <h2 className="font-display text-d-2 text-text-primary text-balance">
            A trusted anchor in the heart of <em className="font-display text-accent-soft">Doti.</em>
          </h2>
          <p className="dropcap mt-6 font-body text-lead text-text-secondary mb-6 text-pretty">
            Whether you are passing through Dipayal or staying for business, we provide clean, honest hospitality. Our bakery serves the freshest items in town, while our rooms offer a quiet retreat after a long day.
          </p>
          <p className="font-body text-text-secondary mb-10 text-pretty">
            Experience authentic Far-Western cuisine, from hearty thalis and Seti river fish to our daily bakery fresh goods. A ten-minute walk reaches Shaileshwari Temple — we&apos;ll pack you breakfast for the road.
          </p>

          <ul className="flex flex-wrap gap-3 mb-10">
            {badges.map((b) => (
              <li
                key={b.label}
                className="inline-flex items-center gap-2 font-body text-[10.5px] uppercase tracking-[0.22em]
                           text-text-secondary border border-line rounded-pill px-3.5 py-2"
              >
                <span className="block w-1 h-1 rounded-full bg-accent" />
                {b.label}
              </li>
            ))}
          </ul>

          <Button
            to="/about"
            variant="link"
            trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
          >
            Read our history
          </Button>
        </div>

        <div className="lg:col-span-7 relative reveal reveal-right">
          <ImageReveal
            src="https://images.unsplash.com/photo-1551882547-ff40c0d13c05?q=80&w=1600&auto=format&fit=crop"
            alt="Satkar Hotel exterior"
            aspect="aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5]"
            kenBurns
            overlay="soft"
            clip
            className="shadow-cinema"
          />

          {/* Floating quote card */}
          <figure
            className="hidden md:block absolute -bottom-10 -left-10 max-w-xs
                       bg-surface-elevated/95 backdrop-blur-md border border-line-strong
                       p-8 rounded-card shadow-card"
          >
            <span aria-hidden className="font-display absolute -top-4 left-6 text-accent text-5xl leading-none">
              “
            </span>
            <blockquote className="font-display text-xl text-text-primary leading-[1.4] text-balance">
              Best place for food, bakery and coffee in Dipayal.
            </blockquote>
            <figcaption className="mt-4 font-body text-[10.5px] uppercase tracking-[0.22em] text-text-secondary">
              — Dr. Madhav Rawat · Google · 5★
            </figcaption>
          </figure>
        </div>
      </div>
    </Section>
  )
}
