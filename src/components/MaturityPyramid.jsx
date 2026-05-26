import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MATURITY } from '../data/content'
import {
  Cog, GitBranch, Network, ShieldCheck, Sparkles, ArrowLeft, ChevronUp,
} from 'lucide-react'

const ICON_MAP = { Cog, GitBranch, Network, ShieldCheck, Sparkles }

// Graduated cool spectrum (teal → violet)
const LEVEL_COLORS = {
  L1: { base: '#14B8A6', light: '#5EEAD4', dark: '#0F766E' },
  L2: { base: '#06B6D4', light: '#67E8F9', dark: '#0E7490' },
  L3: { base: '#3B82F6', light: '#93C5FD', dark: '#1D4ED8' },
  L4: { base: '#6366F1', light: '#A5B4FC', dark: '#4338CA' },
  L5: { base: '#8B5CF6', light: '#C4B5FD', dark: '#6D28D9' },
}

// Pyramid geometry — wider top so L5 stays readable
const VB_W = 600
const VB_H = 470
const PYR_TOP = 30
const LEVEL_H = 78
const CENTER_X = 300
const BASE_HALF = 270
const TOP_HALF = 95

function halfWidthAtLevel(i, edge) {
  const fraction = (i + (edge === 'top' ? 1 : 0)) / 5
  return BASE_HALF - (BASE_HALF - TOP_HALF) * fraction
}

function levelGeometry(i) {
  const bottomY = PYR_TOP + (5 - i) * LEVEL_H
  const topY = bottomY - LEVEL_H
  const bottomHalf = halfWidthAtLevel(i, 'bottom')
  const topHalf = halfWidthAtLevel(i, 'top')
  return { bottomY, topY, bottomHalf, topHalf, centerY: (topY + bottomY) / 2 }
}

