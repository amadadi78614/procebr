import { motion } from 'framer-motion'
import { Shield, Activity } from 'lucide-react'

export default function Header() {
  const today = new Date().toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="relative z-20 px-4 pt-3 pb-2">
      <div
        className="rounded-2xl border bg-white/85 backdrop-blur-md px-4 py-2 flex items-center justify-between gap-3"
        style={{
          borderColor: 'rgba(143,178,194,0.40)',
          boxShadow:
            '0 4px 14px -4px rgba(15,60,80,0.08), inset 0 1px 0 rgba(255,255,255,0.85)',
        }}
      >
        {/* Left — Brand */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Telkom block */}
          <div
            className="px-2.5 py-1 rounded-md flex items-center"
            style={{
              background: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%)',
              color: 'white',
            }}
          >
            <span className="font-display font-bold tracking-tight text-sm">Telkom</span>
          </div>
          {/* WNS block */}
          <div
            className="px-2.5 py-1 rounded-md flex items-center"
            style={{
              background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
              color: 'white',
            }}
          >
            <span className="font-display font-bold tracking-tight text-sm">WNS</span>
          </div>
          {/* Vertical separator + title */}
          <div className="h-7 w-px bg-powder-400/50" />
          <div className="min-w-0">
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-powder-700 leading-tight">
              Procurement Executive Business Review
            </div>
            <h1 className="font-display font-bold text-powder-950 text-base tracking-tight leading-tight">
              Procurement Intelligence Command Center
            </h1>
          </div>
        </div>

        {/* Right — status badges */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md border bg-emerald-50/70"
            style={{ borderColor: 'rgba(16,185,129,0.40)' }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-700 font-bold">
              Live
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-emerald-700/80">
              · {today}
            </span>
          </motion.div>
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-md border bg-amber-50/70"
            style={{ borderColor: 'rgba(217,119,6,0.40)' }}
          >
            <Shield size={10} strokeWidth={2.2} className="text-amber-700" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-amber-700 font-bold">
              Confidential
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
