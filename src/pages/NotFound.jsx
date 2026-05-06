import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import Section from '../components/ui/Section.jsx'
import Button from '../components/ui/Button.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { site } from '../data/site.js'

export default function NotFound() {
  useDocumentMeta({
    title: '404 — Page not found',
    description: 'The page you were looking for has wandered off. Return to the front desk.',
    path: '/404',
  })
  return (
    <>
      <div className="pt-nav" />
      <Section tone="primary">
        <div className="min-h-[60vh] flex items-center">
          <div className="max-w-2xl mx-auto text-center reveal">
            {/* Oversized 404 numeral with hand-set feel */}
            <div className="font-display text-accent/30 text-[clamp(8rem,22vw,18rem)] leading-none mb-2 select-none">
              404
            </div>

            {/* Ornament */}
            <div aria-hidden className="ornament my-8" />

            <span className="eyebrow text-accent block mb-5">A wrong turn</span>
            <h1 className="font-display text-d-2 text-text-primary mb-6 text-balance">
              This page wandered off the <em className="font-display text-accent-soft">map.</em>
            </h1>
            <p className="font-body text-lead text-text-secondary mb-12 max-w-prose mx-auto text-pretty">
              Even our best rooms get lost sometimes. Try one of the doors below — or call
              <a href={`tel:${site.phoneTel}`} className="ml-1 underline decoration-accent/40 underline-offset-4 hover:text-accent transition-colors duration-350">
                {site.phone}
              </a>{' '}
              and we&apos;ll point you the right way.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                to="/"
                variant="primary"
                size="lg"
                leadingIcon={<ArrowLeft size={14} strokeWidth={1.75} />}
                magnetic
                kineticLabel
              >
                Back to home
              </Button>
              <Button
                to="/rooms"
                variant="ghost"
                size="lg"
                trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
              >
                Browse rooms
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