export default function MaturityPyramid({ mode = 'current' }) {
  const isFuture = mode === 'future'
  const currentLevel = isFuture ? 5 : 4 // "WE ARE HERE" moves to L5 in future mode
  const [focusedId, setFocusedId] = useState(null)
  const focused = focusedId ? MATURITY.levels.find((l) => l.id === focusedId) : null
  const ordered = [...MATURITY.levels].reverse()

  return (
    <div
      className="relative w-full rounded-2xl border bg-white/80 backdrop-blur-md overflow-hidden h-full flex flex-col"
      style={{
        borderColor: 'rgba(143,178,194,0.40)',
        boxShadow:
          '0 8px 24px -6px rgba(15,60,80,0.10), 0 2px 4px rgba(15,60,80,0.04), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      <div className="px-5 pt-3 pb-2 flex items-center justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.20em] text-powder-700 font-semibold">
            {isFuture
              ? 'Maturity Journey · FY27+ Vision · Arrived at L5'
              : 'Maturity Journey · Click a level to drill in'}
          </div>
          <h3 className="font-display font-bold text-powder-950 text-base tracking-tight">
            {focused
              ? `${focused.id} · ${focused.title}`
              : isFuture
              ? 'L5 Achieved · Intelligent Orchestration Live'
              : 'L1 → L5 · How Initiatives Compound Into Maturity'}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0 text-[10px] font-mono uppercase tracking-[0.14em]">
          {focused ? (
            <button
              onClick={() => setFocusedId(null)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-white hover:bg-powder-50 transition-colors font-bold text-powder-900"
              style={{ borderColor: 'rgba(143,178,194,0.55)' }}
            >
              <ArrowLeft size={11} strokeWidth={2.4} />
              Drill Up
            </button>
          ) : isFuture ? (
            <>
              <span className="flex items-center gap-1 text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> L1-L4 Complete
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded font-bold" style={{ background: '#DB277715', color: '#DB2777', borderWidth: 1, borderStyle: 'solid', borderColor: '#DB277744' }}>
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" /> L5 Now Live
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1 text-powder-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Done
              </span>
              <span className="flex items-center gap-1 text-powder-700">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" /> Now
              </span>
              <span className="flex items-center gap-1 text-powder-700">
                <span className="w-2 h-2 rounded-full bg-violet-500" /> Next
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-2 px-3 pb-3 min-h-0">
        <div className="col-span-3 flex flex-col min-h-0">
          <div className="text-center mb-1 pt-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-powder-700 font-bold px-2 py-0.5 rounded bg-powder-300/60">
              {focused ? 'Delivered' : 'Current State'}
            </span>
          </div>
          <AnimatePresence mode="wait">
            {focused ? (
              <FocusedSidePanel
                key={`focused-cs-${focused.id}`}
                items={focused.currentState}
                color={LEVEL_COLORS[focused.id]}
                tag={focused.tag}
              />
            ) : (
              <motion.div
                key="overview-cs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-between py-1 gap-1 min-h-0"
              >
                {ordered.map((level, idx) => (
                  <OverviewLevelCard
                    key={`cs-${level.id}`}
                    level={level}
                    side="current"
                    onClick={() => setFocusedId(level.id)}
                    idx={idx}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="col-span-6 relative flex flex-col items-center min-h-0">
          <div className="text-center mb-1 pt-1">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.22em] font-bold px-2 py-0.5 rounded text-white"
              style={{
                background:
                  'linear-gradient(90deg, #14B8A6, #06B6D4, #3B82F6, #6366F1, #8B5CF6)',
              }}
            >
              Maturity Pyramid · L1 → L5
            </span>
          </div>
          <div className="flex-1 w-full relative min-h-0">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 w-full h-full"
              style={{ overflow: 'visible' }}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {MATURITY.levels.map((level) => {
                  const c = LEVEL_COLORS[level.id]
                  return (
                    <g key={`defs-${level.id}`}>
                      <linearGradient id={`pyr-face-${level.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={c.light} stopOpacity="1" />
                        <stop offset="50%" stopColor={c.base} stopOpacity="1" />
                        <stop offset="100%" stopColor={c.dark} stopOpacity="1" />
                      </linearGradient>
                      <linearGradient id={`pyr-side-${level.id}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={c.dark} stopOpacity="0.85" />
                        <stop offset="100%" stopColor={c.base} stopOpacity="0.55" />
                      </linearGradient>
                    </g>
                  )
                })}
              </defs>

              <ellipse
                cx={CENTER_X}
                cy={PYR_TOP + 5 * LEVEL_H + 12}
                rx={BASE_HALF + 30}
                ry={10}
                fill="rgba(15,60,80,0.15)"
                style={{ filter: 'blur(8px)' }}
              />

              {MATURITY.levels.map((level, i) => {
                const g = levelGeometry(i)
                const c = LEVEL_COLORS[level.id]
                const levelNum = level.level
                const isCurrent = levelNum === currentLevel
                const isTarget = !isFuture && levelNum === 5 // FY27 tag only shown when current
                const isPastDone = levelNum < currentLevel
                const isFocused = focusedId === level.id
                const isDimmed = focusedId && !isFocused

                const front = `
                  ${CENTER_X - g.topHalf},${g.topY}
                  ${CENTER_X + g.topHalf},${g.topY}
                  ${CENTER_X + g.bottomHalf},${g.bottomY}
                  ${CENTER_X - g.bottomHalf},${g.bottomY}
                `
                const depthDX = 14
                const depthDY = -6
                const rightFace = `
                  ${CENTER_X + g.topHalf},${g.topY}
                  ${CENTER_X + g.topHalf + depthDX},${g.topY + depthDY}
                  ${CENTER_X + g.bottomHalf + depthDX},${g.bottomY + depthDY}
                  ${CENTER_X + g.bottomHalf},${g.bottomY}
                `
                const topEdge = `
                  ${CENTER_X - g.topHalf},${g.topY}
                  ${CENTER_X + g.topHalf},${g.topY}
                  ${CENTER_X + g.topHalf + depthDX},${g.topY + depthDY}
                  ${CENTER_X - g.topHalf + depthDX},${g.topY + depthDY}
                `

                return (
                  <motion.g
                    key={level.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: isDimmed ? 0.30 : 1, y: 0 }}
                    transition={{
                      delay: 0.2 + (4 - i) * 0.10,
                      duration: 0.45,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setFocusedId(isFocused ? null : level.id)}
                  >
                    <polygon points={front} fill="transparent" />
                    <polygon
                      points={rightFace}
                      fill={`url(#pyr-side-${level.id})`}
                      stroke={c.dark}
                      strokeWidth="0.5"
                      strokeOpacity="0.45"
                      pointerEvents="none"
                    />
                    <polygon
                      points={topEdge}
                      fill={c.light}
                      opacity="0.85"
                      stroke={c.light}
                      strokeWidth="0.4"
                      pointerEvents="none"
                    />
                    <polygon
                      points={front}
                      fill={`url(#pyr-face-${level.id})`}
                      stroke={c.dark}
                      strokeWidth="0.6"
                      strokeOpacity="0.5"
                      pointerEvents="none"
                    />

                    {isCurrent && !focusedId && (
                      <motion.polygon
                        points={front}
                        fill="none"
                        stroke="#EC4899"
                        strokeWidth="2.2"
                        animate={{ opacity: [0.4, 0.95, 0.4] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ filter: 'drop-shadow(0 0 8px rgba(236,72,153,0.85))' }}
                        pointerEvents="none"
                      />
                    )}
                    {isFocused && (
                      <motion.polygon
                        points={front}
                        fill="none"
                        stroke={c.light}
                        strokeWidth="3"
                        animate={{ opacity: [0.55, 1, 0.55] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ filter: `drop-shadow(0 0 14px ${c.base})` }}
                        pointerEvents="none"
                      />
                    )}

                    <g
                      transform={`translate(${CENTER_X}, ${g.centerY})`}
                      style={{ pointerEvents: 'none' }}
                    >
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        className="font-display font-bold"
                        fontSize={i === 0 ? 18 : i === 1 ? 16 : i === 2 ? 14 : i === 3 ? 13 : 12}
                        fill="#FFFFFF"
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.40)', letterSpacing: '-0.01em' }}
                      >
                        {level.id}
                      </text>
                      <text
                        x="0"
                        y={i === 0 ? 12 : i === 1 ? 11 : i === 2 ? 9 : i === 3 ? 8 : 7}
                        textAnchor="middle"
                        className="font-display font-bold uppercase"
                        fontSize={i === 0 ? 11 : i === 1 ? 10 : i === 2 ? 9 : i === 3 ? 8.5 : 8}
                        fill="#FFFFFF"
                        fillOpacity="0.95"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.35)', letterSpacing: '0.08em' }}
                      >
                        {level.title}
                      </text>
                    </g>

                    {isCurrent && !focusedId && (
                      <motion.g
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4, duration: 0.45 }}
                        transform={`translate(${CENTER_X - g.bottomHalf - 82}, ${g.centerY - 14})`}
                        pointerEvents="none"
                      >
                        <rect x="0" y="0" width="72" height="28" rx="14" fill="#EC4899" stroke="#FFFFFF" strokeWidth="2" style={{ filter: 'drop-shadow(0 3px 6px rgba(236,72,153,0.55))' }} />
                        <text x="36" y="13" textAnchor="middle" fontSize="8" className="font-display font-bold uppercase" fill="#FFFFFF" style={{ letterSpacing: '0.12em' }}>
                          We Are
                        </text>
                        <text x="36" y="23" textAnchor="middle" fontSize="8" className="font-display font-bold uppercase" fill="#FFFFFF" style={{ letterSpacing: '0.12em' }}>
                          Here
                        </text>
                        <polygon points="72,14 82,9 82,19" fill="#EC4899" stroke="#FFFFFF" strokeWidth="1" />
                      </motion.g>
                    )}
                    {isTarget && !focusedId && (
                      <motion.g
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6, duration: 0.45 }}
                        transform={`translate(${CENTER_X + g.bottomHalf + depthDX + 8}, ${g.centerY - 10})`}
                        pointerEvents="none"
                      >
                        <rect x="0" y="0" width="48" height="20" rx="10" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                        <text x="24" y="14" textAnchor="middle" fontSize="9" className="font-display font-bold uppercase" fill="#8B5CF6" style={{ letterSpacing: '0.14em' }}>
                          FY27
                        </text>
                      </motion.g>
                    )}
                  </motion.g>
                )
              })}
            </svg>

            <div className="absolute inset-0 pointer-events-none">
              {MATURITY.levels.map((level, i) => {
                const g = levelGeometry(i)
                const Icon = ICON_MAP[level.iconName] || Cog
                const c = LEVEL_COLORS[level.id]
                const xPct = ((CENTER_X + (g.bottomHalf + g.topHalf) / 2 - 18) / VB_W) * 100
                const yPct = (g.centerY / VB_H) * 100
                const isDimmed = focusedId && focusedId !== level.id
                return (
                  <motion.div
                    key={`ic-${level.id}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: isDimmed ? 0.30 : 1, scale: 1 }}
                    transition={{ delay: 0.5 + (4 - i) * 0.10 }}
                    className="absolute"
                    style={{
                      left: `${xPct}%`,
                      top: `${yPct}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className="rounded-full flex items-center justify-center bg-white"
                      style={{
                        width: 26,
                        height: 26,
                        boxShadow: `0 2px 6px rgba(15,60,80,0.22), 0 0 0 2px ${c.base}`,
                        color: c.base,
                      }}
                    >
                      <Icon size={13} strokeWidth={2.2} />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {!focusedId && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-[0.20em] text-powder-600 px-2 py-0.5 rounded bg-white/70 backdrop-blur-sm"
              >
                <ChevronUp size={10} className="rotate-180" />
                Click any level to drill in
              </motion.div>
            )}
          </div>
        </div>

        <div className="col-span-3 flex flex-col min-h-0">
          <div className="text-center mb-1 pt-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-powder-700 font-bold px-2 py-0.5 rounded bg-powder-300/60">
              {focused ? 'Roadmap' : 'Future State'}
            </span>
          </div>
          <AnimatePresence mode="wait">
            {focused ? (
              <FocusedSidePanel
                key={`focused-fs-${focused.id}`}
                items={focused.futureState}
                color={LEVEL_COLORS[focused.id]}
                tag={focused.tag}
              />
            ) : (
              <motion.div
                key="overview-fs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-between py-1 gap-1 min-h-0"
              >
                {ordered.map((level, idx) => (
                  <OverviewLevelCard
                    key={`fs-${level.id}`}
                    level={level}
                    side="future"
                    onClick={() => setFocusedId(level.id)}
                    idx={idx}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function OverviewLevelCard({ level, side, onClick, idx }) {
  const items = side === 'current' ? level.currentState : level.futureState
  const colors = LEVEL_COLORS[level.id]

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: side === 'current' ? -8 : 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + idx * 0.06 }}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-md border bg-white/85 px-2 py-1.5 flex-1 min-h-0 flex flex-col justify-center text-left focus:outline-none cursor-pointer transition-shadow hover:shadow-md"
      style={{
        borderColor: `${colors.base}40`,
        boxShadow: `0 1px 3px rgba(15,60,80,0.05), inset 0 1px 0 rgba(255,255,255,0.85)`,
      }}
    >
      <div className="space-y-0.5">
        {items.slice(0, 3).map((init) => (
          <div
            key={init}
            className="text-[9.5px] text-powder-900 leading-tight flex items-start gap-1"
          >
            <span
              className="inline-block w-1 h-1 rounded-full mt-1 shrink-0"
              style={{ background: colors.base }}
            />
            <span className="line-clamp-1">{init}</span>
          </div>
        ))}
        {items.length > 3 && (
          <div
            className="text-[8.5px] font-mono uppercase tracking-wider font-bold flex items-center gap-0.5"
            style={{ color: colors.base }}
          >
            +{items.length - 3} more · drill
          </div>
        )}
      </div>
    </motion.button>
  )
}

function FocusedSidePanel({ items, color, tag }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="flex-1 rounded-md border bg-white/95 backdrop-blur-sm p-2.5 overflow-y-auto min-h-0"
      style={{
        borderColor: `${color.base}66`,
        boxShadow: `0 4px 14px -4px ${color.base}30, inset 0 1px 0 rgba(255,255,255,0.85)`,
      }}
    >
      <div
        className="font-mono text-[9px] uppercase tracking-[0.18em] font-bold mb-1.5 pb-1.5 border-b"
        style={{ color: color.base, borderColor: `${color.base}33` }}
      >
        {tag}
      </div>
      <ul className="space-y-1.5">
        {items.map((init, i) => (
          <motion.li
            key={init}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="text-[10.5px] text-powder-900 leading-snug flex items-start gap-1.5"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mt-1 shrink-0"
              style={{ background: color.base, boxShadow: `0 0 4px ${color.base}88` }}
            />
            <span>{init}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
