import { motion } from 'framer-motion'
import {
  Eye, Target, Workflow, ShieldCheck, Infinity as InfinityIcon, ChevronRight, Rocket, Check,
} from 'lucide-react'
import { FUTURE_ROADMAP } from '../data/content'

const ICON_MAP = { Eye, Target, Workflow, ShieldCheck, Infinity: InfinityIcon }

export default function FutureRoadmap({ mode = 'current' }) {
  const isFuture = mode === 'future'
  const { steps, destination, currentPosition } = FUTURE_ROADMAP
  const position = isFuture ? currentPosition.future : currentPosition.current

  return (
    <div
      className="relative rounded-2xl border bg-white/80 backdrop-blur-md overflow-hidden h-full flex flex-col"
      style={{
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 8px 24px -6px rgba(15,60,80,0.10), 0 2px 4px rgba(15,60,80,0.04), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="px-4 pt-3 pb-2 shrink-0 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style={{ background: '#DB277715', color: '#DB2777' }}
          >
            <Rocket size={14} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.20em] text-powder-700 font-semibold">
              The Future of Procurement
            </div>
            <h3 className="font-display font-bold text-powder-950 text-[13px] tracking-tight leading-tight">
              {isFuture
                ? 'Destination Reached · Autonomy Live'
                : 'From Efficiency · To Intelligence · To Autonomy'}
            </h3>
          </div>
        </div>
        <span
          className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] font-bold px-2 py-0.5 rounded"
          style={{
            background: isFuture ? '#DB277720' : 'rgba(143,178,194,0.18)',
            color: isFuture ? '#DB2777' : '#3A6175',
          }}
        >
          {isFuture ? '◆ Step 5 of 5' : `Step ${position} of ${steps.length}`}
        </span>
      </div>

      <div className="flex-1 px-3 pb-3 flex flex-col gap-2 justify-center">
        {/* Step chain — with active position highlighted */}
        <div className="flex items-center justify-between gap-1">
          {steps.map((step, i) => {
            const Icon = ICON_MAP[step.iconName] || Eye
            const stepNum = i + 1
            const isActive = stepNum === position
            const isPassed = stepNum < position
            const isAhead = stepNum > position

            return (
              <div key={step.label} className="flex items-center gap-0.5 flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex flex-col items-center text-center flex-1 min-w-0"
                >
                  <div className="relative">
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(219,39,119,0.55)',
                            '0 0 0 10px rgba(219,39,119,0)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <div
                      className="relative w-10 h-10 rounded-lg flex items-center justify-center border-2 shadow-sm"
                      style={{
                        borderColor: isActive
                          ? '#DB2777'
                          : isPassed
                          ? '#10B981'
                          : '#DB277744',
                        background: isActive
                          ? '#DB2777'
                          : isPassed
                          ? 'linear-gradient(135deg, #FFFFFF 0%, #ECFDF5 100%)'
                          : 'linear-gradient(135deg, #FFFFFF 0%, #FDF2F8 100%)',
                        color: isActive ? '#FFFFFF' : isPassed ? '#10B981' : '#DB2777',
                      }}
                    >
                      {isPassed ? (
                        <Check size={18} strokeWidth={2.5} />
                      ) : (
                        <Icon size={17} strokeWidth={2} />
                      )}
                    </div>
                  </div>
                  <div
                    className="font-display font-bold text-[11.5px] mt-1 leading-tight"
                    style={{ color: isActive ? '#DB2777' : '#0C2A3E' }}
                  >
                    {step.label}
                  </div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.10em] text-powder-700 leading-tight">
                    {step.sub}
                  </div>
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isPassed ? 1 : 0.45 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <ChevronRight
                      size={14}
                      className={isPassed ? 'text-emerald-500' : 'text-powder-500'}
                      strokeWidth={2.5}
                    />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* Destination — ignites in future mode */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 180, damping: 22 }}
          className="relative rounded-lg border px-3 py-2 flex items-center justify-between gap-2 overflow-hidden"
          style={{
            background: isFuture
              ? 'linear-gradient(90deg, #DB2777 0%, #BE185D 50%, #831843 100%)'
              : 'linear-gradient(90deg, #FDF2F8 0%, #FAE8FF 50%, #F3E8FF 100%)',
            borderColor: isFuture ? '#831843' : '#DB277788',
            boxShadow: isFuture
              ? '0 4px 18px -2px rgba(219,39,119,0.45), inset 0 1px 0 rgba(255,255,255,0.20)'
              : '0 4px 12px -2px rgba(219,39,119,0.20), inset 0 1px 0 rgba(255,255,255,0.85)',
          }}
        >
          {/* Animated shine */}
          <motion.div
            className="absolute top-0 bottom-0 w-16 pointer-events-none"
            style={{
              background: isFuture
                ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
            }}
            animate={{ left: ['-25%', '125%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <div className="flex items-center gap-2 min-w-0">
            <motion.div
              animate={{
                boxShadow: isFuture
                  ? [
                      '0 0 0 0 rgba(255,255,255,0.55)',
                      '0 0 0 10px rgba(255,255,255,0)',
                    ]
                  : [
                      '0 0 0 0 rgba(219,39,119,0.55)',
                      '0 0 0 8px rgba(219,39,119,0)',
                    ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: isFuture
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #FBCFE8 100%)'
                  : 'linear-gradient(135deg, #DB2777 0%, #8B5CF6 100%)',
                color: isFuture ? '#DB2777' : 'white',
              }}
            >
              <Rocket size={16} strokeWidth={2.2} />
            </motion.div>
            <div className="min-w-0">
              <div
                className="font-display font-bold text-[12.5px] tracking-tight leading-tight"
                style={{ color: isFuture ? '#FFFFFF' : '#0C2A3E' }}
              >
                {destination.label}
              </div>
              <div
                className="font-mono text-[9px] uppercase tracking-[0.16em]"
                style={{ color: isFuture ? 'rgba(255,255,255,0.85)' : '#5A8194' }}
              >
                {isFuture ? '◆ ACHIEVED · LIVE' : destination.tag}
              </div>
            </div>
          </div>
          <div
            className="font-mono text-[9px] uppercase tracking-[0.16em] font-bold px-2 py-1 rounded shrink-0"
            style={{
              background: isFuture
                ? 'rgba(255,255,255,0.20)'
                : 'linear-gradient(90deg, #DB2777, #8B5CF6)',
              color: 'white',
            }}
          >
            {isFuture ? 'Live' : 'Destination'}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
