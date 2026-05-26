import { motion } from 'framer-motion'
import { useCounter } from './useCounter'

/*
  CircularGauge — animated SVG ring filling clockwise from 0 to value.
  Used for percentage KPIs (PR Create 88%, NPS 91%, etc.).
*/
export default function CircularGauge({
  value,
  max = 100,
  from = 0,
  label,
  suffix = '%',
  delta,
  accent = '#0891B2',
  decimals,
  size = 120,
  thickness = 8,
  i = 0,
}) {
  const r = (size - thickness) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value / max))
  const dashOffset = circ * (1 - pct)

  const dec = decimals != null ? decimals : Number.isInteger(value) ? 0 : 1
  const animated = useCounter(value, {
    duration: 1400,
    from,
    decimals: dec,
    startDelay: i * 60,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="relative rounded-xl border bg-white/80 overflow-hidden hover:-translate-y-0.5 transition-transform"
      style={{
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 2px 6px -1px rgba(15,60,80,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="flex flex-col items-center pt-3 pb-3 px-2">
        {/* Gauge */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <defs>
              <linearGradient id={`grad-${label}-${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={accent} stopOpacity="0.85" />
                <stop offset="1" stopColor={accent} stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="rgba(143,178,194,0.25)"
              strokeWidth={thickness}
            />
            {/* Value arc */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={`url(#grad-${label}-${i})`}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.4, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                filter: `drop-shadow(0 0 6px ${accent}77)`,
              }}
            />
          </svg>
          {/* Number in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-baseline gap-0.5">
              <span
                className="font-display font-bold tabular-nums leading-none"
                style={{ fontSize: size * 0.26, color: accent }}
              >
                {animated}
              </span>
              <span
                className="font-display font-semibold"
                style={{ fontSize: size * 0.12, color: accent, opacity: 0.7 }}
              >
                {suffix}
              </span>
            </div>
            {from !== 0 && from !== value && (
              <div className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-powder-700 mt-0.5">
                from {from}
                {suffix.replace(/[+]/g, '')}
              </div>
            )}
          </div>
        </div>

        {/* Label */}
        <div className="mt-2 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-powder-900 font-semibold leading-tight">
            {label}
          </div>
          {delta && (
            <div
              className="font-mono text-[9.5px] uppercase tracking-[0.12em] mt-0.5"
              style={{ color: accent }}
            >
              {delta}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
