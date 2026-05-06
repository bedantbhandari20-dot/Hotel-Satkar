/**
 * Editorial route illustration — Dhangadhi Airport → Dipayal, Doti.
 * Hand-drawn SVG style: travel-magazine, not Google Maps.
 */
export default function RouteIllustration() {
  return (
    <div className="route-illustration reveal">
      <div className="flex items-center gap-4 mb-6">
        <span aria-hidden className="block h-px w-10 bg-accent" />
        <span className="eyebrow text-accent">How to reach us</span>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-soft mb-8">
        यहाँ कसरी आउने
      </p>

      <div className="route-map-frame">
        <svg
          viewBox="0 0 720 210"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Illustrated route from Dhangadhi Airport to Satkar Hotel, Dipayal"
          role="img"
          className="w-full h-auto"
        >
          {/* ── Background ── */}
          <rect width="720" height="210" fill="#F5F0E8" />

          {/* Faint latitude lines — give it a map feel */}
          {[50, 90, 130, 170].map((y) => (
            <line key={y} x1="0" y1={y} x2="720" y2={y} stroke="rgba(44,36,24,0.04)" strokeWidth="0.5" />
          ))}
          {[120, 240, 360, 480, 600].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="210" stroke="rgba(44,36,24,0.04)" strokeWidth="0.5" />
          ))}

          {/* ── Terrain silhouettes ── */}
          {/* Terai flatlands (left) — very low */}
          <polygon
            points="0,180 160,180 200,165 240,175 280,160 0,160"
            fill="rgba(91,107,63,0.08)"
          />
          {/* Hill rise (centre) */}
          <polygon
            points="240,175 300,130 360,110 420,105 460,115 500,108 520,130 560,155 600,148 640,160 720,165 720,210 0,210 0,180 160,180 200,165"
            fill="rgba(61,79,47,0.10)"
          />
          {/* Doti highlands (right) */}
          <polygon
            points="460,115 500,85 540,95 570,80 600,90 640,105 680,98 720,110 720,165 640,160 600,148 560,155 520,130"
            fill="rgba(61,79,47,0.14)"
          />
          {/* Mountain peaks */}
          <polygon points="510,83 530,58 550,83" fill="rgba(61,79,47,0.18)" />
          <polygon points="555,78 572,55 590,78" fill="rgba(61,79,47,0.15)" />
          <polygon points="490,88 504,70 518,88" fill="rgba(61,79,47,0.12)" />

          {/* Snow caps */}
          <polygon points="525,58 530,52 535,58" fill="rgba(245,240,232,0.9)" />
          <polygon points="568,55 572,49 577,55" fill="rgba(245,240,232,0.9)" />

          {/* ── Seti river (near Dipayal) ── */}
          <path
            d="M 590,130 C 600,125 610,132 620,128 C 630,124 640,130 650,125 C 660,120 670,128 680,123"
            fill="none"
            stroke="rgba(140,170,195,0.55)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text x="618" y="142" fontFamily="monospace" fontSize="6.5" fill="rgba(140,170,195,0.7)" letterSpacing="0.12em" textAnchor="middle" textDecoration="none">SETI RIVER</text>

          {/* ── Main route path ── */}
          {/* Shadow/glow under route */}
          <path
            d="M 88,162 C 140,160 170,155 210,150 C 270,145 310,125 370,108 C 420,95 470,96 530,98 C 570,100 600,100 630,102"
            fill="none"
            stroke="rgba(139,115,85,0.12)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Road surface — dashed amber */}
          <path
            d="M 88,162 C 140,160 170,155 210,150 C 270,145 310,125 370,108 C 420,95 470,96 530,98 C 570,100 600,100 630,102"
            fill="none"
            stroke="rgba(139,115,85,0.55)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="8,5"
          />
          {/* Centre dash — lighter, editorial feel */}
          <path
            d="M 88,162 C 140,160 170,155 210,150 C 270,145 310,125 370,108 C 420,95 470,96 530,98 C 570,100 600,100 630,102"
            fill="none"
            stroke="rgba(196,152,44,0.35)"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeDasharray="3,10"
          />

          {/* ── Waypoint: Dhangadhi Airport ── */}
          <circle cx="88" cy="162" r="5" fill="#F5F0E8" stroke="rgba(196,152,44,0.7)" strokeWidth="1.4" />
          <circle cx="88" cy="162" r="2" fill="rgba(196,152,44,0.8)" />
          {/* Airplane icon (simplified) */}
          <text x="88" y="152" fontFamily="monospace" fontSize="11" fill="rgba(139,115,85,0.6)" textAnchor="middle">✈</text>
          {/* Labels */}
          <text x="88" y="182" fontFamily="monospace" fontSize="7.5" fontWeight="600" fill="rgba(44,36,24,0.75)" textAnchor="middle" letterSpacing="0.1em">DHANGADHI</text>
          <text x="88" y="193" fontFamily="monospace" fontSize="6" fill="rgba(139,115,85,0.7)" textAnchor="middle" letterSpacing="0.14em">DHI AIRPORT</text>

          {/* ── Waypoint: Attariya ── */}
          <circle cx="210" cy="150" r="3.5" fill="#F5F0E8" stroke="rgba(139,115,85,0.45)" strokeWidth="1.2" />
          <circle cx="210" cy="150" r="1.4" fill="rgba(139,115,85,0.55)" />
          <text x="210" y="143" fontFamily="monospace" fontSize="6.5" fill="rgba(44,36,24,0.55)" textAnchor="middle" letterSpacing="0.1em">ATTARIYA</text>
          <text x="210" y="166" fontFamily="monospace" fontSize="5.5" fill="rgba(139,115,85,0.45)" textAnchor="middle" letterSpacing="0.12em">JUNCTION</text>

          {/* ── Distance annotation along route ── */}
          <text x="310" y="125" fontFamily="monospace" fontSize="6" fill="rgba(196,152,44,0.7)" textAnchor="middle" letterSpacing="0.14em">≈ 230 km · 6 hr drive</text>
          <line x1="268" y1="128" x2="352" y2="128" stroke="rgba(196,152,44,0.25)" strokeWidth="0.5" />

          {/* ── Waypoint: Dadeldhura ── */}
          <circle cx="420" cy="95" r="3.5" fill="#F5F0E8" stroke="rgba(139,115,85,0.45)" strokeWidth="1.2" />
          <circle cx="420" cy="95" r="1.4" fill="rgba(139,115,85,0.55)" />
          <text x="420" y="87" fontFamily="monospace" fontSize="6.5" fill="rgba(44,36,24,0.55)" textAnchor="middle" letterSpacing="0.1em">DADELDHURA</text>

          {/* ── Waypoint: Dipayal / Satkar ── */}
          {/* Outer ring + glow */}
          <circle cx="630" cy="102" r="9" fill="rgba(196,152,44,0.10)" stroke="rgba(196,152,44,0.3)" strokeWidth="0.8" />
          <circle cx="630" cy="102" r="6" fill="#F5F0E8" stroke="rgba(196,152,44,0.75)" strokeWidth="1.6" />
          <circle cx="630" cy="102" r="2.8" fill="rgba(196,152,44,0.85)" />
          {/* Label */}
          <text x="630" y="90" fontFamily="monospace" fontSize="7.5" fontWeight="600" fill="rgba(44,36,24,0.80)" textAnchor="middle" letterSpacing="0.12em">DIPAYAL</text>
          <text x="630" y="80" fontFamily="monospace" fontSize="6.5" fill="rgba(196,152,44,0.85)" textAnchor="middle" letterSpacing="0.14em">SATKAR HOTEL</text>
          <text x="630" y="120" fontFamily="monospace" fontSize="6" fill="rgba(139,115,85,0.55)" textAnchor="middle" letterSpacing="0.12em">640M ELEVATION</text>

          {/* ── Compass rose (top-right) ── */}
          <g transform="translate(690, 22)">
            <circle cx="0" cy="0" r="12" fill="rgba(245,240,232,0.0)" stroke="rgba(44,36,24,0.08)" strokeWidth="0.6" />
            <text x="0" y="-6" fontFamily="monospace" fontSize="7" fill="rgba(44,36,24,0.35)" textAnchor="middle">N</text>
            <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(44,36,24,0.25)" strokeWidth="0.8" />
            <line x1="-3" y1="0" x2="3" y2="0" stroke="rgba(44,36,24,0.15)" strokeWidth="0.6" />
          </g>

          {/* ── Legend note ── */}
          <text x="16" y="200" fontFamily="monospace" fontSize="5.5" fill="rgba(44,36,24,0.30)" letterSpacing="0.12em">DIPAYAL · DOTI DISTRICT · FAR-WESTERN PROVINCE</text>
        </svg>
      </div>

      {/* Leg breakdown — editorial table */}
      <div className="route-legs mt-6 grid grid-cols-1 sm:grid-cols-3 gap-0 border border-line rounded-card overflow-hidden">
        <RouteLeg
          from="Dhangadhi"
          via="Fly or drive from Kathmandu"
          time="1.5 hr flight · or 10 hr drive"
          note="DHI Airport · daily flights"
        />
        <RouteLeg
          from="Attariya Junction"
          via="Turn north on highway to Doti"
          time="2 hr drive"
          note="Last petrol station before hills"
          mid
        />
        <RouteLeg
          from="Dipayal, Doti"
          via="Arrive at Satkar Hotel"
          time="3.5 hr from Attariya"
          note="We'll be at the door"
          last
        />
      </div>
    </div>
  )
}

function RouteLeg({ from, via, time, note, mid, last }) {
  return (
    <div className={`route-leg px-6 py-5 bg-surface ${mid || last ? 'border-t sm:border-t-0 sm:border-l border-line' : ''}`}>
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent-gold mb-1">{time}</p>
      <p className="font-display text-base text-text-primary mb-1">{from}</p>
      <p className="font-body text-[12px] text-text-secondary leading-relaxed">{via}</p>
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted mt-2">{note}</p>
    </div>
  )
}
