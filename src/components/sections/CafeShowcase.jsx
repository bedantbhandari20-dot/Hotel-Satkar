import { ArrowUpRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Button from '../ui/Button.jsx'
import ImageReveal from '../ui/ImageReveal.jsx'
import SteamParticles from '../effects/SteamParticles.jsx'

const cues = [
  'Sourdough proofed overnight',
  'Pour-over coffee',
  'Far-Western thalis',
  'Custom cakes · 24h notice',
]

export default function CafeShowcase() {
  return (
    <Section tone="secondary" bordered id="cafe" className="scroll-mt-nav">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
        <div className="reveal">
          <p className="chapter-marker mb-4">
            <span className="chapter-prefix">Chapter</span>
            <span className="chapter-sep" aria-hidden> — </span>
            <span className="chapter-label">बिहानको स्वाद · The morning thali</span>
          </p>
          <span className="eyebrow text-accent block mb-6">Bakery & Cafe</span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-accent-soft block mb-5 normal-case">परम्पराको स्वाद</span>
          <h2 className="font-display text-d-2 text-text-primary text-balance">
            Taste the <em className="font-display text-accent-soft">tradition.</em>
          </h2>
          <p className="dropcap mt-6 font-body text-lead text-text-secondary mb-6 text-pretty">
            Wake up to fresh-baked bread, delicate pastries, and pour-over coffee.
            By lunch, the kitchen turns to honest Far-Western thalis and the day&apos;s catch from the Seti.
          </p>
          <p className="font-body text-text-secondary mb-10 text-pretty">
            Custom cakes, family-size orders, and event catering — give us a day&apos;s notice.
          </p>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10 max-w-md">
            {cues.map((c) => (
              <li key={c} className="flex items-center gap-3 font-body text-sm text-text-secondary">
                <span className="block w-1 h-1 rounded-full bg-accent shrink-0" />
                <span className="text-pretty">{c}</span>
              </li>
            ))}
          </ul>

          <Button
            to="/menu"
            variant="ghost"
            size="md"
            trailingIcon={<ArrowUpRight size={14} strokeWidth={1.75} />}
            magnetic
            kineticLabel
          >
            Explore the menu
          </Button>
        </div>

        <div className="reveal reveal-right relative grid grid-cols-2 gap-4 md:gap-6">
          <SteamParticles count={14} opacity={0.06} speed={0.3} />
          <ImageReveal
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop"
            alt="Fresh baked goods at Satkar"
            aspect="aspect-[3/4]"
            kenBurns
            clip
            className="shadow-card"
          />
          <ImageReveal
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop"
            alt="Regional thali plate"
            aspect="aspect-[3/4]"
            kenBurns
            clip
            className="shadow-card mt-12 lg:mt-16"
          />
        </div>
      </div>
    </Section>
  )
}
