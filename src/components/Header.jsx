import { motion } from 'framer-motion'
import { Hexagon, Shield, Building2, Lock } from 'lucide-react'

const Badge = ({ icon: Icon, label, value, tone = 'cyan' }) => {
  const tones = {
    cyan: 'border-hud-cyan/30 text-hud-cyan shadow-[0_0_24px_-8px_rgba(34,225,255,0.5)]',
    violet: 'border-hud-violet/30 text-hud-violet shadow-[0_0_24px_-8px_rgba(139,108,255,0.55)]',
    mint: 'border-hud-mint/30 text-hud-mint shadow-[0_0_24px_-8px_rgba(16,244,166,0.55)]',
    amber: 'border-hud-amber/30 text-hud-amber shadow-[0_0_24px_-8px_rgba(255,181,71,0.55)]',
  }
  return (
    <div className={`hud-chip bg-white/[0.03] border ${tones[tone]} backdrop-blur-md`}>
      <Icon size={11} strokeWidth={2.4} />
      {label && <span className="text-white/40">{label}</span>}
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
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-hud-cyan/20 to-hud-violet/20 blur-md" />
            <div className="relative w-12 h-12 rounded-xl border border-white/10 bg-ink-900/80 flex items-center justify-center">
              <Hexagon size={22} className="text-hud-cyan" strokeWidth={1.6} />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-hud-cyan shadow-[0_0_12px_rgba(34,225,255,0.9)]" />
            </div>
          </motion.div>

          <div>
            <div className="hud-label mb-1">Telkom SA · WNS · Procurement EBR</div>
            <h1 className="font-display font-bold tracking-tight text-[22px] sm:text-[26px] leading-[1.05] text-white">
              Procurement Intelligence
              <span className="ml-2 bg-gradient-to-r from-hud-cyan via-white to-hud-magenta bg-clip-text text-transparent">
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
