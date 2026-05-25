import { motion } from 'framer-motion'
import { MATURITY } from '../data/content'
import { Check, Target } from 'lucide-react'

export default function MaturityLadder({ mode }) {
  const isFuture = mode === 'future'
  const focusLevel = isFuture ? MATURITY.target : MATURITY.current
  const accent = isFuture ? '#DB2777' : '#0891B2'

  return (
    <div
      className="relative w-full rounded-2xl border backdrop-blur-xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.78)',
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 4px 14px -2px rgba(15,60,80,0.08), 0 1px 3px rgba(15,60,80,0.05), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="px-6 py-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div
              className="font-mono text-[10px] uppercase tracking-[0.22em] mb-1"
              style={{ color: accent }}
            >
              Maturity Trajectory
            </div>
            <h3 className="font-display font-bold text-powder-950 text-base tracking-tight">
              Procurement Maturity · L1 → L5
            </h3>
          </div>
          <div className="text-right hidden sm:block">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-powder-700">
              {isFuture ? 'Walking to Target' : 'Where We Are Now'}
            </div>
            <div
              className="font-display font-bold text-sm tracking-tight"
              style={{ color: accent }}
            >
              L{focusLevel} · {MATURITY.levels[focusLevel - 1].label}
            </div>
          </div>
        </div>

        {/* Ladder steps */}
        <div className="relative">
          {/* Background rail */}
          <div className="absolute top-[18px] left-[5%] right-[5%] h-[3px] bg-powder-400/40 rounded-full" />

          {/* Progress rail — solid up to current, dashed beyond */}
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((focusLevel - 1) / (MATURITY.levels.length - 1)) * 90}%`,
            }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute top-[18px] left-[5%] h-[3px] rounded-full"
            style={{
              background: `linear-gradient(90deg, #0891B2, ${accent})`,
              boxShadow: `0 0 8px ${accent}55`,
            }}
          />

          {/* Dashed forward portion */}
          {!isFuture && (
            <div
              className="absolute top-[18px] h-[3px]"
              style={{
                left: `${5 + ((MATURITY.current - 1) / (MATURITY.levels.length - 1)) * 90}%`,
                right: '5%',
                background:
                  'repeating-linear-gradient(90deg, rgba(219,39,119,0.5) 0 6px, transparent 6px 12px)',
              }}
            />
          )}

          {/* Nodes */}
          <div className="relative grid grid-cols-5 gap-2 px-[3%]">
            {MATURITY.levels.map((level, i) => {
              const levelNum = i + 1
              const isPast = levelNum < focusLevel
              const isCurrent = levelNum === focusLevel
              const isFuture_node = levelNum > focusLevel
              const isTarget = levelNum === MATURITY.target

              const dotColor = isPast
                ? '#0891B2'
                : isCurrent
                ? accent
                : 'rgba(143,178,194,0.5)'

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Node dot */}
                  <div className="relative">
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: accent,
                          opacity: 0.3,
                        }}
                        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <div
                      className="relative w-[38px] h-[38px] rounded-full flex items-center justify-center border-2"
                      style={{
                        background: isCurrent ? accent : isPast ? '#FFFFFF' : '#F4F9FB',
                        borderColor: dotColor,
                        boxShadow: isCurrent
                          ? `0 0 16px -2px ${accent}88, inset 0 1px 0 rgba(255,255,255,0.4)`
                          : isPast
                          ? '0 2px 6px -1px rgba(8,145,178,0.25), inset 0 1px 0 rgba(255,255,255,0.9)'
                          : 'inset 0 1px 0 rgba(255,255,255,0.6)',
                      }}
                    >
                      {isPast ? (
                        <Check size={14} strokeWidth={3} color="#0891B2" />
                      ) : isCurrent ? (
                        <span className="font-display font-bold text-white text-[12px]">
                          {level.id}
                        </span>
                      ) : isTarget ? (
                        <Target size={14} strokeWidth={2.2} color="#DB2777" />
                      ) : (
                        <span className="font-display font-semibold text-powder-600 text-[11px]">
                          {level.id}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Label */}
                  <div className="mt-2 px-1">
                    <div
                      className={`font-display font-bold text-[12px] leading-tight tracking-tight ${
                        isCurrent
                          ? ''
                          : isPast
                          ? 'text-powder-900'
                          : isTarget
                          ? ''
                          : 'text-powder-600'
                      }`}
                      style={
                        isCurrent
                          ? { color: accent }
                          : isTarget
                          ? { color: '#DB2777' }
                          : undefined
                      }
                    >
                      {level.label}
                    </div>
                    {level.tag && (
                      <div
                        className="font-mono text-[8.5px] uppercase tracking-[0.18em] mt-0.5"
                        style={{
                          color: isCurrent ? accent : isTarget ? '#DB2777' : '#5A8194',
                        }}
                      >
                        {level.tag}
                      </div>
                    )}
                    <div className="hidden md:block text-[10.5px] text-powder-700 leading-snug mt-1 max-w-[150px] mx-auto">
                      {level.desc}
                    </div>
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
