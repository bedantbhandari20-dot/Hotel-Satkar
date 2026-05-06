import { cn } from '../../lib/cn.js'
import ImageReveal from '../ui/ImageReveal.jsx'
import Tilt from '../effects/Tilt.jsx'

/**
 * GalleryCard — single image tile with consistent radius and a hover-revealed caption.
 *
 *   span:  'normal' | 'tall' | 'wide' | 'square' | 'portrait' | 'landscape'
 */
export default function GalleryCard({ image, span = 'normal', className }) {
  const aspect =
    {
      normal: 'aspect-[4/3]',
      tall: 'aspect-[3/4]',
      portrait: 'aspect-[2/3]',
      wide: 'aspect-[16/10]',
      landscape: 'aspect-[16/9]',
      square: 'aspect-square',
    }[span] || 'aspect-[4/3]'

  return (
    <Tilt maxTilt={2.5} className="h-full">
      <figure
        className={cn(
          'group relative overflow-hidden rounded-card bg-surface-sunken',
          'shadow-card transition-shadow duration-600 ease-organic hover:shadow-card-hover',
          className
        )}
      >
        <ImageReveal
          src={image.src}
          alt={image.alt}
          aspect={aspect}
          rounded="rounded-none"
          clip
          imgClassName="group-hover:scale-[1.06] transition-transform duration-1200"
        />

        {/* Hover gradient — bottom-up cinematic */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-bg-inverse/90 via-bg-inverse/25 to-transparent
                     opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-silk"
        />

        {/* Caption — slides up + fades in */}
        <figcaption
          className="absolute inset-x-0 bottom-0 p-5 md:p-6
                     translate-y-3 opacity-0
                     group-hover:translate-y-0 group-hover:opacity-100
                     transition-[transform,opacity] duration-700 ease-silk"
        >
          <span className="eyebrow text-accent-gold">{image.category}</span>
          <p className="mt-1.5 font-body text-sm text-text-inverse text-balance">
            {image.alt}
          </p>
        </figcaption>
      </figure>
    </Tilt>
  )
}
