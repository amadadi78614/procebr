import { motion } from 'framer-motion'
import {
  TrendingUp, Search, AlertTriangle, FileSearch, Clock, Sparkles, BrainCircuit,
} from 'lucide-react'
import { INTELLIGENCE_LAYER } from '../data/content'

const ICON_MAP = {
  TrendingUp, Search, AlertTriangle, FileSearch, Clock, Sparkles,
}

const CARD_ACCENTS_CURRENT = ['#7C3AED', '#0891B2', '#0D9488', '#6366F1', '#0EA5E9', '#D97706']
const FUTURE_ACCENT = '#DB2777'

export default function IntelligenceLayer({ mode = 'current' }) {
  const isFuture = mode === 'future'
  const capabilities = isFuture ? INTELLIGENCE_LAYER.future : INTELLIGENCE_LAYER.current

  return (
    <div
      className="relative rounded-2xl border bg-white/80 backdrop-blur-md overflow-hidden h-full flex flex-col"
      style={{
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 8px 24px -6px rgba(15,60,80,0.10), 0 2px 4px rgba(15,60,80,0.04), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="px-4 pt-2.5 pb-1 flex items-center justify-between shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style={{
              background: isFuture ? `${FUTURE_ACCENT}15` : '#7C3AED15',
              color: isFuture ? FUTURE_ACCENT : '#7C3AED',
            }}
          >
            <BrainCircuit size={14} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.20em] text-powder-700 font-semibold">
              Intelligence & Analytics Layer
            </div>
            <h3 className="font-display font-bold text-powder-950 text-[13px] tracking-tight leading-tight">
              {isFuture
                ? 'FY27+ · Agentic Cognitive Stack Live'
                : 'FY26 · Analytics CoE Capabilities'}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex-1 px-2.5 pb-2.5 grid grid-cols-3 grid-rows-2 gap-1.5 min-h-0">
        {capabilities.map((cap, i) => {
          const Icon = ICON_MAP[cap.iconName] || Sparkles
          const accent = isFuture ? FUTURE_ACCENT : CARD_ACCENTS_CURRENT[i % CARD_ACCENTS_CURRENT.length]
          return (
            <motion.div
              key={`${cap.title}-${mode}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-md border bg-white/85 px-2 py-1.5 hover:-translate-y-0.5 transition-transform overflow-hidden flex flex-col min-h-0"
              style={{
                borderColor: `${accent}40`,
                boxShadow: '0 1px 3px rgba(15,60,80,0.05), inset 0 1px 0 rgba(255,255,255,0.85)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: `${accent}15`, color: accent }}
                >
                  <Icon size={11} strokeWidth={2.2} />
                </div>
                <div className="font-display font-bold text-powder-950 text-[11px] tracking-tight leading-tight truncate flex-1">
                  {cap.title}
                </div>
              </div>
              <p className="text-[9.5px] text-powder-700 leading-snug line-clamp-2 flex-1">
                {cap.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
