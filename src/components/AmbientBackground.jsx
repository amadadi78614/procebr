import { motion } from 'framer-motion'

/*
  AmbientBackground — clean, dashboard-grade.
  No floating particles, no dot grids. Just a soft radial gradient that shifts
  subtly based on Current vs Future mode.
*/
export default function AmbientBackground({ futureMode }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Powder-blue radial base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, #F2FAFD 0%, #E8F2F6 35%, #DCEAF1 70%, #C8DBE5 100%)',
        }}
      />

      {/* Top wash — cyan */}
      <div
        className="absolute -top-1/4 left-1/4 w-[55vw] h-[55vw] rounded-full blur-[120px]"
        style={{ background: 'rgba(8,145,178,0.10)' }}
      />
      {/* Right wash — teal */}
      <div
        className="absolute top-1/4 -right-1/4 w-[45vw] h-[45vw] rounded-full blur-[120px]"
        style={{ background: 'rgba(20,184,166,0.07)' }}
      />
      {/* Bottom-left wash — indigo */}
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full blur-[120px]"
        style={{ background: 'rgba(99,102,241,0.05)' }}
      />

      {/* Magenta accent washes in for Future mode */}
      <motion.div
        animate={{ opacity: futureMode ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full blur-[140px]"
        style={{ background: 'rgba(219,39,119,0.08)' }}
      />
    </div>
  )
}
