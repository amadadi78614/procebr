import { motion } from 'framer-motion'
import { Calendar, Sparkles } from 'lucide-react'

export default function StateToggle({ mode, setMode }) {
  return (
    <div className="relative inline-flex items-center gap-0">
      {/* Outer glow ring */}
      <div
        className="absolute -inset-1 rounded-full opacity-50 pointer-events-none"
        style={{
          background:
            mode === 'future'
              ? 'radial-gradient(ellipse at center, rgba(255,79,163,0.35), transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(34,225,255,0.30), transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      <div
        className="relative flex items-center rounded-full border backdrop-blur-xl p-1"
        style={{
          borderColor:
            mode === 'future' ? 'rgba(255,79,163,0.40)' : 'rgba(34,225,255,0.35)',
          background:
            'linear-gradient(135deg, rgba(15,42,72,0.85), rgba(22,62,107,0.70))',
          boxShadow:
            mode === 'future'
              ? '0 0 32px -4px rgba(255,79,163,0.45)'
              : '0 0 32px -4px rgba(34,225,255,0.35)',
        }}
      >
        {[
          { id: 'current', label: 'Current', sub: 'FY26', Icon: Calendar, color: '#22E1FF' },
          { id: 'future', label: 'Future', sub: 'FY27+', Icon: Sparkles, color: '#FF4FA3' },
        ].map((opt) => {
          const isActive = mode === opt.id
          const Icon = opt.Icon
          return (
            <button
              key={opt.id}
              onClick={() => setMode(opt.id)}
              className="relative px-4 sm:px-5 py-2 rounded-full transition-colors duration-300 z-10"
              style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.45)' }}
            >
              {isActive && (
                <motion.span
                  layoutId="state-toggle-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${opt.color}45, ${opt.color}15)`,
                    border: `1px solid ${opt.color}88`,
                    boxShadow: `0 0 24px -2px ${opt.color}88, inset 0 1px 0 rgba(255,255,255,0.1)`,
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
                      color: isActive ? opt.color : 'rgba(255,255,255,0.3)',
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
