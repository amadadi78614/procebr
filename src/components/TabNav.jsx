import { motion } from 'framer-motion'
import {
  LayoutGrid, Gauge, Workflow, BrainCircuit, Rocket,
} from 'lucide-react'

const TABS = [
  { id: 'overview',       label: 'Overview',       icon: LayoutGrid },
  { id: 'operations',     label: 'Operations',     icon: Gauge },
  { id: 'transformation', label: 'Transformation', icon: Workflow },
  { id: 'analytics',      label: 'Analytics',      icon: BrainCircuit },
  { id: 'future',         label: 'Future',         icon: Rocket },
]

export default function TabNav({ activeTab, setActiveTab, mode, setMode }) {
  const isFuture = mode === 'future'

  return (
    <div
      className="relative rounded-2xl border bg-white/80 backdrop-blur-md px-2 py-1.5 flex items-center justify-between gap-2"
      style={{
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 4px 14px -4px rgba(15,60,80,0.08), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      {/* Tabs */}
      <div className="flex items-center gap-0.5 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 focus:outline-none"
            >
              {active && (
                <motion.div
                  layoutId="active-tab-bg"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background:
                      'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
                    boxShadow: '0 4px 10px -2px rgba(8,145,178,0.40)',
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                />
              )}
              <Icon
                size={13}
                strokeWidth={2.2}
                className={`relative ${active ? 'text-white' : 'text-powder-700'}`}
              />
              <span
                className={`relative font-display font-semibold text-[12px] tracking-tight ${
                  active ? 'text-white' : 'text-powder-800'
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Future Mode toggle */}
      <div className="flex items-center gap-2 shrink-0 pr-1">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.16em] font-semibold hidden sm:inline"
          style={{ color: isFuture ? '#DB2777' : '#3A6175' }}
        >
          Future Mode
        </span>
        <button
          onClick={() => setMode(isFuture ? 'current' : 'future')}
          className="relative w-12 h-6 rounded-full transition-colors focus:outline-none"
          style={{
            background: isFuture ? '#DB2777' : 'rgba(143,178,194,0.4)',
            boxShadow: isFuture
              ? '0 0 12px rgba(219,39,119,0.35), inset 0 1px 0 rgba(255,255,255,0.4)'
              : 'inset 0 1px 2px rgba(15,60,80,0.18)',
          }}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
            style={{
              left: isFuture ? 'calc(100% - 22px)' : '2px',
              boxShadow: '0 2px 4px rgba(15,60,80,0.30)',
            }}
          />
        </button>
      </div>
    </div>
  )
}
