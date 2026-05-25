import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MATURITY_LEVELS } from '../data/content'
import { CheckCircle2, Crosshair, Sparkles } from 'lucide-react'

const accentMap = {
  cyan: { fg: '#22E1FF', soft: 'rgba(34,225,255,0.18)' },
  aqua: { fg: '#5EEAD4', soft: 'rgba(94,234,212,0.18)' },
  mint: { fg: '#10F4A6', soft: 'rgba(16,244,166,0.18)' },
  violet: { fg: '#8B6CFF', soft: 'rgba(139,108,255,0.22)' },
  magenta: { fg: '#FF4FA3', soft: 'rgba(255,79,163,0.22)' },
}

const statusBadge = {
  COMPLETE: { label: '✓ Complete', cls: 'text-hud-mint border-hud-mint/40 bg-hud-mint/[0.08]' },
  CURRENT: { label: '◉ Current', cls: 'text-hud-violet border-hud-violet/40 bg-hud-violet/[0.10]' },
  'FY27+ ROADMAP': {
    label: '◆ FY27+ Roadmap',
    cls: 'text-hud-magenta border-hud-magenta/40 bg-hud-magenta/[0.10]',
  },
}

export default function MaturityPyramid({ futureMode, focusLevel, setFocusLevel }) {
  // Pyramid is rendered top-down (L5 widest? no — pyramid: L5 the apex/future).
  // We render BOTTOM → TOP so L1 base is widest and L5 is the apex.
  // To make the L5 apex visually special, we'll do it as a ladder of trapezoids.
  const levels = [...MATURITY_LEVELS].reverse() // L5 first → drawn at top

  // Auto-rotate focus subtly through completed levels for ambient feel
  useEffect(() => {
    if (focusLevel) return
    const ids = ['L1', 'L2', 'L3']
    let i = 0
    const t = setInterval(() => {
      // ambient hover — only when no manual selection
    }, 3000)
    return () => clearInterval(t)
  }, [focusLevel])

  const selected =
    MATURITY_LEVELS.find((l) => l.id === focusLevel) ||
    MATURITY_LEVELS.find((l) => l.status === 'CURRENT')

  // Trapezoid widths (in % of container) — top is narrow, bottom wide
  const widths = [62, 72, 82, 92, 100] // index matches reverse render: L5→L1
  // We want L5 at the TOP and narrow, L1 BOTTOM and wide
  // Since `levels` is reversed (L5 first), widths[0] = 62 → L5

  return (
    <div className="relative h-full flex flex-col">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="hud-label">Procurement Maturity Pyramid</div>
          <h2 className="font-display font-semibold text-xl text-white mt-0.5">
            The Five Horizons of Procurement Evolution
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="hud-chip border border-hud-mint/30 text-hud-mint/90 bg-hud-mint/[0.06]">
            <CheckCircle2 size={11} /> 3 Achieved
          </span>
          <span className="hud-chip border border-hud-violet/30 text-hud-violet/90 bg-hud-violet/[0.06]">
            <Crosshair size={11} /> Current L4
          </span>
          <span
            className={`hud-chip border border-hud-magenta/30 text-hud-magenta/90 bg-hud-magenta/[0.06] ${
              futureMode ? 'animate-pulse-soft' : ''
            }`}
          >
            <Sparkles size={11} /> L5 Target
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-5 min-h-0">
        {/* Pyramid SVG / stack — 3 of 5 columns */}
        <div className="lg:col-span-3 relative">
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-1.5 py-2">
            {levels.map((lvl, i) => {
              const w = widths[i]
              const accent = accentMap[lvl.accent]
              const isActive = focusLevel === lvl.id || (!focusLevel && lvl.status === 'CURRENT')
              const isFuture = lvl.status === 'FY27+ ROADMAP'
              const ringOn = isActive || (futureMode && isFuture)

              return (
                <motion.button
                  key={lvl.id}
                  onClick={() => setFocusLevel(lvl.id === focusLevel ? null : lvl.id)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.015 }}
                  style={{ width: `${w}%` }}
                  className="relative group focus:outline-none"
                >
                  <div
                    className="relative px-5 py-3.5 rounded-xl border backdrop-blur-md text-left transition-all duration-300"
                    style={{
                      background: ringOn
                        ? `linear-gradient(135deg, ${accent.soft}, rgba(255,255,255,0.02))`
                        : 'linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))',
                      borderColor: ringOn ? accent.fg + '88' : 'rgba(255,255,255,0.08)',
                      boxShadow: ringOn
                        ? `0 0 32px -6px ${accent.fg}66, inset 0 1px 0 rgba(255,255,255,0.05)`
                        : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                  >
                    {/* Glow ring for active */}
                    {ringOn && (
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          boxShadow: `0 0 0 1px ${accent.fg}AA`,
                        }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2.4, repeat: Infinity }}
                      />
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-semibold border"
                          style={{
                            color: accent.fg,
                            borderColor: accent.fg + '66',
                            background: accent.soft,
                          }}
                        >
                          {lvl.id}
                        </div>
                        <div className="min-w-0">
                          <div className="font-display font-semibold text-white text-[15px] leading-tight truncate">
                            {lvl.name}
                          </div>
                          <div className="text-[11px] text-white/45 font-mono uppercase tracking-wider truncate">
                            {lvl.headline}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`shrink-0 hud-chip border ${statusBadge[lvl.status].cls}`}
                      >
                        {statusBadge[lvl.status].label}
                      </div>
                    </div>

                    {/* L5 future-mode special glow */}
                    {isFuture && futureMode && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -inset-px rounded-xl pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, rgba(255,79,163,0.15), transparent)',
                          backgroundSize: '200% 100%',
                          animation: 'sweep 3s linear infinite',
                        }}
                      />
                    )}
                  </div>
                </motion.button>
              )
            })}

            {/* Foundation label */}
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
              ↑ Strategic Value · Foundation ↓
            </div>
          </div>
        </div>

        {/* Selected detail panel — 2 of 5 columns */}
        <div className="lg:col-span-2 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35 }}
              className="relative h-full glass-strong corner-frame p-5 overflow-hidden"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="hud-label" style={{ color: accentMap[selected.accent].fg }}>
                    {selected.id} · {selected.status}
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mt-1">
                    {selected.name}
                  </h3>
                </div>
                <div
                  className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded border"
                  style={{
                    color: accentMap[selected.accent].fg,
                    borderColor: accentMap[selected.accent].fg + '55',
                    background: accentMap[selected.accent].soft,
                  }}
                >
                  {selected.metric.value}
                  {selected.metric.suffix || ''}
                </div>
              </div>

              <p className="text-white/65 text-[13px] mb-3 leading-relaxed">
                {selected.summary}
              </p>
              <div className="hud-divider mb-3" />

              <div className="hud-label mb-2">Capabilities</div>
              <ul className="space-y-1.5 text-[13px]">
                {selected.items.map((it, idx) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-start gap-2 text-white/75"
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{
                        background: accentMap[selected.accent].fg,
                        boxShadow: `0 0 6px ${accentMap[selected.accent].fg}`,
                      }}
                    />
                    <span>{it}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                {selected.metric.label}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
