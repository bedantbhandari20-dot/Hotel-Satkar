/**
 * Custom hand-crafted line icons for Satkar amenities.
 * Each accepts className + size so AmenityCard can drive colour/scale.
 * strokeWidth is intentionally thinner than Lucide to feel artisanal.
 */

const props = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.25',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

export const IconWifi = ({ className, size = 22 }) => (
  <svg {...props(size)} className={className}>
    {/* three organic arcs — slightly asymmetric for warmth */}
    <path d="M2 9.5a14 14 0 0120 0" />
    <path d="M5.5 13a9 9 0 0113 0" />
    <path d="M9.5 16.5a4 4 0 015 0" />
    {/* dot — slightly oversized for character */}
    <circle cx="12" cy="20" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

export const IconBakery = ({ className, size = 22 }) => (
  <svg {...props(size)} className={className}>
    {/* three steam curls — slight stagger in height */}
    <path d="M8 7c0-1.2 1-1.5 1-2.8" />
    <path d="M12 6.5c0-1.2 1-1.5 1-2.8" />
    <path d="M16 7c0-1.2 1-1.5 1-2.8" />
    {/* loaf dome */}
    <path d="M4.5 16V14C4.5 10.5 7 8 12 8s7.5 2.5 7.5 6v2" />
    {/* base plate */}
    <rect x="3.5" y="16" width="17" height="4" rx="1.5" />
    {/* single score — gives it a bakery feel */}
    <path d="M9 13c1-1.5 5-1.5 6 0" />
  </svg>
)

export const IconRestaurant = ({ className, size = 22 }) => (
  <svg {...props(size)} className={className}>
    {/* two steam lines */}
    <path d="M9 7c0-1.2 1-1.5 1-2.8" />
    <path d="M15 7c0-1.2 1-1.5 1-2.8" />
    {/* bowl arc */}
    <path d="M3 12c0 4.5 4 8 9 8s9-3.5 9-8H3z" />
    {/* rim */}
    <path d="M2.5 12h19" />
  </svg>
)

export const IconMeeting = ({ className, size = 22 }) => (
  <svg {...props(size)} className={className}>
    {/* presentation screen */}
    <rect x="2" y="3" width="20" height="13" rx="1.5" />
    {/* content lines — two dashes inside screen */}
    <path d="M7 8h10M7 11.5h6" />
    {/* stand + base */}
    <path d="M12 16v4" />
    <path d="M8.5 20h7" />
  </svg>
)

export const IconParking = ({ className, size = 22 }) => (
  <svg {...props(size)} className={className}>
    {/* car body */}
    <path d="M7 14.5l1.5-4.5h9l1.5 4.5" />
    <rect x="3.5" y="14.5" width="17" height="5" rx="1.5" />
    {/* wheels */}
    <circle cx="8" cy="19.5" r="1.8" />
    <circle cx="16" cy="19.5" r="1.8" />
    {/* windshield */}
    <path d="M9 14.5l1-3h4l1 3" />
    {/* headlight nub */}
    <path d="M4.5 16.5H3.5" />
  </svg>
)

export const IconMountain = ({ className, size = 22 }) => (
  <svg {...props(size)} className={className}>
    {/* background peak — shorter */}
    <path d="M1.5 21L9 7l5.5 9.5" />
    {/* foreground peak — taller, Himalayan */}
    <path d="M14.5 16.5L18 4l5 17" />
    {/* snow cap on tall peak */}
    <path d="M16 9l2-5 2.5 6" />
    {/* ground line */}
    <path d="M1 21h22" />
    {/* small star — mountain sky */}
    <path d="M5 4l.4 1.2L6.6 5l-1.2.4L5 6.6l-.4-1.2L3.4 5l1.2-.4L5 4z" fill="currentColor" stroke="none" />
  </svg>
)

export const IconTerrace = ({ className, size = 22 }) => (
  <svg {...props(size)} className={className}>
    {/* distant hill silhouettes */}
    <path d="M2 12l4-3.5 3 2 4-3 4 3 3-2 2 1.5" />
    {/* sun / moon over the hills */}
    <circle cx="17" cy="6.5" r="1.5" />
    {/* terrace floor line */}
    <path d="M2 16h20" />
    {/* railing top */}
    <path d="M3 19h18" />
    {/* railing posts — slightly varied for handcrafted feel */}
    <line x1="6" y1="16" x2="6" y2="19" />
    <line x1="10" y1="16" x2="10" y2="19" />
    <line x1="14" y1="16" x2="14" y2="19" />
    <line x1="18" y1="16" x2="18" y2="19" />
  </svg>
)

export const IconFitness = ({ className, size = 22 }) => (
  <svg {...props(size)} className={className}>
    {/* center bar */}
    <line x1="7.5" y1="12" x2="16.5" y2="12" />
    {/* left inner collar */}
    <line x1="7.5" y1="9.5" x2="7.5" y2="14.5" strokeWidth="2" />
    {/* left outer plate */}
    <line x1="4.5" y1="8.5" x2="4.5" y2="15.5" strokeWidth="3" strokeLinecap="round" />
    {/* right inner collar */}
    <line x1="16.5" y1="9.5" x2="16.5" y2="14.5" strokeWidth="2" />
    {/* right outer plate */}
    <line x1="19.5" y1="8.5" x2="19.5" y2="15.5" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

export const IconBell = ({ className, size = 22 }) => (
  <svg {...props(size)} className={className}>
    {/* bell dome */}
    <path d="M6 17V11a6 6 0 0112 0v6" />
    {/* rim plate */}
    <path d="M4.5 17h15a1.5 1.5 0 010 3h-15a1.5 1.5 0 010-3z" />
    {/* handle */}
    <path d="M10 5a2 2 0 004 0" />
    <line x1="12" y1="5" x2="12" y2="7" />
    {/* two side rings for character */}
    <path d="M3 12c-.5-1.5-.5-3.5 0-5" />
    <path d="M21 12c.5-1.5.5-3.5 0-5" />
  </svg>
)
