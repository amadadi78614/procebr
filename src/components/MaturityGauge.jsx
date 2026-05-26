import { motion } from 'framer-motion'
import { MATURITY } from '../data/content'
import { Check, Star, Target } from 'lucide-react'

/*
  MaturityGauge — vertical L1-L5 thermometer.
  Left column: gauge track with level markers
  Right column: per-level title, status tag, and initiatives
*/
export default function MaturityGauge({ mode }) {
  const isFuture = mode === 'future'
  const focusLevel = isFuture ? MATURITY.target : MATURITY.current
  const accent = isFuture ? '#DB2777' : '#0891B2'

  // Levels rendered top-to-bottom: L5 first (top of thermometer), L1 last (bottom)
  const ordered = [...MATURITY.levels].reverse()

  // Fill percentage — L1=0%, L2=25%, L3=50%, L4=75%, L5=100%
  const fillTo = ((focusLevel - 1) / (MATURITY.levels.length - 1)) * 100

  return (
    <div
      className="relative w-full rounded-2xl border backdrop-blur-xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.80)',
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 8px 24px -6px rgba(15,60,80,0.12), 0 2px 4px rgba(15,60,80,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="px-5 py-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="min-w-0">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.22em] mb-1"
              style={{ color: accent }}
            >
              Maturity Rollup · FY26 Initiative Contribution
            </div>
            <h3 className="font-display font-bold text-powder-950 text-lg tracking-tight leading-tight">
              How RPA & BOT Initiatives Compound Into Maturity
            </h3>
          </div>
          <div
            className="shrink-0 rounded-lg px-3 py-2 text-center border"
            style={{
              background: `${accent}10`,
              borderColor: `${accent}55`,
              minWidth: '88px',
            }}
          >
            <div
              className="font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ color: accent, opacity: 0.85 }}
            >
              Current
            </div>
            <div
              className="font-display font-bold text-2xl leading-none tabular-nums"
              style={{ color: accent }}
            >
              L{focusLevel}
            </div>
            <div className="font-mono text-[8.5px] uppercase tracking-[0.14em] mt-0.5 text-powder-800">
              {isFuture ? 'Target' : 'Achieved'}
            </div>
          </div>
        </div>

        {/* Main body — gauge track + level cards */}
        <div className="relative flex gap-4">
          {/* GAUGE TRACK — vertical bar on the left */}
          <div className="relative shrink-0" style={{ width: '64px' }}>
            {/* Track outline */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 rounded-full"
              style={{
                width: '14px',
                background:
                  'linear-gradient(180deg, rgba(143,178,194,0.18), rgba(143,178,194,0.32))',
                border: '1px solid rgba(143,178,194,0.30)',
                boxShadow: 'inset 0 1px 2px rgba(15,60,80,0.10)',
              }}
            />

            {/* Filled portion — animated rise */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: '14px',
                bottom: '12px',
                background: `linear-gradient(180deg, ${accent}, #0891B2 60%, #0E4E5C)`,
                boxShadow: `0 0 12px ${accent}66, inset 0 -2px 4px rgba(0,0,0,0.18)`,
              }}
              initial={{ height: '0%' }}
              animate={{ height: `calc(${fillTo}% - 0px)` }}
              transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
            />

            {/* Forward dashed portion (above current) */}
            {!isFuture && (
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  width: '14px',
                  bottom: `calc(${fillTo}% + 12px)`,
                  top: '12px',
                  background:
                    'repeating-linear-gradient(180deg, rgba(219,39,119,0.45) 0 4px, transparent 4px 8px)',
                }}
              />
            )}

            {/* Level markers - positioned absolutely along the gauge */}
            {ordered.map((level, idx) => {
              const i = MATURITY.levels.findIndex((l) => l.id === level.id)
              const levelNum = i + 1
              const positionFromBottom = (i / (MATURITY.levels.length - 1)) * 100
              const isPast = levelNum < focusLevel
              const isCurrent = levelNum === focusLevel
              const isTarget = levelNum === MATURITY.target && isFuture
              const isFutureTarget = levelNum === MATURITY.target && !isFuture

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{ bottom: `calc(${positionFromBottom}% - 18px)` }}
                >
                  {/* Pulse for current */}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: accent, opacity: 0.4 }}
                      animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <div
                    className="relative w-9 h-9 rounded-full flex items-center justify-center border-2"
                    style={{
                      background: isCurrent
                        ? accent
                        : isPast
                        ? '#FFFFFF'
                        : isFutureTarget
                        ? 'rgba(255,255,255,0.95)'
                        : '#F4F9FB',
                      borderColor: isCurrent
                        ? accent
                        : isPast
                        ? '#0891B2'
                        : isFutureTarget
                        ? '#DB2777'
                        : 'rgba(143,178,194,0.55)',
                      boxShadow: isCurrent
                        ? `0 0 14px -2px ${accent}, inset 0 1px 0 rgba(255,255,255,0.4)`
                        : isPast
                        ? '0 2px 6px -1px rgba(8,145,178,0.30), inset 0 1px 0 rgba(255,255,255,0.85)'
                        : 'inset 0 1px 0 rgba(255,255,255,0.65)',
                    }}
                  >
                    {isPast ? (
                      <Check size={14} strokeWidth={3} color="#0891B2" />
                    ) : isCurrent ? (
                      <Star size={14} strokeWidth={2.2} color="#FFFFFF" fill="#FFFFFF" />
                    ) : isFutureTarget ? (
                      <Target size={13} strokeWidth={2.2} color="#DB2777" />
                    ) : (
                      <span className="font-display font-bold text-[11px] text-powder-700">
                        {level.id}
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* LEVEL CARDS — right side */}
          <div className="flex-1 flex flex-col gap-2">
            {ordered.map((level, idx) => {
              const i = MATURITY.levels.findIndex((l) => l.id === level.id)
              const levelNum = i + 1
              const isPast = levelNum < focusLevel
              const isCurrent = levelNum === focusLevel
              const isFutureTarget = levelNum === MATURITY.target && !isFuture
              const isInactive = levelNum > focusLevel && !isFutureTarget

              const levelAccent = isCurrent ? accent : isFutureTarget ? '#DB2777' : '#0891B2'

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.08 }}
                  className="rounded-lg border px-3.5 py-2.5"
                  style={{
                    background: isCurrent
                      ? `linear-gradient(135deg, ${accent}12, ${accent}04)`
                      : isFutureTarget
                      ? 'linear-gradient(135deg, rgba(219,39,119,0.08), rgba(219,39,119,0.02))'
                      : isPast
                      ? 'rgba(255,255,255,0.7)'
                      : 'rgba(244,249,251,0.6)',
                    borderColor: isCurrent
                      ? `${accent}88`
                      : isFutureTarget
                      ? 'rgba(219,39,119,0.55)'
                      : isPast
                      ? 'rgba(8,145,178,0.30)'
                      : 'rgba(143,178,194,0.35)',
                    opacity: isInactive ? 0.85 : 1,
                  }}
                >
                  {/* Level title row */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="font-mono text-[9.5px] uppercase tracking-[0.18em] px-1.5 py-0.5 rounded font-bold shrink-0"
                        style={{
                          color: levelAccent,
                          background: `${levelAccent}15`,
                        }}
                      >
                        {level.id}
                      </span>
                      <h4 className="font-display font-bold text-powder-950 text-[13px] tracking-tight truncate">
                        {level.title}
                      </h4>
                    </div>
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.16em] font-semibold shrink-0"
                      style={{ color: levelAccent, opacity: 0.85 }}
                    >
                      {level.tag}
                    </span>
                  </div>

                  {/* Initiative pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {level.initiatives.map((init, j) => (
                      <motion.div
                        key={init.name}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + idx * 0.05 + j * 0.03 }}
                        className="inline-flex flex-col px-2 py-1 rounded border"
                        style={{
                          background: 'rgba(255,255,255,0.75)',
                          borderColor: `${levelAccent}33`,
                        }}
                      >
                        <span className="font-display font-semibold text-[10.5px] text-powder-950 leading-tight">
                          {init.name}
                        </span>
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.12em] mt-0.5"
                          style={{ color: levelAccent }}
                        >
                          {init.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
