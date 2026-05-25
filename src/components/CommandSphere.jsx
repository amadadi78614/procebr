import { motion } from 'framer-motion'
import { useMemo } from 'react'

/*
  CommandSphere — the visual core.
  Layers (outside → in):
   1. Outer hexagonal frame with corner brackets
   2. Rotating outer wireframe (latitude ellipses + longitude ellipses)
   3. Counter-rotating mid wireframe
   4. Orbital particles
   5. Glowing inner core with caustic ripples
   6. Center node (status indicator)

  Color theme shifts:
   - Current (mode='current'): cyan + violet
   - Future  (mode='future'):  magenta + violet, more intense
*/
export default function CommandSphere({ mode = 'current', selectedAccent = null, scale = 1 }) {
  const isFuture = mode === 'future'

  // Resolve dominant color (selected pillar can colour the sphere when one is active)
  const colors = useMemo(() => {
    const accentMap = {
      cyan: '#22E1FF',
      aqua: '#5EEAD4',
      violet: '#8B6CFF',
      mint: '#10F4A6',
      magenta: '#FF4FA3',
    }
    const a = selectedAccent && accentMap[selectedAccent]
    if (isFuture) {
      return {
        primary: '#FF4FA3',
        secondary: a || '#8B6CFF',
        glow: 'rgba(255,79,163,0.55)',
        accentStop: '#22E1FF',
      }
    }
    return {
      primary: a || '#22E1FF',
      secondary: '#8B6CFF',
      glow: a ? `${a}99` : 'rgba(34,225,255,0.5)',
      accentStop: '#FF4FA3',
    }
  }, [isFuture, selectedAccent])

  // Pre-compute orbital particles (deterministic for stable layout)
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        radius: 90 + (i % 3) * 22,
        angle: (i * 137.5) % 360, // golden angle for nice spacing
        speed: 18 + (i % 5) * 4,
        size: 1.6 + (i % 3) * 0.4,
        opacity: 0.5 + (i % 3) * 0.15,
        reverse: i % 2 === 0,
      })),
    []
  )

  return (
    <motion.div
      className="relative"
      style={{
        // Container-relative sizing — the parent .command-stage provides a known box,
        // and the sphere fills ~70% of its height as both width & height (kept circular).
        height: '70%',
        aspectRatio: '1',
        scale,
        filter: `drop-shadow(0 0 40px ${colors.glow}) drop-shadow(0 0 80px ${colors.glow})`,
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
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.95" />
            <stop offset="40%" stopColor={colors.primary} stopOpacity="0.45" />
            <stop offset="75%" stopColor={colors.secondary} stopOpacity="0.18" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="core-hot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor={colors.primary} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wire-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={colors.primary} stopOpacity="0.85" />
            <stop offset="0.5" stopColor={colors.secondary} stopOpacity="0.85" />
            <stop offset="1" stopColor={colors.accentStop} stopOpacity="0.6" />
          </linearGradient>
          <filter id="soft-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" />
          </filter>
        </defs>

        {/* ── Outer wireframe — slow rotation ─────────────────── */}
        <motion.g
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          {/* Latitude ellipses */}
          {[20, 50, 80, 110, 130].map((ry, i) => (
            <ellipse
              key={`lat-${i}`}
              cx="0"
              cy="0"
              rx="140"
              ry={ry}
              fill="none"
              stroke="url(#wire-grad)"
              strokeWidth="0.5"
              opacity={0.45}
            />
          ))}
          {/* Equator (bolder) */}
          <ellipse
            cx="0"
            cy="0"
            rx="140"
            ry="140"
            fill="none"
            stroke={colors.primary}
            strokeWidth="0.8"
            opacity={0.55}
            strokeDasharray="3 2"
          />
        </motion.g>

        {/* ── Mid wireframe — counter-rotation ─────────────────── */}
        <motion.g
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        >
          {/* Longitude ellipses */}
          {[20, 50, 80, 110].map((rx, i) => (
            <ellipse
              key={`lon-${i}`}
              cx="0"
              cy="0"
              rx={rx}
              ry="140"
              fill="none"
              stroke="url(#wire-grad)"
              strokeWidth="0.5"
              opacity={0.35}
            />
          ))}
        </motion.g>

        {/* ── Inner sphere — pulsing ─────────────────── */}
        <motion.g
          animate={{ scale: [1, 1.04, 1], rotate: [0, 360] }}
          style={{ transformOrigin: 'center' }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
          }}
        >
          <circle cx="0" cy="0" r="78" fill="url(#core-glow)" />
          <circle
            cx="0"
            cy="0"
            r="78"
            fill="none"
            stroke={colors.primary}
            strokeWidth="0.7"
            opacity={0.7}
            strokeDasharray="2 3"
          />
          <circle
            cx="0"
            cy="0"
            r="60"
            fill="none"
            stroke={colors.secondary}
            strokeWidth="0.5"
            opacity={0.5}
            strokeDasharray="1 4"
          />
        </motion.g>

        {/* ── Caustic ripple rings — pulsing outward ─────────── */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`ripple-${i}`}
            cx="0"
            cy="0"
            r="40"
            fill="none"
            stroke={colors.primary}
            strokeWidth="0.6"
            initial={{ opacity: 0.5, scale: 0.6 }}
            animate={{ opacity: 0, scale: 3 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 1.3,
            }}
            style={{ transformOrigin: 'center' }}
          />
        ))}

        {/* ── Core (hot center) ─────────────────── */}
        <motion.circle
          cx="0"
          cy="0"
          r="34"
          fill="url(#core-hot)"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'center' }}
        />
        <motion.circle
          cx="0"
          cy="0"
          r="6"
          fill="#FFFFFF"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'blur(0.3px)' }}
        />

        {/* ── Orbital particles ─────────────────── */}
        {particles.map((p) => (
          <motion.g
            key={p.id}
            style={{ transformOrigin: 'center' }}
            animate={{ rotate: p.reverse ? -360 : 360 }}
            transition={{ duration: p.speed, repeat: Infinity, ease: 'linear' }}
            initial={{ rotate: p.angle }}
          >
            <circle
              cx={p.radius}
              cy="0"
              r={p.size}
              fill={colors.primary}
              opacity={p.opacity}
              style={{ filter: `drop-shadow(0 0 4px ${colors.primary})` }}
            />
          </motion.g>
        ))}

        {/* ── Crosshair / tick marks ─────────────────── */}
        <g opacity="0.4">
          {[0, 90, 180, 270].map((angle) => (
            <g key={angle} transform={`rotate(${angle})`} style={{ transformOrigin: 'center' }}>
              <line
                x1="148"
                y1="0"
                x2="156"
                y2="0"
                stroke={colors.primary}
                strokeWidth="1"
              />
            </g>
          ))}
        </g>
      </svg>

      {/* HUD label — mode indicator (positioned over the sphere center) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[9px] uppercase tracking-[0.32em] mb-1"
          style={{ color: colors.primary, textShadow: `0 0 8px ${colors.glow}` }}
        >
          {isFuture ? '◆ FUTURE STATE' : '◉ CURRENT STATE'}
        </motion.div>
        <motion.div
          key={mode + 'sub'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="font-display font-bold text-white text-base sm:text-lg tracking-tight"
          style={{ textShadow: '0 0 16px rgba(255,255,255,0.4)' }}
        >
          {isFuture ? 'Autonomous' : 'Governance'}
        </motion.div>
        <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/40 mt-0.5">
          {isFuture ? 'FY27+' : 'L4 · FY26'}
        </div>
      </div>
    </motion.div>
  )
}
