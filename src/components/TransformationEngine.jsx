import { motion } from 'framer-motion'
import { FLOW_STAGES, DIGITAL_WORKFORCE } from '../data/content'
import { Bot, Cpu, Workflow } from 'lucide-react'

const statusStyle = {
  live: { color: '#10F4A6', label: 'LIVE', soft: 'rgba(16,244,166,0.18)' },
  pilot: { color: '#FFB547', label: 'PILOT', soft: 'rgba(255,181,71,0.18)' },
  design: { color: '#8B6CFF', label: 'DESIGN', soft: 'rgba(139,108,255,0.20)' },
}

function FlowChain({ futureMode }) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 100 320"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="flow-line" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22E1FF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#8B6CFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FF4FA3" stopOpacity={futureMode ? '0.85' : '0.45'} />
          </linearGradient>
        </defs>
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="320"
          stroke="url(#flow-line)"
          strokeWidth="0.4"
          strokeDasharray="4 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-200"
            dur="4s"
            repeatCount="indefinite"
          />
        </line>
      </svg>

      <ol className="relative space-y-2">
        {FLOW_STAGES.map((s, i) => {
          const isFinal = i === FLOW_STAGES.length - 1
          const isFuture = ['einv', 'supplier'].includes(s.id)
          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="relative flex items-center gap-3 pl-1"
            >
              <div
                className="relative w-6 h-6 rounded-full border flex items-center justify-center shrink-0 z-10"
                style={{
                  borderColor: isFuture
                    ? futureMode
                      ? '#FF4FA3'
                      : 'rgba(139,108,255,0.5)'
                    : isFinal
                    ? '#FF4FA3'
                    : '#22E1FF66',
                  background: 'rgba(7,11,26,0.92)',
                  boxShadow: isFuture
                    ? futureMode
                      ? '0 0 14px rgba(255,79,163,0.7)'
                      : '0 0 10px rgba(139,108,255,0.45)'
                    : '0 0 10px rgba(34,225,255,0.4)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: isFuture
                      ? futureMode
                        ? '#FF4FA3'
                        : '#8B6CFF'
                      : '#22E1FF',
                  }}
                />
              </div>
              <div className="flex-1 flex items-center justify-between gap-3 py-1">
                <div>
                  <div className="font-display text-white text-[13.5px] font-semibold leading-tight">
                    {s.label}
                  </div>
                  {s.bot && (
                    <div className="text-[10.5px] font-mono uppercase tracking-wider text-white/40 mt-0.5">
                      → {s.bot}
                    </div>
                  )}
                </div>
                {s.bot && (
                  <span
                    className="hud-chip border"
                    style={{
                      color: isFuture
                        ? futureMode
                          ? '#FF4FA3'
                          : '#8B6CFF'
                        : '#22E1FF',
                      borderColor: isFuture
                        ? futureMode
                          ? 'rgba(255,79,163,0.45)'
                          : 'rgba(139,108,255,0.35)'
                        : 'rgba(34,225,255,0.35)',
                      background: isFuture
                        ? futureMode
                          ? 'rgba(255,79,163,0.10)'
                          : 'rgba(139,108,255,0.08)'
                        : 'rgba(34,225,255,0.06)',
                    }}
                  >
                    {isFuture ? (futureMode ? 'ORCH' : 'FY27') : 'AUTO'}
                  </span>
                )}
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

function BotNode({ bot, i }) {
  const st = statusStyle[bot.status]
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.05 }}
      className="relative glass p-2.5 overflow-hidden"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
            style={{ borderColor: st.color + '55', background: st.soft }}
          >
            <Bot size={13} style={{ color: st.color }} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] text-white font-medium truncate">{bot.name}</div>
            <div className="font-mono text-[9px] uppercase tracking-wider" style={{ color: st.color }}>
              {st.label}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${bot.load}%` }}
          transition={{ delay: 0.2 + i * 0.05, duration: 0.9 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${st.color}88, ${st.color})`,
            boxShadow: `0 0 8px ${st.color}55`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function TransformationEngine({ futureMode }) {
  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="hud-label">Transformation Engine</div>
          <h2 className="font-display font-semibold text-white text-lg mt-0.5">
            P2P Orchestration Chain
          </h2>
        </div>
        <span className="hud-chip border border-hud-cyan/30 text-hud-cyan bg-hud-cyan/[0.06]">
          <Workflow size={11} /> 9 STAGES
        </span>
      </div>

      <div className="grid grid-rows-[1fr_auto] gap-3 flex-1 min-h-0">
        {/* Flow */}
        <div className="glass-strong p-3.5 overflow-auto">
          <FlowChain futureMode={futureMode} />
        </div>

        {/* Bot grid */}
        <div>
          <div className="hud-label mb-2 flex items-center gap-2">
            <Cpu size={11} /> Digital Workforce
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DIGITAL_WORKFORCE.map((b, i) => (
              <BotNode key={b.name} bot={b} i={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
