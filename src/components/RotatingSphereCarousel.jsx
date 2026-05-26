import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Gauge, Workflow, BrainCircuit, ArrowRight } from 'lucide-react'

const ICON_MAP = { Gauge, Workflow, BrainCircuit }

/*
  RotatingSphereCarousel — premium centerpiece.

  - A glass-marble sphere at the center (SVG, rotating wireframe).
  - 3 pillar segment cards orbit AROUND the sphere in 3D space.
  - Cards always face the viewer (counter-rotation undoes orbit rotation).
  - Cards in the back appear smaller via CSS perspective; opacity dims them.
  - Hovering pauses rotation.
  - Clicking a card drills down.
*/
export default function RotatingSphereCarousel({ pillars, mode, onPillarClick }) {
  const [angle, setAngle] = useState(0)
  const [paused, setPaused] = useState(false)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    const tick = (now) => {
      const dt = now - lastTimeRef.current
      lastTimeRef.current = now
      if (!paused) {
        // ~7 deg per second → ~51s per revolution. Slow and stately.
        setAngle((a) => (a + (dt / 1000) * 7) % 360)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused])

  const isFuture = mode === 'future'

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '1800px', perspectiveOrigin: '50% 50%' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 3D scene */}
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          width: 'min(90%, 720px)',
          height: '100%',
        }}
      >
        {/* CENTER SPHERE — glass marble, stays at center */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
            width: 'min(56%, 360px)',
            aspectRatio: '1',
          }}
        >
          <SphereInner mode={mode} sphereRotation={angle} />
        </div>

        {/* 3 ORBITING SEGMENT CARDS */}
        {pillars.map((pillar, i) => {
          const baseAngle = i * 120 // 0, 120, 240
          // Current angle of this card relative to viewer
          const currentAngle = (baseAngle + angle) % 360
          // Distance from "front" (0 = facing viewer, 180 = behind)
          const distFromFront = Math.min(
            currentAngle,
            360 - currentAngle
          ) / 180 // 0 (front) to 1 (back)

          // Visual properties based on position
          const isBack = distFromFront > 0.5
          const zIndex = isBack ? 0 : 10
          const opacity = paused ? 1 : 1 - distFromFront * 0.5
          // CSS perspective handles the size shrink for "depth" naturally

          const Icon = ICON_MAP[pillar.icon] || Gauge
          const accent = isFuture ? '#DB2777' : pillar.accent

          return (
            <div
              key={pillar.id}
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{
                width: 'min(240px, 35%)',
                transformStyle: 'preserve-3d',
                transform: `translate(-50%, -50%) rotateY(${baseAngle + angle}deg) translateZ(280px) rotateY(${-(baseAngle + angle)}deg)`,
                opacity,
                transition: 'opacity 300ms',
                zIndex,
              }}
            >
              <motion.button
                onClick={() => onPillarClick(pillar.id)}
                className="block w-full text-left focus:outline-none pointer-events-auto group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  filter: isBack ? 'blur(0.5px)' : 'none',
                }}
              >
                {/* Soft glow */}
                <div
                  className="absolute -inset-1 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: `0 12px 28px -6px ${accent}66, 0 2px 8px ${accent}33`,
                    opacity: paused || !isBack ? 1 : 0.5,
                  }}
                />

                {/* Card */}
                <div
                  className="relative rounded-2xl border backdrop-blur-xl px-4 py-3.5"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    borderColor: `${accent}77`,
                    boxShadow:
                      '0 8px 24px -4px rgba(15,60,80,0.18), 0 2px 4px rgba(15,60,80,0.08), inset 0 1px 0 rgba(255,255,255,0.95)',
                  }}
                >
                  {/* Top accent line — visually anchors card to sphere */}
                  <div
                    className="absolute -left-px -right-px -top-px h-[2.5px] rounded-t-2xl"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                      boxShadow: `0 0 8px ${accent}88`,
                    }}
                  />

                  {/* Pillar number */}
                  <span
                    className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5 rounded font-bold"
                    style={{
                      color: accent,
                      background: `${accent}14`,
                      border: `1px solid ${accent}33`,
                    }}
                  >
                    {`0${i + 1}`}
                  </span>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-3 mb-2.5 pr-12">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0"
                      style={{
                        borderColor: `${accent}55`,
                        background: `${accent}14`,
                        color: accent,
                      }}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <div className="font-display font-bold text-powder-950 text-lg leading-tight tracking-tight">
                        {pillar.title}
                      </div>
                      <div
                        className="font-mono text-[9.5px] uppercase tracking-[0.16em] mt-0.5"
                        style={{ color: accent }}
                      >
                        {pillar.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Tagline preview */}
                  <p className="text-[12px] text-powder-700 leading-snug mb-2.5 line-clamp-2">
                    {pillar[mode].tagline}
                  </p>

                  {/* Maturity contribution */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-powder-500/15">
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-powder-700">
                        Contributes
                      </span>
                      <div className="flex gap-0.5 ml-0.5">
                        {pillar.contributesTo.map((lvl) => (
                          <span
                            key={lvl}
                            className="font-mono text-[8.5px] font-bold px-1 py-0.5 rounded leading-none"
                            style={{
                              color: accent,
                              background: `${accent}1A`,
                            }}
                          >
                            {lvl}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span
                      className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.14em] font-semibold group-hover:gap-1.5 transition-all"
                      style={{ color: accent }}
                    >
                      Drill
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </motion.button>
            </div>
          )
        })}
      </div>

      {/* Pause indicator (subtle) */}
      {paused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.22em] text-powder-700 px-2 py-1 rounded bg-white/70 backdrop-blur-sm"
        >
          ⏸ paused · click to drill
        </motion.div>
      )}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────
