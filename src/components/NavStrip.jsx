import { motion } from 'framer-motion'
import { NAV_SECTIONS } from '../data/content'

export default function NavStrip({ active, setActive }) {
  return (
    <div className="relative z-20 px-6 lg:px-10 mt-2">
      <div className="glass-strong px-3 py-2 flex items-center gap-1 overflow-x-auto">
        <div className="hud-label px-3 hidden sm:block">View</div>
        <div className="h-5 w-px bg-white/10 mx-1 hidden sm:block" />
        {NAV_SECTIONS.map((s) => {
          const isActive = active === s.id
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="relative px-4 lg:px-5 py-2 rounded-xl text-[12px] uppercase tracking-[0.2em] font-mono transition-colors"
              style={{
                color: isActive ? '#E6FCFF' : 'rgba(230,241,255,0.5)',
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-hud-cyan/20 via-white/[0.04] to-hud-violet/20 border border-hud-cyan/30 shadow-[0_0_24px_-6px_rgba(34,225,255,0.55)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{s.label}</span>
            </button>
          )
        })}
        <div className="ml-auto hidden md:flex items-center gap-2 pr-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-hud-mint animate-pulse-soft shadow-[0_0_10px_rgba(16,244,166,0.9)]" />
          <span className="hud-label text-hud-mint/80">LIVE · 26.05.26</span>
        </div>
      </div>
    </div>
  )
}
