import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FUTURE_PILLARS } from '../data/content'
import {
  Sparkles,
  Radar,
  Network,
  FileSearch,
  Zap,
  MessagesSquare,
  GitFork,
  Radio,
  Users,
  ChevronRight,
} from 'lucide-react'

const ICONS = {
  demand: Radar,
  sourcing: Sparkles,
  ecosystem: Network,
  contracts: FileSearch,
  touchless: Zap,
  negotiation: MessagesSquare,
  twin: GitFork,
  tower: Radio,
  workforce: Users,
}

export default function FutureVision({ futureMode }) {
  const [active, setActive] = useState('twin')
  const current = FUTURE_PILLARS.find((p) => p.id === active)

  return (
    <section className="relative">
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="hud-label" style={{ color: futureMode ? '#FF4FA3' : undefined }}>
            Future Procurement Vision · L5
          </div>
          <h2 className="font-display font-semibold text-white text-xl mt-0.5">
            The Autonomous Procurement Ecosystem
          </h2>
        </div>
        <span
          className={`hud-chip border transition-colors ${
            futureMode
              ? 'border-hud-magenta/50 text-hud-magenta bg-hud-magenta/[0.10]'
              : 'border-hud-violet/30 text-hud-violet bg-hud-violet/[0.08]'
          }`}
        >
          <Sparkles size={11} /> FY27+ TARGET STATE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Pillar rail */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-2.5">
            {FUTURE_PILLARS.map((p, i) => {
              const Icon = ICONS[p.id] || Sparkles
              const isActive = active === p.id
              return (
                <motion.button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="relative text-left group"
                >
                  <div
                    className="relative p-3 rounded-xl border backdrop-blur-md transition-all duration-300 h-full"
                    style={{
                      borderColor: isActive
                        ? futureMode
                          ? 'rgba(255,79,163,0.55)'
                          : 'rgba(139,108,255,0.55)'
                        : 'rgba(255,255,255,0.07)',
                      background: isActive
                        ? futureMode
                          ? 'linear-gradient(135deg, rgba(255,79,163,0.10), rgba(34,225,255,0.06))'
                          : 'linear-gradient(135deg, rgba(139,108,255,0.10), rgba(34,225,255,0.05))'
                        : 'rgba(255,255,255,0.02)',
                      boxShadow: isActive
                        ? futureMode
                          ? '0 0 28px -6px rgba(255,79,163,0.45)'
                          : '0 0 24px -6px rgba(139,108,255,0.45)'
                        : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center border"
                        style={{
                          color: isActive ? (futureMode ? '#FF4FA3' : '#8B6CFF') : '#22E1FF',
                          borderColor: isActive
                            ? futureMode
                              ? 'rgba(255,79,163,0.45)'
                              : 'rgba(139,108,255,0.45)'
                            : 'rgba(34,225,255,0.28)',
                          background: isActive
                            ? futureMode
                              ? 'rgba(255,79,163,0.10)'
                              : 'rgba(139,108,255,0.10)'
                            : 'rgba(34,225,255,0.05)',
                        }}
                      >
                        <Icon size={14} strokeWidth={1.9} />
                      </div>
                      <div className="font-display text-white text-[12.5px] font-semibold leading-tight">
                        {p.title}
                      </div>
                    </div>
                    <div className="text-[11px] text-white/55 leading-snug">{p.tagline}</div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Active detail */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              className="relative glass-strong corner-frame p-5 h-full overflow-hidden"
            >
              <div className="scan-line absolute inset-0" />
              <div className="relative">
                <div
                  className="hud-label"
                  style={{ color: futureMode ? '#FF4FA3' : '#8B6CFF' }}
                >
                  Pillar · {String(FUTURE_PILLARS.findIndex((p) => p.id === current.id) + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-white text-xl font-semibold mt-1">
                  {current.title}
                </h3>
                <p className="text-white/65 text-[13px] mt-1.5 leading-relaxed">
                  {current.tagline}
                </p>

                <div
                  className="mt-4 rounded-lg border p-3"
                  style={{
                    borderColor: futureMode
                      ? 'rgba(255,79,163,0.30)'
                      : 'rgba(34,225,255,0.25)',
                    background: futureMode
                      ? 'rgba(255,79,163,0.06)'
                      : 'rgba(34,225,255,0.04)',
                  }}
                >
                  <div className="hud-label mb-1">Simulation</div>
                  <div
                    className="font-mono text-[12px] leading-relaxed"
                    style={{ color: futureMode ? '#FFB7D5' : '#A8F0FF' }}
                  >
                    ▸ {current.sample}
                  </div>
                </div>

                <div className="hud-divider my-4" />

                <div className="hud-label mb-2">Core Capabilities</div>
                <ul className="space-y-1.5">
                  {current.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-[12.5px] text-white/75"
                    >
                      <ChevronRight
                        size={13}
                        className="mt-0.5 shrink-0"
                        style={{ color: futureMode ? '#FF4FA3' : '#22E1FF' }}
                      />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