// SphereInner — the glass-marble core
// ───────────────────────────────────────────────────────────────────
function SphereInner({ mode, sphereRotation }) {
  const isFuture = mode === 'future'

  const colors = isFuture
    ? {
        primary: '#DB2777',
        secondary: '#7C3AED',
        deepCore: '#831843',
        midCore: '#BE185D',
        coreHi: '#F472B6',
        glow: 'rgba(219,39,119,0.30)',
      }
    : {
        primary: '#0891B2',
        secondary: '#0D9488',
        deepCore: '#0E4E5C',
        midCore: '#0891B2',
        coreHi: '#67E8F9',
        glow: 'rgba(8,145,178,0.30)',
      }

  return (
    <div
      className="w-full h-full relative"
      style={{
        filter: `drop-shadow(0 16px 36px ${colors.glow}) drop-shadow(0 6px 12px rgba(15,60,80,0.14))`,
      }}
    >
      <svg
        viewBox="-160 -160 320 320"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="sphere-core" cx="38%" cy="33%" r="68%">
            <stop offset="0%" stopColor={colors.coreHi} stopOpacity="0.55" />
            <stop offset="22%" stopColor={colors.midCore} stopOpacity="0.85" />
            <stop offset="65%" stopColor={colors.deepCore} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors.deepCore} stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id="sphere-shine" cx="38%" cy="28%" r="38%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sphere-rim" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor={colors.primary} stopOpacity="0" />
            <stop offset="93%" stopColor={colors.primary} stopOpacity="0.55" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer rim halo */}
        <circle cx="0" cy="0" r="150" fill="url(#sphere-rim)" />

        {/* Sphere body */}
        <circle
          cx="0"
          cy="0"
          r="135"
          fill="url(#sphere-core)"
          stroke={colors.primary}
          strokeWidth="0.7"
          strokeOpacity="0.85"
        />

        {/* Latitude wireframe — rotates with the carousel angle */}
        <g
          style={{
            transformOrigin: 'center',
            transform: `rotate(${sphereRotation * 0.5}deg)`,
          }}
        >
          {[30, 65, 95, 120].map((ry, i) => (
            <ellipse
              key={`lat-${i}`}
              cx="0"
              cy="0"
              rx="135"
              ry={ry}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.55"
              opacity={0.28}
            />
          ))}
          <ellipse
            cx="0"
            cy="0"
            rx="135"
            ry="135"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.42"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
        </g>

        {/* Longitude wireframe — also rotates, but slower */}
        <g
          style={{
            transformOrigin: 'center',
            transform: `rotate(${-sphereRotation * 0.3}deg)`,
          }}
        >
          {[30, 65, 95].map((rx, i) => (
            <ellipse
              key={`lon-${i}`}
              cx="0"
              cy="0"
              rx={rx}
              ry="135"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.45"
              opacity={0.2}
            />
          ))}
        </g>

        {/* Inner shine */}
        <circle
          cx="0"
          cy="0"
          r="135"
          fill="url(#sphere-shine)"
          pointerEvents="none"
        />

        {/* Outer ring with tick marks */}
        <circle
          cx="0"
          cy="0"
          r="148"
          fill="none"
          stroke={colors.primary}
          strokeOpacity="0.30"
          strokeWidth="0.6"
        />
        {/* Tick marks — 3 prominent at 120° intervals for the 3 pillars */}
        <g>
          {[0, 120, 240].map((tickAngle) => (
            <g
              key={tickAngle}
              transform={`rotate(${tickAngle + sphereRotation})`}
              style={{ transformOrigin: 'center' }}
            >
              <line
                x1="138"
                y1="0"
                x2="155"
                y2="0"
                stroke={colors.primary}
                strokeWidth="1.5"
                opacity="0.7"
              />
              <circle
                cx="155"
                cy="0"
                r="2"
                fill={colors.primary}
                opacity="0.85"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
