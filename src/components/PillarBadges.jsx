import { motion } from 'framer-motion'
import { Gauge, Workflow, BrainCircuit, ArrowRight } from 'lucide-react'

const ICON_MAP = { Gauge, Workflow, BrainCircuit }

const ACCENT_COLORS = {
  cyan: '#0891B2',
  aqua: '#14B8A6',
  violet: '#7C3AED',
  mint: '#10B981',
  magenta: '#DB2777',
}

// Polar (angle in deg, 0 = top, clockwise) → cartesian fractions
function polar(angleDeg, radius) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
}

/*
  PillarBadges — three large pillar cards positioned around the sphere.
  Designed to feel ANCHORED to the sphere:
   - Short tether line from sphere edge to badge
   - Small marker dot at sphere-edge contact point
   - Badge sits at a fixed radial distance
*/
export default function PillarBadges({ pillars, mode, onPillarClick }) {
  const isFuture = mode === 'future'

  return (
    <>
      {/* Tether lines — drawn first so badges sit on top */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="-50 -50 100 100"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        {pillars.map((p) => {
          const accent = ACCENT_COLORS[p.accent]
          const effective = isFuture ? '#DB2777' : accent
          // Tether goes from radius 22 (sphere edge in viewBox units) to 36 (badge anchor)
          const inner = polar(p.angle, 22)
          const outer = polar(p.angle, 36)
          return (
            <g key={`tether-${p.id}`}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke={effective}
                strokeOpacity="0.55"
                strokeWidth="0.4"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="1 1"
              />
              <circle
                cx={inner.x}
                cy={inner.y}
                r="0.9"
                fill={effective}
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={outer.x}
                cy={outer.y}
                r="0.6"
                fill={effective}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )
        })}
      </svg>

      {/* Badges */}
      {pillars.map((pillar, i) => {
        const { x, y } = polar(pillar.angle, 42)
        const Icon = ICON_MAP[pillar.icon] || Gauge
        const accent = ACCENT_COLORS[pillar.accent]
        const effective = isFuture ? '#DB2777' : accent

        return (
          <div
            key={pillar.id}
            className="absolute z-10"
            style={{
              left: `${50 + x}%`,
              top: `${50 + y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.button
              onClick={() => onPillarClick(pillar.id)}
              className="relative group focus:outline-none block text-left"
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 24,
                delay: 0.15 + i * 0.1,
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Soft glow */}
              <div
                className="absolute -inset-1 rounded-2xl pointer-events-none opacity-50"
                style={{
                  boxShadow: `0 12px 28px -6px ${effective}55, 0 2px 8px ${effective}22`,
                }}
              />

              {/* Card */}
              <div
                className="relative w-[230px] sm:w-[260px] px-5 py-4 rounded-2xl border backdrop-blur-xl"
                style={{
                  background: 'rgba(255,255,255,0.88)',
                  borderColor: `${effective}55`,
                  boxShadow:
                    '0 8px 24px -4px rgba(15,60,80,0.12), 0 2px 4px rgba(15,60,80,0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
                }}
              >
                {/* Number badge top-right */}
                <span
                  className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5 rounded"
                  style={{
                    color: effective,
                    background: `${effective}14`,
                    border: `1px solid ${effective}33`,
                  }}
                >
                  {`0${i + 1}`}
                </span>

                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0"
                    style={{
                      borderColor: `${effective}55`,
                      background: `${effective}14`,
                      color: effective,
                    }}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <div className="font-display font-bold text-powder-950 text-lg leading-tight tracking-tight">
                      {pillar.title}
                    </div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.18em] mt-0.5"
                      style={{ color: effective }}
                    >
                      {pillar.subtitle}
                    </div>
                  </div>
                </div>

                {/* Brief preview line — uses current/future tagline */}
                <p className="text-[12px] text-powder-700 leading-snug mb-3 line-clamp-2">
                  {pillar[mode].tagline}
                </p>

                {/* Action footer */}
                <div className="flex items-center justify-between pt-2.5 border-t border-powder-500/15">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-powder-700">
                    {isFuture ? 'FY27+ · Vision' : 'FY26 · Reality'}
                  </span>
                  <span
                    className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] font-semibold group-hover:gap-2 transition-all"
                    style={{ color: effective }}
                  >
                    Drill in
                    <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </motion.button>
          </div>
        )
      })}
    </>
  )
}
