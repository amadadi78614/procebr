import { motion } from 'framer-motion'

export default function AmbientBackground({ futureMode }) {
  // Calmer — fewer particles, larger spread
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (i * 47) % 100,
    y: (i * 67) % 100,
    d: 14 + ((i * 7) % 14),
    delay: (i * 0.5) % 6,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Powder-blue radial base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, #F2FAFD 0%, #E5F0F5 40%, #D1E5ED 75%, #C0D9E3 100%)',
        }}
      />

      {/* Soft turquoise wash — top */}
      <div className="absolute -top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-hud-cyan/[0.08] blur-[140px]" />
      {/* Aqua hint — right */}
      <div className="absolute top-1/4 -right-1/4 w-[40vw] h-[40vw] rounded-full bg-hud-aqua/[0.06] blur-[120px]" />
      {/* Soft mint — bottom-left */}
      <div className="absolute -bottom-1/4 -left-1/4 w-[45vw] h-[45vw] rounded-full bg-hud-mint/[0.04] blur-[140px]" />

      {futureMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-hud-magenta/[0.06] blur-[160px]"
        />
      )}

      {/* Very subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.50]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(58,97,117,0.18) 1px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 25%, transparent 75%)',
        }}
      />

      {/* Drifting particles — minimal, soft */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 2.5,
            height: 2.5,
            background: futureMode ? 'rgba(219,39,119,0.45)' : 'rgba(8,145,178,0.40)',
          }}
          animate={{
            y: ['-8%', '8%', '-8%'],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
