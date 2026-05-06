import { cn } from '../../lib/cn.js'
import Container from './Container.jsx'

/**
 * Section — consistent vertical rhythm and surface tone.
 * tone: 'primary' (default warm brown) | 'secondary' (slightly lighter) | 'inverse' (footer-dark)
 */
export default function Section({
  children,
  tone = 'primary',
  bordered = false,
  className,
  containerClassName,
  id,
}) {
  const tones = {
    primary: 'bg-bg-primary',
    secondary: 'bg-bg-secondary',
    inverse: 'bg-bg-inverse',
  }
  return (
    <section
      id={id}
      className={cn(
        'py-section',
        tones[tone],
        bordered && 'border-t border-line',
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
