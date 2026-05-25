import { motion } from 'framer-motion'
import { useMemo } from 'react'

/*
  CommandSphere — calmer redesign.
  Tone: premium dashboard centerpiece, not "command HUD."
   - Slower rotation (90s+ per revolution)
   - Fewer wireframe lines, all aligned (latitude + clean longitude)
   - Soft inner gradient (teal pool) — looks like a glass marble, not a sci-fi orb
   - No caustic ripples by default (only on hover/click)
   - Just enough motion to feel alive
*/
export default function CommandSphere({
  mode = 'current',
  scale = 1,
  size = 'large', // 'large' (hero) | 'small' (drill-view thumbnail)
}) {
  const isFuture = mode === 'future'

  const colors = useMemo(() => {
    if (isFuture) {
      return {
        primary: '#DB2777',
        secondary: '#7C3AED',
        deepCore: '#831843',
        midCore: '#BE185D',
        coreHi: '#F472B6',
        glow: 'rgba(219,39,119,0.22)',
      }
    }
    return {
      primary: '#0891B2',
      secondary: '#0D9488',
      deepCore: '#0E4E5C',
      midCore: '#0891B2',
      coreHi: '#67E8F9',
      glow: 'rgba(8,145,178,0.22)',
    }
  }, [isFuture])

  const isSmall = size === 'small'

  return (
    <motion.div
      className="relative"
      style={{
        height: '100%',
        aspectRatio: '1',
        scale,
        filter: isSmall
          ? `drop-shadow(0 4px 12px ${colors.glow})`
          : `drop-shadow(0 16px 36px ${colors.glow}) drop-shadow(0 4px 10px rgba(15,60,80,0.10))`,
      }}
      animate={{ scale }}
      transition={{ type: 'spring', stiffness: 180, damping: 26 }}
    >
      <svg
        viewBox="-160 -160 320 320"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Inner core — soft teal/violet gradient */}
          <radialGradient id="core-deep" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor={colors.coreHi} stopOpacity="0.55" />
            <stop offset="25%" stopColor={colors.midCore} stopOpacity="0.85" />
            <stop offset="70%" stopColor={colors.deepCore} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors.deepCore} stopOpacity="0.6" />
          </radialGradient>
          {/* Subtle inner highlight */}
          <radialGradient id="core-shine" cx="40%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          {/* Outer rim glow */}
          <radialGradient id="rim-glow" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor={colors.primary} stopOpacity="0" />
            <stop offset="95%" stopColor={colors.primary} stopOpacity="0.45" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Outer subtle rim ─────────────────── */}
        <circle cx="0" cy="0" r="150" fill="url(#rim-glow)" />

        {/* ── Sphere body — the calm visual mass ─────────────────── */}
        <circle
          cx="0"
          cy="0"
          r="135"
          fill="url(#core-deep)"
          stroke={colors.primary}
          strokeWidth="0.6"
          strokeOpacity="0.85"
        />

        {/* ── Latitude wireframe — slow rotation, gives the rotating-globe sense ─ */}
        <motion.g
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
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
              strokeWidth="0.5"
              opacity={0.22}
            />
          ))}
          {/* Equator slightly stronger */}
          <ellipse
            cx="0"
            cy="0"
            rx="135"
            ry="135"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.32"
            strokeWidth="0.7"
            strokeDasharray="3 3"
          />
        </motion.g>

        {/* ── Longitude wireframe — counter-rotation, slower ─────────── */}
        <motion.g
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
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
              strokeWidth="0.4"
              opacity={0.16}
            />
          ))}
        </motion.g>

        {/* ── Inner shine highlight (gives the glass-marble feel) ─── */}
        <circle cx="0" cy="0" r="135" fill="url(#core-shine)" pointerEvents="none" />

        {/* ── Slow inner pulse ─────────────────── */}
        <motion.circle
          cx="0"
          cy="0"
          r="40"
          fill="#FFFFFF"
          opacity={0.05}
          animate={{ scale: [1, 1.5, 1], opacity: [0.08, 0, 0.08] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* ── Outer ring with tick marks ─────────────────── */}
        <circle
          cx="0"
          cy="0"
          r="148"
          fill="none"
          stroke={colors.primary}
          strokeOpacity="0.25"
          strokeWidth="0.5"
        />
        {/* Tick marks at cardinal points */}
        <g opacity="0.5">
          {[0, 90, 180, 270].map((angle) => (
            <g key={angle} transform={`rotate(${angle})`} style={{ transformOrigin: 'center' }}>
              <line x1="143" y1="0" x2="153" y2="0" stroke={colors.primary} strokeWidth="1" />
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
  )
}
