import { motion } from 'framer-motion'
import {
  Users, Zap, TrendingUp, Brain, Bot, FileCheck,
  Network, Sparkles, ScanLine, BarChart3, MessageSquare,
} from 'lucide-react'
import { useCounter } from './useCounter'

const ICON_MAP = {
  Users, Zap, TrendingUp, Brain, Bot, FileCheck,
  Network, Sparkles, ScanLine, BarChart3, MessageSquare,
}

/*
  StatTile — large hero number with icon and label.
  Used for non-percentage stats: 5 FTE, 8 Live Bots, 47 Agent Skills, etc.
*/
export default function StatTile({
  value,
  suffix = '',
  label,
  delta,
  accent = '#0891B2',
  icon = 'TrendingUp',
  i = 0,
  variant = 'default', // 'default' | 'hero' (larger)
}) {
  const Icon = ICON_MAP[icon] || TrendingUp
  const isHero = variant === 'hero'

  // Animate numeric values only
  const isNumeric = typeof value === 'number'
  const animated = useCounter(isNumeric ? value : 0, {
    duration: 1300,
    from: 0,
    decimals: isNumeric && !Number.isInteger(value) ? 1 : 0,
    startDelay: i * 60,
  })
  const display = isNumeric ? animated : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className={`relative rounded-xl border bg-white/85 overflow-hidden hover:-translate-y-0.5 transition-transform ${
        isHero ? 'px-5 py-4' : 'px-4 py-3.5'
      }`}
      style={{
        borderColor: `${accent}40`,
        boxShadow: `0 2px 6px -1px rgba(15,60,80,0.06), inset 0 1px 0 rgba(255,255,255,0.85), 0 0 0 0 ${accent}00`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />

      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-powder-700 font-semibold mb-1">
            {label}
          </div>
          <div className="flex items-baseline gap-0.5">
            <span
              className="font-display font-bold tabular-nums leading-none"
              style={{
                fontSize: isHero ? 36 : 28,
                color: accent,
              }}
            >
              {display}
            </span>
            <span
              className="font-display font-semibold"
              style={{
                fontSize: isHero ? 15 : 13,
                color: accent,
                opacity: 0.75,
              }}
            >
              {suffix}
            </span>
          </div>
          {delta && (
            <div
              className="font-mono text-[9.5px] uppercase tracking-[0.14em] mt-1"
              style={{ color: accent }}
            >
              {delta}
            </div>
          )}
        </div>
        <div
          className={`shrink-0 rounded-lg flex items-center justify-center border ${
            isHero ? 'w-10 h-10' : 'w-9 h-9'
          }`}
          style={{
            borderColor: `${accent}55`,
            background: `${accent}14`,
            color: accent,
          }}
        >
          <Icon size={isHero ? 19 : 17} strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  )
}
