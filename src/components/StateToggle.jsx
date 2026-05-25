import { motion } from 'framer-motion'
import { Calendar, Sparkles } from 'lucide-react'

export default function StateToggle({ mode, setMode }) {
  const isFuture = mode === 'future'
  const activeColor = isFuture ? '#DB2777' : '#0891B2'

  return (
    <div className="relative inline-flex items-center gap-0">
      {/* Outer glow ring */}
      <div
        className="absolute -inset-1 rounded-full opacity-50 pointer-events-none"
        style={{
          background: isFuture
            ? 'radial-gradient(ellipse at center, rgba(219,39,119,0.30), transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(8,145,178,0.30), transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      <div
        className="relative flex items-center rounded-full border backdrop-blur-xl p-1"
        style={{
          borderColor: `${activeColor}55`,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.88), rgba(242,250,253,0.82))',
          boxShadow: `0 8px 24px -6px ${activeColor}33, 0 2px 6px rgba(15,60,80,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`,
        }}
      >
        {[
          { id: 'current', label: 'Current', sub: 'FY26', Icon: Calendar, color: '#0891B2' },
          { id: 'future', label: 'Future', sub: 'FY27+', Icon: Sparkles, color: '#DB2777' },
        ].map((opt) => {
          const isActive = mode === opt.id
          const Icon = opt.Icon
          return (
            <button
              key={opt.id}
              onClick={() => setMode(opt.id)}
              className="relative px-4 sm:px-5 py-2 rounded-full transition-colors duration-300 z-10"
              style={{ color: isActive ? opt.color : '#5A8194' }}
            >
              {isActive && (
                <motion.span
                  layoutId="state-toggle-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${opt.color}25, ${opt.color}10)`,
                    border: `1px solid ${opt.color}99`,
                    boxShadow: `0 0 16px -2px ${opt.color}66, inset 0 1px 0 rgba(255,255,255,0.8)`,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Icon size={13} style={{ color: isActive ? opt.color : undefined }} />
                <span className="flex flex-col items-start leading-none">
                  <span className="font-display font-semibold text-[13px] tracking-tight">
                    {opt.label}
                  </span>
                  <span
                    className="font-mono text-[8.5px] uppercase tracking-[0.22em] mt-0.5"
                    style={{
                      color: isActive ? opt.color : '#8FB2C2',
                    }}
                  >
                    {opt.sub}
                  </span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
