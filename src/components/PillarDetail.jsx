import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Quote } from 'lucide-react'
import { useCounter } from './useCounter'

const ACCENT_COLORS = {
  cyan: '#0891B2',
  aqua: '#14B8A6',
  violet: '#7C3AED',
  mint: '#10B981',
  magenta: '#DB2777',
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
      className="relative rounded-xl border px-3.5 py-3 overflow-hidden group transition-all hover:-translate-y-0.5"
      style={{
        background: 'rgba(255,255,255,0.85)',
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 2px 6px -1px rgba(15,60,80,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div
        className="absolute left-0 top-2.5 bottom-2.5 w-[2px] rounded-full"
        style={{ background: accent, boxShadow: `0 0 6px ${accent}88` }}
      />
      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-powder-700 mb-1.5 truncate pl-1.5">
        {k.label}
      </div>
      <div className="flex items-baseline gap-1 pl-1.5">
        <span
          className="font-display font-bold text-[24px] leading-none tabular-nums"
          style={{ color: accent }}
        >
          {value}
        </span>
        <span className="font-display text-powder-800 text-sm">{k.suffix}</span>
      </div>
      <div
        className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider pl-1.5"
        style={{ color: accent }}
      >
        {k.reverse ? <ArrowDownRight size={10} /> : <ArrowUpRight size={10} />}
        {k.delta}
      </div>
    </motion.div>
  )
}

export default function PillarDetail({ pillar, mode }) {
  const data = pillar[mode]
  const accent = ACCENT_COLORS[pillar.accent]
  const mainAccent = mode === 'future' ? '#DB2777' : accent

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
        {/* Headline area */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.24em] px-2.5 py-1 rounded-md border"
              style={{
                color: mainAccent,
                borderColor: `${mainAccent}66`,
                background: `${mainAccent}10`,
              }}
            >
              {mode === 'future' ? '◆ FY27+ Future State' : '◉ FY26 Current State'}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] px-2.5 py-1 rounded-md bg-powder-300/60 text-powder-800">
              {pillar.subtitle}
            </span>
          </div>
          <h2 className="font-display font-bold text-powder-950 text-3xl lg:text-4xl leading-[1.05] tracking-tight">
            {data.headline}
          </h2>
          <p
            className="font-mono text-[12px] uppercase tracking-[0.18em] mt-2"
            style={{ color: mainAccent }}
          >
            {data.tagline}
          </p>
          <p className="text-[14px] text-powder-800 leading-relaxed max-w-3xl mt-3">
            {data.summary}
          </p>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* KPIs — 3/5 */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-powder-800 font-semibold">
                Performance Signals
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-powder-600">
                {data.kpis.length} metrics
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {data.kpis.map((k, i) => (
                <KpiCell key={k.label} k={k} i={i} accent={mainAccent} />
              ))}
            </div>
          </div>

          {/* Initiatives — 2/5 */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-powder-800 font-semibold">
                {mode === 'future' ? 'Agentic Capabilities' : 'Key Initiatives'}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-powder-600">
                {data.initiatives.length} items
              </div>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{
                background: 'rgba(255,255,255,0.7)',
                borderColor: 'rgba(143,178,194,0.40)',
                boxShadow:
                  '0 2px 6px -1px rgba(15,60,80,0.05), inset 0 1px 0 rgba(255,255,255,0.85)',
              }}
            >
              <ul className="space-y-2.5">
                {data.initiatives.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start gap-2.5 text-[12.5px] text-powder-900 leading-snug"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: mainAccent, boxShadow: `0 0 5px ${mainAccent}77` }}
                    />
                    <span>{it}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 relative rounded-xl border p-4 flex items-start gap-3"
          style={{
            borderColor: `${mainAccent}55`,
            background: `linear-gradient(90deg, ${mainAccent}12, ${mainAccent}04)`,
          }}
        >
          <Quote size={20} className="shrink-0 mt-0.5" style={{ color: mainAccent }} />
          <div className="font-display text-powder-950 text-[14px] leading-relaxed italic">
            {data.callout}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
