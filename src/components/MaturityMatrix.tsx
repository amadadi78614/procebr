'use client'
import { useState, useCallback, useRef, useEffect } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts'
import clsx from 'clsx'

interface Metric { key: string; label: string; shortLabel: string; val: number }

const INITIAL_OPS: Metric[] = [
  { key:'backoffice', label:'Back-office processes',   shortLabel:'Back-office',    val:3.0 },
  { key:'bss',        label:'Customer & BSS',          shortLabel:'Customer / BSS', val:3.0 },
  { key:'corenet',    label:'Core network management', shortLabel:'Core network',   val:3.0 },
]
const INITIAL_AI: Metric[] = [
  { key:'rpa',      label:'RPA deployment',               shortLabel:'RPA deploy',     val:2.5 },
  { key:'datapipe', label:'Data integration & pipelines', shortLabel:'Data pipelines', val:2.5 },
  { key:'aigovern', label:'AI governance & ethics',       shortLabel:'AI governance',  val:2.5 },
]

const TARGET = 4.0
const LEVELS: [number, string][] = [[1,'Manual'],[2,'Emerging'],[3,'Defined'],[4,'Autonomous'],[5,'Optimised']]

const avg = (items: Metric[]) => +(items.reduce((s,i) => s+i.val, 0) / items.length).toFixed(2)

function levelName(val: number) {
  return LEVELS[Math.min(Math.floor(val), 5) - 1]?.[1] ?? ''
}

function gapInfo(score: number, isOps: boolean) {
  const gap = +(TARGET - score).toFixed(1)
  if (gap <= 0)   return { text: 'Target reached ✓', cls: isOps ? 'bg-[#E6F1FB] text-[#0C447C]' : 'bg-[#EEEDFE] text-[#3C3489]' }
  if (gap <= 0.5) return { text: `Almost there — gap: ${gap}`, cls: 'bg-[#EAF3DE] text-[#27500A]' }
  if (gap <= 1.5) return { text: `Gap to L4: ${gap}`, cls: 'bg-[#FAEEDA] text-[#633806]' }
  return             { text: `Gap to L4: ${gap}`, cls: 'bg-[#FCEBEB] text-[#791F1F]' }
}

function Slider({ metric, accent, bg, onChange }: {
  metric: Metric; accent: string; bg: string
  onChange: (key: string, val: number) => void
}) {
  const pct = ((metric.val - 1) / 4) * 100
  const trackStyle = { background: `linear-gradient(to right, ${accent} ${pct}%, ${bg} ${pct}%)` }
  const thumbStyle = `
    input[type=range].s-${metric.key}::-webkit-slider-thumb { background: ${accent}; }
    input[type=range].s-${metric.key}::-moz-range-thumb    { background: ${accent}; }
  `
  return (
    <div className="mb-3 last:mb-0">
      <style>{thumbStyle}</style>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12px] text-[#64748B]">{metric.label}</span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[10px] text-[#94A3B8]">{levelName(metric.val)}</span>
          <span className="text-[13px] font-semibold" style={{ color: accent }}>
            {metric.val.toFixed(1)}
          </span>
        </div>
      </div>
      <input
        type="range" min={1} max={5} step={0.1}
        value={metric.val}
        className={`w-full s-${metric.key}`}
        style={trackStyle}
        onChange={e => onChange(metric.key, parseFloat(e.target.value))}
        aria-label={`${metric.label} maturity score`}
      />
    </div>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 shadow-sm text-xs">
      <p className="font-semibold text-[#0F172A] mb-1">{payload[0]?.payload?.axis}</p>
      {payload.map((p: any) => p.name !== 'Target (L4)' && (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {parseFloat(p.value).toFixed(1)}</p>
      ))}
      <p className="text-[#888780]">Target (L4): 4.0</p>
    </div>
  )
}

