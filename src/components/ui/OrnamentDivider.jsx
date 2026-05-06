import { cn } from '../../lib/cn.js'

/**
 * OrnamentDivider — soft fade-in/out hairlines flanking a small
 * editorial glyph. Used between major sections to add an analog,
 * print-feel transition without competing with content.
 *
 *   glyph: the centerpiece character. Defaults to a stylized
 *          asterism (a vintage typographic flourish).
 *          Try: "❦", "❧", "✦", "◆", "§", or a Roman numeral.
 *
 *   tone: 'default' (cream pages) | 'inverse' (olive pages)
 */
export default function OrnamentDivider({
  glyph = '',
  tone = 'default',
  className,
}) {
  return (
    <div
      role="presentation"
      aria-hidden
      className={cn(
        'mx-auto max-w-content px-gutter py-12 md:py-16',
        className
      )}
    >
      <div
        className={cn(
          'ornament',
          tone === 'inverse' && 'opacity-50 [&::before]:!bg-text-inverse/30 [&::after]:!bg-text-inverse/30'
        )}
      >
        {glyph && (
          <span
            className={cn(
              'ornament-glyph',
              tone === 'inverse' && 'text-text-inverse'
            )}
          >
            {glyph}
          </span>
        )}
      </div>
    </div>
  )
}
