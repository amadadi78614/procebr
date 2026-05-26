import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'
import PerformanceBars from './PerformanceBars'
import ComparisonChart from './ComparisonChart'
import CompositionDonut from './CompositionDonut'
import TrendChart from './TrendChart'
import StatTile from './StatTile'

/*
  PillarDetail — each pillar leads with a different hero chart
  (`pillar.featured`) so Operations, Transformation, Analytics feel distinct.
    - operations    → bars  (all KPIs visible, broad scoreboard)
    - transformation→ donut (RPA / SAP / Manual workforce mix)
    - analytics     → trend (descriptive→cognitive ladder)
  The other two charts sit beneath at 50/50.
*/
export default function PillarDetail({ pillar, mode }) {
  const data = pillar[mode]
  const accent = mode === 'future' ? '#DB2777' : pillar.accent

  const circular = data.gauges.filter((g) => g.kind === 'circular')
  const comparison = data.gauges.filter((g) => g.kind === 'comparison')
  const stats = data.gauges.filter((g) => g.kind === 'stat')

  // Hero chart heights — generous so labels breathe
  const HERO_H = 360
  const SECONDARY_H = 280

  // Build the three chart elements
  const barsEl = circular.length > 0 ? (
    <PerformanceBars metrics={circular} accent={accent} height={HERO_H} />
  ) : null
  const donutEl = data.composition ? (
    <CompositionDonut composition={data.composition} accent={accent} height={HERO_H} />
  ) : null
  const trendEl = data.trend ? (
    <TrendChart
      title={data.trend.title}
      series={data.trend.series}
      accent={accent}
      height={HERO_H}
    />
  ) : null
  const comparisonEl = comparison.length > 0 ? (
    <ComparisonChart comparisons={comparison} accent={accent} height={SECONDARY_H} />
  ) : null

  // Decide hero + secondary layout
  const featured = pillar.featured || 'bars'
  let heroChart, secondaryLeft, secondaryRight
  if (featured === 'bars') {
    heroChart = barsEl
    secondaryLeft = donutEl
    secondaryRight = trendEl
  } else if (featured === 'donut') {
    heroChart = donutEl
    secondaryLeft = barsEl
    secondaryRight = trendEl
  } else {
    // 'trend'
    heroChart = trendEl
    secondaryLeft = barsEl
    secondaryRight = donutEl
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${pillar.id}-${mode}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative w-full"
      >
        {/* Header */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.24em] px-2.5 py-1 rounded-md border"
              style={{
                color: accent,
                borderColor: `${accent}66`,
                background: `${accent}10`,
              }}
            >
              {mode === 'future' ? '◆ FY27+ Future State' : '◉ FY26 Current State'}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] px-2.5 py-1 rounded-md bg-powder-300/60 text-powder-800">
              {pillar.subtitle}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] px-2.5 py-1 rounded-md text-powder-800" style={{ background: 'rgba(143,178,194,0.30)' }}>
              Contributes to {pillar.contributesTo.join(' · ')}
            </span>
          </div>
          <h2 className="font-display font-bold text-powder-950 text-3xl lg:text-4xl leading-[1.05] tracking-tight">
            {pillar.headline}
          </h2>
          <p
            className="font-mono text-[12px] uppercase tracking-[0.18em] mt-2"
            style={{ color: accent }}
          >
            {data.tagline}
          </p>
          <p className="text-[13.5px] text-powder-800 leading-relaxed max-w-3xl mt-2">
            {data.summary}
          </p>
        </div>

        {/* HERO CHART — distinct per pillar */}
        {heroChart && (
          <div className="mb-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-powder-700 font-semibold mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              Hero View · {pillar.title}
            </div>
            {heroChart}
          </div>
        )}

        {/* SECONDARY CHARTS — 50/50 */}
        <div className="grid grid-cols-12 gap-3 mb-4">
          {secondaryLeft && (
            <div className="col-span-12 lg:col-span-6">{secondaryLeft}</div>
          )}
          {secondaryRight && (
            <div className="col-span-12 lg:col-span-6">{secondaryRight}</div>
          )}
        </div>

        {/* COMPARISON CHART — full-width */}
        {comparisonEl && (
          <div className="mb-4">{comparisonEl}</div>
        )}

        {/* Stat row */}
        {stats.length > 0 && (
          <div className="mb-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-powder-800 font-semibold mb-2">
              Key Signals
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {stats.map((s, i) => (
                <StatTile
                  key={s.label}
                  i={i}
                  accent={accent}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  delta={s.delta}
                  icon={s.icon}
                />
              ))}
            </div>
          </div>
        )}

        {/* Initiatives */}
        <div className="mb-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-powder-800 font-semibold mb-2">
            {mode === 'future' ? 'Agentic Capabilities' : 'Key Initiatives Delivered'}
          </div>
          <div
            className="rounded-xl border p-4"
            style={{
              background: 'rgba(255,255,255,0.75)',
              borderColor: 'rgba(143,178,194,0.40)',
              boxShadow:
                '0 2px 6px -1px rgba(15,60,80,0.05), inset 0 1px 0 rgba(255,255,255,0.85)',
            }}
          >
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              {data.initiatives.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  className="flex items-start gap-2.5 text-[13px] text-powder-900 leading-snug"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: accent, boxShadow: `0 0 5px ${accent}77` }}
                  />
                  <span>{it}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative rounded-xl border p-4 flex items-start gap-3"
          style={{
            borderColor: `${accent}66`,
            background: `linear-gradient(90deg, ${accent}14, ${accent}06)`,
          }}
        >
          <Quote size={20} className="shrink-0 mt-0.5" style={{ color: accent }} />
          <div className="font-display text-powder-950 text-[14px] leading-relaxed italic">
            {data.callout}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
