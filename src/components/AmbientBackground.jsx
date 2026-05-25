import { motion } from 'framer-motion'

export default function AmbientBackground({ futureMode }) {
  // Deterministic particle positions for stability across renders
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: (i * 37) % 100,
    y: (i * 53) % 100,
    d: 8 + ((i * 7) % 14),
    delay: (i * 0.3) % 6,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Navy/teal base — deeper at corners, lighter towards the centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, #14406A 0%, #0F325A 30%, #0A2540 60%, #061A30 100%)',
        }}
      />

      {/* Turquoise wash — top-left */}
      <div className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-hud-cyan/[0.10] blur-[140px]" />
      {/* Violet wash — bottom-right */}
      <div className="absolute -bottom-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full bg-hud-violet/[0.10] blur-[140px]" />
      {/* Aqua accent — top-right (lifts the navy) */}
      <div className="absolute top-1/4 -right-1/3 w-[45vw] h-[45vw] rounded-full bg-hud-aqua/[0.07] blur-[130px]" />
      {futureMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] rounded-full bg-hud-magenta/[0.10] blur-[160px]"
        />
      )}

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(140,200,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(140,200,235,0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* Diagonal cyan grid for "future mode" intensifier */}
      {futureMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(45deg, rgba(34,225,255,0.08) 1px, transparent 1px), linear-gradient(-45deg, rgba(139,108,255,0.08) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          }}
        />
      )}

      {/* Drifting particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 3,
            height: 3,
            background: futureMode ? 'rgba(255,79,163,0.55)' : 'rgba(34,225,255,0.5)',
            boxShadow: futureMode
              ? '0 0 8px rgba(255,79,163,0.6)'
              : '0 0 8px rgba(34,225,255,0.6)',
          }}
          animate={{
            y: ['-10%', '10%', '-10%'],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: futureMode
            ? 'linear-gradient(90deg, transparent, rgba(255,79,163,0.5), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(34,225,255,0.5), transparent)',
          boxShadow: futureMode
            ? '0 0 20px rgba(255,79,163,0.3)'
            : '0 0 20px rgba(34,225,255,0.3)',
        }}
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      />

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </div>
  )
}
