import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, ChevronRight, X, Quote } from 'lucide-react'
import { useCounter } from './useCounter'

const ACCENT_COLORS = {
  cyan: '#22E1FF',
  aqua: '#5EEAD4',
  violet: '#8B6CFF',
  mint: '#10F4A6',
  magenta: '#FF4FA3',
}

function KpiCell({ k, i, accent }) {
  const decimals = k.decimals != null ? k.decimals : Number.isInteger(k.to) ? 0 : 1
  const value = useCounter(k.to, {
    duration: 1300,
    from: k.from,
    decimals,
    startDelay: i * 50,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04 }}
      className="relative rounded-xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-sm px-3 py-2.5 overflow-hidden group hover:border-white/20 transition-colors"
    >
      {/* Left accent line */}
      <div
        className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
      />
      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/45 mb-1.5 truncate">
        {k.label}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className="font-display font-bold text-[22px] leading-none tabular-nums"
          style={{ color: accent, textShadow: `0 0 14px ${accent}55` }}
        >
          {value}
        </span>
        <span className="font-display text-white/55 text-xs">{k.suffix}</span>
      </div>
      <div
        className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider"
        style={{ color: `${accent}cc` }}
      >
        {k.reverse ? <ArrowDownRight size={10} /> : <ArrowUpRight size={10} />}
        {k.delta}
      </div>
    </motion.div>
  )
}

export default function PillarDetail({ pillar, mode, onClose }) {
  const data = pillar[mode] // pillar.current or pillar.future
  const accent = ACCENT_COLORS[pillar.accent]
  // In future mode, infuse magenta accent for the future-state vibe
  const mainAccent = mode === 'future' ? '#FF4FA3' : accent

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${pillar.id}-${mode}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative w-full"
      >
        {/* Glass container */}
        <div
          className="relative rounded-2xl border backdrop-blur-2xl overflow-hidden"
          style={{
            borderColor: `${mainAccent}40`,
            background:
              'linear-gradient(135deg, rgba(15,42,72,0.82), rgba(22,62,107,0.72))',
            boxShadow: `0 30px 60px -20px rgba(5,18,40,0.55), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 40px -10px ${mainAccent}40`,
          }}
        >
          {/* Top scanline accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${mainAccent}, transparent)`,
              boxShadow: `0 0 12px ${mainAccent}`,
            }}
          />

          {/* Corner brackets */}
          <span
            className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l"
            style={{ borderColor: mainAccent }}
          />
          <span
            className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r"
            style={{ borderColor: mainAccent }}
          />
          <span
            className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l"
            style={{ borderColor: mainAccent }}
          />
          <span
            className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r"
            style={{ borderColor: mainAccent }}
          />

          <div className="relative p-5 lg:p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.24em] px-2 py-0.5 rounded border"
                    style={{
                      color: mainAccent,
                      borderColor: `${mainAccent}55`,
                      background: `${mainAccent}10`,
                    }}
                  >
                    {pillar.title}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.24em] px-2 py-0.5 rounded"
                    style={{
                      color: mode === 'future' ? '#FFB7D5' : '#A8F0FF',
                      background: `${mainAccent}1a`,
                    }}
                  >
                    {mode === 'future' ? '◆ FY27+ Future State' : '◉ FY26 Current State'}
                  </span>
                </div>
                <h2 className="font-display font-bold text-white text-xl lg:text-2xl leading-tight tracking-tight mt-1">
                  {data.headline}
                </h2>
                <p
                  className="font-mono text-[11.5px] uppercase tracking-[0.18em] mt-1"
                  style={{ color: `${mainAccent}cc` }}
                >
                  {data.tagline}
                </p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center"
                aria-label="Close pillar detail"
              >
                <X size={16} />
              </button>
            </div>

            {/* Summary */}
            <p className="text-[13.5px] text-white/75 leading-relaxed max-w-4xl">
              {data.summary}
            </p>

            {/* Divider */}
            <div
              className="my-4 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${mainAccent}66, transparent)`,
              }}
            />

            {/* Two-column body: KPIs + Initiatives */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* KPI grid — 3/5 */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Performance Signals
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
                    {data.kpis.length} metrics
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {data.kpis.map((k, i) => (
                    <KpiCell key={k.label} k={k} i={i} accent={mainAccent} />
                  ))}
                </div>
              </div>

              {/* Initiatives — 2/5 */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {mode === 'future' ? 'Agentic Capabilities' : 'Key Initiatives'}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
                    {data.initiatives.length} items
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {data.initiatives.map((it, i) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-start gap-2 text-[12.5px] text-white/75 leading-snug"
                    >
                      <ChevronRight
                        size={13}
                        className="mt-0.5 shrink-0"
                        style={{ color: mainAccent }}
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
              className="mt-5 relative rounded-xl border p-3.5 flex items-start gap-3"
              style={{
                borderColor: `${mainAccent}40`,
                background: `linear-gradient(90deg, ${mainAccent}10, transparent)`,
              }}
            >
              <Quote size={18} className="shrink-0 mt-0.5" style={{ color: mainAccent }} />
              <div className="font-display text-white/90 text-[13.5px] leading-relaxed italic">
                {data.callout}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
