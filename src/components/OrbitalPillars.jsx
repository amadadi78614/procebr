import { motion } from 'framer-motion'
import { Gauge, Workflow, BrainCircuit, ShieldCheck } from 'lucide-react'

const ICON_MAP = {
  Gauge,
  Workflow,
  BrainCircuit,
  ShieldCheck,
}

const ACCENT_COLORS = {
  cyan: '#22E1FF',
  aqua: '#5EEAD4',
  violet: '#8B6CFF',
  mint: '#10F4A6',
  magenta: '#FF4FA3',
}

// Polar (angle in degrees, 0 = top, clockwise) → cartesian percentages of container
function polarToOffset(angleDeg, radius) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  }
}

export default function OrbitalPillars({ pillars, selectedId, mode, onSelect }) {
  const isFuture = mode === 'future'

  return (
    <>
      {/* Connecting beams — SVG overlay covering the stage */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="-50 -50 100 100"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {pillars.map((p) => {
            const color = ACCENT_COLORS[p.accent]
            return (
              <linearGradient
                key={`grad-${p.id}`}
                id={`beam-${p.id}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0" stopColor={color} stopOpacity="0.05" />
                <stop offset="0.5" stopColor={color} stopOpacity="0.75" />
                <stop offset="1" stopColor={color} stopOpacity="0.1" />
              </linearGradient>
            )
          })}
        </defs>
        {pillars.map((p) => {
          const { x, y } = polarToOffset(p.angle, 30) // beam ends slightly inside the pillar position
          const isSelected = selectedId === p.id
          const isDimmed = selectedId && !isSelected
          return (
            <motion.line
              key={`beam-${p.id}`}
              x1="0"
              y1="0"
              x2={x}
              y2={y}
              stroke={`url(#beam-${p.id})`}
              strokeWidth={isSelected ? '0.5' : '0.25'}
              strokeDasharray="1 1.4"
              vectorEffect="non-scaling-stroke"
              animate={{
                opacity: isDimmed ? 0.12 : isSelected ? 1 : 0.55,
              }}
              transition={{ duration: 0.4 }}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-20"
                dur="3s"
                repeatCount="indefinite"
              />
            </motion.line>
          )
        })}
      </svg>

      {/* Pillar nodes — clean positioning pattern:
          - Outer div sets anchor in % of container, then centers via translate
          - Inner motion.button animates scale/opacity only (no transform conflict) */}
      {pillars.map((pillar, i) => {
        const { x, y } = polarToOffset(pillar.angle, 40)
        const isSelected = selectedId === pillar.id
        const isDimmed = selectedId && !isSelected
        const Icon = ICON_MAP[pillar.icon] || Gauge
        const color = ACCENT_COLORS[pillar.accent]
        const effectiveColor = isFuture && !selectedId ? '#FF4FA3' : color

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
              onClick={() => onSelect(isSelected ? null : pillar.id)}
              className="relative group focus:outline-none block text-left"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: isDimmed ? 0.4 : 1,
                scale: isSelected ? 1.08 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 24,
                delay: i * 0.08,
              }}
              whileHover={{ scale: isSelected ? 1.1 : 1.06 }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-1 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: `0 0 36px -4px ${effectiveColor}88, 0 0 14px ${effectiveColor}44`,
                }}
                animate={{
                  opacity: isSelected ? [0.7, 1, 0.7] : [0.25, 0.5, 0.25],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Node card */}
              <div
                className="relative w-[170px] sm:w-[200px] px-4 py-3 rounded-2xl border backdrop-blur-xl"
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${effectiveColor}22, ${effectiveColor}08)`
                    : 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                  borderColor: isSelected
                    ? `${effectiveColor}99`
                    : 'rgba(255,255,255,0.10)',
                }}
              >
                {/* Corner ticks */}
                <span
                  className="absolute top-0 left-0 w-2 h-2 border-t border-l rounded-tl"
                  style={{
                    borderColor: isSelected ? effectiveColor : 'rgba(255,255,255,0.2)',
                  }}
                />
                <span
                  className="absolute bottom-0 right-0 w-2 h-2 border-b border-r rounded-br"
                  style={{
                    borderColor: isSelected ? effectiveColor : 'rgba(255,255,255,0.2)',
                  }}
                />

                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0"
                    style={{
                      borderColor: `${effectiveColor}66`,
                      background: `${effectiveColor}1a`,
                      color: effectiveColor,
                    }}
                  >
                    <Icon size={17} strokeWidth={1.9} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-white text-sm leading-tight tracking-tight">
                      {pillar.title}
                    </div>
                    <div
                      className="font-mono text-[9.5px] uppercase tracking-[0.18em] truncate mt-0.5"
                      style={{ color: `${effectiveColor}cc` }}
                    >
                      {pillar.subtitle}
                    </div>
                  </div>
                </div>

                {/* Bottom mini status bar */}
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: effectiveColor,
                        boxShadow: `0 0 6px ${effectiveColor}`,
                      }}
                    />
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.18em]"
                      style={{ color: effectiveColor }}
                    >
                      {isSelected ? 'ACTIVE' : isFuture ? 'FY27+' : 'FY26'}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 group-hover:text-white/60 transition-colors">
                    {isSelected ? '← back' : 'explore →'}
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