export default function MaturityMatrix() {
  const [ops, setOps] = useState<Metric[]>(INITIAL_OPS)
  const [ai,  setAi]  = useState<Metric[]>(INITIAL_AI)

  const updateOps = useCallback((key: string, val: number) =>
    setOps(prev => prev.map(m => m.key === key ? { ...m, val } : m)), [])
  const updateAi  = useCallback((key: string, val: number) =>
    setAi(prev  => prev.map(m => m.key === key ? { ...m, val } : m)), [])

  const opsAvg = avg(ops)
  const aiAvg  = avg(ai)
  const overall = +((opsAvg + aiAvg) / 2).toFixed(2)
  const opsGap  = gapInfo(opsAvg, true)
  const aiGap   = gapInfo(aiAvg,  false)
  const overallGap = +(TARGET - overall).toFixed(1)

  const radarData = [
    ...ops.map(m => ({ axis: m.shortLabel, ops: m.val, ai: null, target: TARGET })),
    ...ai.map(m  => ({ axis: m.shortLabel, ops: null, ai: m.val, target: TARGET })),
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] gap-4 slide-enter">

      {/* ── Control panel ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">

        {/* Ops */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden"
          style={{ border: '0.5px solid #E2E8F0', borderLeft: '3px solid #185FA5' }}>
          <div className="px-4 pt-3.5 pb-3 border-b border-[#F1F5F9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#185FA5]" />
              <span className="text-[12px] font-semibold text-[#0F172A]">Operations metrics</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E6F1FB] text-[#0C447C]">
              Avg {opsAvg.toFixed(1)}
            </span>
          </div>
          <div className="px-4 pt-3 pb-4">
            {ops.map(m => (
              <Slider key={m.key} metric={m} accent="#185FA5" bg="#E6F1FB" onChange={updateOps} />
            ))}
          </div>
        </div>

        {/* AI */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden"
          style={{ border: '0.5px solid #E2E8F0', borderLeft: '3px solid #534AB7' }}>
          <div className="px-4 pt-3.5 pb-3 border-b border-[#F1F5F9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#534AB7]" />
              <span className="text-[12px] font-semibold text-[#0F172A]">Automation & AI metrics</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#3C3489]">
              Avg {aiAvg.toFixed(1)}
            </span>
          </div>
          <div className="px-4 pt-3 pb-4">
            {ai.map(m => (
              <Slider key={m.key} metric={m} accent="#534AB7" bg="#EEEDFE" onChange={updateAi} />
            ))}
          </div>
        </div>

        {/* Level legend */}
        <div className="bg-white rounded-xl shadow-sm px-4 py-3"
          style={{ border: '0.5px solid #E2E8F0' }}>
          <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider mb-2">
            Maturity level definitions
          </p>
          <div className="grid grid-cols-5 gap-1 text-center">
            {LEVELS.map(([n, name]) => (
              <div key={n}>
                <div className={clsx('text-[13px] font-semibold',
                  overall >= n ? 'text-[#0B2545]' : 'text-[#CBD5E1]')}>{n}</div>
                <div className="text-[9px] text-[#94A3B8] leading-tight">{name}</div>
              </div>
            ))}
          </div>
          {/* Level bar */}
          <div className="mt-2 flex gap-0.5">
            {LEVELS.map(([n]) => (
              <div key={n} className="flex-1 h-1 rounded-sm transition-all duration-300"
                style={{ background: overall >= n ? '#0B2545' : '#E2E8F0' }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Visualization panel ────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm p-4" style={{ border: '0.5px solid #E2E8F0' }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[14px] font-semibold text-[#0F172A]">Maturity assessment radar</p>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              Current profile vs. Level 4 target benchmark
            </p>
          </div>
          {/* Overall badge */}
          <div className="text-right">
            <div className="text-[24px] font-bold text-[#0B2545] leading-none">{overall.toFixed(1)}</div>
            <div className="text-[9px] text-[#94A3B8] mt-0.5">Overall / 5.0</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mb-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-0.5 rounded" style={{ background: '#378ADD' }} />
            <span className="text-[10px] text-[#64748B]">Operations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-0.5 rounded" style={{ background: '#7F77DD' }} />
            <span className="text-[10px] text-[#64748B]">Automation & AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="#888780" strokeWidth="1.5" strokeDasharray="4 3"/></svg>
            <span className="text-[10px] text-[#64748B]">Target L4 (4.0)</span>
          </div>
        </div>

        {/* Radar */}
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData} margin={{ top: 10, right: 24, bottom: 10, left: 24 }}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: '#475569', fontFamily: 'DM Sans, sans-serif' }} />
            <PolarRadiusAxis angle={90} domain={[0, 5]} tickCount={6}
              tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} />
            <Radar name="Operations" dataKey="ops"
              stroke="#378ADD" fill="#378ADD" fillOpacity={0.18} strokeWidth={2}
              dot={{ r: 3.5, fill: '#378ADD', strokeWidth: 0 }}
              connectNulls={false}
            />
            <Radar name="Automation & AI" dataKey="ai"
              stroke="#7F77DD" fill="#7F77DD" fillOpacity={0.14} strokeWidth={2}
              dot={{ r: 3.5, fill: '#7F77DD', strokeWidth: 0 }}
              connectNulls={false}
            />
            <Radar name="Target (L4)" dataKey="target"
              stroke="#B4B2A9" fill="#888780" fillOpacity={0.05} strokeWidth={1.5}
              strokeDasharray="5 4" dot={false}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>

        {/* Score cards */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-[#F8FAFC] rounded-xl p-3"
            style={{ borderLeft: '3px solid #185FA5' }}>
            <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
              Ops maturity average
            </p>
            <p className="text-[32px] font-bold leading-none text-[#185FA5]">{opsAvg.toFixed(1)}</p>
            <p className="text-[10px] text-[#94A3B8] mt-1">{levelName(opsAvg)}</p>
            <span className={clsx('inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-2', opsGap.cls)}>
              {opsGap.text}
            </span>
          </div>
          <div className="bg-[#F8FAFC] rounded-xl p-3"
            style={{ borderLeft: '3px solid #534AB7' }}>
            <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
              Automation maturity average
            </p>
            <p className="text-[32px] font-bold leading-none text-[#534AB7]">{aiAvg.toFixed(1)}</p>
            <p className="text-[10px] text-[#94A3B8] mt-1">{levelName(aiAvg)}</p>
            <span className={clsx('inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-2', aiGap.cls)}>
              {aiGap.text}
            </span>
          </div>
        </div>

        {/* Overall summary bar */}
        <div className="mt-3 bg-[#F1F5F9] rounded-xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
                Overall maturity score
              </span>
              <span className="text-[12px] font-semibold text-[#0B2545]">{overall.toFixed(1)} / 5.0</span>
            </div>
            <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${((overall - 1) / 4) * 100}%`, background: '#0B2545' }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-[#94A3B8]">L1 Manual</span>
              <span className="text-[9px] font-semibold text-[#B45309]">L4 Target ↑</span>
              <span className="text-[9px] text-[#94A3B8]">L5 Optimised</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[9px] text-[#64748B] uppercase tracking-wider font-semibold">Gap to L4</p>
            <p className={clsx('text-[22px] font-bold leading-none mt-0.5',
              overallGap <= 0 ? 'text-[#059669]' : overallGap <= 0.5 ? 'text-[#B45309]' : 'text-[#DC2626]'
            )}>
              {Math.max(0, overallGap).toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
