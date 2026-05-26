import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/*
  ComparisonBar — shows a before / after comparison as two horizontal bars.
  Used for delta metrics (Vendor Onboarding 7.8 → 2.9 days, SAP TBI 44% → 85%).
*/
export default function ComparisonBar({
  label,
  before,
  after,
  suffix = '',
  delta,
  accent = '#0891B2',
  reverse = false, // true if "lower is better" (e.g. days, cycle time)
  i = 0,
}) {
  // Determine the bar widths — scale to the larger value
  const max = Math.max(before, after)
  const beforePct = (before / max) * 100
  const afterPct = (after / max) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="relative rounded-xl border bg-white/80 px-4 py-3 hover:-translate-y-0.5 transition-transform"
      style={{
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 2px 6px -1px rgba(15,60,80,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-powder-900 font-semibold">
          {label}
        </div>
        {delta && (
          <span
            className="font-mono text-[9.5px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded"
            style={{ color: accent, background: `${accent}14` }}
          >
            {delta}
          </span>
        )}
      </div>

      {/* Before bar */}
      <div className="mb-2">
        <div className="flex items-baseline justify-between mb-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-powder-700">
            Before
          </span>
          <span className="font-display font-semibold text-powder-700 text-[13px] tabular-nums">
            {before}{suffix}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(143,178,194,0.25)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${beforePct}%` }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              background: 'rgba(90,129,148,0.55)',
            }}
          />
        </div>
      </div>

      {/* After bar */}
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.18em] font-semibold"
            style={{ color: accent }}
          >
            After
          </span>
          <span
            className="font-display font-bold text-[15px] tabular-nums"
            style={{ color: accent }}
          >
            {after}{suffix}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(143,178,194,0.25)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${afterPct}%` }}
            transition={{ duration: 1.1, delay: 0.4 + i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              background: `linear-gradient(90deg, ${accent}cc, ${accent})`,
              boxShadow: `0 0 8px ${accent}88`,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
