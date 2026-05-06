import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import ImageReveal from '../ui/ImageReveal.jsx'
import Tilt from '../effects/Tilt.jsx'
import RoomPickerModal from '../ui/RoomPickerModal.jsx'

export default function RoomCard({ room, index }) {
  const { category, name, description, price, capacity, features, image } = room
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
    {modalOpen && <RoomPickerModal room={room} onClose={() => setModalOpen(false)} />}
    <Tilt maxTilt={3} className="h-full">
    <Card className="h-full">
      {/* Image with skeleton + fade-in + hover scale */}
      <ImageReveal
        src={image}
        alt={name}
        aspect="aspect-[4/3]"
        rounded="rounded-none"
        overlay="soft"
        className="border-b border-line"
        imgClassName="group-hover:scale-[1.04]"
      />

      {/* Capacity chip */}
      <span
        className="absolute top-4 left-4 inline-flex items-center gap-2 bg-bg-primary/85 backdrop-blur-md
                   text-text-primary font-body text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-pill shadow-fog"
      >
        <span className="block w-1 h-1 rounded-full bg-accent" />
        {capacity}
      </span>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 md:p-8 relative">
        <span className="eyebrow mb-4">{category}</span>

        <h3 className="font-display text-d-4 text-text-primary mb-3 text-balance">
          {name}
        </h3>

        <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2 mb-6 text-pretty">
          {description}
        </p>

        {/* Features as compact pills */}
        <ul className="flex flex-wrap gap-2 mb-8">
          {features.map((f) => (
            <li
              key={f}
              className="font-body text-[10.5px] uppercase tracking-[0.18em] text-text-secondary
                         border border-line px-3 py-1.5 rounded-pill
                         transition-colors duration-450 ease-organic group-hover:border-line-strong group-hover:text-text-primary"
            >
              {f}
            </li>
          ))}
        </ul>

        {/* Price + CTA row */}
        <div className="mt-auto pt-6 border-t border-line flex items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-body text-[10px] text-text-secondary uppercase tracking-[0.22em]">
                Rs
              </span>
              <span className="font-display text-[2.4rem] leading-[1.05] text-text-primary tabular-nums">
                {price.toLocaleString()}
              </span>
            </div>
            <span className="font-body text-[10px] text-text-tertiary uppercase tracking-[0.22em] mt-2 block">
              per night · taxes included
            </span>
          </div>

          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            size="sm"
            trailingIcon={<ArrowUpRight size={13} strokeWidth={1.75} />}
            aria-label={`Check availability for the ${name} room`}
            magnetic
            kineticLabel
          >
            Book
          </Button>
        </div>
      </div>
    </Card>
    </Tilt>
    </>
  )
}
