import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { HERO_METRICS } from '../data/content'
import { useCounter } from './useCounter'

function MetricChip({ metric, mode, i }) {
  const isFuture = mode === 'future'
  const value = isFuture ? metric.futureValue : metric.value
  const accent = isFuture ? '#DB2777' : metric.accent
  const isNumeric = typeof value === 'number'

  const animated = useCounter(isNumeric ? value : 0, {
    duration: 1500,
    from: 0,
    decimals: 0,
    startDelay: i * 80 + 200,
  })
  const display = isNumeric ? animated : value

  return (
    <motion.div
      key={`${metric.key}-${mode}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + i * 0.04 }}
      className="flex items-center gap-2 px-2.5 py-1 rounded-lg border bg-white/85 shrink-0"
      style={{
        borderColor: `${accent}40`,
      }}
    >
      <div className="flex items-baseline gap-0.5">
        <span
          className="font-display font-bold tabular-nums leading-none"
          style={{ fontSize: 19, color: accent }}
        >
          {display}
        </span>
        <span
          className="font-display font-semibold leading-none"
          style={{ fontSize: 11, color: accent, opacity: 0.75 }}
        >
          {metric.suffix}
        </span>
      </div>
      <div>
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-powder-900 font-bold leading-tight">
          {metric.label}
        </div>
        <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-powder-600 leading-tight">
          {isFuture ? 'FY27+ target' : metric.sublabel}
        </div>
      </div>
    </motion.div>
  )
}

export default function FooterMetrics({ mode = 'current' }) {
  const isFuture = mode === 'future'
  return (
    <div
      className="rounded-2xl border bg-white/70 backdrop-blur-md px-3 py-2 flex items-center gap-3 flex-wrap"
      style={{
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 4px 14px -4px rgba(15,60,80,0.08), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="flex items-center gap-1.5 flex-wrap">
        {HERO_METRICS.map((m, i) => (
          <MetricChip key={`${m.key}-${mode}`} metric={m} mode={mode} i={i} />
        ))}
      </div>
      <div className="flex items-center gap-2 ml-auto text-right pr-1">
        <Quote size={14} className="text-powder-500 shrink-0" />
        <div className="text-[11px] text-powder-800 italic leading-tight max-w-[300px]">
          {isFuture ? (
            <>
              FY27+ projections —
              <span className="font-semibold not-italic"> autonomous procurement live, 14/14 goals achieved.</span>
            </>
          ) : (
            <>
              From efficiency to intelligence — from transactions to transformation —
              <span className="font-semibold not-italic"> L4 governance automation achieved.</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
