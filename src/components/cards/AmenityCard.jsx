export default function AmenityCard({ amenity, index }) {
  const Icon = amenity.icon

  return (
    <div className="group relative flex flex-col">
      {/* Image header — subtle, sepia-tinted, anchors the card */}
      {amenity.image && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-card mb-6 border border-line">
          <img
            src={amenity.image}
            alt={amenity.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-[1.06]"
            style={{ filter: 'sepia(0.18) saturate(0.92) contrast(0.98)' }}
          />
          {/* warm overlay for cohesion */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-bg-inverse/45 via-transparent to-transparent"
          />
          {/* Icon medallion — bottom-left, overlaps the image */}
          <div
            className="absolute left-4 bottom-4 w-11 h-11 rounded-full bg-bg-primary/95 backdrop-blur-sm border border-line
                       flex items-center justify-center
                       transition-[border-color,box-shadow,background-color,transform] duration-600 ease-organic
                       group-hover:border-accent-gold/40 group-hover:shadow-glow-gold group-hover:rotate-[6deg]"
          >
            <Icon
              size={18}
              className="text-accent-gold transition-transform duration-600 ease-organic group-hover:scale-110 group-hover:-rotate-[6deg]"
            />
          </div>
        </div>
      )}

      {/* If no image, fall back to icon-only header */}
      {!amenity.image && (
        <div
          className="relative w-14 h-14 rounded-full border border-line
                     flex items-center justify-center mb-6
                     transition-[border-color,box-shadow,background-color,transform] duration-600 ease-organic
                     group-hover:border-accent-gold/40 group-hover:bg-accent-gold/5 group-hover:shadow-glow-gold group-hover:rotate-[6deg]"
        >
          <Icon
            size={22}
            className="text-accent-gold transition-transform duration-600 ease-organic group-hover:scale-110 group-hover:-rotate-[6deg]"
          />
        </div>
      )}

      <h3 className="font-display text-2xl text-text-primary mb-3 text-balance leading-tight">
        {amenity.title}
      </h3>
      <span
        aria-hidden
        className="block h-px w-8 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-600 ease-wood mb-4"
      />
      <p className="font-body text-sm text-text-secondary leading-relaxed text-pretty">
        {amenity.desc}
      </p>
    </div>
  )
}
