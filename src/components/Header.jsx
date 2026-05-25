import { motion } from 'framer-motion'
import { Hexagon, Shield, Building2, Lock } from 'lucide-react'

const Badge = ({ icon: Icon, label, value, tone = 'cyan' }) => {
  const tones = {
    cyan: { color: '#0891B2', bg: 'rgba(8,145,178,0.08)', border: 'rgba(8,145,178,0.25)' },
    violet: { color: '#7C3AED', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.25)' },
    mint: { color: '#059669', bg: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.25)' },
    amber: { color: '#D97706', bg: 'rgba(217,119,6,0.10)', border: 'rgba(217,119,6,0.30)' },
  }
  const t = tones[tone]
  return (
    <div
      className="hud-chip backdrop-blur-md border"
      style={{ color: t.color, background: t.bg, borderColor: t.border }}
    >
      <Icon size={11} strokeWidth={2.4} />
      {label && <span className="text-powder-700">{label}</span>}
      <span className="font-semibold tracking-[0.16em]">{value}</span>
    </div>
  )
}

export default function Header() {
  return (
    <header className="relative z-30 px-6 lg:px-10 pt-5 pb-3">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        {/* Identity */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-12 h-12 flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-hud-cyan/30 to-hud-violet/25 blur-md" />
            <div
              className="relative w-12 h-12 rounded-xl border flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.85)',
                borderColor: 'rgba(8,145,178,0.25)',
                boxShadow: '0 4px 12px -2px rgba(15,60,80,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <Hexagon size={22} className="text-hud-cyan" strokeWidth={1.6} />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-hud-cyan shadow-[0_0_8px_rgba(8,145,178,0.8)]" />
            </div>
          </motion.div>

          <div>
            <div className="hud-label mb-1" style={{ color: '#3A6175' }}>
              Telkom SA · WNS · Procurement EBR
            </div>
            <h1 className="font-display font-bold tracking-tight text-[22px] sm:text-[26px] leading-[1.05] text-powder-950">
              Procurement Intelligence
              <span className="ml-2 bg-gradient-to-r from-hud-cyan via-hud-teal to-hud-violet bg-clip-text text-transparent">
                Command Center
              </span>
            </h1>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge icon={Shield} label="Maturity" value="L4 · Governance" tone="violet" />
          <Badge icon={Building2} value="Telkom × WNS" tone="cyan" />
          <Badge icon={Lock} value="Confidential · EBR" tone="amber" />
        </div>
      </div>
    </header>
  )
}
