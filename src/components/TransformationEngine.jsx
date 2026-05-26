import { motion } from 'framer-motion'
import {
  Lightbulb, FilePlus, ArrowRightLeft, Send, CheckCircle2,
  Receipt, CreditCard, Users, Zap, Activity,
} from 'lucide-react'
import { TRANSFORMATION_ENGINE } from '../data/content'
import { useCounter } from './useCounter'

const ICON_MAP = {
  Lightbulb, FilePlus, ArrowRightLeft, Send, CheckCircle2,
  Receipt, CreditCard, Users,
}

const ACCENT_CURRENT = '#0F766E'
const ACCENT_FUTURE = '#DB2777'
const FUTURE_ACCENT_DOT = '#DB2777'

/*
  StageRow — one process stage rendered as:
  [icon] [stage name + channel sub-label]   [bar showing auto %]   [%]
*/
function StageRow({ stage, i, accent }) {
  const Icon = ICON_MAP[stage.iconName] || Lightbulb
  const animated = useCounter(stage.auto, {
    duration: 1100,
    from: 0,
    decimals: 0,
    startDelay: i * 50,
  })

  // Colour fades from grey → accent as auto% increases
  const intensity = stage.auto / 100

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + i * 0.05 }}
      className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/60 transition-colors"
    >
      {/* Icon */}
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center border bg-white shrink-0"
        style={{
          borderColor: `${accent}55`,
          color: accent,
        }}
      >
        <Icon size={13} strokeWidth={2} />
      </div>

      {/* Stage info */}
      <div className="min-w-0" style={{ width: '32%' }}>
        <div className="font-display font-bold text-powder-950 text-[12px] tracking-tight leading-tight truncate">
          {stage.stage}
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.10em] text-powder-600 leading-tight truncate">
          {stage.channel}
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex-1 min-w-0 h-3 rounded-full overflow-hidden relative" style={{ background: 'rgba(143,178,194,0.20)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${stage.auto}%` }}
          transition={{ duration: 1.1, delay: 0.2 + i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-full relative rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent}88, ${accent})`,
            boxShadow: `0 0 6px ${accent}88, inset 0 -1px 0 rgba(0,0,0,0.15)`,
            opacity: 0.5 + intensity * 0.5,
          }}
        />
      </div>

      {/* Percentage */}
      <div
        className="shrink-0 font-display font-bold tabular-nums leading-none text-right"
        style={{
          width: 42,
          fontSize: 14,
          color: accent,
        }}
      >
        {animated}<span style={{ fontSize: 10, opacity: 0.7 }}>%</span>
      </div>
    </motion.div>
  )
}

function SystemStatusTile({ stat, i, accent }) {
  const isNumeric = typeof stat.value === 'number'
  const animated = useCounter(isNumeric ? stat.value : 0, {
    duration: 1400,
    from: 0,
    decimals: stat.decimals || 0,
    startDelay: i * 80,
  })
  const display = isNumeric ? animated : stat.value
  const colors = ['#10B981', '#0891B2', '#6366F1', '#F59E0B']
  const tileAccent = colors[i % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + i * 0.06 }}
      className="rounded-md border bg-white/85 px-2 py-1.5 text-center"
      style={{ borderColor: `${tileAccent}40` }}
    >
      <div className="flex items-baseline justify-center gap-0.5">
        <span
          className="font-display font-bold tabular-nums leading-none"
          style={{ fontSize: 16, color: tileAccent }}
        >
          {display}
        </span>
        {stat.suffix && (
          <span
            className="font-display font-semibold leading-none"
            style={{ fontSize: 10, color: tileAccent, opacity: 0.75 }}
          >
            {stat.suffix}
          </span>
        )}
      </div>
      <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-powder-800 font-semibold mt-0.5 leading-tight">
        {stat.label}
      </div>
      <div className="font-mono text-[8px] uppercase tracking-[0.10em] text-powder-600 leading-tight">
        {stat.sublabel}
      </div>
    </motion.div>
  )
}

export default function TransformationEngine({ mode = 'current' }) {
  const isFuture = mode === 'future'
  const data = isFuture ? TRANSFORMATION_ENGINE.future : TRANSFORMATION_ENGINE.current
  const accent = isFuture ? ACCENT_FUTURE : ACCENT_CURRENT

  // Overall avg coverage (for the headline number)
  const avgAuto = Math.round(
    data.stages.reduce((sum, s) => sum + s.auto, 0) / data.stages.length
  )
  const headlineAnimated = useCounter(avgAuto, { duration: 1500, startDelay: 100 })

  return (
    <div
      className="relative rounded-2xl border bg-white/80 backdrop-blur-md overflow-hidden h-full flex flex-col"
      style={{
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 8px 24px -6px rgba(15,60,80,0.10), 0 2px 4px rgba(15,60,80,0.04), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="px-4 pt-3 pb-2 flex items-center justify-between shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style={{ background: `${accent}15`, color: accent }}
          >
            <Zap size={14} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.20em] text-powder-700 font-semibold">
              Transformation Engine
            </div>
            <h3 className="font-display font-bold text-powder-950 text-sm tracking-tight leading-tight">
              {data.title}
            </h3>
          </div>
        </div>
        {/* Headline avg */}
        <div className="shrink-0 text-right">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-powder-700 font-semibold">
            Avg auto
          </div>
          <div className="flex items-baseline gap-0.5 justify-end">
            <span
              className="font-display font-bold tabular-nums leading-none"
              style={{ fontSize: 22, color: accent }}
            >
              {headlineAnimated}
            </span>
            <span
              className="font-display font-semibold"
              style={{ fontSize: 12, color: accent, opacity: 0.75 }}
            >
              %
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-2 pb-2 flex flex-col gap-2 overflow-y-auto min-h-0">
        {/* Stage progress chart */}
        <div
          className="rounded-lg border px-2 py-1.5"
          style={{
            background: isFuture
              ? 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(250,232,255,0.4))'
              : 'linear-gradient(135deg, rgba(236,254,255,0.5), rgba(240,253,250,0.4))',
            borderColor: `${accent}30`,
          }}
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-powder-700 font-semibold mb-1 flex items-center justify-between">
            <span>{data.subtitle}</span>
            <span className="flex items-center gap-1">
              <Activity size={9} strokeWidth={2.2} className="text-powder-600" />
              {data.stages.length} stages
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            {data.stages.map((stage, i) => (
              <StageRow key={stage.stage} stage={stage} i={i} accent={accent} />
            ))}
          </div>
        </div>

        {/* System Status */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-powder-700 font-semibold mb-1 flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: isFuture ? FUTURE_ACCENT_DOT : '#10B981' }}
            />
            System Status · Live
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {data.systemStatus.map((stat, i) => (
              <SystemStatusTile key={stat.label} stat={stat} i={i} accent={accent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
