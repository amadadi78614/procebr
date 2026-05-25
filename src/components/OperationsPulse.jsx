import { motion } from 'framer-motion'
import { OPS_KPIS } from '../data/content'
import { useCounter } from './useCounter'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const toneStyles = {
  cyan: { fg: '#22E1FF', soft: 'rgba(34,225,255,0.16)' },
  aqua: { fg: '#5EEAD4', soft: 'rgba(94,234,212,0.16)' },
  mint: { fg: '#10F4A6', soft: 'rgba(16,244,166,0.16)' },
  violet: { fg: '#8B6CFF', soft: 'rgba(139,108,255,0.18)' },
  amber: { fg: '#FFB547', soft: 'rgba(255,181,71,0.18)' },
  magenta: { fg: '#FF4FA3', soft: 'rgba(255,79,163,0.18)' },
}

function KpiCard({ k, i }) {
  const t = toneStyles[k.tone]
  const decimals = Number.isInteger(k.to) ? 0 : 1
  const value = useCounter(k.to, { duration: 1500, from: k.from, decimals, startDelay: i * 60 })
  const isReverse = k.reverse

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04, duration: 0.5 }}
      className="relative glass p-3.5 overflow-hidden group hover:border-white/[0.12] transition-colors"
    >
      {/* Tiny accent line */}
      <div
        className="absolute left-0 top-0 h-full w-[3px]"
        style={{
          background: `linear-gradient(180deg, ${t.fg}, transparent)`,
          boxShadow: `0 0 12px ${t.fg}`,
        }}
      />
      {/* Live pulse dot */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse-soft"
          style={{ background: t.fg, boxShadow: `0 0 8px ${t.fg}` }}
        />
      </div>

      <div className="hud-label mb-2 truncate pr-6">{k.label}</div>

      <div className="flex items-baseline gap-1.5">
        <span
          className="display-num font-bold text-2xl lg:text-[26px] leading-none"
          style={{ color: t.fg, textShadow: `0 0 18px ${t.fg}55` }}
        >
          {value}
        </span>
        <span className="font-display text-white/55 text-sm">{k.suffix}</span>
      </div>

      <div className="flex items-center justify-between mt-2">
        {/* Delta */}
        <div
          className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider"
          style={{ color: t.fg }}
        >
          {isReverse ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />}
          {k.delta}
        </div>
        {/* From baseline */}
        {k.from !== 0 && (
          <div className="text-[10px] font-mono text-white/30">
            from {k.from}
            {k.suffix.trim()}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function OperationsPulse({ compact }) {
  return (
    <div className="relative h-full flex flex-col min-h-0">
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="hud-label">Operations Pulse</div>
          <h2 className="font-display font-semibold text-white text-lg mt-0.5">
            FY26 Operational Performance
          </h2>
        </div>
        <div className="hud-chip border border-hud-mint/30 text-hud-mint bg-hud-mint/[0.06]">
          ● ALL SYSTEMS GREEN
        </div>
      </div>

      <div
        className={`grid gap-2.5 flex-1 min-h-0 overflow-auto pr-1 ${
          compact ? 'grid-cols-2' : 'grid-cols-2'
        }`}
      >
        {OPS_KPIS.map((k, i) => (
          <KpiCard k={k} i={i} key={k.label} />
        ))}
      </div>
    </div>
  )
}
