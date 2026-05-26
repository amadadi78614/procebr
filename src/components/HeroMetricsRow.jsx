import { motion } from 'framer-motion'
import { HERO_METRICS } from '../data/content'
import { useCounter } from './useCounter'

function MetricTile({ metric, i }) {
  const isNumeric = typeof metric.value === 'number'
  const animated = useCounter(isNumeric ? metric.value : 0, {
    duration: 1500,
    from: 0,
    decimals: 0,
    startDelay: i * 80 + 200,
  })
  const display = isNumeric ? animated : metric.value

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + i * 0.05 }}
      className="relative rounded-xl border bg-white/85 backdrop-blur-md px-3 py-3 hover:-translate-y-0.5 transition-transform"
      style={{
        borderColor: `${metric.accent}44`,
        boxShadow: `0 4px 12px -3px rgba(15,60,80,0.10), inset 0 1px 0 rgba(255,255,255,0.85), 0 0 0 1px transparent`,
      }}
    >
      {/* Accent dot */}
      <div
        className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
        style={{
          background: metric.accent,
          boxShadow: `0 0 6px ${metric.accent}`,
        }}
      />

      <div className="flex items-baseline gap-0.5">
        <span
          className="font-display font-bold tabular-nums leading-none"
          style={{ fontSize: 30, color: metric.accent }}
        >
          {display}
        </span>
        <span
          className="font-display font-semibold leading-none"
          style={{ fontSize: 16, color: metric.accent, opacity: 0.8 }}
        >
          {metric.suffix}
        </span>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-powder-800 font-semibold mt-1.5">
        {metric.label}
      </div>
    </motion.div>
  )
}

export default function HeroMetricsRow() {
  return (
    <div
      className="rounded-2xl border backdrop-blur-md p-3"
      style={{
        background: 'rgba(255,255,255,0.50)',
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow: '0 4px 14px -4px rgba(15,60,80,0.10), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-powder-700 font-semibold">
          FY26 Headline Metrics · From the Placemat
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-powder-700 hidden sm:block">
          7/14 Goals Complete · L4 Achieved
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {HERO_METRICS.map((m, i) => (
          <MetricTile key={m.key} metric={m} i={i} />
        ))}
      </div>
    </div>
  )
}
