import { motion } from 'framer-motion'
import { Check, Activity, TrendingUp } from 'lucide-react'
import { OPERATIONS_PULSE } from '../data/content'
import { useCounter } from './useCounter'
import Sparkline from './Sparkline'

const CARD_ACCENTS_CURRENT = [
  '#0891B2', '#0D9488', '#10B981', '#14B8A6',
  '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
  '#8B5CF6', '#7C3AED', '#0891B2', '#0D9488',
]
const FUTURE_ACCENT = '#DB2777'

function MetricCard({ metric, i, mode }) {
  const isFuture = mode === 'future'
  const accent = isFuture ? FUTURE_ACCENT : CARD_ACCENTS_CURRENT[i % CARD_ACCENTS_CURRENT.length]

  // Pick value/spark/delta/decimals based on mode
  const value     = isFuture ? metric.futureValue : metric.value
  const spark     = isFuture ? metric.futureSpark : metric.spark
  const deltaText = isFuture ? metric.futureDelta : metric.delta
  const decimals  = isFuture
    ? (metric.futureDecimals ?? (Number.isInteger(value) ? 0 : 1))
    : (metric.decimals ?? (Number.isInteger(value) ? 0 : 1))

  const isNumeric = typeof value === 'number'
  const animated = useCounter(isNumeric ? value : 0, {
    duration: 1300,
    from: 0,
    decimals,
    startDelay: i * 60,
  })
  const display = isNumeric ? animated : value

  return (
    <motion.div
      key={`${metric.label}-${mode}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04 }}
      className="relative rounded-lg border bg-white/85 px-3 py-2 overflow-hidden hover:-translate-y-0.5 transition-transform"
      style={{
        borderColor: isFuture ? `${FUTURE_ACCENT}40` : 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 1px 3px rgba(15,60,80,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-powder-800 font-semibold truncate">
          {metric.label}
        </div>
        {isFuture ? (
          <div
            className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: `${accent}22` }}
          >
            <TrendingUp size={9} strokeWidth={3} color={accent} />
          </div>
        ) : metric.complete ? (
          <div
            className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: `${accent}22` }}
          >
            <Check size={9} strokeWidth={3} color={accent} />
          </div>
        ) : (
          <div
            className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: '#FB923C22' }}
          >
            <Activity size={9} strokeWidth={2.5} color="#FB923C" />
          </div>
        )}
      </div>

      {/* Number row */}
      <div className="flex items-baseline justify-between gap-1.5">
        <div className="flex items-baseline gap-0.5 min-w-0">
          <span
            className="font-display font-bold tabular-nums leading-none"
            style={{ fontSize: 24, color: accent }}
          >
            {display}
          </span>
          <span
            className="font-display font-semibold leading-none"
            style={{ fontSize: 13, color: accent, opacity: 0.75 }}
          >
            {metric.suffix}
          </span>
        </div>
        <Sparkline data={spark} color={accent} width={60} height={22} strokeWidth={1.7} />
      </div>

      {/* Delta footer */}
      <div className="mt-1 flex items-center justify-between text-[9.5px] font-mono uppercase tracking-[0.10em]">
        {isFuture ? (
          <span className="text-powder-600">
            from {metric.value}{typeof metric.value === 'number' ? metric.suffix.replace(/[+]/g, '') : ''}
          </span>
        ) : metric.from !== 0 && metric.from !== undefined ? (
          <span className="text-powder-600">
            from {metric.from}{metric.suffix.replace(/[+]/g, '')}
          </span>
        ) : (
          <span className="text-powder-600">FY26</span>
        )}
        <span style={{ color: accent }} className="font-bold">{deltaText}</span>
      </div>
    </motion.div>
  )
}

export default function OperationsPulse({ mode = 'current' }) {
  const isFuture = mode === 'future'
  return (
    <div
      className="relative rounded-2xl border bg-white/80 backdrop-blur-md overflow-hidden h-full flex flex-col"
      style={{
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 8px 24px -6px rgba(15,60,80,0.10), 0 2px 4px rgba(15,60,80,0.04), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="px-4 pt-3 pb-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style={{
              background: isFuture ? `${FUTURE_ACCENT}15` : '#0891B215',
              color: isFuture ? FUTURE_ACCENT : '#0891B2',
            }}
          >
            <Activity size={14} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.20em] text-powder-700 font-semibold">
              Operations Pulse
            </div>
            <h3 className="font-display font-bold text-powder-950 text-sm tracking-tight leading-tight">
              {isFuture ? 'FY27+ Projected KPIs' : 'FY26 Performance KPIs'}
            </h3>
          </div>
        </div>
        {isFuture && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-md font-bold"
            style={{
              background: `${FUTURE_ACCENT}15`,
              color: FUTURE_ACCENT,
            }}
          >
            ◆ Projected
          </motion.span>
        )}
      </div>

      <div className="flex-1 px-3 pb-3 grid grid-cols-2 gap-1.5 content-start overflow-y-auto">
        {OPERATIONS_PULSE.map((m, i) => (
          <MetricCard key={`${m.label}-${mode}`} metric={m} i={i} mode={mode} />
        ))}
      </div>
    </div>
  )
}
