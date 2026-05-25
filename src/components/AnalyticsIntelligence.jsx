import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { INTEL_MODULES, AI_ALERTS } from '../data/content'

const sevStyle = {
  medium: {
    color: '#FFB547',
    soft: 'rgba(255,181,71,0.12)',
    border: 'rgba(255,181,71,0.35)',
    label: 'MEDIUM',
  },
  high: {
    color: '#FF6B57',
    soft: 'rgba(255,107,87,0.12)',
    border: 'rgba(255,107,87,0.4)',
    label: 'HIGH',
  },
  governance: {
    color: '#22E1FF',
    soft: 'rgba(34,225,255,0.12)',
    border: 'rgba(34,225,255,0.35)',
    label: 'GOV ROUTE',
  },
}

function Module({ m, i, futureMode }) {
  const Icon = Icons[m.icon] || Icons.Sparkles
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.03 }}
      className="relative glass p-3 group hover:border-hud-cyan/30 transition-colors"
    >
      <div className="flex items-start gap-2.5">
        <div
          className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-500 ${
            futureMode
              ? 'border-hud-magenta/40 bg-hud-magenta/[0.08] text-hud-magenta'
              : 'border-hud-cyan/30 bg-hud-cyan/[0.06] text-hud-cyan'
          }`}
        >
          <Icon size={15} strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <div className="font-display font-semibold text-white text-[13px] leading-tight">
            {m.title}
          </div>
          <div className="text-[11.5px] text-white/55 mt-0.5 leading-snug">{m.desc}</div>
        </div>
      </div>
    </motion.div>
  )
}

function AlertCard({ a, i }) {
  const s = sevStyle[a.severity]
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + i * 0.1 }}
      className="relative glass-strong p-3 overflow-hidden"
      style={{ borderColor: s.border }}
    >
      {/* Left accent stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }}
      />
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2">
          <Icons.AlertTriangle size={13} style={{ color: s.color }} />
          <span
            className="font-mono text-[9.5px] uppercase tracking-[0.2em]"
            style={{ color: s.color }}
          >
            {s.label} · AI ALERT
          </span>
        </div>
        <span className="font-mono text-[9.5px] text-white/30">
          {String(i + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="font-display text-white text-[13px] font-semibold mb-1">{a.title}</div>
      <p className="text-[11.5px] text-white/60 leading-relaxed">{a.body}</p>
      <button
        className="mt-2 text-[10.5px] font-mono uppercase tracking-[0.18em] underline-offset-2 hover:underline"
        style={{ color: s.color }}
      >
        → {a.action}
      </button>
    </motion.div>
  )
}

export default function AnalyticsIntelligence({ futureMode }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Modules — 2/3 */}
      <div className="lg:col-span-2">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="hud-label">Analytics & Intelligence Layer</div>
            <h2 className="font-display font-semibold text-white text-lg mt-0.5">
              Decision Intelligence Modules
            </h2>
          </div>
          <span className="hud-chip border border-hud-violet/30 text-hud-violet bg-hud-violet/[0.08]">
            <Icons.Brain size={11} /> {INTEL_MODULES.length} ACTIVE
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {INTEL_MODULES.map((m, i) => (
            <Module key={m.title} m={m} i={i} futureMode={futureMode} />
          ))}
        </div>
      </div>

      {/* AI Alerts — 1/3 */}
      <div>
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="hud-label">Real-Time AI Signals</div>
            <h2 className="font-display font-semibold text-white text-lg mt-0.5">Predictive Alerts</h2>
          </div>
          <span className="hud-chip border border-hud-mint/30 text-hud-mint bg-hud-mint/[0.06]">
            <Icons.Activity size={11} /> LIVE
          </span>
        </div>
        <div className="space-y-2.5">
          {AI_ALERTS.map((a, i) => (
            <AlertCard key={a.id} a={a} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
