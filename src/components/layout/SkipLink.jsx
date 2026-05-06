/**
 * SkipLink — keyboard-only "skip to main" link.
 * Hidden until focused. Critical accessibility primitive.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-[60]
        focus:bg-bg-inverse focus:text-text-inverse focus:border focus:border-accent-gold
        focus:px-5 focus:py-3 focus:rounded
        focus:shadow-cinema
        focus:font-body focus:text-[11px] focus:uppercase focus:tracking-[0.22em]
        focus:outline-none
      "
    >
      Skip to content
    </a>
  )
}
